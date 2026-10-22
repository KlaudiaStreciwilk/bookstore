#!/usr/bin/env node
// Responsive layout check: opens the built site in headless Chrome/Edge at many screen sizes
// (phones, tablets, laptops with Windows display scaling, desktops), in light and dark theme,
// and fails if anything overlaps or spills off-screen.
//
//   pnpm build && pnpm check:layout                 # starts `next start` itself
//   pnpm check:layout --url http://localhost:3000   # against a running server
//   pnpm check:layout --shots ./layout-shots        # also save screenshots
//
// No dependencies: talks to the browser over the DevTools protocol (Node 22+ WebSocket).

import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { createServer } from 'node:net'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const VIEWPORTS = [
  [320, 568], [360, 740], [375, 667], [390, 844], [414, 896],
  [600, 960], [768, 1024], [820, 1180], [1024, 768], [1180, 820],
  // Laptops: 1280×600 ≈ 1920×1080 at 150% scaling, 1536×730 ≈ 125%.
  [1280, 600], [1280, 720], [1366, 768], [1440, 900], [1536, 730],
  [1680, 1050], [1920, 1080], [2560, 1440],
]
const PAGES = ['/', '/logowanie', '/rejestracja', '/reset-hasla', '/ksiazka/cichy-atlas']
const THEMES = ['light', 'dark']

const args = process.argv.slice(2)
const argValue = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined }
const shotsDir = argValue('--shots')
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
  ]
  return candidates.find((path) => path && existsSync(path))
}

function freePort() {
  return new Promise((resolve) => {
    const server = createServer().listen(0, () => { const { port } = server.address(); server.close(() => resolve(port)) })
  })
}

async function waitFor(url, timeoutMs = 60000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try { if ((await fetch(url)).ok) return } catch {}
    await sleep(300)
  }
  throw new Error(`Timed out waiting for ${url}`)
}

// Runs inside the page: returns a list of human-readable layout problems.
function inspectPage() {
  const problems = []
  const vw = document.documentElement.clientWidth
  const visible = (el) => {
    if (!el) return false
    const style = getComputedStyle(el)
    const rect = el.getBoundingClientRect()
    return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0
  }
  const label = (el) => el.id ? `#${el.id}` : `${el.tagName.toLowerCase()}.${[...el.classList].join('.')}`
  // `gap` > 0 also flags elements that merely touch (less than `gap` px apart).
  const overlap = (a, b, gap = 0) => {
    const r1 = a.getBoundingClientRect()
    const r2 = b.getBoundingClientRect()
    const x = Math.min(r1.right, r2.right) - Math.max(r1.left, r2.left)
    const y = Math.min(r1.bottom, r2.bottom) - Math.max(r1.top, r2.top)
    return x > 1 - gap && y > 1
  }

  // 0. The page itself must never scroll sideways.
  if (document.documentElement.scrollWidth > vw + 1) problems.push(`page: scrolls sideways (${document.documentElement.scrollWidth}px wide on a ${vw}px screen)`)

  // 1. Header: brand, navigation and action buttons must not touch each other or leave the screen.
  const header = document.querySelector('.site-header')
  const headerParts = [
    header?.querySelector('.brand'),
    header?.querySelector('.main-nav'),
    ...(header?.querySelector('.header-actions')?.children ?? []),
  ].filter(visible)
  for (let i = 0; i < headerParts.length; i++) {
    for (let j = i + 1; j < headerParts.length; j++) {
      if (overlap(headerParts[i], headerParts[j], 4)) problems.push(`header: ${label(headerParts[i])} overlaps or touches ${label(headerParts[j])}`)
    }
    const rect = headerParts[i].getBoundingClientRect()
    if (rect.left < -1 || rect.right > vw + 1) problems.push(`header: ${label(headerParts[i])} is off-screen (${Math.round(rect.left)}–${Math.round(rect.right)} of ${vw}px)`)
  }
  for (const item of header?.querySelectorAll('.main-nav > *, .header-actions > *') ?? []) {
    if (visible(item) && item.scrollWidth > item.clientWidth + 1) problems.push(`header: text does not fit in ${label(item)}`)
  }

  // 2. The header must not cover the first heading / main content of the page.
  const headerBottom = Math.max(0, ...headerParts.map((el) => el.getBoundingClientRect().bottom))
  const firstContent = document.querySelector('main h1, .auth-card, .book-viewer')
  if (visible(firstContent) && firstContent.getBoundingClientRect().top < headerBottom - 1) {
    problems.push(`content: ${label(firstContent)} starts under the header (top ${Math.round(firstContent.getBoundingClientRect().top + scrollY)}px, header ends ${Math.round(headerBottom)}px)`)
  }

  // 3. Hero: text and the featured book must not collide.
  for (const selector of ['.hero-copy h1', '.hero-description', '.hero-actions']) {
    const el = document.querySelector(selector)
    const art = document.querySelector('.hero-book-wrap')
    if (visible(el) && visible(art) && overlap(el, art)) problems.push(`hero: ${selector} overlaps the featured book`)
  }

  // 4. Nothing important may stick out sideways (ignores intentional scrollers and decorations).
  const ignored = '.marquee, .monthly-grid, .hero-orb, .hero-ring, .book-modal, .auth-showcase-glow, .weekly-section::before'
  const important = document.querySelectorAll('h1, h2, h3, p, a, button, input, select, label, .filter-panel, .book-grid, .open-book, .auth-card, .book-viewer, .hero-art')
  for (const el of important) {
    if (!visible(el) || el.closest(ignored)) continue
    const rect = el.getBoundingClientRect()
    if (rect.right > vw + 1 || rect.left < -1) {
      problems.push(`overflow: ${label(el)} sticks out of the screen (${Math.round(rect.left)}–${Math.round(rect.right)} of ${vw}px)`)
      if (problems.length > 25) break
    }
  }

  // 5. Headings whose words are cut off.
  for (const el of document.querySelectorAll('h1, h2')) {
    if (visible(el) && el.scrollWidth > el.clientWidth + 2) problems.push(`text: ${label(el)} is wider than its box`)
  }
  return [...new Set(problems)]
}

