// ============================================
// TERAPKAN WARNA TEMA KUSTOM
// ============================================
// Kalau admin sudah mengubah warna lewat tab "Tampilan",
// warnanya disimpan di site.themeColors dan diterapkan di
// sini sebagai CSS variable, menimpa warna default di style.css.
// ============================================

function applyTheme(site) {
  const colors = site && site.themeColors;
  if (!colors) return;

  const root = document.documentElement;
  if (colors.primary) {
    root.style.setProperty("--primary-color", colors.primary);
    root.style.setProperty("--primary-dark", shadeColor(colors.primary, -12));
  }
  if (colors.secondary) root.style.setProperty("--secondary-color", colors.secondary);
  if (colors.accent) root.style.setProperty("--accent-color", colors.accent);
}

// Menggelapkan/mencerahkan warna hex sederhana, dipakai untuk hover state tombol primary
function shadeColor(hex, percent) {
  try {
    const num = parseInt(hex.replace("#", ""), 16);
    let r = (num >> 16) + Math.round(2.55 * percent);
    let g = ((num >> 8) & 0x00ff) + Math.round(2.55 * percent);
    let b = (num & 0x0000ff) + Math.round(2.55 * percent);
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));
    return "#" + (0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1);
  } catch (e) {
    return hex;
  }
}
