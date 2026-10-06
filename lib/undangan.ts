// ============================================================
// DATA UNDANGAN — diedit MANUAL per order.
// Salin satu blok (mis. undanganDemo["wedding-elegan"]) ke file
// baru per pelanggan, ganti isi field-nya, selesai.
// Foto: taruh file di /public/foto/ lalu isi path "/foto/nama.jpg".
// Kalau foto kosong, tampil monogram inisial otomatis.
// ============================================================

export type Tokoh = {
  label: string; // "Mempelai Pria", "Mempelai Wanita", "Putra Kami", dst.
  nama: string;
  panggilan: string;
  ortu?: string; // "Putra dari Bpk. ... & Ibu. ..."
};

export type Acara = {
  nama: string; // "Akad Nikah", "Resepsi", "Walimatul Khitan"
  tanggal: string; // ISO format: "2027-06-12"
  waktu: string; // "08.00 – selesai"
  alamat: string;
  mapsUrl: string; // link Google Maps
};

export type Amplop = {
  bank: string;
  noRek: string;
  atasNama: string;
};

export type InvitationData = {
  slug: string;
  tema: "elegan" | "floral" | "khitanan";
  // cover
  judulCover: string; // "The Wedding of"
  tokoh: Tokoh[];
  tanggalAcara: string; // tanggal utama untuk countdown, ISO
  salam: string; // kalimat pembuka
  ayat?: string; // opsional
  // detail
  acara: Acara[];
  galeri: string[]; // path foto "/foto/x.jpg" — kosongkan jika belum ada
  kisah?: { tahun: string; judul: string; isi: string }[];
  rsvpBuka: boolean;
  amplop: Amplop[];
  catatanKaki?: string;
};

