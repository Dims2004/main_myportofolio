// ============================================
// RENDER: HALAMAN BERANDA (index.html)
// ============================================

async function renderHome() {
  const site = await DataService.getSiteConfig();
  applyTheme(site);
  const skills = await DataService.getSkills();
  const projects = await DataService.getProjects();

  // ----- HERO -----
  const heroName = document.getElementById("heroName");
  if (heroName) heroName.textContent = site.name;

  const heroDescription = document.getElementById("heroDescription");
  if (heroDescription) heroDescription.textContent = site.heroDescription;

  const heroImage = document.getElementById("heroImage");
  if (heroImage) heroImage.src = site.profileImage;

  // Simpan kata-kata typewriter secara global supaya main.js bisa memakainya
  window.TYPEWRITER_WORDS = Array.isArray(site.roleWords) && site.roleWords.length
    ? site.roleWords
    : ["Developer"];
  document.dispatchEvent(new CustomEvent("typewriter:ready"));

  const socialWrap = document.getElementById("heroSocial");
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

  // ----- SKILLS -----
  const skillsGrid = document.getElementById("skillsGrid");
  if (skillsGrid) {
    skillsGrid.innerHTML = skills.map(skill => `
      <div class="skill-card reveal">
        <i class="${escapeHtml(skill.icon)}"></i>
        <h3>${escapeHtml(skill.name)}</h3>
        <div class="skill-bar">
          <div class="skill-progress" style="width: ${Number(skill.percent) || 0}%"></div>
        </div>
      </div>
    `).join("");
  }

  // ----- FEATURED PROJECTS -----
  const projectsGrid = document.getElementById("featuredProjectsGrid");
  if (projectsGrid) {
    const featured = projects.filter(p => p.featured !== false).slice(0, 3);
    projectsGrid.innerHTML = featured.map(project => `
      <div class="project-card reveal">
        <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}">
        <div class="project-info">
          <span class="project-tag">${escapeHtml(project.tag)}</span>
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(project.description)}</p>
          <div class="project-tech">
            ${(project.tech || []).map(t => `<span>${escapeHtml(t)}</span>`).join("")}
          </div>
          <a href="projects.html" class="btn btn-small">Lihat Detail</a>
        </div>
      </div>
    `).join("");
  }

  document.dispatchEvent(new CustomEvent("content:rendered"));
}

document.addEventListener("DOMContentLoaded", renderHome);
