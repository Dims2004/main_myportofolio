// ============================================
// RENDER: HALAMAN KONTAK (contact.html)
// ============================================

async function renderContact() {
  const site = await DataService.getSiteConfig();
  applyTheme(site);
  const contact = site.contact || {};

  const setText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val || "-";
  };

  setText("contactLokasi", contact.lokasi);
  setText("contactJamKerja", contact.jamKerja);

  const emailEl = document.getElementById("contactEmail");
  if (emailEl && contact.email) {
    emailEl.textContent = contact.email;
    emailEl.href = "mailto:" + contact.email;
  }

  const teleponEl = document.getElementById("contactTelepon");
  if (teleponEl && contact.telepon) {
    teleponEl.textContent = contact.telepon;
    teleponEl.href = "tel:" + contact.telepon.replace(/\s/g, "");
  }

  const mapFrame = document.getElementById("contactMap");
  if (mapFrame && contact.mapEmbedUrl) mapFrame.src = contact.mapEmbedUrl;

  const mapCaption = document.getElementById("contactMapCaption");
  if (mapCaption) mapCaption.textContent = " Lokasi: " + (contact.lokasi || "-");

  const socialWrap = document.getElementById("contactSocial");
  if (socialWrap && site.social) {
    const icons = { github: "fa-github", linkedin: "fa-linkedin", twitter: "fa-twitter", instagram: "fa-instagram" };
    socialWrap.innerHTML = Object.entries(site.social)
      .filter(([, url]) => url)
      .map(([key, url]) => `
        <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" aria-label="${key}">
          <i class="fab ${icons[key] || "fa-link"}"></i>
        </a>
      `).join("");
  }

  document.dispatchEvent(new CustomEvent("content:rendered"));
}

document.addEventListener("DOMContentLoaded", renderContact);
