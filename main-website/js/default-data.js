// ============================================
// DATA DEFAULT
// ============================================
// Data ini dipakai untuk 2 hal:
// 1. Fallback: kalau Firestore belum di-setup / lagi kosong,
//    website utama tetap tampil pakai data ini (tidak blank).
// 2. Seed: tombol "Isi Data Awal" di admin-website akan
//    mengunggah data ini ke Firestore sebagai titik awal
//    yang bisa langsung kamu edit.
// ============================================

const DEFAULT_DATA = {
  site: {
    name: "Dimas Febrianto",
    roleWords: ["Data Analyst", "Internet of Things", "Freelancer"],
    themeColors: {
      primary: "#6C63FF",
      secondary: "#1A1A2E",
      accent: "#FF6584"
    },
    heroDescription: "Saya adalah mahasiswa Informatika yang memiliki minat dalam bidang Data Analytics, Internet of Things (IoT), dan Artificial Intelligence. Saya senang mengolah data menjadi informasi yang bernilai, membangun solusi berbasis teknologi, serta mengembangkan sistem yang mampu memberikan dampak nyata dalam kehidupan sehari-hari.",
    profileImage: "assets/images/profile/Foto NonFormal.png",
    aboutImage: "assets/images/profile/FOTO FORMAL.jpg",
    aboutText: "Saya adalah lulusan S1 Informatika yang memiliki minat pada Web Development, Internet of Things (IoT), Artificial Intelligence (AI), dan Machine Learning. Saya senang mengembangkan aplikasi yang tidak hanya memiliki tampilan menarik, tetapi juga memberikan solusi yang efektif terhadap permasalahan nyata. Saya memiliki pengalaman dalam membangun website, mengembangkan sistem berbasis IoT menggunakan ESP32 dan MQTT, serta menerapkan algoritma machine learning untuk analisis data. Saya merupakan pribadi yang cepat belajar, mampu bekerja secara individu maupun dalam tim, serta selalu bersemangat mempelajari teknologi baru untuk terus meningkatkan kemampuan.",
    cvUrl: "assets/cv/CV_ATS_Dimas.pdf",
    social: {
      github: "https://github.com/Dims2004",
      linkedin: "https://www.linkedin.com/in/dimas-febrianto-38b294342/",
      twitter: "https://x.com/dreamdft",
      instagram: "https://www.instagram.com/dimsbiant_?igsh=MTdtOWs1c2JqdXFjOA=="
    },
    info: {
      usia: "22 Tahun",
      lokasi: "Sidoarjo, Indonesia",
      email: "febridimas905@gmail.com",
      telepon: "+62 81930752930",
      pendidikan: "S1 Informatika"
    },
    contact: {
      lokasi: "Porong, Sidoarjo, Jawa Timur",
      email: "febridimas905@gmail.com",
      telepon: "+62 81930752930",
      jamKerja: "Senin - Jumat: 09.00 - 17.00 WIB",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.3362440428027!2d112.6908129748289!3d-7.418822873619872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e06cf70391b3%3A0xbf156297e3556c18!2sPorong%2C%20Sidoarjo%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1740000000000!5m2!1sen!2sid"
    }
  },

  skills: [
    { id: "html", name: "HTML", icon: "fab fa-html5", percent: 90, order: 1 },
    { id: "css", name: "CSS", icon: "fab fa-css3-alt", percent: 85, order: 2 },
    { id: "javascript", name: "JavaScript", icon: "fab fa-js", percent: 75, order: 3 },
    { id: "python", name: "Python", icon: "fab fa-python", percent: 70, order: 4 }
  ],

  projects: [
    {
      id: "aiot-cat-feeder",
      title: "AIoT Cat Feeder",
      description: "Sistem pemberi makan kucing otomatis berbasis Artificial Intelligence dan Internet of Things yang memungkinkan pemantauan serta kontrol pemberian pakan secara real-time.",
      image: "assets/images/projects/iot_pakankucing.jpeg",
      tag: "AIoT",
      category: "IoT",
      tech: ["ESP32", "AI", "Firebase"],
      linkLabel: "Source Code",
      linkUrl: "#",
      featured: true,
      order: 1
    },
    {
      id: "iot-smartwatch",
      title: "IoT Smartwatch",
      description: "Smartwatch berbasis Internet of Things yang dirancang untuk memantau aktivitas pengguna seperti duduk, berjalan, dan berlari serta mengukur detak jantung (BPM) secara real-time menggunakan sensor MPU6050 dan Pulse Sensor.",
      image: "assets/images/projects/jamiot3d.png",
      tag: "IoT",
      category: "IoT",
      tech: ["ESP32", "MQTT", "MPU6050"],
      linkLabel: "Source Code",
      linkUrl: "https://github.com/Dims2004/iot_activity",
      featured: true,
      order: 2
    },
    {
      id: "sosialisasi-digital",
      title: "Sosialisasi Pembelajaran Era Digital",
      description: "Berpartisipasi dalam kegiatan sosialisasi pembelajaran era digital di SMP Widya Darma bersama Telkom University Surabaya. Kegiatan ini bertujuan meningkatkan literasi digital siswa serta memperkenalkan pemanfaatan teknologi dalam proses pembelajaran.",
      image: "assets/images/projects/sosialisasi.jpeg",
      tag: "Pengabdian Masyarakat",
      category: "organization",
      tech: ["Digital Literacy", "Public Speaking", "Teamwork"],
      linkLabel: "Lihat Dokumentasi",
      linkUrl: "https://youtu.be/lHwWk_Y4U2U",
      featured: true,
      order: 3
    }
  ],

  timeline: [
    {
      id: "t1",
      date: "2025 - Sekarang",
      title: "Fresh Graduate Informatika",
      subtitle: "Telkom University Surabaya",
      description: "Fokus mengembangkan kemampuan di bidang Web Development, Internet of Things (IoT), Artificial Intelligence (AI), dan Machine Learning melalui berbagai proyek serta portofolio.",
      order: 1
    },
    {
      id: "t2",
      date: "2025",
      title: "Mahasiswa Magang",
      subtitle: "PT Graha Sarana Gresik",
      description: "Melaksanakan kegiatan magang dengan membantu pekerjaan teknis, meningkatkan kemampuan problem solving, komunikasi, dan kerja sama dalam lingkungan profesional.",
      order: 2
    },
    {
      id: "t3",
      date: "2023 - 2024",
      title: "Anggota HIMA Informatika",
      subtitle: "Divisi Kewirausahaan",
      description: "Berpartisipasi dalam penyelenggaraan program kerja organisasi dan mengembangkan kemampuan komunikasi, kepemimpinan, serta kolaborasi tim.",
      order: 3
    },
    {
      id: "t4",
      date: "2022 - 2026",
      title: "S1 Informatika",
      subtitle: "Telkom University Surabaya",
      description: "Mempelajari pengembangan perangkat lunak, jaringan komputer, basis data, Internet of Things (IoT), Artificial Intelligence, dan Machine Learning serta mengerjakan berbagai proyek akademik.",
      order: 4
    }
  ]
};
