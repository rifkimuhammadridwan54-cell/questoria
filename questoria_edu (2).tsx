import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Gamepad2, Trophy, Map, User, Target, Calendar, Award, Clock, 
  ChevronRight, Play, CheckCircle2, Lock, Star, Zap, History, Menu, X,
  Eye, EyeOff, LogOut, Settings, Moon, Sun, Globe, Camera, ArrowRight,
  ShieldAlert, Sparkles, Compass, ArrowLeft, HelpCircle, Flag, Shield, AlertCircle, PlayCircle, Video, Send, Bot,
  Flame, Award as AwardIcon, CheckCircle, FileText, BarChart2, Check
} from 'lucide-react';

const grade10Challenges = [
  {
    id: 1,
    question: "Jika seorang sejarawan menganalisis sebuah hikayat kuno yang mencampuradukkan unsur mitologi dewa-dewi dengan fakta peperangan politik kerajaan, langkah metodologis kritis apa yang harus diambil pertama kali?",
    options: [
      "Menolak seluruh isi hikayat karena dianggap fiktif dan tidak ilmiah",
      "Melakukan heuristik dan kritik sumber untuk memilah unsur mitos dari fakta historis objektif",
      "Menerima seluruh narasi secara harfiah karena ditulis oleh pujangga istana masa lalu",
      "Mengubah alur cerita agar sesuai dengan standar logika era modern saat ini"
    ],
    correctAnswer: 1,
    reward: 50,
    explanation: "Analisis HOTS: Dalam metode sejarah, kritik sumber (intern dan ekstern) mutlak diperlukan untuk menyaring bias, mitos, dan fakta objektif dari sebuah manuskrip lama."
  },
  {
    id: 2,
    question: "Mengapa peralihan pola hidup masyarakat praaksara dari food gathering (berburu-meramu) menuju food producing (bercocok tanam) dianggap sebagai revolusi terbesar dalam peradaban awal manusia?",
    options: [
      "Karena manusia purba mulai meninggalkan wilayah hutan dan tinggal di gua-gua sempit",
      "Karena kemampuan memproduksi makanan sendiri memicu terbentuknya desa menetap (sedenter) dan stratifikasi sosial awal",
      "Karena pada masa itu manusia purba berhasil menemukan mesin uap untuk mengolah lahan pertanian",
      "Karena sistem barter perdagangan internasional mulai mendominasi kehidupan masyarakat nomaden"
    ],
    correctAnswer: 1,
    reward: 50,
    explanation: "Analisis HOTS: Revolusi Neolitik mengubah total struktur sosial, ekonomi, dan teknologi manusia purba karena surplus pangan memungkinkan spesialisasi kerja dan hunian tetap."
  },
  {
    id: 3,
    question: "Bagaimana cara menganalisis dampak akulturasi kebudayaan Hindu-Buddha dengan kebudayaan asli Nusantara (lokal) pada arsitektur candi di Indonesia?",
    options: [
      "Arsitektur candi murni meniru gaya India tanpa ada modifikasi bentuk lokal sedikit pun",
      "Candi di Indonesia adalah bangunan punden berundak megalitikum yang dipadukan dengan konsep relief dan stupa India",
      "Seluruh relief candi hanya menceritakan mitologi bangsa asing tanpa merefleksikan kehidupan lokal nusantara",
      "Bangunan candi di Indonesia seluruhnya difungsikan sebagai tempat tinggal para raja dan keluarganya"
    ],
    correctAnswer: 1,
    reward: 50,
    explanation: "Analisis HOTS: Teori akulturasi menunjukkan bahwa candi di Indonesia (seperti Borobudur) mengadopsi struktur punden berundak asli nusantara (praaksara) yang diselaraskan dengan arsitektur India."
  }
];

const defaultRakaUser = {
  name: "MAHSYA",
  username: "acantikkk",
  title: "Pemula",
  level: 1,
  xp: 150,
  nextLevelXp: 500,
  materialsCompleted: 0,
  gamesPlayed: 0,
  tokens: 3,
  lastTokenReset: new Date().toDateString(),
  aiAccessCount: 0,
  lastAiResetDate: new Date().toDateString(),
  avatar: "👧",
  adventureProgress: { 
    currentLevel: 1, 
    currentPost: 0, 
    completedLevels: []
  },
  unlockedMaterials: [1], 
  completedMaterials: [],
  badges: [],
  progress: 0,
  lastDailyChallengeDate: null,
  lastGameDate: null,
  bossExamFailedDate: null,
  dailyReportHistory: {
    [new Date().toDateString()]: { xpEarned: 0, materialsRead: 0, gamesPlayed: 0, status: "Mulai Hari Ini" }
  }
};

const defaultNewUser = (name, username) => ({
  name: name || username,
  username: username,
  title: "Pemula",
  level: 1,
  xp: 100,
  nextLevelXp: 500,
  materialsCompleted: 0,
  gamesPlayed: 0,
  tokens: 3,
  lastTokenReset: new Date().toDateString(),
  aiAccessCount: 0,
  lastAiResetDate: new Date().toDateString(),
  avatar: "👦",
  adventureProgress: { currentLevel: 1, currentPost: 0, completedLevels: [] },
  unlockedMaterials: [1], 
  completedMaterials: [],
  badges: [],
  progress: 0,
  lastDailyChallengeDate: null,
  lastGameDate: null,
  bossExamFailedDate: null,
  dailyReportHistory: {
    [new Date().toDateString()]: { xpEarned: 0, materialsRead: 0, gamesPlayed: 0, status: "Mulai Hari Ini" }
  }
});

const systemAvatars = ["👦", "👧", "🧭", "⚔️", "👑", "📜", "🏛️", "🐯", "🦅", "⚡", "🌟", "🛡️"];

const getInitialDB = () => {
  try {
    const saved = localStorage.getItem('questoria_users');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("Gagal memuat data pengguna", e);
  }
  return [
    { username: 'acantikkk', password: 'password123', data: defaultRakaUser }
  ];
};

