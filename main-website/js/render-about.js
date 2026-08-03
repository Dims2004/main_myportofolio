// ============================================
// RENDER: HALAMAN TENTANG (about.html)
// ============================================

async function renderAbout() {
  const site = await DataService.getSiteConfig();
  applyTheme(site);
  const timeline = await DataService.getTimeline();

  const aboutImage = document.getElementById("aboutImage");
  if (aboutImage) aboutImage.src = site.aboutImage;

  const aboutText = document.getElementById("aboutText");
  if (aboutText) aboutText.textContent = site.aboutText;

  const info = site.info || {};
  const infoGrid = document.getElementById("aboutInfoGrid");
  if (infoGrid) {
    const items = [
      { icon: "fa-user", label: "Nama", value: site.name },
      { icon: "fa-calendar", label: "Usia", value: info.usia },
      { icon: "fa-map-marker-alt", label: "Lokasi", value: info.lokasi },
      { icon: "fa-envelope", label: "Email", value: info.email },
      { icon: "fa-phone", label: "Telepon", value: info.telepon },
      { icon: "fa-graduation-cap", label: "Pendidikan", value: info.pendidikan }
    ].filter(item => item.value);

    infoGrid.innerHTML = items.map(item => `
      <div class="info-item">
        <i class="fas ${item.icon}"></i>
        <span><strong>${escapeHtml(item.label)}:</strong> ${escapeHtml(item.value)}</span>
      </div>
    `).join("");
  }

  const cvLink = document.getElementById("cvDownloadLink");
  if (cvLink && site.cvUrl) cvLink.href = site.cvUrl;

  const timelineWrap = document.getElementById("timelineList");
  if (timelineWrap) {
    timelineWrap.innerHTML = timeline.map(item => `
      <div class="timeline-item reveal">
        <div class="timeline-date">${escapeHtml(item.date)}</div>
        <div class="timeline-content">
          <h3>${escapeHtml(item.title)}</h3>
          <h4>${escapeHtml(item.subtitle)}</h4>
          <p>${escapeHtml(item.description)}</p>
        </div>
      </div>
    `).join("");
  }

  document.dispatchEvent(new CustomEvent("content:rendered"));
}

document.addEventListener("DOMContentLoaded", renderAbout);
