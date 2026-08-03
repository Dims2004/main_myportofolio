// ============================================
// RENDER: HALAMAN PROYEK (projects.html)
// ============================================

async function renderProjects() {
  const site = await DataService.getSiteConfig();
  applyTheme(site);
  const projects = await DataService.getProjects();

  const grid = document.getElementById("projectsGrid");
  if (grid) {
    grid.innerHTML = projects.map(project => `
      <div class="project-card reveal" data-category="${escapeHtml(project.category)}">
        <div class="project-image">
          <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}">
          <div class="project-overlay">
            <a href="${escapeHtml(project.linkUrl || '#')}" class="btn btn-small" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-github"></i> ${escapeHtml(project.linkLabel || "Source Code")}
            </a>
          </div>
        </div>
        <div class="project-info">
          <span class="project-tag">${escapeHtml(project.tag)}</span>
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(project.description)}</p>
          <div class="project-tech">
            ${(project.tech || []).map(t => `<span>${escapeHtml(t)}</span>`).join("")}
          </div>
        </div>
      </div>
    `).join("");
  }

  document.dispatchEvent(new CustomEvent("content:rendered"));
  // Beri tahu portfolio.js (filter tombol) untuk menyala ulang karena kartu baru dibuat
  document.dispatchEvent(new CustomEvent("projects:rendered"));
}

document.addEventListener("DOMContentLoaded", renderProjects);