const initialMaterialsData = [
  { 
    id: 1, 
    title: "Pengantar Ilmu Sejarah", 
    desc: "Konsep dasar, ruang lingkup, manusia, ruang, dan waktu dalam sejarah.", 
    icon: "📜",
    videoUrl: "https://www.youtube.com/embed/AQLc5tDErBg?si=GGTpcciIU8lLfJLd",
    videoTitle: "Pengantar Konsep Dasar Ilmu Sejarah dan Metodologi",
    content: "Sejarah berasal dari kata Arab 'syajaratun' yang berarti pohon. Ilmu sejarah mempelajari peristiwa masa lalu manusia yang berkesinambungan meliputi unsur ruang dan waktu. Berpikir diakronik (kronologis) melihat sejarah dalam dimensi waktu yang memanjang, sedangkan sinkronik melihat struktur peristiwa dalam ruang yang luas pada waktu tertentu.",
    questions: [
      { 
        id: 1, 
        question: "Jika seorang sejarawan menganalisis dampak revolusi industri di Eropa terhadap struktur sosial masyarakat agraris kolonial di Nusantara secara menyeluruh tanpa terikat urutan waktu yang panjang, pendekatan metodologis manakah yang paling tepat digunakan?", 
        options: ["Pendekatan diakronik murni", "Pendekatan sinkronik", "Pendekatan kronologis linier", "Pendekatan mitologis purba"], 
        correct: 1 
      },
      { 
        id: 2, 
        question: "Mengapa pemahaman terhadap unsur ruang (spasial) sangat krusial dalam merekonstruksi peristiwa sejarah agar tidak terjebak sebagai dongeng atau fiktif?", 
        options: ["Karena ruang menentukan lokasi geografis yang memvalidasi terjadinya peristiwa secara faktual", "Karena ruang hanya berfungsi sebagai hiasan peta dalam buku teks sejarah", "Karena ruang menghilangkan seluruh faktor manusia dalam narasi sejarah", "Karena ruang memastikan peristiwa terjadi di masa depan"], 
        correct: 0 
      },
      { 
        id: 3, 
        question: "Bagaimana hubungan kausalitas (sebab-akibat) membedakan antara kronologi peristiwa sejarah dengan rangkaian cerita fiksi biasa?", 
        options: ["Kronologi fiksi selalu memiliki tanggal pasti, sedangkan sejarah tidak", "Kronologi sejarah menghubungkan rangkaian peristiwa secara logis berdasarkan hukum sebab-akibat yang nyata", "Kronologi sejarah hanya mencatat nama-nama raja tanpa sebab", "Tidak ada perbedaan antara kronologi fiksi dan sejarah"], 
        correct: 1 
      }
    ]
  },
  { 
    id: 2, 
    title: "Prasejarah", 
    desc: "Masa sebelum mengenal tulisan di Nusantara.", 
    icon: "🦕",
    videoUrl: "https://www.youtube.com/embed/kZlP7sX7rNc?si=wYsTppwsnpHFAYw7",
    videoTitle: "Animasi & Penjelasan: Kehidupan Manusia Purba Nusantara",
    content: "Masa prasejarah atau Praaksara adalah zaman ketika manusia belum mengenal tulisan di Nusantara. Berdasarkan geologis, zaman ini terbagi atas Arkaekum, Palaeozoikum, Mesozoikum, dan Neozoikum. Berdasarkan arkeologis, terbagi atas Paleolitikum, Mesolitikum, Neolitikum, Megalitikum, dan Zaman Logam. Tokoh penemu fosil penting meliputi Eugene Dubois (Pithecanthropus Erectus di Trinil) dan Von Koenigswald (Sangiran). Pola hidup masyarakat awalnya berburu dan meramu hingga akhirnya mengenal bercocok tanam dan menetap (sedenter).",
    questions: [
      { 
        id: 1, 
        question: "Mengapa transisi dari masa berburu-meramu tingkat lanjut menuju masa bercocok tanam (food producing) menjadi titik balik paling revolusioner dalam evolusi kebudayaan manusia praaksara?", 
        options: ["Karena manusia purba mulai meninggalkan gua dan hidup nomaden selamanya", "Karena kemampuan memproduksi pangan sendiri memicu terbentuknya desa menetap (sedenter) dan stratifikasi sosial awal", "Karena pada masa itu ditemukan teknologi mesin uap purba", "Karena manusia purba berhenti memakan daging hewan buruan"], 
        correct: 1 
      },
      { 
        id: 2, 
        question: "Bagaimana artefak Megalitikum seperti punden berundak merefleksikan sistem kepercayaan spiritual manusia purba di Nusantara?", 
        options: ["Sebagai sarana perdagangan antarbenua", "Asal simbol hierarki kekuasaan militer modern", "Sebagai tempat pemujaan roh nenek moyang (animisme-dinamisme) yang disusun secara bertingkat", "Asal sarana hiburan kesenian rakyat"], 
        correct: 2 
      },
      { 
        id: 3, 
        question: "Analisis manakah yang paling tepat mengenai alasan penemuan fosil manusia purba di aliran sungai (seperti Sangiran dan Trinil)?", 
        options: ["Sungai merupakan sumber air dan magnet ekosistem tempat berkumpulnya hewan buruan serta vegetasi subur", "Manusia purba sengaja menguburkan fosil mereka di dalam air sungai", "Aliran sungai purba membawa fosil dari benua lain secara misterius", "Manusia purba hidup sepenuhnya di dalam air sungai"], 
        correct: 0 
      }
    ]
  },
  { 
    id: 3, 
    title: "Kerajaan Hindu-Buddha", 
    desc: "Kejayaan Majapahit, Sriwijaya, dan lainnya.", 
    icon: "🛕",
    videoUrl: "https://www.youtube.com/embed/_WsMFuKKFoE?si=5PAyVs0z5S60cvbS",
    videoTitle: "Dokumenter Singkat: Kejayaan Kerajaan Hindu-Buddha di Nusantara",
    content: "Masuknya pengaruh kebudayaan Hindu dan Buddha dari India membawa perubahan besar di Nusantara berupa lahirnya kerajaan-kerajaan besar seperti Kutai, Tarumanegara, Sriwijaya sebagai pusat maritim, hingga Majapahit yang mencapai puncak kejayaan nusantara di bawah Hayam Wuruk dan Patih Gajah Mada.",
    questions: [
      { 
        id: 1, 
        question: "Bagaimana teori masuknya kebudayaan Hindu-Buddha melalui jalur perdagangan (Teori Waisya) dianalisis dalam konteks interaksi kultural dengan masyarakat lokal Nusantara?", 
        options: ["Para pedagang India memaksa penduduk lokal mengubah agama secara militer", "Kaum pedagang berinteraksi intensif, menetap sementara, bahkan melakukan perkawinan campur dengan penduduk lokal sehingga terjadi difusi kebudayaan", "Pedagang India datang hanya untuk merusak kebudayaan asli Nusantara", "Kebudayaan Hindu-Buddha dibawa oleh pedagang tanpa meninggalkan jejak tertulis"], 
        correct: 1 
      },
      { 
        id: 2, 
        question: "Apa makna strategis geopolitik dari penguasaan Selat Malaka oleh Kerajaan Sriwijaya pada masa kejayaannya?", 
        options: ["Sebagai jalur migrasi hewan purba antar pulau", "Sebagai pusat kendali perdagangan maritim internasional yang mengontrol seluruh pungutan cukai dan lalu lintas kapal asing", "Asal lokasi pertambangan emas terbesar di dunia", "Sebagai markas pertahanan militer darat melawan kerajaan Eropa"], 
        correct: 1 
      },
      { 
        id: 3, 
        question: "Mengapa konsep 'Devaraja' (raja sebagai penjelmaan dewa di bumi) diterapkan oleh para penguasa Hindu-Buddha di Nusantara?", 
        options: ["Untuk memperkuat legitimasi kekuasaan absolut dan menciptakan kepatuhan mutlak rakyat melalui sakralisasi kepemimpinan", "Agar raja dapat terbang ke kayangan kapan saja", "Untuk menghapuskan seluruh sistem hukum adat lokal", "Sebagai syarat agar kerajaan terhindar dari bencana alam gempa bumi"], 
        correct: 0 
      }
    ]
  },
  { 
    id: 4, 
    title: "Kerajaan Islam", 
    desc: "Perkembangan kesultanan di nusantara.", 
    icon: "🕌",
    videoUrl: "https://www.youtube.com/embed/iAfEacOCYbE?si=4LseNV4v1RvEFIQt",
    videoTitle: "Video Edukasi: Penyebaran Islam dan Wali Songo di Jawa",
    content: "Masuknya Islam melalui jalur perdagangan antarbangsa membawa berdirinya kesultanan-kesultanan Islam di Nusantara seperti Samudera Pasai, Kesultanan Demak sebagai pelopor dakwah Wali Songo di Jawa, Kesultanan Mataram Islam, hingga Kesultanan Gowa-Tallo di Sulawesi.",
    questions: [
      { 
        id: 1, 
        question: "Strategi dakwah apa yang digunakan oleh para Wali Songo di tanah Jawa sehingga Islam dapat diterima secara damai oleh masyarakat yang sebelumnya telah mapan dalam tradisi Hindu-Buddha?", 
        options: ["Melakukan penaklukan militer secara besar-besaran terhadap seluruh kerajaan Hindu", "Melakukan inkulturasi dan dialog kultural dengan memasukkan nilai Islam ke dalam kesenian lokal (wayang, gamelan, tradisi)", "Melarang seluruh bentuk kebudayaan lokal tanpa terkecuali", "Memindahkan seluruh penduduk Jawa ke luar pulau"], 
        correct: 1 
      },
      { 
        id: 2, 
        question: "Bagaimana peranan Kesultanan Demak dalam konstelasi politik setelah runtuhnya kekuasaan Majapahit di Jawa?", 
        options: ["Demak menjadi pusat penyebaran agama Islam sekaligus poros kekuatan politik maritim baru di pesisir utara Jawa", "Demak memilih untuk mengisolasi diri dari perdagangan internasional", "Demak mengembalikan kekuasaan penuh kepada sisa-sisa kerajaan Majapahit", "Demak bergabung dengan bangsa Portugis untuk menyerang Malaka"], 
        correct: 0 
      },
      { 
        id: 3, 
        question: "Faktor ekonomi apa yang mendorong Kesultanan Malaka berkembang pesat sebelum akhirnya jatuh ke tangan Portugis pada tahun 1511?", 
        options: ["Monopoli produksi beras di pedalaman hutan Sumatra", "Letaknya yang sangat strategis di jalur perdagangan internasional antara India dan Cina serta sistem pelabuhan bebas yang adil", "Tambang batu bara terbesar di Selat Malaka", "Subsidi keuangan dari kerajaan-kerajaan di Eropa"], 
        correct: 1 
      }
    ]
  },
  { 
    id: 5, 
    title: "Masa Penjajahan", 
    desc: "Era kolonialisme dan perlawanan rakyat.", 
    icon: "⛵",
    videoUrl: "https://www.youtube.com/embed/i-NnvRMTmR4?si=3HCTKL60p6ikb0vU",
    videoTitle: "Sejarah Kolonial: Monopoli VOC dan Perlawanan Pahlawan Nasional",
    content: "Kedatangan bangsa Eropa (Portugis, Spanyol, Inggris, dan Belanda melalui VOC) memicu kolonialisme di Nusantara. Kebijakan monopoli rempah-rempah, kerja paksa, dan Cultuurstelsel (Tanam Paksa) memicu perlawanan hebat dari para pahlawan nasional di berbagai daerah.",
    questions: [
      { 
        id: 1, 
        question: "Bagaimana mekanisme eksploitasi ekonomi melalui sistem monopoli VOC (Verenigde Oostindische Compagnie) menghancurkan sistem perdagangan tradisional di Nusantara?", 
        options: ["VOC memberikan subsidi besar-besaran kepada pedagang lokal", "VOC menerapkan kebijakan ekstirpasi (pemusnahan tanaman) dan memaksa penguasa lokal menjual hasil bumi hanya kepada VOC dengan harga sangat rendah", "VOC menghapuskan seluruh pajak pelabuhan di seluruh wilayah", "VOC membebaskan bea cukai bagi seluruh pedagang asing non-Belanda"], 
        correct: 1 
      },
      { 
        id: 2, 
        question: "Mengapa bentuk perlawanan fisik bersenjata yang dilakukan kerajaan-kerajaan lokal pada abad ke-19 (seperti Perang Diponegoro) umumnya mengalami kegagalan strategis?", 
        options: ["Karena pasukan pahlawan nasional kurang berani di medan perang", "Karena kurangnya modernisasi persenjataan militer dan masih kuatnya politik adu domba (devide et impera) yang diterapkan kolonial", "Karena seluruh rakyat Nusantara mendukung penuh penjajahan Belanda", "Karena tidak ada satupun pemimpin perang yang cerdas secara taktik"], 
        correct: 1 
      },
      { 
        id: 3, 
        question: "Apa dampak sosial-ekonomi paling merusak bagi petani desa di Jawa akibat penerapan kebijakan Tanam Paksa (Cultuurstelsel) oleh Johannes van den Bosch?", 
        options: ["Petani menjadi kaya raya dan menguasai pasar ekspor Eropa", "Terjadinya kelaparan massal, wabah penyakit, dan penurunan drastis produksi pangan lokal karena tanah dipaksa ditanami komoditas ekspor", "Petani dibebaskan dari segala bentuk kerja rodi", "Sektor pendidikan desa meningkat pesat"], 
        correct: 1 
      }
    ]
  },
  { 
    id: 6, 
    title: "Pergerakan Nasional", 
    desc: "Kebangkitan kesadaran nasional bangsa.", 
    icon: "📜",
    videoUrl: "https://www.youtube.com/embed/G-rWqpjX5EY?si=9yFoXaA7ehpqQAlk",
    videoTitle: "Kebangkitan Nasional: Dari Boedi Oetomo hingga Sumpah Pemuda",
    content: "Masa pergerakan nasional ditandai dengan berdirinya Boedi Oetomo pada 20 Mei 1908. Organisasi pergerakan bermunculan seperti Sarekat Islam, Indische Partij, hingga Sumpah Pemuda 1928 yang menyatukan tekad pemuda Indonesia.",
    questions: [
      { 
        id: 1, 
        question: "Mengapa pembentukan Boedi Oetomo pada tahun 1908 dianggap sebagai tonggak awal kebangkitan nasional meskipun pada awal pendiriannya cakupan keanggotaannya masih terbatas pada priyayi Jawa?", 
        options: ["Karena Boedi Oetomo langsung mendeklarasikan kemerdekaan Indonesia secara militer", "Karena menggunakan bentuk organisasi modern (anggaran dasar, pengurus tetap, program terstruktur) untuk mencapai kesadaran kolektif melalui pendidikan", "Karena didirikan langsung oleh pemerintah kolonial Belanda", "Karena berhasil menyatukan seluruh partai politik di Asia"], 
        correct: 1 
      },
      { 
        id: 2, 
        question: "Bagaimana peristiwa Sumpah Pemuda 1928 merekonstruksi identitas perjuangan bangsa dari yang sebelumnya bersifat kedaerahan menjadi nasional?", 
        options: ["Dengan melarang penggunaan bahasa daerah di seluruh wilayah nusantara", "Dengan mengikat seluruh elemen pemuda lintas suku dan agama melalui satu tanah air, satu bangsa, dan satu bahasa persatuan", "Dengan membentuk pasukan militer rahasia gabungan pemuda", "Dengan menyerahkan kepemimpinan pemuda kepada pemerintah kolonial"], 
        correct: 1 
      },
      { 
        id: 3, 
        question: "Apa esensi perbedaan mendasar antara strategi perjuangan organisasi masa pergerakan nasional (seperti PNI dan Sarekat Islam) dibanding perlawanan fisik abad ke-19?", 
        options: ["Organisasi pergerakan menggunakan diplomasi modern, pers, pendidikan, dan kesadaran politik massa terorganisir", "Organisasi pergerakan menolak segala bentuk pendidikan modern", "Perlawanan fisik abad ke-19 menggunakan parlemen kolonial", "Tidak ada perbedaan strategi sama sekali"], 
        correct: 0 
      }
    ]
  },
  { 
    id: 7, 
    title: "Proklamasi Kemerdekaan", 
    desc: "Detik-detik kemerdekaan Republik Indonesia.", 
    icon: "🇮🇩",
    videoUrl: "https://www.youtube.com/embed/OVL5ruoBXRo?si=uwSrDB-D2ByaMdLg",
    videoTitle: "Detik-Detik Proklamasi 17 Agustus 1945",
    content: "Proklamasi Kemerdekaan Republik Indonesia dibacakan oleh Ir. Soekarno didampingi Drs. Mohammad Hatta pada tanggal 17 Agustus 1945 di Jalan Pegangsaan Timur No. 56, Jakarta, setelah sebelumnya terjadi peristiwa Rengasdengklok.",
    questions: [
      { 
        id: 1, 
        question: "Mengapa para pemuda mendesak Ir. Soekarno dan Drs. Mohammad Hatta untuk segera memproklamasikan kemerdekaan pasca kekalahan Jepang, tanpa harus menunggu izin dari PPKI buatan Jepang?", 
        options: ["Karena para pemuda ingin menjadi penguasa tunggal pemerintahan", "Untuk menghindari kekosongan kekuasaan (vacuum of power) dan mencegah kembalinya kekuasaan Sekutu/Belanda yang diboncengi NICA", "Karena Jepang menjanjikan hadiah uang tunai jika proklamasi dipercepat", "Karena gedung proklamasi akan segera dibongkar oleh tentara Sekutu"], 
        correct: 1 
      },
      { 
        id: 2, 
        question: "Bagaimana nilai penting dari Peristiwa Rengasdengklok dalam dinamika proses tercapainya naskah Proklamasi Kemerdekaan Indonesia?", 
        options: ["Asal bukti pertikaian militer antara golongan tua dan golongan muda yang berujung perang saudara", "Sebagai bentuk tekanan taktis golongan muda agar kepemimpinan bangsa bertindak mandiri terbebas dari bayang-bayang janji kemerdekaan Jepang", "Asal perundingan damai resmi antara Indonesia dengan pemerintah militer Jepang", "Sebagai tempat pengasingan sementara bagi penjajah Belanda"], 
        correct: 1 
      },
      { 
        id: 3, 
        question: "Apa makna yuridis dan politis utama dari naskah Proklamasi 17 Agustus 1945 bagi eksistensi bangsa Indonesia di kancah internasional?", 
        options: ["Pernyataan bubarnya seluruh rakyat Indonesia", "Titik akhir penjajahan sekaligus deklarasi lahirnya sebuah negara merdeka yang berdaulat penuh atas hukum dan wilayahnya sendiri", "Permohonan resmi kepada PBB untuk dijajah kembali secara damai", "Kontrak dagang jangka panjang dengan negara-negara Eropa"], 
        correct: 1 
      }
    ]
  }
];

const adventureLevelsData = [
  { level: 1, theme: "Pengantar Ilmu Sejarah", location: "Konsep Dasar & Metodologi", icon: "📜", materialId: 1 },
  { level: 2, theme: "Prasejarah", location: "Kehidupan Manusia Purba & Megalitikum", icon: "🦕", materialId: 2 },
  { level: 3, theme: "Kerajaan Hindu-Buddha", location: "Kutai, Sriwijaya, & Majapahit", icon: "🛕", materialId: 3 },
  { level: 4, theme: "Kerajaan Islam", location: "Wali Songo & Kesultanan Nusantara", icon: "🕌", materialId: 4 },
  { level: 5, theme: "Masa Penjajahan", location: "Monopoli VOC & Perlawanan Rakyat", icon: "⛵", materialId: 5 },
  { level: 6, theme: "Pergerakan Nasional", location: "Boedi Oetomo & Sumpah Pemuda", icon: "📜", materialId: 6 },
  { level: 7, theme: "Proklamasi Kemerdekaan", location: "Rengasdengklok & Detik-Detik Kemerdekaan", icon: "🇮🇩", materialId: 7 }
];

const generateBossExamQuestions = () => {
  const pool = [];
  const baseQuestions = [
    { q: "Apa arti harfiah dari kata 'sejarah' yang berasal dari bahasa Arab 'syajaratun'?", options: ["Pohon atau silsilah", "Waktu yang berjalan", "Perang masa lalu", "Tulisan kuno"], correct: 0, type: "Dasar" },
    { q: "Pendekatan sejarah yang memanjang dalam dimensi waktu disebut...", options: ["Sinkronik", "Diakronik", "Spasial", "Kronologis"], correct: 1, type: "Dasar" },
    { q: "Fosil Pithecanthropus Erectus ditemukan oleh Eugene Dubois di daerah...", options: ["Sangiran", "Trinil, Ngawi", "Wajak", "Flores"], correct: 1, type: "Dasar" },
    { q: "Prasasti Yupa dari Kerajaan Kutai ditulis menggunakan huruf...", options: ["Pallawa", "Devanagari", "Jawa Kuno", "Arab"], correct: 0, type: "Dasar" },
    { q: "Mahapatih Majapahit yang terkenal dengan Sumpah Palapa adalah...", options: ["Gajah Mada", "Hayam Wuruk", "Ken Arok", "Raden Wijaya"], correct: 0, type: "Dasar" },
    { q: "Siapakah pelopor dakwah Islam di tanah Jawa yang tergabung dalam Wali Songo?", options: ["Sunan Kalijaga", "Sultan Iskandar Muda", "Raden Patah", "Sultan Hasanuddin"], correct: 0, type: "Dasar" },
    { q: "Organisasi pergerakan nasional pertama di Indonesia adalah...", options: ["Sarekat Islam", "Boedi Oetomo", "Indische Partij", "Budi Pekerti"], correct: 1, type: "Dasar" },
    { q: "Kapan Sumpah Pemuda dideklarasikan?", options: ["28 Oktober 1928", "20 Mei 1908", "17 Agustus 1945", "1 Juni 1945"], correct: 0, type: "Dasar" },
    { q: "Di mana teks Proklamasi Kemerdekaan Indonesia dibacakan?", options: ["Jl. Pegangsaan Timur No. 56", "Gedung Juang", "Rengasdengklok", "Hotel Des Indes"], correct: 0, type: "Dasar" },
    { q: "Tokoh yang mengetik teks naskah proklamasi adalah...", options: ["Sayuti Melik", "Sukarni", "Ahmad Subardjo", "Fatmawati"], correct: 0, type: "Dasar" }
  ];

  for (let i = 1; i <= 50; i++) {
    const base = baseQuestions[(i - 1) % baseQuestions.length];
    pool.push({
      id: i,
      question: `[Soal Ujian No. ${i}] ${base.q} (Analisis Komprehensif Sejarah Nusantara)`,
      options: base.options,
      correct: base.correct,
      type: i % 2 === 0 ? "HOTS (Analitis)" : "Dasar (Faktual)"
    });
  }
  return pool;
};

