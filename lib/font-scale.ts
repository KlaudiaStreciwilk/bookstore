export const FONT_SCALE_STORAGE_KEY = 'folio-font-scale'

/** Text sizes offered by the A−/A+ buttons, as multipliers of the default. */
export const FONT_SCALES = [0.9, 1, 1.15, 1.3, 1.5] as const
export const DEFAULT_FONT_SCALE = 1

/** Runs in <head> before the first paint so a saved text size applies without a jump. */
export const fontScaleInitScript = `try{var s=Number(localStorage.getItem('${FONT_SCALE_STORAGE_KEY}'));if([${FONT_SCALES.join(',')}].indexOf(s)>-1)document.documentElement.style.setProperty('--font-scale',String(s))}catch(e){}`
