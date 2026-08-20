// ============================================
// GENERATE PDF: PORTOFOLIO PROYEK (untuk lamaran kerja)
// ============================================
// Butuh library jsPDF (sudah ditambahkan lewat CDN di setiap halaman).
// Fungsi ini mengambil data dari Firestore (lewat DataService, sama
// seperti halaman lain) lalu menyusunnya jadi 1 file PDF rapi berisi:
// - Header (nama, role, kontak)
// - Ringkasan tentang
// - Daftar keahlian
// - Semua proyek (gambar, judul, kategori, deskripsi, teknologi, link)
// ============================================

// Ambil gambar (dari folder assets/ sendiri) lalu ubah jadi base64
// supaya bisa ditempel ke PDF lewat doc.addImage().
async function loadImageAsDataURL(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Gagal memuat gambar: " + url);
  const blob = await response.blob();
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function getImageFormat(dataUrl) {
  if (dataUrl.indexOf("image/png") !== -1) return "PNG";
  if (dataUrl.indexOf("image/webp") !== -1) return "WEBP";
  return "JPEG";
}

async function generatePortfolioPDF() {
  const btn = document.getElementById("downloadPdfBtn");
  const originalHTML = btn ? btn.innerHTML : null;

  try {
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: "mm", format: "a4" });

    const [site, skills, projects] = await Promise.all([
      DataService.getSiteConfig(),
      DataService.getSkills(),
      DataService.getProjects()
    ]);

    // ---------- Konfigurasi layout ----------
    const marginX = 16;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const contentWidth = pageWidth - marginX * 2;
    const primaryColor = [108, 99, 255]; // ganti sesuai themeColors.primary kalau mau

    // Ukuran thumbnail gambar proyek (ukuran "normal", bukan full-width)
    const imgBoxWidth = 42;
    const imgBoxHeight = 30;
    const textX = marginX + imgBoxWidth + 6;
    const textWidth = contentWidth - imgBoxWidth - 6;

    let y = 20;

    // Pindah halaman otomatis kalau konten mau melebihi batas bawah
    function ensureSpace(neededHeight) {
      if (y + neededHeight > pageHeight - 18) {
        addFooter();
        doc.addPage();
        y = 20;
      }
    }

    function addFooter() {
      const page = doc.internal.getCurrentPageInfo().pageNumber;
      doc.setFontSize(8.5);
      doc.setTextColor(150);
      doc.text(
        `Dibuat otomatis dari portofolio online — ${new Date().toLocaleDateString("id-ID")}`,
        marginX,
        pageHeight - 10
      );
      doc.text(`Hal. ${page}`, pageWidth - marginX, pageHeight - 10, { align: "right" });
    }

    function sectionTitle(text) {
      ensureSpace(14);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(...primaryColor);
      doc.text(text, marginX, y);
      y += 2;
      doc.setDrawColor(...primaryColor);
      doc.setLineWidth(0.6);
      doc.line(marginX, y, marginX + contentWidth, y);
      y += 7;
      doc.setTextColor(30, 30, 30);
    }

    // ---------- HEADER ----------
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(20, 20, 20);
    doc.text(site.name || "Nama Saya", marginX, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11.5);
    doc.setTextColor(...primaryColor);
    doc.text((site.roleWords || []).join("  •  "), marginX, y);
    y += 7;

    doc.setFontSize(9.5);
    doc.setTextColor(90, 90, 90);
    const info = site.info || {};
    const contactLine = [info.email, info.telepon, info.lokasi].filter(Boolean).join("   |   ");
    doc.text(contactLine, marginX, y);
    y += 9;

    doc.setDrawColor(220);
    doc.setLineWidth(0.3);
    doc.line(marginX, y, marginX + contentWidth, y);
    y += 9;

    // ---------- TENTANG ----------
    if (site.heroDescription || site.aboutText) {
      sectionTitle("Tentang Saya");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      const aboutText = site.aboutText || site.heroDescription;
      const lines = doc.splitTextToSize(aboutText, contentWidth);
      ensureSpace(lines.length * 5);
      doc.text(lines, marginX, y);
      y += lines.length * 5 + 6;
    }

    // ---------- SKILLS ----------
    if (skills && skills.length) {
      sectionTitle("Keahlian");
      doc.setFontSize(10);
      const skillText = skills.map(s => `${s.name}${s.percent ? ` (${s.percent}%)` : ""}`).join("   •   ");
      const lines = doc.splitTextToSize(skillText, contentWidth);
      ensureSpace(lines.length * 5);
      doc.text(lines, marginX, y);
      y += lines.length * 5 + 6;
    }

    // ---------- PROYEK ----------
    sectionTitle(`Daftar Proyek (${projects.length})`);

    for (let idx = 0; idx < projects.length; idx++) {
      const project = projects[idx];

      // Coba ambil gambar proyek (kalau gagal/tidak ada, lanjut tanpa gambar)
      let imgData = null;
      let imgFormat = null;
      if (project.image) {
        try {
          imgData = await loadImageAsDataURL(project.image);
          imgFormat = getImageFormat(imgData);
        } catch (e) {
          console.warn("Gambar proyek tidak bisa dimuat:", project.image, e);
          imgData = null;
        }
      }

      // Hitung dulu deskripsi & teknologi sebelum menggambar,
      // supaya tahu tinggi total blok ini (buat cek pindah halaman).
      doc.setFontSize(9.8);
      const descLines = doc.splitTextToSize(project.description || "", textWidth);
      const techLine = project.tech && project.tech.length ? `Teknologi: ${project.tech.join(", ")}` : "";
      const hasLink = project.linkUrl && project.linkUrl !== "#";

      const textBlockHeight = 6 + descLines.length * 4.6 + (techLine ? 5 : 0) + (hasLink ? 5 : 0);
      const blockHeight = Math.max(imgBoxHeight, textBlockHeight) + 10;

      ensureSpace(blockHeight);
      const blockTopY = y;

      // ---- Kotak gambar (thumbnail ukuran normal) ----
      doc.setDrawColor(225);
      doc.setFillColor(248, 248, 250);
      doc.roundedRect(marginX, blockTopY, imgBoxWidth, imgBoxHeight, 2, 2, "FD");

      if (imgData) {
        try {
          const props = doc.getImageProperties(imgData);
          const aspect = props.width / props.height;
          let drawW = imgBoxWidth - 2;
          let drawH = drawW / aspect;
          if (drawH > imgBoxHeight - 2) {
            drawH = imgBoxHeight - 2;
            drawW = drawH * aspect;
          }
          const offsetX = marginX + (imgBoxWidth - drawW) / 2;
          const offsetY = blockTopY + (imgBoxHeight - drawH) / 2;
          doc.addImage(imgData, imgFormat, offsetX, offsetY, drawW, drawH);
        } catch (e) {
          console.warn("Gagal menempel gambar ke PDF:", project.image, e);
        }
      } else {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        doc.setTextColor(180, 180, 180);
        doc.text("Tanpa Gambar", marginX + imgBoxWidth / 2, blockTopY + imgBoxHeight / 2, { align: "center" });
      }

      // ---- Judul + tag (di kanan gambar) ----
      let textY = blockTopY + 5;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11.5);
      doc.setTextColor(20, 20, 20);
      doc.text(`${idx + 1}. ${project.title}`, textX, textY);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(...primaryColor);
      doc.text(project.tag || project.category || "", marginX + contentWidth, textY, { align: "right" });
      textY += 6;

      // ---- Deskripsi ----
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.8);
      doc.setTextColor(60, 60, 60);
      doc.text(descLines, textX, textY);
      textY += descLines.length * 4.6 + 2;

      // ---- Teknologi ----
      if (techLine) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(90, 90, 90);
        doc.text("Teknologi: ", textX, textY);
        doc.setFont("helvetica", "normal");
        doc.text(project.tech.join(", "), textX + 18, textY);
        textY += 5;
      }

      // ---- Link ----
      if (hasLink) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(90, 90, 90);
        doc.text("Link: ", textX, textY);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...primaryColor);
        doc.textWithLink(project.linkUrl, textX + 10, textY, { url: project.linkUrl });
        textY += 5;
      }

      // y turun ke posisi terbawah antara kolom gambar & kolom teks
      y = Math.max(blockTopY + imgBoxHeight, textY) + 6;

      if (idx < projects.length - 1) {
        doc.setDrawColor(230);
        doc.setLineWidth(0.2);
        doc.line(marginX, y, marginX + contentWidth, y);
        y += 6;
      }
    }

    addFooter();

    const fileName = `Portofolio-Proyek-${(site.name || "Saya").replace(/\s+/g, "-")}.pdf`;
    doc.save(fileName);
  } catch (err) {
    console.error("Gagal membuat PDF:", err);
    alert("Gagal membuat PDF. Coba lagi sebentar lagi.");
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalHTML;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("downloadPdfBtn");
  if (btn) btn.addEventListener("click", generatePortfolioPDF);
});