const LandingPage = ({ onNavigateToAuth, onEnterGuestMode }) => (
  <div className="min-h-screen bg-slate-50 flex flex-col font-sans overflow-x-hidden">
    <nav className="bg-white/85 backdrop-blur-md sticky top-0 z-50 border-b border-sky-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center shadow-inner animate-pulse">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-2xl text-sky-800 tracking-tight">Questoria<span className="text-sky-500">.edu</span></span>
        </div>
        <div className="flex gap-3">
          <button onClick={() => onNavigateToAuth('login')} className="px-5 py-2 text-sky-600 font-bold hover:bg-sky-50 rounded-xl transition-colors">
            Masuk
          </button>
          <button onClick={() => onNavigateToAuth('register')} className="px-5 py-2 bg-sky-500 text-white font-bold rounded-xl shadow-md hover:bg-sky-600 transition-colors shadow-sky-200 animate-bounce">
            Daftar Gratis
          </button>
        </div>
      </div>
    </nav>

    <div className="flex-grow flex items-center justify-center relative overflow-hidden px-4 py-16">
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDuration: '6s'}}></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="text-center lg:text-left space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-700 font-semibold text-sm shadow-sm animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin" /> Belajar Sejarah Jadi Menyenangkan
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Jelajahi Waktu, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 animate-gradient">
              Kumpulkan Pengetahuan.
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
            Questoria.edu mengubah cara belajarmu menjadi sebuah petualangan seru. Baca materi, tonton video edukasi, kumpulkan XP, dan hadapi Boss Exam 50 soal!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <button onClick={() => onNavigateToAuth('register')} className="px-8 py-4 bg-sky-500 text-white text-lg font-bold rounded-2xl shadow-xl hover:bg-sky-600 transition-all shadow-sky-200 flex items-center justify-center gap-2 hover:scale-105 transform duration-300">
              Mulai Petualangan <ArrowRight className="w-5 h-5 animate-pulse" />
            </button>
            <button onClick={onEnterGuestMode} className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-200 text-lg font-bold rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2 hover:scale-105 transform duration-300 shadow-sm">
              <Compass className="w-5 h-5 text-sky-500 animate-spin" style={{animationDuration: '10s'}} /> Mode Tamu (Lihat Fitur)
            </button>
          </div>
        </div>

        <div className="relative lg:h-[500px] flex items-center justify-center animate-in fade-in slide-in-from-right-8 duration-700">
           <div className="absolute z-20 p-4 bg-white/95 backdrop-blur rounded-2xl shadow-2xl border border-sky-100 transform -rotate-3 left-4 top-8 max-w-xs flex items-center gap-3 animate-bounce" style={{animationDuration: '4s'}}>
              <div className="bg-amber-100 p-3 rounded-xl shadow-inner"><Trophy className="w-6 h-6 text-amber-600" /></div>
              <div>
                 <div className="flex items-center gap-1.5 text-xs text-gray-400 font-bold"><Clock className="w-3.5 h-3.5 text-sky-500"/> Sesi Aktif 24/7</div>
                 <h3 className="font-bold text-gray-800 text-sm">Sistem Petualangan</h3>
                 <p className="text-xs text-gray-500">1 Materi = 1 Level + Boss Exam (75%)</p>
              </div>
           </div>

           <div className="absolute inset-0 bg-gradient-to-tr from-sky-400 to-indigo-500 rounded-3xl filter blur-xl opacity-30 transform scale-95 animate-pulse"></div>

           <div className="relative w-full max-w-md h-[400px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white group hover:scale-[1.02] transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1599814503378-0e74f88647e3?auto=format&fit=crop&w=800&q=80" 
                alt="Candi Borobudur Sejarah" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                 <div className="flex items-center gap-2 mb-2 animate-pulse">
                   <span className="text-xs font-bold bg-sky-500 px-3 py-1 rounded-full shadow">Pendidikan Sejarah Interaktif</span>
                   <span className="text-xs font-bold bg-amber-500 px-2.5 py-1 rounded-full flex items-center gap-1 shadow"><Clock className="w-3 h-3"/> 60 Menit Exam</span>
                 </div>
                 <h4 className="text-xl font-bold">Jelajahi Candi, Fosil, dan Prasasti Nusantara</h4>
              </div>
           </div>
        </div>
      </div>
    </div>
  </div>
);

