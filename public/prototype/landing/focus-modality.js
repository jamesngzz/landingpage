// Keep programmatic focus for accessible stage changes, without showing a
// keyboard-style outline after mouse/touch input (including Safari headings).
export function installFocusModality(doc, view) {
  const root = doc.documentElement;
  const pointer = () => {root.dataset.inputModality = 'pointer';};
  const keyboard = event => {
    if (event.altKey || event.ctrlKey || event.metaKey || ['Shift','Control','Alt','Meta'].includes(event.key)) return;
    root.dataset.inputModality = 'keyboard';
  };
  pointer();
  doc.addEventListener('keydown', keyboard, true);
  doc.addEventListener('pointerdown', pointer, true);
  if (!('PointerEvent' in view)) {
    doc.addEventListener('mousedown', pointer, true);
    doc.addEventListener('touchstart', pointer, {capture:true,passive:true});
  }
}

if (typeof document !== 'undefined') installFocusModality(document, window);