export const undanganDemo: Record<string, InvitationData> = {
  "wedding-elegan": {
    slug: "wedding-elegan",
    tema: "elegan",
    judulCover: "The Wedding of",
    tokoh: [
      {
        label: "Mempelai Pria",
        nama: "Aditya Pratama",
        panggilan: "Adit",
        ortu: "Putra dari Bpk. Hendra Pratama & Ibu. Maya Lestari",
      },
      {
        label: "Mempelai Wanita",
        nama: "Nabila Putri",
        panggilan: "Bila",
        ortu: "Putri dari Bpk. Yusuf Ramadhan & Ibu. Ratna Sari",
      },
    ],
    tanggalAcara: "2027-06-12",
    salam:
      "Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i pada acara pernikahan kami.",
    ayat:
      "“Dan di antara tanda-tanda kekuasaan-Nya diciptakan-Nya untukmu pasangan hidup dari jenismu sendiri, supaya kamu mendapat ketenangan hati dan dijadikan-Nya kasih sayang di antara kamu.” (QS. Ar-Rum: 21)",
    acara: [
      {
        nama: "Akad Nikah",
        tanggal: "2027-06-12",
        waktu: "08.00 – 10.00 WIB",
        alamat: "Masjid Agung Al-Falah, Jl. Merdeka No. 12, Bandung",
        mapsUrl: "https://maps.google.com/?q=Masjid+Agung+Al-Falah+Bandung",
      },
      {
        nama: "Resepsi",
        tanggal: "2027-06-12",
        waktu: "11.00 – 14.00 WIB",
        alamat: "Gedung Sasana Budaya, Jl. Asia Afrika No. 55, Bandung",
        mapsUrl: "https://maps.google.com/?q=Gedung+Sasana+Budaya+Bandung",
      },
    ],
    galeri: ["/foto/1.jpg", "/foto/2.jpg", "/foto/3.jpg", "/foto/4.jpg"],
    kisah: [
      {
        tahun: "2021",
        judul: "Pertama Bertemu",
        isi: "Berawal dari satu kelas kuliah, satu tugas kelompok, lalu jadi sering ngobrol sampai lupa waktu.",
      },
      {
        tahun: "2024",
        judul: "Lamaran",
        isi: "Di hadapan keluarga besar, niat baik itu diucapkan. Alhamdulillah diterima.",
      },
      {
        tahun: "2027",
        judul: "Menikah",
        isi: "Babak baru dimulai. Doakan kami menjadi keluarga sakinah, mawaddah, warahmah.",
      },
    ],
    rsvpBuka: true,
    amplop: [
      { bank: "BCA", noRek: "1234567890", atasNama: "Aditya Pratama" },
      { bank: "Mandiri", noRek: "1234567890123", atasNama: "Nabila Putri" },
    ],
    catatanKaki: "Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu berkenan hadir.",
  },

  "wedding-floral": {
    slug: "wedding-floral",
    tema: "floral",
    judulCover: "We Are Getting Married",
    tokoh: [
      {
        label: "Mempelai Pria",
        nama: "Rangga Wijaya",
        panggilan: "Rangga",
        ortu: "Putra dari Bpk. Bambang Wijaya & Ibu. Siti Nurhaliza",
      },
      {
        label: "Mempelai Wanita",
        nama: "Kirana Dewi",
        panggilan: "Kira",
        ortu: "Putri dari Bpk. Agus Salim & Ibu. Dewi Anggraini",
      },
    ],
    tanggalAcara: "2027-08-22",
    salam:
      "Dengan penuh sukacita, kami mengundang orang-orang terkasih untuk menyaksikan awal perjalanan kami sebagai suami istri.",
    acara: [
      {
        nama: "Pemberkatan",
        tanggal: "2027-08-22",
        waktu: "10.00 – 12.00 WIB",
        alamat: "Gereja GPIB Immanuel, Jl. Medan Merdeka Timur, Jakarta",
        mapsUrl: "https://maps.google.com/?q=GPIB+Immanuel+Jakarta",
      },
      {
        nama: "Resepsi Taman",
        tanggal: "2027-08-22",
        waktu: "15.00 – 19.00 WIB",
        alamat: "The Green Garden, Jl. Raya Bogor KM 28, Depok",
        mapsUrl: "https://maps.google.com/?q=The+Green+Garden+Depok",
      },
    ],
    galeri: ["/foto/1.jpg", "/foto/2.jpg", "/foto/3.jpg", "/foto/4.jpg"],
    kisah: [
      {
        tahun: "2022",
        judul: "Kopi Pertama",
        isi: "Satu ajakan ngopi yang berubah jadi rutinitas tiap akhir pekan.",
      },
      {
        tahun: "2026",
        judul: "Satu Pertanyaan",
        isi: "Di taman favorit kami, di bawah lampu-lampu kecil, pertanyaan itu diajukan.",
      },
    ],
    rsvpBuka: true,
    amplop: [{ bank: "BCA", noRek: "9876543210", atasNama: "Kirana Dewi" }],
    catatanKaki: "Kehadiran dan doa restu Anda adalah hadiah terindah bagi kami.",
  },

  khitanan: {
    slug: "khitanan",
    tema: "khitanan",
    judulCover: "Walimatul Khitan",
    tokoh: [
      {
        label: "Putra Kami",
        nama: "Muhammad Farhan",
        panggilan: "Farhan",
        ortu: "Putra dari Bpk. Ahmad Fauzi & Ibu. Nurhayati",
      },
    ],
    tanggalAcara: "2027-05-03",
    salam:
      "Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam rangka khitanan putra kami.",
    ayat:
      "“Nikmat mana lagi yang kamu dustakan?” (QS. Ar-Rahman: 13)",
    acara: [
      {
        nama: "Walimatul Khitan",
        tanggal: "2027-05-03",
        waktu: "08.00 – 12.00 WIB",
        alamat: "Kediaman Keluarga, Jl. Melati Raya No. 7, Bekasi",
        mapsUrl: "https://maps.google.com/?q=Jl+Melati+Raya+Bekasi",
      },
    ],
    galeri: ["/foto/1.jpg", "/foto/2.jpg", "/foto/3.jpg"],
    rsvpBuka: true,
    amplop: [{ bank: "Mandiri", noRek: "1112223334445", atasNama: "Ahmad Fauzi" }],
    catatanKaki:
      "Merupakan kehormatan bagi kami apabila Bapak/Ibu berkenan hadir untuk memberikan doa restu.",
  },
};
