// ============================================
// DATA SERVICE
// ============================================
// Semua halaman di main-website mengambil isi konten
// lewat fungsi-fungsi di file ini. Kalau Firestore belum
// disetup atau datanya masih kosong, otomatis pakai
// DEFAULT_DATA supaya website tidak pernah tampil kosong.
// ============================================

const DataService = {
  async getSiteConfig() {
    try {
      const snap = await db.collection("site").doc("config").get();
      if (snap.exists) {
        return { ...DEFAULT_DATA.site, ...snap.data() };
      }
      return DEFAULT_DATA.site;
    } catch (err) {
      console.warn("Gagal mengambil data dari Firestore, pakai data default.", err);
      return DEFAULT_DATA.site;
    }
  },

  async getSkills() {
    try {
      const snap = await db.collection("skills").orderBy("order", "asc").get();
      if (!snap.empty) {
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
      return DEFAULT_DATA.skills;
    } catch (err) {
      console.warn("Gagal mengambil skills dari Firestore, pakai data default.", err);
      return DEFAULT_DATA.skills;
    }
  },

  async getProjects() {
    try {
      const snap = await db.collection("projects").orderBy("order", "asc").get();
      if (!snap.empty) {
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
      return DEFAULT_DATA.projects;
    } catch (err) {
      console.warn("Gagal mengambil projects dari Firestore, pakai data default.", err);
      return DEFAULT_DATA.projects;
    }
  },

  async getTimeline() {
    try {
      const snap = await db.collection("timeline").orderBy("order", "asc").get();
      if (!snap.empty) {
        return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
      return DEFAULT_DATA.timeline;
    } catch (err) {
      console.warn("Gagal mengambil timeline dari Firestore, pakai data default.", err);
      return DEFAULT_DATA.timeline;
    }
  }
};
