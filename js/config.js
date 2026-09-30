/* ==========================================================
   PUSAT PENGATURAN. Cukup ubah bagian ini untuk memperbarui
   harga menu, jam buka, nomor WhatsApp, dan tautan lainnya.
   ========================================================== */
const SITE = {
  whatsapp: "6281234567890",                 // format internasional tanpa + dan spasi
  whatsappDisplay: "+62 812-3456-7890",
  whatsappMessage: "Halo Kopi Senja, saya ingin bertanya mengenai menu dan reservasi.",
  instagram: "kopisenja",
  mapsQuery: "Kopi Senja, Jl. Kemang Raya No. 18, Jakarta Selatan",
  // jam buka dalam format 24 jam
  hours: {
    weekday: { label: "Senin–Jumat", open: 8, close: 22 },
    weekend: { label: "Sabtu–Minggu", open: 7, close: 23 }
  },
  // Foto: taruh file di folder images/ dengan nama di bawah ini. Kalau file belum ada,
  // ilustrasi sementara otomatis dipakai. Ganti nama/ekstensi di sini kalau perlu (mis. .webp).
  photos: {
    hero: "images/hero.jpg",
    about: "images/about.jpg",
    interior: "images/gallery-interior.jpg",
    barista: "images/gallery-barista.jpg",
    closeup: "images/gallery-closeup.jpg",
    outdoor: "images/gallery-outdoor.jpg",
    laptop: "images/gallery-laptop.jpg",
    talk: "images/gallery-talk.jpg"
  },
  // Peta Google di bagian lokasi. Isi mapEmbedQuery dengan alamat, atau nama tempat
  // seperti yang muncul di Google Maps. Set mapEmbed ke false untuk memakai ilustrasi peta.
  mapEmbed: true,
  mapEmbedQuery: "Jl. Kemang Raya No. 18, Jakarta Selatan 12730",
  showPhotoNotes: false                      // true = tampilkan catatan "ilustrasi sementara" di slot foto
};

const MENU = [
  { group: "Coffee", items: [
    { name: "Kopi Senja", desc: "Espresso, susu, dan gula aren", price: 28000, signature: true },
    { name: "Es Kopi Susu Senja", desc: "Kopi susu dengan gula aren khas Kopi Senja", price: 25000 },
    { name: "Cappuccino", desc: "Espresso dengan steamed milk dan foam", price: 30000 },
    { name: "Americano", desc: "Espresso dan air mineral", price: 23000 }
  ]},
  { group: "Non-Coffee", items: [
    { name: "Matcha Latte", desc: "Premium matcha dengan susu", price: 30000 },
    { name: "Chocolate Latte", desc: "Cokelat creamy dengan susu", price: 28000 },
    { name: "Lychee Tea", desc: "Teh dengan rasa lychee yang menyegarkan", price: 25000 }
  ]},
  { group: "Food", items: [
    { name: "Butter Croissant", price: 22000 },
    { name: "French Fries", price: 25000 },
    { name: "Chicken Sandwich", price: 32000 }
  ]}
];
/* ========================= akhir pengaturan ========================= */