const AuthScreen = ({
  authMode, setAuthMode,
  loginForm, setLoginForm,
  showPassword, setShowPassword,
  authMsg, setAuthMsg,
  setIsLoggedIn,
  isDarkMode,
  setCurrentUser,
  usersDB, setUsersDB,
  onCancel,
  onSuccessfulAuth
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthMsg({ type: '', text: '' });
    
    if (authMode === 'login') {
      const foundUser = usersDB.find(
        u => u.username.toLowerCase() === loginForm.username.toLowerCase() && u.password === loginForm.password
      );

      if (foundUser) {
         setAuthMsg({ type: 'success', text: `🎉 Selamat datang kembali, ${foundUser.data.name}!` });
         setCurrentUser(foundUser.data); 
         setTimeout(() => {
           setIsLoggedIn(true);
           onSuccessfulAuth();
         }, 1200);
      } else {
         setAuthMsg({ type: 'error', text: '⚠️ username atau password yang dimasukkan tidak sesuai.' });
      }
    } else {
      if (loginForm.username.trim().length < 5) {
        setAuthMsg({ type: 'error', text: '⚠ Username minimal harus 5 karakter.' });
        return;
      }
      
      if (loginForm.password.length < 8) {
        setAuthMsg({ type: 'error', text: '⚠ Password harus terdiri dari minimal 8 karakter.' });
        return;
      }

      const hasLetter = /[a-zA-Z]/.test(loginForm.password);
      const hasNumber = /[0-9]/.test(loginForm.password);
      if (!hasLetter || !hasNumber) {
        setAuthMsg({ type: 'error', text: '⚠ Password harus mengandung kombinasi huruf dan angka (alfanumerik).' });
        return;
      }

      if (usersDB.some(u => u.username.toLowerCase() === loginForm.username.toLowerCase())) {
         setAuthMsg({ type: 'error', text: '⚠ Username sudah digunakan. Silakan pilih yang lain.' });
         return;
      }

      const newUserData = defaultNewUser(loginForm.name, loginForm.username);
      const newUserRecord = {
         username: loginForm.username,
         password: loginForm.password,
         data: newUserData
      };

      setUsersDB(prev => [...prev, newUserRecord]);
      setAuthMsg({ type: 'success', text: `🎉 Pendaftaran berhasil! Selamat datang, ${newUserData.name}.` });
      setCurrentUser(newUserData); 
      
      setTimeout(() => {
        setIsLoggedIn(true);
        onSuccessfulAuth();
      }, 1000);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center p-4 relative overflow-hidden ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-sky-50 text-slate-900'}`}>
      <button 
        onClick={onCancel}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium transition-colors z-20"
      >
        <ArrowRight className="w-5 h-5 rotate-180" /> Kembali
      </button>

      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" style={{animationDuration: '5s'}}></div>

      <div className={`w-full max-w-md rounded-3xl shadow-xl overflow-hidden z-10 border transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
        <div className="p-8">
          <div className="flex justify-center items-center gap-2 mb-8">
            <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center shadow-inner animate-pulse">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <span className="font-bold text-3xl text-sky-800 tracking-tight">Questoria<span className="text-sky-500">.edu</span></span>
          </div>

          <h2 className={`text-2xl font-bold text-center mb-6 ${isDarkMode ? 'text-slate-100' : 'text-gray-800'}`}>
            {authMode === 'login' ? 'Masuk ke Akunmu' : 'Buat Akun Baru'}
          </h2>

          {authMsg.text && (
            <div className={`p-4 rounded-xl mb-6 text-sm font-bold flex items-start gap-2 animate-in fade-in duration-300 ${authMsg.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
              {authMsg.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === 'register' && (
              <div>
                <label className={`block text-sm font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Nama Lengkap</label>
                <input type="text" required value={loginForm.name} onChange={e => setLoginForm({...loginForm, name: e.target.value})} className={`w-full px-4 py-3 rounded-xl border outline-none transition ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100 focus:ring-2 focus:ring-sky-500' : 'bg-white border-gray-200 text-gray-800 focus:ring-2 focus:ring-sky-500'}`} placeholder="Misal: Mahsya" />
              </div>
            )}

            <div>
              <label className={`block text-sm font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Username (Min. 5 Karakter)</label>
              <input type="text" required value={loginForm.username} onChange={e => setLoginForm({...loginForm, username: e.target.value})} className={`w-full px-4 py-3 rounded-xl border outline-none transition ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100 focus:ring-2 focus:ring-sky-500' : 'bg-white border-gray-200 text-gray-800 focus:ring-2 focus:ring-sky-500'}`} placeholder="Misal: acantikkk" />
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-1 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Password (Min. 8 Karakter, Huruf & Angka)</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} required value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} className={`w-full px-4 py-3 rounded-xl border outline-none transition ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100 focus:ring-2 focus:ring-sky-500' : 'bg-white border-gray-200 text-gray-800 focus:ring-2 focus:ring-sky-500'}`} placeholder="Min. 8 karakter & kombinasi alfanumerik" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full bg-sky-500 text-white font-bold py-3.5 rounded-xl hover:bg-sky-600 transition-all shadow-lg shadow-sky-200 mt-4 hover:scale-[1.01]">
              {authMode === 'login' ? 'Masuk' : 'Daftar Gratis & Masuk'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              {authMode === 'login' ? 'Belum punya akun? ' : 'Sudah punya akun? '}
              <button type="button" onClick={() => { setAuthMode(authMode === 'login' ? 'register' : 'login'); setAuthMsg({type:'', text:''}); }} className="text-sky-500 font-bold hover:underline">
                {authMode === 'login' ? 'Daftar Gratis' : 'Masuk di sini'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function QuestoriaApp() {
  const [appState, setAppState] = useState('landing');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  
  const [usersDB, setUsersDB] = useState(getInitialDB());

  useEffect(() => {
    localStorage.setItem('questoria_users', JSON.stringify(usersDB));
  }, [usersDB]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [authMsg, setAuthMsg] = useState({ type: '', text: '' });
  const [loginForm, setLoginForm] = useState({ name: '', username: '', password: '' });
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const [activeMaterialId, setActiveMaterialId] = useState(null);
  const [showGuestWarning, setShowGuestWarning] = useState(false);
  const [currentUser, setCurrentUser] = useState(defaultRakaUser);

  const [quizStarted, setQuizStarted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [isVideoWatched, setIsVideoWatched] = useState(false);

  const [adventureActiveLevel, setAdventureActiveLevel] = useState(null);
  const [adventureViewMode, setAdventureViewMode] = useState('map'); 

  // Boss Exam States (50 Questions, 60 Minutes)
  const [isBossExamActive, setIsBossExamActive] = useState(false);
  const [bossQuestions, setBossQuestions] = useState([]);
  const [bossCurrentQIdx, setBossCurrentQIdx] = useState(0);
  const [bossAnswers, setBossAnswers] = useState({});
  const [bossSubmitted, setBossSubmitted] = useState(false);
  const [bossTimerSeconds, setBossTimerSeconds] = useState(3600);

  useEffect(() => {
    let timer = null;
    if (isBossExamActive && !bossSubmitted && bossTimerSeconds > 0) {
      timer = setInterval(() => {
        setBossTimerSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setBossSubmitted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isBossExamActive, bossSubmitted, bossTimerSeconds]);

  // Mini Soal States
  const [arcadeCurrentQIdx, setArcadeCurrentQIdx] = useState(0);
  const [arcadeScore, setArcadeScore] = useState(0);
  const [arcadeSelectedOption, setArcadeSelectedOption] = useState(null);
  const [arcadeIsAnswerChecked, setArcadeIsAnswerChecked] = useState(false);
  const [arcadeQuizFinished, setArcadeQuizFinished] = useState(false);

  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiChatHistory, setAiChatHistory] = useState([
    { role: 'model', text: 'Halo! Saya Asisten AI Sejarah Questoria. Ada hal atau peristiwa sejarah yang ingin kamu tanyakan?' }
  ]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn && currentUser) {
      const todayStr = new Date().toDateString();
      let updatedUser = { ...currentUser };
      if (updatedUser.lastTokenReset !== todayStr) {
        updatedUser.tokens = 3;
        updatedUser.lastTokenReset = todayStr;
      }
      if (updatedUser.lastAiResetDate !== todayStr) {
        updatedUser.aiAccessCount = 0;
        updatedUser.lastAiResetDate = todayStr;
      }
      if (!updatedUser.dailyReportHistory) {
        updatedUser.dailyReportHistory = {};
      }
      if (!updatedUser.dailyReportHistory[todayStr]) {
        updatedUser.dailyReportHistory[todayStr] = { xpEarned: 0, materialsRead: 0, gamesPlayed: 0, status: "Aktif" };
      }
      setCurrentUser(updatedUser);
      setUsersDB(prevDB => prevDB.map(u => 
        u.username.toLowerCase() === updatedUser.username.toLowerCase() ? { ...u, data: updatedUser } : u
      ));
    }
  }, [isLoggedIn]);

  const [dailyChallengeStatus, setDailyChallengeStatus] = useState('pending');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const checkAndUpdateBadges = (userState, completedMatCount, gamesCount, userLevel) => {
    let badges = [...(userState.badges || [])];
    
    const addBadgeIfNotExists = (id, name, icon, desc) => {
      if (!badges.some(b => b.id === id)) {
        badges.push({ id, name, icon, desc });
      }
    };

    if (completedMatCount >= 1) addBadgeIfNotExists(1, "Sejarawan Pemula", "🏅", "Menyelesaikan materi pertama");
    if (completedMatCount >= 3) addBadgeIfNotExists(4, "Pembaca Setia", "📚", "Menyelesaikan 3 materi pembelajaran");
    if (gamesCount >= 1) addBadgeIfNotExists(2, "Pemburu Sejarah", "⚔", "Menyelesaikan tantangan game");
    if (userLevel >= 5) addBadgeIfNotExists(3, "Penjelajah Waktu", "⏳", "Mencapai Level 5");
    if (userLevel >= 10) addBadgeIfNotExists(5, "Ahli Sejarah", "👑", "Mencapai Level 10");

    return badges;
  };

  const updateUserStats = (addedXp, additionalData = {}, activityType = 'xp', count = 1) => {
    setCurrentUser(prev => {
      let newXp = prev.xp + addedXp;
      let newLevel = prev.level;
      let newNextLevelXp = prev.nextLevelXp;
      let newTitle = prev.title;

      while (newXp >= newNextLevelXp) {
        newLevel += 1;
        newNextLevelXp += 500;
      }

      if (newLevel >= 15) newTitle = "Maha Guru Sejarah";
      else if (newLevel >= 10) newTitle = "Ahli Sejarah";
      else if (newLevel >= 5) newTitle = "Sejarawan Muda";
      else newTitle = "Pemula";

      const mergedTemp = { ...prev, ...additionalData, xp: newXp, level: newLevel, nextLevelXp: newNextLevelXp, title: newTitle };
      const updatedBadges = checkAndUpdateBadges(mergedTemp, mergedTemp.completedMaterials.length, mergedTemp.gamesPlayed, newLevel);

      const todayStr = new Date().toDateString();
      const history = { ...(mergedTemp.dailyReportHistory || {}) };
      const todayRec = history[todayStr] || { xpEarned: 0, materialsRead: 0, gamesPlayed: 0, status: "Aktif" };

      const matDelta = activityType === 'material' ? count : 0;
      const gameDelta = activityType === 'game' ? count : 0;
      const newXpEarned = todayRec.xpEarned + addedXp;
      const newMaterialsRead = todayRec.materialsRead + matDelta;
      const newGamesPlayed = todayRec.gamesPlayed + gameDelta;

      let statusStr = "Mulai Produktif";
      if (newXpEarned >= 150 || newMaterialsRead >= 1) statusStr = "Produktif 👍";
      if (newXpEarned >= 300 || newGamesPlayed >= 2) statusStr = "Sangat Produktif 🔥";

      history[todayStr] = {
        xpEarned: newXpEarned,
        materialsRead: newMaterialsRead,
        gamesPlayed: newGamesPlayed,
        status: statusStr
      };

      const updatedUser = {
        ...mergedTemp,
        badges: updatedBadges,
        dailyReportHistory: history
      };

      setUsersDB(prevDB => prevDB.map(u => 
        u.username.toLowerCase() === updatedUser.username.toLowerCase() ? { ...u, data: updatedUser } : u
      ));

      return updatedUser;
    });
  };

  useEffect(() => {
    if (currentUser) {
      const todayStr = new Date().toDateString();
      if (currentUser.lastDailyChallengeDate === todayStr) {
        setDailyChallengeStatus('completed');
      } else {
        setDailyChallengeStatus('pending');
        setCurrentQuestionIndex(Math.floor(Math.random() * grade10Challenges.length));
      }
    }
  }, [currentUser?.username]);

  const handleNavigateToAuth = (mode) => {
    setAuthMode(mode);
    setAppState('auth');
    setAuthMsg({ type: '', text: '' });
    if (mode === 'register') {
      setLoginForm({ name: '', username: '', password: '' });
    }
  };

  const handleTabChange = (tab) => {
    if (!isLoggedIn && tab !== 'dashboard') {
       setShowGuestWarning(true);
       setTimeout(() => setShowGuestWarning(false), 3000);
       return;
    }

    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    setActiveMaterialId(null);
    setQuizStarted(false);
    setQuizSubmitted(false);
    setIsVideoWatched(false);
    setAdventureActiveLevel(null);
    setIsBossExamActive(false);
  };

  const handleOpenAiModal = () => {
    if (!isLoggedIn) {
      setShowGuestWarning(true);
      setTimeout(() => setShowGuestWarning(false), 3000);
      return;
    }

    const todayStr = new Date().toDateString();
    let currentCount = currentUser.aiAccessCount || 0;
    if (currentUser.lastAiResetDate !== todayStr) {
      currentCount = 0;
    }

    if (currentCount < 3) {
      const newCount = currentCount + 1;
      setCurrentUser(prev => {
        const updated = { ...prev, aiAccessCount: newCount, lastAiResetDate: todayStr };
        setUsersDB(prevDB => prevDB.map(u => u.username.toLowerCase() === updated.username.toLowerCase() ? { ...u, data: updated } : u));
        return updated;
      });
      setIsAiModalOpen(true);
    } else {
      if (currentUser.xp >= 50) {
        const confirmUse = window.confirm("Jatah gratis 3 kali Tanya AI hari ini sudah habis! Ingin menggunakan 50 XP untuk membuka sesi Tanya AI tambahan?");
        if (confirmUse) {
          setCurrentUser(prev => {
            const updated = { ...prev, xp: prev.xp - 50 };
            setUsersDB(prevDB => prevDB.map(u => u.username.toLowerCase() === updated.username.toLowerCase() ? { ...u, data: updated } : u));
            return updated;
          });
          setIsAiModalOpen(true);
        }
      } else {
        alert("Jatah gratis 3 kali Tanya AI hari ini telah habis, dan XP kamu tidak cukup (minimal 50 XP) untuk membuka akses ekstra.");
      }
    }
  };

  const handleDailyChallengeAnswer = (selectedIndex) => {
    if (dailyChallengeStatus !== 'pending') return;
    const currentChallenge = grade10Challenges[currentQuestionIndex];

    if (selectedIndex === currentChallenge.correctAnswer) {
      setDailyChallengeStatus('completed');
      const todayStr = new Date().toDateString();
      updateUserStats(currentChallenge.reward, { lastDailyChallengeDate: todayStr }, 'xp', 0);
    } else {
      setDailyChallengeStatus('wrong');
    }
  };

  const handleRetryChallenge = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * grade10Challenges.length);
    } while (newIndex === currentQuestionIndex && grade10Challenges.length > 1);
    
    setCurrentQuestionIndex(newIndex);
    setDailyChallengeStatus('pending');
  };

  const handleAskGeminiAI = async (e) => {
    e.preventDefault();
    if (!aiPrompt.trim() || isAiLoading) return;

    const userMsg = aiPrompt.trim();
    setAiPrompt('');
    setAiChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsAiLoading(true);

    try {
      const systemPrompt = "Act as a brilliant and encouraging high school history tutor named Questoria AI. Answer questions about Indonesian and world history concisely, accurately, and engagingly in Indonesian.";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=`;
      
      const payload = {
        contents: [{ parts: [{ text: userMsg }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] }
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      const candidate = result.candidates?.[0];
      const replyText = candidate?.content?.parts?.[0]?.text || "Maaf, Asisten AI sedang mengalami kendala. Silakan coba beberapa saat lagi.";

      setAiChatHistory(prev => [...prev, { role: 'model', text: replyText }]);
    } catch (err) {
      console.error(err);
      setAiChatHistory(prev => [...prev, { role: 'model', text: 'Terjadi kesalahan koneksi dengan server AI.' }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const GuestWarningModal = () => (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ${showGuestWarning ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      <div className={`px-6 py-4 rounded-2xl shadow-2xl border-2 flex items-center gap-4 max-w-md animate-bounce ${isDarkMode ? 'bg-slate-800 border-amber-500 text-slate-100' : 'bg-white border-amber-200 text-gray-800'}`}>
        <div className="bg-amber-100 p-2 rounded-full"><ShieldAlert className="w-6 h-6 text-amber-600"/></div>
        <div>
           <h4 className="font-bold text-sm">Akses Terbatas!</h4>
           <p className="text-xs opacity-80">Kamu harus <button onClick={() => handleNavigateToAuth('login')} className="font-bold text-sky-500 hover:underline">Masuk</button> atau <button onClick={() => handleNavigateToAuth('register')} className="font-bold text-sky-500 hover:underline">Daftar</button> untuk membuka fitur ini.</p>
        </div>
      </div>
    </div>
  );

  const ProfileSettingsTab = () => {
    const todayStr = new Date().toDateString();
    const dailyReport = currentUser.dailyReportHistory?.[todayStr] || { xpEarned: 0, materialsRead: 0, gamesPlayed: 0, status: "Aktif" };

    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto py-4">
        {/* Header Title */}
        <div className={`flex items-center justify-between border-b pb-5 ${isDarkMode ? 'border-slate-800' : 'border-gray-200'}`}>
          <div>
            <h2 className={`text-3xl font-extrabold flex items-center gap-3 ${isDarkMode ? 'text-slate-100' : 'text-gray-900'}`}>
              Profil & Raport Harian <span className="text-2xl">📊</span>
            </h2>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Kelola informasi akun pribadi dan pantau rekam jejak produktivitas harianmu.</p>
          </div>
          <div className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl border font-semibold text-sm shadow-sm ${isDarkMode ? 'bg-slate-800 text-sky-400 border-slate-700' : 'bg-sky-50 text-sky-700 border-sky-200'}`}>
            <Calendar className="w-4 h-4 text-sky-500" /> {todayStr}
          </div>
        </div>
        
        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: User Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className={`rounded-3xl border shadow-xl overflow-hidden text-center relative transition hover:shadow-2xl ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-sky-100'}`}>
              <div className="h-28 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 relative"></div>
              
              <div className="relative -mt-14 inline-block mb-3">
                <div className={`w-28 h-28 rounded-full flex items-center justify-center text-5xl mx-auto border-4 shadow-xl relative z-10 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-white'}`}>
                  {currentUser.avatar || "👦"}
                </div>
                <button 
                  onClick={() => setIsAvatarModalOpen(true)}
                  className="absolute bottom-0 right-0 bg-sky-500 hover:bg-sky-600 text-white p-2.5 rounded-full shadow-lg z-20 hover:scale-110 transition cursor-pointer"
                  title="Ganti Avatar Sistem"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <div className="px-6 pb-8 space-y-3">
                <div>
                  <h3 className={`text-2xl font-black tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-gray-900'}`}>{currentUser.name}</h3>
                  <p className={`text-xs font-mono mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`}>@{currentUser.username}</p>
                </div>

                <div className={`inline-block font-bold text-xs px-3.5 py-1.5 rounded-full border shadow-inner ${isDarkMode ? 'bg-slate-900 text-sky-400 border-slate-700' : 'bg-sky-50 text-sky-700 border-sky-200'}`}>
                  {currentUser.title}
                </div>

                <div className={`grid grid-cols-2 gap-3 pt-6 mt-6 border-t ${isDarkMode ? 'border-slate-700' : 'border-gray-100'}`}>
                   <div className={`p-3.5 rounded-2xl border ${isDarkMode ? 'bg-slate-900/50 border-slate-700 text-slate-100' : 'bg-gray-50 border-gray-100 text-gray-800'}`}>
                     <div className="text-2xl font-black">{currentUser.level}</div>
                     <div className={`text-xs font-semibold mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Level Saat Ini</div>
                   </div>
                   <div className={`p-3.5 rounded-2xl border ${isDarkMode ? 'bg-amber-950/20 border-amber-900/40 text-amber-400' : 'bg-amber-50 border-amber-100 text-amber-700'}`}>
                     <div className="text-2xl font-black">{currentUser.xp}</div>
                     <div className="text-xs font-semibold mt-0.5">Total XP</div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Raport Harian & Settings */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Daily Report Card */}
            <div className={`rounded-3xl p-8 border shadow-xl space-y-6 relative overflow-hidden ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-sky-100'}`}>
              <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-5 gap-4 ${isDarkMode ? 'border-slate-700' : 'border-gray-100'}`}>
                <div className="flex items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${isDarkMode ? 'bg-sky-950/50 text-sky-400' : 'bg-sky-100 text-sky-600'}`}>
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`font-extrabold text-xl ${isDarkMode ? 'text-slate-100' : 'text-gray-900'}`}>Raport Pencapaian Harian</h3>
                    <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Rekapitulasi progres aktivitas edukasi Anda hari ini.</p>
                  </div>
                </div>
                <span className="bg-emerald-500 text-white font-extrabold text-xs px-4 py-2 rounded-xl shadow-md uppercase tracking-wider">
                  {dailyReport.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className={`p-5 rounded-2xl border text-center shadow-sm ${isDarkMode ? 'bg-sky-950/20 border-sky-900/40 text-sky-300' : 'bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200 text-sky-700'}`}>
                  <div className="text-3xl font-black mb-1">+{dailyReport.xpEarned}</div>
                  <div className={`text-xs font-bold uppercase tracking-wide ${isDarkMode ? 'text-sky-400' : 'text-gray-600'}`}>XP Hari Ini</div>
                </div>
                <div className={`p-5 rounded-2xl border text-center shadow-sm ${isDarkMode ? 'bg-indigo-950/20 border-indigo-900/40 text-indigo-300' : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 text-indigo-700'}`}>
                  <div className="text-3xl font-black mb-1">{dailyReport.materialsRead}</div>
                  <div className={`text-xs font-bold uppercase tracking-wide ${isDarkMode ? 'text-indigo-400' : 'text-gray-600'}`}>Materi Selesai</div>
                </div>
                <div className={`p-5 rounded-2xl border text-center shadow-sm ${isDarkMode ? 'bg-amber-950/20 border-amber-900/40 text-amber-300' : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 text-amber-700'}`}>
                  <div className="text-3xl font-black mb-1">{dailyReport.gamesPlayed}</div>
                  <div className={`text-xs font-bold uppercase tracking-wide ${isDarkMode ? 'text-amber-400' : 'text-gray-600'}`}>Mini Soal / Game</div>
                </div>
              </div>

              <div className={`p-5 rounded-2xl border space-y-1.5 shadow-inner ${isDarkMode ? 'bg-slate-900/80 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                <h4 className="font-bold text-sm flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-sky-500" /> Analisis Evaluasi Harian Sistem
                </h4>
                <p className="text-xs leading-relaxed font-medium">
                  {dailyReport.xpEarned > 0 ? "Bagus sekali! Aktivitas belajarmu hari ini menunjukkan progres yang sangat positif. Pertahankan semangat literasi sejarahmu!" : "Belum ada aktivitas signifikan yang tercatat hari ini. Yuk mulai jelajahi materi atau kerjakan tantangan harian!"}
                </p>
              </div>
            </div>

            {/* Account Settings & Preferences */}
            <div className={`rounded-3xl p-8 border shadow-xl space-y-6 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-sky-100'}`}>
              <h4 className={`text-xl font-extrabold border-b pb-5 flex items-center gap-3 ${isDarkMode ? 'text-slate-100 border-slate-700' : 'text-gray-900 border-gray-100'}`}>
                <Settings className="w-6 h-6 text-sky-500"/> Pengaturan Akun
              </h4>
              
              <div className="space-y-4">
                <div className={`flex items-center justify-between p-5 rounded-2xl border transition ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-gray-50 border-gray-200 text-gray-900 hover:bg-gray-100/70'}`}>
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-100 p-3 rounded-2xl text-purple-600 shadow-sm">
                      {isDarkMode ? <Moon className="w-6 h-6"/> : <Sun className="w-6 h-6"/>}
                    </div>
                    <div>
                      <p className="font-extrabold">Mode Tampilan Gelap/Terang</p>
                      <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>{isDarkMode ? 'Mode Gelap Aktif' : 'Mode Terang Aktif'}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} />
                    <div className="w-14 h-7 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-sky-500 shadow-inner"></div>
                  </label>
                </div>
              </div>

              <div className="pt-4">
                 <button onClick={() => { 
                   setIsLoggedIn(false); 
                   setCurrentUser(defaultRakaUser);
                   setAppState('landing'); 
                   setActiveTab('dashboard'); 
                 }} className="w-full flex items-center justify-center gap-2 py-4 bg-red-50 hover:bg-red-100 text-red-600 font-extrabold rounded-2xl border border-red-200 shadow-sm transition">
                    <LogOut className="w-5 h-5" /> Keluar dari Akun (Logout)
                 </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  };

  const Navigation = () => (
    <nav className={`shadow-sm border-b sticky top-0 z-50 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-sky-100 text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => handleTabChange('dashboard')}>
              <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center shadow-inner animate-pulse">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className={`font-bold text-2xl tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-sky-800'}`}>Questoria<span className="text-sky-500">.edu</span></span>
            </div>
            
            <div className="hidden lg:flex items-center space-x-1">
              {[
                { id: 'dashboard', name: 'Dashboard', icon: User },
                { id: 'materials', name: 'Materi', icon: BookOpen },
                { id: 'games', name: 'Games', icon: Gamepad2 },
                { id: 'map', name: 'Peta', icon: Map },
                { id: 'leaderboard', name: 'Peringkat', icon: Trophy },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`inline-flex items-center px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    activeTab === item.id 
                      ? (isDarkMode ? 'bg-slate-700 text-sky-400 shadow-sm' : 'bg-sky-100 text-sky-700 shadow-sm')
                      : (isDarkMode ? 'text-slate-300 hover:bg-slate-700 hover:text-sky-400' : 'text-gray-600 hover:bg-sky-50 hover:text-sky-600')
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-1.5" />
                  {item.name}
                  {!isLoggedIn && item.id !== 'dashboard' && <Lock className="w-3 h-3 ml-1 text-gray-400" />}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {isLoggedIn && (
              <button 
                onClick={handleOpenAiModal}
                className="hidden md:flex items-center gap-1.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-xl shadow-md hover:opacity-95 transition text-sm font-bold animate-pulse"
              >
                <Bot className="w-4 h-4 animate-bounce" /> Tanya AI ({3 - (currentUser.aiAccessCount || 0)}/3)
              </button>
            )}

            {isLoggedIn ? (
              <div className="flex items-center gap-2.5">
                <div className={`hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl border shadow-sm ${isDarkMode ? 'bg-amber-950/30 border-amber-900/50 text-amber-400' : 'bg-amber-50 border-amber-200 text-amber-700'}`}>
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500 animate-pulse" />
                  <span className="font-extrabold text-sm">{currentUser.xp} XP</span>
                </div>

                <div className={`hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl border shadow-sm ${isDarkMode ? 'bg-indigo-950/30 border-indigo-900/50 text-indigo-400' : 'bg-indigo-50 border-indigo-200 text-indigo-700'}`}>
                  <span className="text-sm">🪙</span>
                  <span className="font-extrabold text-sm">{currentUser.tokens} Token</span>
                </div>
                
                <div>
                  <button onClick={() => handleTabChange('profile')} className={`flex items-center gap-2 p-1.5 pr-4 rounded-xl transition border ${
                    activeTab === 'profile' 
                      ? (isDarkMode ? 'bg-slate-700 border-sky-500 text-sky-400' : 'bg-sky-100 border-sky-300 text-sky-800')
                      : (isDarkMode ? 'bg-slate-900 hover:bg-slate-700 border-slate-700 text-slate-100' : 'bg-sky-50 hover:bg-sky-100 border-sky-100 text-sky-800')
                  }`}>
                     <div className="w-8 h-8 bg-sky-500 text-white rounded-lg flex items-center justify-center font-bold shadow-sm">
                        {currentUser.name.charAt(0).toUpperCase()}
                     </div>
                     <span className="text-sm font-bold hidden sm:inline">Profil</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                 <button onClick={() => handleNavigateToAuth('login')} className={`px-4 py-2 text-sm font-bold rounded-xl ${isDarkMode ? 'text-sky-400 hover:bg-slate-700' : 'text-sky-600 hover:bg-sky-50'}`}>Masuk</button>
                 <button onClick={() => handleNavigateToAuth('register')} className="px-4 py-2 text-sm font-bold bg-sky-500 text-white hover:bg-sky-600 rounded-xl shadow-sm animate-bounce">Daftar</button>
              </div>
            )}

            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-xl ${isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                {isMobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className={`lg:hidden py-4 border-t space-y-2 animate-in slide-in-from-top-2 duration-300 ${isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-gray-100 bg-white'}`}>
            {[
              { id: 'dashboard', name: 'Dashboard', icon: User },
              { id: 'materials', name: 'Materi', icon: BookOpen },
              { id: 'games', name: 'Games', icon: Gamepad2 },
              { id: 'map', name: 'Peta', icon: Map },
              { id: 'leaderboard', name: 'Peringkat', icon: Trophy },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  activeTab === item.id 
                    ? (isDarkMode ? 'bg-slate-700 text-sky-400' : 'bg-sky-100 text-sky-700') 
                    : (isDarkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-gray-600 hover:bg-sky-50')
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </button>
            ))}
            {isLoggedIn && (
              <button
                onClick={() => { handleOpenAiModal(); setIsMobileMenuOpen(false); }}
                className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold bg-purple-50 text-purple-700 hover:bg-purple-100"
              >
                <Bot className="h-5 w-5 mr-3" /> Tanya AI ({3 - (currentUser.aiAccessCount || 0)}/3)
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );

  const DashboardTab = () => {
    const todayStr = new Date().toDateString();
    const dailyReport = currentUser.dailyReportHistory?.[todayStr] || { xpEarned: 0, materialsRead: 0, gamesPlayed: 0, status: "Aktif" };

    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-gradient-to-r from-sky-400 to-blue-500 rounded-3xl p-6 md:p-8 text-white shadow-lg overflow-hidden relative">
          <div className="absolute -right-10 -top-10 opacity-20"><History className="w-64 h-64 animate-spin" style={{animationDuration: '30s'}} /></div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Halo, {currentUser.name}! 👋</h1>
            <p className="text-sky-100 text-lg mb-6">Siap untuk petualangan sejarah hari ini?</p>
            
            <div className="bg-white/25 backdrop-blur-md rounded-2xl p-4 md:w-2/3 border border-white/40 shadow-inner">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <div className="text-sm text-sky-100 font-medium">Level {currentUser.level}</div>
                  <div className="font-bold text-xl">{currentUser.title}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold flex items-center gap-1"><Star className="w-4 h-4 fill-white animate-spin" style={{animationDuration: '6s'}} /> {currentUser.xp} / {currentUser.nextLevelXp} XP</div>
                </div>
              </div>
              <div className="w-full bg-black/20 rounded-full h-3">
                <div 
                  className="bg-amber-400 h-3 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.8)] transition-all duration-1000" 
                  style={{ width: `${Math.min(100, (currentUser.xp / currentUser.nextLevelXp) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className={`rounded-3xl p-6 border-2 shadow-sm space-y-4 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-sky-100'}`}>
          <div className={`flex justify-between items-center border-b pb-3 ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-sky-950 text-sky-400' : 'bg-sky-100 text-sky-600'}`}>
                <FileText className="w-5 h-5" />
              </div>
              <h2 className={`text-lg font-bold ${isDarkMode ? 'text-slate-100' : 'text-gray-800'}`}>Raport Pencapaian Harian Anda</h2>
            </div>
            <span className="bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
              {dailyReport.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className={`p-4 rounded-2xl border text-center ${isDarkMode ? 'bg-sky-950/30 border-sky-900/50 text-sky-300' : 'bg-sky-50/70 border-sky-100 text-sky-700'}`}>
              <div className="text-xl font-black mb-1">+{dailyReport.xpEarned}</div>
              <div className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>XP Hari Ini</div>
            </div>
            <div className={`p-4 rounded-2xl border text-center ${isDarkMode ? 'bg-indigo-950/30 border-indigo-900/50 text-indigo-300' : 'bg-indigo-50/70 border-indigo-100 text-indigo-700'}`}>
              <div className="text-xl font-black mb-1">{dailyReport.materialsRead}</div>
              <div className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Materi Selesai</div>
            </div>
            <div className={`p-4 rounded-2xl border text-center ${isDarkMode ? 'bg-amber-950/30 border-amber-900/50 text-amber-300' : 'bg-amber-50/70 border-amber-100 text-amber-700'}`}>
              <div className="text-xl font-black mb-1">{dailyReport.gamesPlayed}</div>
              <div className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Mini Soal Dimainkan</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className={`rounded-3xl p-6 border shadow-sm relative overflow-hidden ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-sky-100'}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-amber-100 p-2 rounded-xl text-amber-600">
                  <Zap className="w-6 h-6 fill-amber-600 animate-bounce" />
                </div>
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-gray-800'}`}>Tantangan Harian HOTS 🔥</h2>
                <span className="ml-auto text-xs font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded-md">Analitis Kelas 10</span>
              </div>
              
              {dailyChallengeStatus === 'pending' ? (
                <div className="space-y-4">
                  <p className={`font-medium text-base leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>{grade10Challenges[currentQuestionIndex].question}</p>
                  <div className="grid grid-cols-1 gap-3">
                    {grade10Challenges[currentQuestionIndex].options.map((opt, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleDailyChallengeAnswer(idx)}
                        className={`text-left px-4 py-3.5 rounded-xl border-2 transition-all font-medium text-sm leading-snug hover:scale-[1.01] ${
                          isDarkMode 
                            ? 'bg-slate-900 border-slate-700 text-slate-200 hover:border-sky-500 hover:bg-slate-800' 
                            : 'bg-white border-gray-100 text-gray-700 hover:border-sky-300 hover:bg-sky-50'
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}. {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : dailyChallengeStatus === 'completed' ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 text-center animate-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 animate-bounce">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-green-700 mb-1">Analisis Tepat! Tantangan HOTS Selesai.</h3>
                  <p className="text-green-600 mb-4 font-bold">Kamu mendapatkan +{grade10Challenges[currentQuestionIndex].reward} XP</p>
                  <div className={`text-sm p-4 rounded-xl border text-left shadow-sm ${isDarkMode ? 'bg-slate-900 border-green-900 text-slate-200' : 'bg-white border-green-100 text-gray-700'}`}>
                    <span className="font-bold block mb-1 text-green-800">Pembahasan Analitis:</span>
                    {grade10Challenges[currentQuestionIndex].explanation}
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center animate-in shake duration-300">
                  <h3 className="text-xl font-bold text-red-700 mb-2">Analisis Belum Tepat!</h3>
                  <p className="text-red-500 font-medium text-sm mb-4">Mari asah kemampuan berpikir kritis dengan soal HOTS lainnya.</p>
                  <button 
                    onClick={handleRetryChallenge} 
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 px-6 rounded-xl transition-colors shadow-md hover:scale-105"
                  >
                    Coba Soal HOTS Lain
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className={`rounded-3xl p-6 border shadow-sm ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-sky-100'}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-slate-100' : 'text-gray-800'}`}>
                  <Award className="w-5 h-5 text-sky-500 animate-pulse" /> Badge Koleksimu
                </h2>
                <span className="text-sm font-bold text-sky-500 bg-sky-500/10 px-2 py-1 rounded-lg">{currentUser.badges.length}</span>
              </div>
              
              <div className="space-y-4">
                {currentUser.badges.length > 0 ? (
                  currentUser.badges.map(badge => (
                    <div key={badge.id} className={`flex items-center gap-4 p-3 rounded-2xl border transition-transform hover:scale-[1.02] ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-gray-50 border-gray-100 text-gray-800'}`}>
                      <div className="text-4xl animate-bounce" style={{animationDuration: '3s'}}>{badge.icon}</div>
                      <div>
                        <div className="font-bold">{badge.name}</div>
                        <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>{badge.desc}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={`text-center p-4 text-sm italic ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Belum ada badge yang diperoleh.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const MaterialsTab = () => {
    if (activeMaterialId !== null) {
      const material = initialMaterialsData.find(m => m.id === activeMaterialId);
      const nextMaterial = initialMaterialsData.find(m => m.id === activeMaterialId + 1);
      
      return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
          <button 
            onClick={() => { setActiveMaterialId(null); setQuizStarted(false); setQuizSubmitted(false); setQuizAnswers({}); setIsVideoWatched(false); }}
            className={`flex items-center gap-2 font-bold transition-colors px-4 py-2 rounded-xl border shadow-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-sky-400' : 'bg-white border-gray-200 text-gray-500 hover:text-sky-600'}`}
          >
            <ArrowLeft className="w-5 h-5" /> Kembali ke Daftar Materi
          </button>

          <div className={`rounded-3xl p-8 md:p-10 border shadow-sm relative overflow-hidden ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-sky-100 text-gray-900'}`}>
            <div className={`flex items-center gap-4 mb-8 border-b pb-6 ${isDarkMode ? 'border-slate-700' : 'border-gray-100'}`}>
              <div className="text-6xl animate-pulse">{material.icon}</div>
              <div>
                <div className="text-sky-500 font-bold text-sm uppercase tracking-wider mb-1">Materi Kurikulum Kelas 10 (HOTS)</div>
                <h2 className="text-3xl md:text-4xl font-extrabold">{material.title}</h2>
              </div>
            </div>

            {!quizStarted && (
              <div className="space-y-8">
                <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center animate-pulse">
                        <Video className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-lg">Video Edukasi Sistem</h3>
                    </div>
                    {isVideoWatched ? (
                      <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4"/> Selesai Ditonton (+20 XP)
                      </span>
                    ) : (
                      <span className="bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full">Wajib Ditonton</span>
                    )}
                  </div>

                  <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden border border-slate-700 flex items-center justify-center">
                    <iframe 
                      src="https://www.youtube.com/embed/AQLc5tDErBg?si=seZA--Yytg2fONbC" 
                      title={material.videoTitle} 
                      className="w-full h-full border-0 absolute inset-0 z-10"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </div>

                  {!isVideoWatched && (
                    <button 
                      onClick={() => {
                        setIsVideoWatched(true);
                        updateUserStats(20, {}, 'xp', 0);
                      }}
                      className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.01]"
                    >
                      <PlayCircle className="w-5 h-5" /> Tandai Video Telah Selesai Ditonton (+20 XP)
                    </button>
                  )}
                </div>

                <div className={`prose prose-lg max-w-none space-y-6 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                  <h4 className={`font-bold text-xl ${isDarkMode ? 'text-slate-100' : 'text-gray-800'}`}>Ringkasan Materi Teks</h4>
                  <p className="lead text-lg font-medium">
                    {material.content}
                  </p>
                </div>

                <div className={`mt-12 pt-6 border-t flex flex-col sm:flex-row justify-between items-center p-6 rounded-2xl gap-4 ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-sky-50 border-sky-100 text-sky-900'}`}>
                  <div>
                    <h4 className="font-bold text-lg">Siap menguji pemahaman dengan soal HOTS?</h4>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-sky-700'}`}>Kerjakan kuis evaluasi analitis. Syarat kelulusan: minimal benar 2 dari 3 soal.</p>
                  </div>
                  <button 
                    onClick={() => { setQuizStarted(true); setQuizAnswers({}); setQuizSubmitted(false); }}
                    className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 shadow-lg shadow-sky-200 transition-transform hover:scale-105 whitespace-nowrap"
                  >
                    Mulai Kuis HOTS <HelpCircle className="w-5 h-5 animate-pulse" />
                  </button>
                </div>
              </div>
            )}

            {quizStarted && (
              <div className="space-y-6">
                <div className={`p-4 rounded-2xl mb-6 flex justify-between items-center border ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-sky-50 border-sky-200 text-sky-900'}`}>
                  <div>
                    <h3 className="font-bold text-lg">Kuis Evaluasi HOTS: {material.title}</h3>
                    <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-sky-700'}`}>Min. Benar 2 untuk lulus</p>
                  </div>
                  <span className="bg-amber-500 text-white font-bold text-xs px-3 py-1 rounded-full">Analitis Kelas 10</span>
                </div>

                <div className="space-y-8">
                  {material.questions.map((q, idx) => (
                    <div key={q.id} className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-gray-50 border-gray-200 text-gray-800'}`}>
                      <p className="font-bold mb-4 text-base">{idx + 1}. {q.question}</p>
                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => (
                          <label key={optIdx} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                            quizAnswers[q.id] === optIdx 
                              ? (isDarkMode ? 'bg-slate-800 border-sky-500 font-bold text-sky-400 scale-[1.01]' : 'bg-sky-100 border-sky-500 font-bold text-sky-900 scale-[1.01]') 
                              : (isDarkMode ? 'bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-300' : 'bg-white border-gray-200 hover:bg-gray-100 text-gray-700')
                          }`}>
                            <input 
                              type="radio" 
                              name={`question-${q.id}`} 
                              checked={quizAnswers[q.id] === optIdx}
                              onChange={() => setQuizAnswers({...quizAnswers, [q.id]: optIdx})}
                              className="w-4 h-4 text-sky-500"
                            />
                            {opt}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {!quizSubmitted ? (
                  <button 
                    onClick={() => {
                      let correctCount = 0;
                      material.questions.forEach(q => {
                        if (quizAnswers[q.id] === q.correct) correctCount++;
                      });
                      const isPassed = correctCount >= 2;

                      if (isPassed) {
                        const nextId = material.id + 1;
                        const currentUnlocked = currentUser.unlockedMaterials || [1];
                        const newUnlocked = currentUnlocked.includes(nextId) 
                          ? currentUnlocked 
                          : [...currentUnlocked, nextId];
                        
                        const currentCompleted = currentUser.completedMaterials || [];
                        const isNewCompletion = !currentCompleted.includes(material.id);
                        const newCompleted = isNewCompletion ? [...currentCompleted, material.id] : currentCompleted;
                        const newMaterialsCompletedCount = isNewCompletion ? currentUser.materialsCompleted + 1 : currentUser.materialsCompleted;
                        
                        const calculatedProgress = Math.round((newCompleted.length / initialMaterialsData.length) * 100);

                        if (isNewCompletion) {
                          updateUserStats(150, {
                            unlockedMaterials: newUnlocked,
                            completedMaterials: newCompleted,
                            materialsCompleted: newMaterialsCompletedCount,
                            progress: calculatedProgress
                          }, 'material', 1);
                        }
                      }
                      setQuizSubmitted(true);
                    }}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.01]"
                  >
                    Kirim Jawaban Kuis HOTS
                  </button>
                ) : (
                  (() => {
                    let correctCount = 0;
                    let wrongCount = 0;
                    material.questions.forEach(q => {
                      if (quizAnswers[q.id] === q.correct) correctCount++;
                      else wrongCount++;
                    });

                    const isPassed = correctCount >= 2; 

                    if (isPassed) {
                      return (
                        <div className={`text-center p-6 border-2 rounded-2xl space-y-4 animate-in zoom-in duration-300 ${isDarkMode ? 'bg-slate-900 border-green-800 text-slate-100' : 'bg-white border-green-200 text-gray-800'}`}>
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-3xl animate-bounce">🎉</div>
                          <h3 className="text-2xl font-bold">Analisis Kritis Tepat! Kamu Lulus Kuis HOTS!</h3>
                          <p className={isDarkMode ? 'text-slate-300' : 'text-gray-600'}>
                            Jawaban Benar: <strong className="text-green-500">{correctCount}</strong> | Jawaban Salah: <strong className="text-red-500">{wrongCount}</strong>
                          </p>
                          <p className="text-amber-500 font-bold">+150 XP Otomatis Ditambahkan & Terhitung di Raport Harian!</p>
                          
                          {nextMaterial ? (
                            <div className="space-y-4">
                              <div className={`border p-4 rounded-xl font-bold text-sm animate-pulse ${isDarkMode ? 'bg-slate-800 border-slate-700 text-sky-400' : 'bg-sky-50 border-sky-200 text-sky-800'}`}>
                                🔓 Materi selanjutnya (<span className="underline">{nextMaterial.title}</span>) kini telah terbuka secara otomatis!
                              </div>
                              <div className="flex gap-4 justify-center">
                                <button 
                                  onClick={() => { setActiveMaterialId(null); setQuizStarted(false); setQuizSubmitted(false); setIsVideoWatched(false); }}
                                  className={`font-bold py-3 px-6 rounded-xl transition ${isDarkMode ? 'bg-slate-700 text-slate-200 hover:bg-slate-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                >
                                  Daftar Materi
                                </button>
                                <button 
                                  onClick={() => {
                                    setActiveMaterialId(nextMaterial.id);
                                    setQuizStarted(false);
                                    setQuizSubmitted(false);
                                    setQuizAnswers({});
                                    setIsVideoWatched(false);
                                  }}
                                  className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-xl shadow-md flex items-center gap-2 hover:scale-105 transition"
                                >
                                  Lanjut ke Materi Berikutnya <ArrowRight className="w-5 h-5"/>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <button 
                                onClick={() => { setActiveMaterialId(null); setQuizStarted(false); setQuizSubmitted(false); setIsVideoWatched(false); }}
                                className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-xl shadow-md hover:scale-105 transition"
                              >
                                Kembali ke Daftar Materi
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    } else {
                      return (
                        <div className="text-center p-6 bg-red-950/40 border-2 border-red-800 rounded-2xl space-y-4 animate-in shake duration-300 text-slate-100">
                          <div className="w-16 h-16 bg-red-900/50 rounded-full flex items-center justify-center mx-auto text-3xl animate-bounce">⚠</div>
                          <h3 className="text-2xl font-bold text-red-400">Analisis Belum Lulus!</h3>
                          <button 
                            onClick={() => {
                              setQuizSubmitted(false);
                              setQuizAnswers({});
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-transform hover:scale-105"
                          >
                            Coba Ulang Kuis HOTS Sekarang
                          </button>
                        </div>
                      );
                    }
                  })()
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="flex justify-between items-end">
          <div>
            <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-slate-100' : 'text-gray-800'}`}>Materi Pembelajaran 📚</h2>
            <p className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>Pilih topik sejarah yang ingin kamu pelajari hari ini secara berurutan.</p>
          </div>
          <div className={`hidden sm:flex px-4 py-2 rounded-xl shadow-sm border text-sm font-medium ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-gray-100 text-gray-700'}`}>
            Progress Selesai: <span className="text-sky-500 ml-2 font-bold">{Math.round((currentUser.completedMaterials.length / initialMaterialsData.length) * 100)}%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {initialMaterialsData.map((material) => {
            const isUnlocked = currentUser.unlockedMaterials.includes(material.id);
            const isCompleted = currentUser.completedMaterials.includes(material.id);

            return (
              <div key={material.id} className={`rounded-3xl p-6 border-2 transition-all duration-300 relative group overflow-hidden hover:scale-[1.02] ${
                isUnlocked 
                  ? (isDarkMode ? 'bg-slate-800 border-slate-700 hover:border-sky-500 hover:shadow-xl cursor-pointer text-slate-100' : 'bg-white border-sky-100 hover:border-sky-400 hover:shadow-xl cursor-pointer text-gray-900') 
                  : (isDarkMode ? 'bg-slate-900/50 border-slate-800 opacity-60 grayscale text-slate-500' : 'bg-gray-50 border-gray-100 opacity-75 grayscale text-gray-800')
              }`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="text-5xl group-hover:scale-110 transition-transform">{material.icon}</div>
                  {isCompleted && (
                    <div className="bg-green-100 p-1.5 rounded-full animate-pulse">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                  )}
                  {!isUnlocked && (
                    <div className="bg-gray-100 p-1.5 rounded-full">
                      <Lock className="w-5 h-5 text-gray-500" />
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-bold mb-2 leading-tight">{material.title}</h3>
                <p className={`text-sm mb-6 line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>{material.desc}</p>
                
                {isUnlocked ? (
                  <button 
                    onClick={() => { setActiveMaterialId(material.id); setQuizStarted(false); setQuizSubmitted(false); setQuizAnswers({}); setIsVideoWatched(false); }}
                    className={`w-full font-bold py-2.5 rounded-xl group-hover:bg-sky-500 group-hover:text-white transition-colors flex items-center justify-center gap-2 ${isDarkMode ? 'bg-slate-900 text-sky-400 border border-slate-700' : 'bg-sky-50 text-sky-600'}`}
                  >
                    {isCompleted ? 'Pelajari Lagi' : 'Mulai Belajar'}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button disabled className={`w-full font-bold py-2.5 rounded-xl cursor-not-allowed ${isDarkMode ? 'bg-slate-900 text-slate-600' : 'bg-gray-100 text-gray-400'}`}>
                    Terkunci
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const GamesTab = () => {
    if (isBossExamActive) {
      if (bossSubmitted) {
        let correctCount = 0;
        bossQuestions.forEach(q => {
          if (bossAnswers[q.id] === q.correct) correctCount++;
        });
        const isPassed = correctCount >= 38;

        return (
          <div className={`space-y-6 animate-in zoom-in duration-300 max-w-2xl mx-auto text-center py-12 rounded-3xl p-8 border-2 shadow-2xl ${isDarkMode ? 'bg-slate-800 border-amber-600 text-slate-100' : 'bg-white border-amber-300 text-gray-900'}`}>
            <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-5xl shadow-lg shadow-amber-200 animate-bounce">
              {isPassed ? '🏆' : '⚠️'}
            </div>
            <h2 className="text-3xl font-extrabold">
              {isPassed ? 'SELAMAT! BOSS EXAM LULUS!' : 'UJIAN BOSS GAGAL (DI BAWAH 75%)'}
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
              Skor Kamu: <strong className="text-amber-500">{correctCount}</strong> / 50 Benar ({Math.round((correctCount/50)*100)}%) — Standar Kelulusan: 75% (38 Soal)
            </p>

            {isPassed ? (
              <div className="space-y-4">
                <div className={`p-4 rounded-2xl font-bold border ${isDarkMode ? 'bg-amber-950/40 border-amber-800 text-amber-400' : 'bg-amber-50 border-amber-200 text-amber-900'}`}>
                  🎖️ ACHIEVEMENT UNLOCKED: "Penjaga Sejarah Nusantara" (+500 XP)
                </div>
                <button 
                  onClick={() => {
                    updateUserStats(500, { gamesPlayed: currentUser.gamesPlayed + 1 }, 'game', 1);
                    setIsBossExamActive(false);
                  }}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-4 rounded-2xl shadow-lg transition-transform hover:scale-105 text-lg"
                >
                  Klaim Hadiah & Kembali ke Peta 🚀
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-red-400 font-bold">Kamu belum mencapai batas kelulusan 75%. Untuk mengulang ujian ini, dibutuhkan 500 XP di hari berikutnya.</p>
                <button 
                  onClick={() => {
                    if (currentUser.xp >= 500) {
                      setCurrentUser(prev => ({ ...prev, xp: prev.xp - 500 }));
                      setBossSubmitted(false);
                      setBossAnswers({});
                      setBossCurrentQIdx(0);
                      setBossTimerSeconds(3600);
                    } else {
                      alert("XP kamu tidak cukup (minimal 500 XP untuk mengulang Boss Exam).");
                    }
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-transform hover:scale-105 text-lg"
                >
                  Bayar 500 XP & Ulangi Ujian Boss Sekarang 🔄
                </button>
                <button 
                  onClick={() => setIsBossExamActive(false)}
                  className={`w-full font-bold py-3 rounded-xl ${isDarkMode ? 'bg-slate-700 text-slate-200 hover:bg-slate-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  Kembali ke Menu Game
                </button>
              </div>
            )}
          </div>
        );
      }

      const currentQ = bossQuestions[bossCurrentQIdx];
      const formatTime = (secs) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
      };

      return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
          <div className="bg-slate-900 text-white rounded-3xl p-8 border-2 border-amber-500 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="flex justify-between items-center border-b border-slate-700 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center font-black text-slate-900 animate-pulse">⚔️</div>
                <div>
                  <h3 className="font-extrabold text-xl">BOSS EXAM: PENJAGA SEJARAH</h3>
                  <p className="text-xs text-amber-400">Passing Grade: 75% (Min. 38 Benar) • Timer: 60 Menit</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-red-500/20 border border-red-500 text-red-300 font-bold px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <Clock className="w-4 h-4 animate-spin"/> {formatTime(bossTimerSeconds)}
                </span>
                <span className="bg-amber-500/20 border border-amber-500 text-amber-300 font-bold px-3 py-1 rounded-full text-sm">
                  {bossCurrentQIdx + 1} / 50
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <span className="bg-sky-500 text-white text-xs font-bold px-2.5 py-1 rounded-md">{currentQ.type}</span>
              </div>
              <p className="text-lg font-bold text-slate-100 leading-relaxed">{currentQ.question}</p>
            </div>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = bossAnswers[currentQ.id] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => setBossAnswers({...bossAnswers, [currentQ.id]: optIdx})}
                    className={`w-full text-left p-4 rounded-xl font-medium transition-all flex items-center justify-between border ${
                      isSelected 
                        ? 'bg-amber-500 text-slate-900 border-amber-400 font-bold shadow-lg scale-[1.01]' 
                        : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                    {isSelected && <CheckCircle className="w-5 h-5 text-slate-900" />}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-slate-700">
              <button
                disabled={bossCurrentQIdx === 0}
                onClick={() => setBossCurrentQIdx(prev => prev - 1)}
                className="bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white font-bold py-3 px-6 rounded-xl"
              >
                Sebelumnya
              </button>

              {bossCurrentQIdx + 1 < bossQuestions.length ? (
                <button
                  onClick={() => setBossCurrentQIdx(prev => prev + 1)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 px-8 rounded-xl shadow-lg"
                >
                  Selanjutnya ➔
                </button>
              ) : (
                <button
                  onClick={() => setBossSubmitted(true)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg animate-bounce"
                >
                  Kirim Ujian Boss (50 Soal) ✨
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (adventureActiveLevel !== null) {
      const lvlData = adventureLevelsData.find(l => l.level === adventureActiveLevel);

      if (adventureViewMode === 'levelCompleted') {
        return (
          <div className="space-y-6 animate-in zoom-in duration-300 max-w-xl mx-auto text-center py-12">
            <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-5xl shadow-lg shadow-amber-200 animate-bounce">🏆</div>
            <h2 className={`text-3xl font-extrabold ${isDarkMode ? 'text-slate-100' : 'text-gray-800'}`}>LEVEL COMPLETED!</h2>
            <p className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>Kamu berhasil menyelesaikan perjalanan penjelajahan waktu:</p>
            <div className={`p-6 rounded-3xl border shadow-sm space-y-2 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-sky-100 text-gray-900'}`}>
              <h3 className="text-xl font-bold text-sky-500">Level {lvlData.level} — {lvlData.theme}</h3>
              <p className="text-sm font-bold text-amber-500">+250 XP & Tercatat di Raport Harian!</p>
            </div>
            <button 
              onClick={() => {
                setAdventureActiveLevel(null);
                setAdventureViewMode('map');
              }}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              Kembali ke Peta Petualangan 🗺️
            </button>
          </div>
        );
      }

      if (adventureViewMode === 'crossword') {
        const currentMat = initialMaterialsData.find(m => m.id === lvlData.materialId);
        const currentPool = currentMat ? currentMat.questions : [];
        const currentQ = currentPool[arcadeCurrentQIdx] || currentPool[0];

        if (arcadeQuizFinished) {
          const isPassed = arcadeScore >= 2;
          return (
            <div className={`space-y-6 animate-in zoom-in duration-300 max-w-xl mx-auto text-center py-10 rounded-3xl p-8 border-2 shadow-2xl ${isDarkMode ? 'bg-slate-800 border-indigo-700 text-slate-100' : 'bg-white border-indigo-200 text-gray-900'}`}>
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto text-4xl animate-bounce">
                {isPassed ? '🎉' : '💡'}
              </div>
              <h2 className="text-3xl font-extrabold">
                {isPassed ? 'Rintangan Mini Soal Terlewati!' : 'Belum Berhasil Melewati Rintangan'}
              </h2>
              <p className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                Skor Mini Soal Kamu: <span className="font-bold text-indigo-400 text-xl">{arcadeScore} / {currentPool.length}</span> benar.
              </p>

              {isPassed ? (
                <div className="space-y-4">
                  <p className="text-green-500 font-bold bg-green-950/40 p-3 rounded-xl border border-green-800">+100 XP & Tercatat di Raport Harian!</p>
                  <button 
                    onClick={() => {
                      updateUserStats(100, { gamesPlayed: currentUser.gamesPlayed + 1 }, 'game', 1);
                      const completedArr = currentUser.adventureProgress.completedLevels.includes(lvlData.level) 
                        ? currentUser.adventureProgress.completedLevels 
                        : [...currentUser.adventureProgress.completedLevels, lvlData.level];
                      
                      updateUserStats(250, {
                        adventureProgress: {
                          currentLevel: Math.max(currentUser.adventureProgress.currentLevel, lvlData.level + 1),
                          currentPost: 0,
                          completedLevels: completedArr
                        }
                      }, 'xp', 0);
                      setAdventureViewMode('levelCompleted');
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-transform hover:scale-105 text-lg"
                  >
                    Selesaikan Level Ini & Lanjut 🚀
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-red-400 font-bold bg-red-950/40 p-3 rounded-xl border border-red-800">🪙 -1 Token (Minimal benar 2)</p>
                  <button 
                    onClick={() => {
                      const updatedTokens = Math.max(0, currentUser.tokens - 1);
                      setCurrentUser(prev => ({ ...prev, tokens: updatedTokens }));
                      setArcadeCurrentQIdx(0);
                      setArcadeScore(0);
                      setArcadeSelectedOption(null);
                      setArcadeIsAnswerChecked(false);
                      setArcadeQuizFinished(false);
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-transform hover:scale-105 text-lg"
                  >
                    Coba Ulang Mini Soal 🔄
                  </button>
                </div>
              )}
            </div>
          );
        }

        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
            <div className={`rounded-3xl p-8 md:p-10 border-2 shadow-xl space-y-6 relative overflow-hidden ${isDarkMode ? 'bg-slate-800 border-indigo-900 text-slate-100' : 'bg-white border-indigo-200 text-gray-900'}`}>
              <div className={`flex justify-between items-center border-b pb-4 ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                <div className="flex items-center gap-2">
                  <Gamepad2 className="w-6 h-6 text-indigo-400 animate-pulse"/>
                  <h3 className="font-bold text-lg">Mini Soal Level {lvlData.level}: {lvlData.theme}</h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full">Soal {arcadeCurrentQIdx + 1} / {currentPool.length}</span>
                  <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full">Token: {currentUser.tokens}/3</span>
                </div>
              </div>

              <div className={`p-6 rounded-2xl border shadow-inner space-y-4 ${isDarkMode ? 'bg-slate-900 border-indigo-950 text-slate-100' : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100 text-gray-900'}`}>
                <p className="font-bold text-lg leading-snug">{currentQ.question || currentQ.q}</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {currentQ.options.map((opt, optIdx) => {
                  let btnStyle = isDarkMode ? "bg-slate-900 border-2 border-slate-700 text-slate-200 hover:border-indigo-500 hover:bg-slate-800" : "bg-white border-2 border-gray-200 text-gray-800 hover:border-indigo-400 hover:bg-indigo-50/50";
                  const correctIdx = currentQ.correct !== undefined ? currentQ.correct : 0;
                  if (arcadeIsAnswerChecked) {
                    if (optIdx === correctIdx) {
                      btnStyle = "bg-green-500 text-white border-green-600 shadow-md animate-bounce";
                    } else if (arcadeSelectedOption === optIdx) {
                      btnStyle = "bg-red-500 text-white border-red-600 shadow-md animate-shake";
                    } else {
                      btnStyle = isDarkMode ? "bg-slate-900 text-slate-600 border-slate-800 opacity-60" : "bg-gray-100 text-gray-400 border-gray-200 opacity-60";
                    }
                  } else if (arcadeSelectedOption === optIdx) {
                    btnStyle = isDarkMode ? "bg-indigo-950 border-indigo-500 text-indigo-300 font-bold" : "bg-indigo-100 border-indigo-600 text-indigo-900 font-bold";
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={arcadeIsAnswerChecked}
                      onClick={() => setArcadeSelectedOption(optIdx)}
                      className={`w-full text-left p-4 rounded-2xl font-semibold transition-all flex items-center justify-between text-base shadow-sm ${btnStyle}`}
                    >
                      <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                      {arcadeIsAnswerChecked && optIdx === correctIdx && <CheckCircle className="w-5 h-5 text-white" />}
                    </button>
                  );
                })}
              </div>

              {!arcadeIsAnswerChecked ? (
                <button
                  disabled={arcadeSelectedOption === null}
                  onClick={() => {
                    if (arcadeSelectedOption === null) return;
                    setArcadeIsAnswerChecked(true);
                    const correctIdx = currentQ.correct !== undefined ? currentQ.correct : 0;
                    if (arcadeSelectedOption === correctIdx) {
                      setArcadeScore(prev => prev + 1);
                    }
                  }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-4 rounded-2xl shadow-lg transition-transform hover:scale-[1.01] text-lg"
                >
                  Kunci Jawaban ✨
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (arcadeCurrentQIdx + 1 < currentPool.length) {
                      setArcadeCurrentQIdx(prev => prev + 1);
                      setArcadeSelectedOption(null);
                      setArcadeIsAnswerChecked(false);
                    } else {
                      setArcadeQuizFinished(true);
                    }
                  }}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl shadow-lg transition-transform hover:scale-[1.01] text-lg flex items-center justify-center gap-2"
                >
                  Soal Selanjutnya <ArrowRight className="w-5 h-5"/>
                </button>
              )}
            </div>
          </div>
        );
      }

      return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
          <button 
            onClick={() => setAdventureActiveLevel(null)}
            className={`flex items-center gap-2 font-bold transition-colors px-4 py-2 rounded-xl border shadow-sm ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-sky-400' : 'bg-white border-gray-200 text-gray-500 hover:text-sky-600'}`}
          >
            <ArrowLeft className="w-5 h-5" /> Kembali ke Peta Utama
          </button>

          <div className={`rounded-3xl p-8 border shadow-sm relative overflow-hidden ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-sky-100 text-gray-900'}`}>
            <div className={`flex justify-between items-center mb-8 border-b pb-6 ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
              <div className="flex items-center gap-4">
                <div className="text-5xl animate-pulse">{lvlData.icon}</div>
                <div>
                  <span className="text-xs font-bold bg-sky-500/20 text-sky-400 px-2.5 py-1 rounded-full">Level {lvlData.level} (1 Materi = 1 Level)</span>
                  <h2 className="text-3xl font-bold mt-1">{lvlData.theme}</h2>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Fokus: {lvlData.location}</p>
                </div>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border ${isDarkMode ? 'bg-indigo-950/40 border-indigo-900 text-indigo-300' : 'bg-indigo-50 border-indigo-100 text-indigo-700'}`}>
                <span className="text-xl">🪙</span>
                <span className="font-extrabold">Token: {currentUser.tokens} / 3</span>
              </div>
            </div>

            {currentUser.tokens <= 0 ? (
              <div className="bg-red-950/40 border-2 border-red-800 p-6 rounded-2xl text-center space-y-3 text-slate-100">
                <div className="text-4xl animate-bounce">🔒</div>
                <h3 className="text-xl font-bold text-red-400">Token Kamu Telah Habis!</h3>
                <p className="text-sm text-red-300">
                  Kamu telah kehabisan token karena percobaan gagal. Kembali lagi besok setelah token diperbarui secara otomatis (1x24 jam).
                </p>
              </div>
            ) : (
              <div className="space-y-6 text-center">
                <p className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>Uji pemahaman materi <b className="text-sky-500">{lvlData.theme}</b> melalui rintangan mini soal interaktif untuk menyelesaikan level ini.</p>
                
                <button 
                  onClick={() => {
                    setArcadeCurrentQIdx(0);
                    setArcadeScore(0);
                    setArcadeSelectedOption(null);
                    setArcadeIsAnswerChecked(false);
                    setArcadeQuizFinished(false);
                    setAdventureViewMode('crossword');
                  }}
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 rounded-2xl shadow-xl transition-transform hover:scale-105 text-lg"
                >
                  🎮 Mulai Tantangan Mini Soal Level {lvlData.level}
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }

    const isBossUnlocked = currentUser.adventureProgress.completedLevels.length >= 7;

    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <span className="bg-white/25 px-3 py-1 rounded-full text-xs font-bold backdrop-blur animate-pulse">Petualangan Epik Sejarah (1 Materi = 1 Level)</span>
            <h2 className="text-3xl md:text-4xl font-black">JEJAK NUSANTARA</h2>
            <p className="text-indigo-100 max-w-xl text-sm">Selesaikan 7 level materi dan taklukkan Boss Exam (50 Soal 60 Menit) di akhir petualangan!</p>
          </div>
          <div className="bg-white/20 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/30 text-right z-10 shadow-inner">
            <div className="text-xs text-indigo-100 font-medium">Token Tersedia (1x24 Jam)</div>
            <div className="text-2xl font-black flex items-center justify-end gap-1">🪙 {currentUser.tokens} / 3</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adventureLevelsData.map((lvl) => {
            const isUnlocked = lvl.level <= currentUser.adventureProgress.currentLevel;
            const isCompleted = currentUser.adventureProgress.completedLevels.includes(lvl.level);

            return (
              <div 
                key={lvl.level} 
                className={`rounded-3xl p-6 border-2 transition-all duration-300 relative overflow-hidden flex flex-col justify-between hover:scale-[1.02] ${
                  isUnlocked 
                    ? (isDarkMode ? 'bg-slate-800 border-indigo-900 hover:border-indigo-500 hover:shadow-xl cursor-pointer group text-slate-100' : 'bg-white border-indigo-100 hover:border-indigo-400 hover:shadow-xl cursor-pointer group text-gray-900') 
                    : (isDarkMode ? 'bg-slate-900/50 border-slate-800 opacity-60 grayscale text-slate-500' : 'bg-gray-50 border-gray-100 opacity-60 grayscale text-gray-800')
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-5xl group-hover:scale-110 transition-transform">{lvl.icon}</div>
                    <div className="flex items-center gap-2">
                      {isCompleted && <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 animate-pulse"><CheckCircle2 className="w-3.5 h-3.5"/> Selesai</span>}
                      {!isUnlocked && <Lock className="w-5 h-5 text-gray-400" />}
                    </div>
                  </div>

                  <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md">Level {lvl.level} (Materi {lvl.materialId})</span>
                  <h3 className="text-xl font-bold mt-2 mb-1">{lvl.theme}</h3>
                  <p className={`text-xs font-medium mb-6 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>📍 {lvl.location}</p>
                </div>

                {isUnlocked ? (
                  <button 
                    onClick={() => {
                      setAdventureActiveLevel(lvl.level);
                      setAdventureViewMode('map');
                    }}
                    className="w-full bg-indigo-600 group-hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors shadow-md shadow-indigo-100 flex items-center justify-center gap-2"
                  >
                    Mulai Level Ini <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button disabled className={`w-full font-bold py-3 rounded-xl cursor-not-allowed ${isDarkMode ? 'bg-slate-900 text-slate-600' : 'bg-gray-100 text-gray-400'}`}>
                    Terkunci (Selesaikan Level Sebelumnya)
                  </button>
                )}
              </div>
            );
          })}

          <div className={`rounded-3xl p-6 border-2 text-white shadow-xl flex flex-col justify-between transition-all ${
            isBossUnlocked 
              ? 'bg-gradient-to-br from-slate-900 to-indigo-950 border-amber-400 hover:scale-[1.02] cursor-pointer' 
              : 'bg-slate-900 border-slate-800 opacity-60 grayscale'
          }`}>
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="text-5xl animate-bounce">⚔️</div>
                <div className="flex items-center gap-2">
                  <span className="bg-amber-500/20 border border-amber-400 text-amber-300 text-xs font-bold px-3 py-1 rounded-full">FINAL BOSS</span>
                  {!isBossUnlocked && <Lock className="w-5 h-5 text-gray-400" />}
                </div>
              </div>
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md">Ujian Akhir Sejarah</span>
              <h3 className="text-xl font-bold mt-2 mb-1">Boss: Penjaga Sejarah</h3>
              <p className="text-xs text-slate-300 font-medium mb-6">50 Soal Komprehensif (75% Passing, 60 Menit). {isBossUnlocked ? 'Terbuka!' : 'Terkunci (Selesaikan Level 1-7 terlebih dahulu)'}</p>
            </div>

            {isBossUnlocked ? (
              <button 
                onClick={() => {
                  setBossQuestions(generateBossExamQuestions());
                  setBossCurrentQIdx(0);
                  setBossAnswers({});
                  setBossSubmitted(false);
                  setBossTimerSeconds(3600);
                  setIsBossExamActive(true);
                }}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3.5 rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Hadapi Boss Exam (50 Soal) 🏆
              </button>
            ) : (
              <button disabled className="w-full bg-slate-800 text-slate-600 font-bold py-3.5 rounded-xl cursor-not-allowed">
                Terkunci (Selesaikan Level 1-7)
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const MapTab = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-slate-100' : 'text-gray-800'}`}>Peta Perjalanan Sejarah 🗺️</h2>
          <p className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>Jelajahi sejarah nusantara dari masa ke masa (1 Materi = 1 Level).</p>
        </div>
      </div>

      <div className={`rounded-3xl border-4 h-[600px] relative overflow-hidden shadow-inner flex items-center justify-center p-8 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-[#e8f4f8] border-sky-200'}`}>
        <div className="absolute top-10 left-10 text-sky-500 opacity-20 animate-pulse"><Map className="w-32 h-32" /></div>
        <div className="absolute bottom-10 right-10 text-sky-500 opacity-20 rotate-45 animate-spin" style={{animationDuration: '40s'}}><Map className="w-40 h-40" /></div>
        
        <div className="relative w-full max-w-4xl h-full flex flex-col justify-center gap-8 z-10 overflow-y-auto py-6">
          <div className="absolute left-1/2 top-10 bottom-10 w-2 border-l-4 border-dashed border-sky-400/50 -translate-x-1/2 -z-10"></div>

          {adventureLevelsData.map((lvl, index) => {
            const isEven = index % 2 === 0;
            const isCompleted = currentUser.adventureProgress.completedLevels.includes(lvl.level);
            return (
              <div key={lvl.level} className={`flex ${isEven ? 'justify-start' : 'justify-end'} items-center relative`}>
                {isEven && (
                  <div className="w-1/2 pr-12 text-right">
                    <h3 className={`text-lg font-bold ${isDarkMode ? 'text-slate-100' : 'text-gray-800'}`}>Level {lvl.level}: {lvl.theme}</h3>
                    <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>{lvl.location}</p>
                  </div>
                )}
                <div className={`absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border-4 shadow-lg flex items-center justify-center font-bold ${isDarkMode ? 'border-slate-900' : 'border-white'} ${isCompleted ? 'bg-green-500 text-white' : 'bg-sky-500 text-white animate-pulse'}`}>
                  {lvl.icon}
                </div>
                {!isEven && (
                  <div className="w-1/2 pl-12 text-left">
                    <h3 className={`text-lg font-bold ${isDarkMode ? 'text-slate-100' : 'text-gray-800'}`}>Level {lvl.level}: {lvl.theme}</h3>
                    <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>{lvl.location}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const LeaderboardTab = () => {
    const staticStudents = [
      { name: "Budi Santoso", xp: 3200, title: "Ahli Sejarah" },
      { name: "Siti Aminah", xp: 3050, title: "Penjelajah Waktu" },
      { name: "Dina Mariana", xp: 2100, title: "Pembaca Setia" },
      { name: "Agus Salim", xp: 1950, title: "Kadet Sejarah" },
    ];

    const allStudents = [
      { name: currentUser.name, xp: currentUser.xp, title: currentUser.title, isCurrentUser: true },
      ...staticStudents.filter(s => s.name.toLowerCase() !== currentUser.name.toLowerCase())
    ].sort((a, b) => b.xp - a.xp);

    const topThree = allStudents.slice(0, 3);

    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
         <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-slate-100' : 'text-gray-800'}`}>Papan Peringkat 🏆</h2>
          <p className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>Kumpulkan XP terus untuk naik ke puncak klasemen kelasmu!</p>
        </div>

        <div className={`max-w-3xl mx-auto rounded-3xl border shadow-lg overflow-hidden ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-sky-100 text-gray-900'}`}>
          <div className={`pt-8 pb-4 px-6 flex justify-center items-end gap-2 sm:gap-6 border-b ${isDarkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-gradient-to-b from-sky-50 to-white border-gray-100'}`}>
            {topThree[1] && (
              <div className="flex flex-col items-center hover:scale-105 transition-transform">
                <div className={`font-bold mb-1 max-w-[100px] truncate ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>{topThree[1].name}</div>
                <div className="text-sm text-amber-500 font-bold flex items-center gap-1 mb-2">
                  <Star className="w-3 h-3 fill-current"/> {topThree[1].xp}
                </div>
                <div className={`w-20 sm:w-24 h-24 rounded-t-xl border-t-4 flex justify-center pt-2 relative shadow-md ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-gray-200 border-gray-300'}`}>
                   <span className="text-2xl font-black opacity-40">2</span>
                </div>
              </div>
            )}

            {topThree[0] && (
              <div className="flex flex-col items-center z-10 hover:scale-105 transition-transform">
                <div className="absolute -top-4 w-6 h-6 text-amber-400 animate-bounce"><Star className="fill-current w-full h-full"/></div>
                <div className={`font-bold text-lg mb-1 max-w-[120px] truncate ${isDarkMode ? 'text-slate-100' : 'text-gray-800'}`}>{topThree[0].name}</div>
                <div className="text-sm text-amber-500 font-bold flex items-center gap-1 mb-2">
                  <Star className="w-3 h-3 fill-current"/> {topThree[0].xp}
                </div>
                <div className={`w-24 sm:w-32 h-32 rounded-t-xl border-t-4 flex justify-center pt-2 relative shadow-[0_-10px_30px_rgba(251,191,36,0.3)] ${isDarkMode ? 'bg-amber-950/40 border-amber-500' : 'bg-amber-100 border-amber-300'}`}>
                   <span className="text-3xl font-black text-amber-500">1</span>
                </div>
              </div>
            )}

            {topThree[2] && (
              <div className="flex flex-col items-center hover:scale-105 transition-transform">
                <div className={`font-bold mb-1 max-w-[100px] truncate ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>{topThree[2].name}</div>
                <div className="text-sm text-amber-500 font-bold flex items-center gap-1 mb-2">
                  <Star className="w-3 h-3 fill-current"/> {topThree[2].xp}
                </div>
                <div className={`w-20 sm:w-24 h-20 rounded-t-xl border-t-4 flex justify-center pt-2 relative shadow-md ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-amber-900/20 border-amber-900/30'}`}>
                   <span className="text-xl font-black opacity-40">3</span>
                </div>
              </div>
            )}
          </div>

          <div className={`divide-y ${isDarkMode ? 'divide-slate-700' : 'divide-gray-100'}`}>
            {allStudents.map((user, index) => (
              <div key={index} className={`flex items-center p-4 sm:p-6 transition-all ${
                user.isCurrentUser 
                  ? (isDarkMode ? 'bg-slate-700/50 font-semibold' : 'bg-sky-50 font-semibold') 
                  : (isDarkMode ? 'hover:bg-slate-700/30' : 'hover:bg-sky-50/50')
              }`}>
                <div className={`w-8 font-bold text-center ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>{index + 1}</div>
                <div className={`w-12 h-12 rounded-full ml-4 mr-4 flex items-center justify-center text-lg font-bold border ${isDarkMode ? 'bg-slate-900 border-slate-700 text-sky-400' : 'bg-sky-100 border-sky-200 text-sky-700'}`}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-grow">
                  <div className={`font-bold text-lg flex items-center gap-2 ${isDarkMode ? 'text-slate-100' : 'text-gray-800'}`}>
                    {user.name} 
                    {user.isCurrentUser && <span className="text-xs bg-sky-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">Kamu</span>}
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>{user.title}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-amber-500 text-lg flex items-center gap-1">
                    {user.xp} <Star className="w-4 h-4 fill-current"/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (appState === 'landing') {
    return (
      <div className="min-h-screen selection:bg-sky-200 bg-slate-50 text-slate-900 font-sans">
        <LandingPage 
          onNavigateToAuth={handleNavigateToAuth} 
          onEnterGuestMode={() => { setAppState('app'); setActiveTab('dashboard'); }}
        />
      </div>
    );
  }

  if (appState === 'auth') {
    return (
      <AuthScreen 
        authMode={authMode} 
        setAuthMode={setAuthMode}
        loginForm={loginForm} 
        setLoginForm={setLoginForm}
        showPassword={showPassword} 
        setShowPassword={setShowPassword}
        authMsg={authMsg} 
        setAuthMsg={setAuthMsg}
        setIsLoggedIn={setIsLoggedIn}
        isDarkMode={isDarkMode}
        setCurrentUser={setCurrentUser}
        usersDB={usersDB}
        setUsersDB={setUsersDB}
        onCancel={() => setAppState('landing')}
        onSuccessfulAuth={() => {
          setAppState('app');
          setActiveTab('dashboard');
        }}
      />
    );
  }

  return (
    <div className={`min-h-screen font-sans selection:bg-sky-200 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoggedIn && activeTab === 'dashboard' && <DashboardTab />}
        {isLoggedIn && activeTab === 'materials' && <MaterialsTab />}
        {isLoggedIn && activeTab === 'games' && <GamesTab />}
        {isLoggedIn && activeTab === 'map' && <MapTab />}
        {isLoggedIn && activeTab === 'leaderboard' && <LeaderboardTab />}
        {isLoggedIn && activeTab === 'profile' && <ProfileSettingsTab />}
      </main>

      {/* Avatar Modal */}
      {isAvatarModalOpen && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col border animate-in zoom-in duration-300 p-6 space-y-6 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-sky-100 text-gray-900'}`}>
            <div className={`flex justify-between items-center border-b pb-4 ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
              <h3 className="font-bold text-xl">Pilih Avatar Sistem</h3>
              <button onClick={() => setIsAvatarModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>Pilih ikon karakter penjelajah atau simbol sejarah favoritmu untuk ditampilkan pada profil:</p>

            <div className="grid grid-cols-4 gap-4 py-2">
              {systemAvatars.map((av, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentUser(prev => {
                      const updated = { ...prev, avatar: av };
                      setUsersDB(prevDB => prevDB.map(u => 
                        u.username.toLowerCase() === updated.username.toLowerCase() ? { ...u, data: updated } : u
                      ));
                      return updated;
                    });
                    setIsAvatarModalOpen(false);
                  }}
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border-2 transition-all hover:scale-110 shadow-sm ${
                    currentUser.avatar === av 
                      ? (isDarkMode ? 'bg-slate-700 border-sky-500 scale-105 shadow-md' : 'bg-sky-100 border-sky-500 scale-105 shadow-md') 
                      : (isDarkMode ? 'bg-slate-900 border-slate-700 hover:border-sky-500' : 'bg-gray-50 border-gray-200 hover:border-sky-300')
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setIsAvatarModalOpen(false)}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-xl transition"
            >
              Simpan Pilihan Avatar
            </button>
          </div>
        </div>
      )}

      {/* AI Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col h-[600px] border animate-in zoom-in duration-300 ${isDarkMode ? 'bg-slate-800 border-purple-900' : 'bg-white border-purple-100'}`}>
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center animate-pulse">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Asisten AI Sejarah</h3>
                  <p className="text-xs text-purple-200">Sisa jatah gratis hari ini: {3 - (currentUser.aiAccessCount || 0)} kali</p>
                </div>
              </div>
              <button type="button" onClick={() => setIsAiModalOpen(false)} className="text-white/80 hover:text-white p-1 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className={`flex-grow p-6 overflow-y-auto space-y-4 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
              {aiChatHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-4 text-sm font-medium ${
                    msg.role === 'user' 
                      ? 'bg-purple-600 text-white rounded-br-none' 
                      : (isDarkMode ? 'bg-slate-800 text-slate-100 shadow-sm border border-slate-700 rounded-bl-none' : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none')
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isAiLoading && (
                <div className="flex justify-start">
                  <div className={`rounded-2xl p-4 text-sm shadow-sm border italic animate-pulse ${isDarkMode ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-white text-gray-500 border-gray-100'}`}>
                    AI sedang berpikir dan meneliti arsip sejarah...
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleAskGeminiAI} className={`p-4 border-t flex gap-2 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
              <input 
                type="text"
                autoFocus
                placeholder="Misal: Ceritakan kisah singkat Gajah Mada..."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className={`flex-grow px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-gray-200 text-gray-800'}`}
              />
              <button type="submit" disabled={isAiLoading || !aiPrompt.trim()} className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-5 py-3 rounded-xl transition flex items-center justify-center disabled:opacity-50 hover:scale-105">
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}

      <GuestWarningModal />
    </div>
  );
}