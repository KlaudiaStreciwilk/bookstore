export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'folio-theme'

/** Runs in <head> before the first paint so a saved dark theme never flashes light; without a saved choice it follows the system setting. */
export const themeInitScript = `try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';var r=document.documentElement;r.dataset.theme=t;r.classList.toggle('dark',t==='dark')}catch(e){}`
