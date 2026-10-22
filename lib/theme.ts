export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'folio-theme'

/** Runs in <head> before the first paint so the saved theme never flashes; the dark library look is the default. */
export const themeInitScript = `try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t!=='light'&&t!=='dark')t='dark';var r=document.documentElement;r.dataset.theme=t;r.classList.toggle('dark',t==='dark')}catch(e){document.documentElement.dataset.theme='dark'}`