async function main() {
  const browserPath = findBrowser()
  if (!browserPath) throw new Error('Chrome/Edge not found. Set CHROME_PATH.')

  const children = []
  let baseUrl = argValue('--url')
  if (!baseUrl) {
    const port = await freePort()
    const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', String(port)], { stdio: 'ignore' })
    children.push(server)
    baseUrl = `http://localhost:${port}`
  }
  baseUrl = baseUrl.replace(/\/$/, '')

  const cdpPort = await freePort()
  const profile = mkdtempSync(join(tmpdir(), 'folio-layout-'))
  const browser = spawn(browserPath, ['--headless=new', `--remote-debugging-port=${cdpPort}`, `--user-data-dir=${profile}`, '--no-first-run', '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' })
  children.push(browser)

  const cleanup = async () => {
    for (const child of children) child.kill()
    await sleep(1000) // Windows keeps the browser profile locked for a moment after exit.
    try { rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 }) } catch {}
  }
  try {
    await waitFor(`${baseUrl}/`)
    await waitFor(`http://127.0.0.1:${cdpPort}/json/version`)
    const target = await (await fetch(`http://127.0.0.1:${cdpPort}/json/new?about:blank`, { method: 'PUT' })).json()
    const ws = new WebSocket(target.webSocketDebuggerUrl)
    await new Promise((resolve) => ws.addEventListener('open', resolve))
    let nextId = 0
    const pending = new Map()
    ws.addEventListener('message', (event) => {
      const message = JSON.parse(event.data)
      if (message.id && pending.has(message.id)) { pending.get(message.id)(message.result); pending.delete(message.id) }
    })
    const send = (method, params = {}) => new Promise((resolve) => { const id = ++nextId; pending.set(id, resolve); ws.send(JSON.stringify({ id, method, params })) })
    await send('Page.enable')
    await send('Runtime.enable')
    // Disable animations so measurements see the final layout.
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
    if (shotsDir) mkdirSync(shotsDir, { recursive: true })

    let failures = 0
    let checks = 0
    for (const theme of THEMES) {
      await send('Page.addScriptToEvaluateOnNewDocument', { source: `try{localStorage.setItem('folio-theme','${theme}')}catch(e){}` })
      for (const [width, height] of VIEWPORTS) {
        await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 768 })
        for (const path of PAGES) {
          await send('Page.navigate', { url: baseUrl + path })
          await sleep(900)
          const result = await send('Runtime.evaluate', { expression: `(${inspectPage.toString()})()`, returnByValue: true })
          const problems = result?.result?.value ?? ['could not inspect page']
          checks++
          if (problems.length) {
            failures++
            console.log(`✗ ${theme} ${width}×${height} ${path}`)
            for (const problem of problems) console.log(`    ${problem}`)
          }
          if (shotsDir) {
            const shot = await send('Page.captureScreenshot', { format: 'png' })
            const name = path === '/' ? 'home' : path.slice(1).replaceAll('/', '_')
            writeFileSync(join(shotsDir, `${theme}-${width}x${height}-${name}.png`), Buffer.from(shot.data, 'base64'))
          }
        }
      }
    }
    ws.close()
    console.log(failures ? `\n${failures} of ${checks} page checks have layout problems.` : `\nAll ${checks} page checks passed.`)
    process.exitCode = failures ? 1 : 0
  } finally {
    await cleanup()
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1 })
