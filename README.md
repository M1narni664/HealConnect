# HealConnect
Aplikasi administrasi dan jadwal individu dokter yang terintegrasi

**Deskripsi Produk**
Heal Connect adalah aplikasi berbasis React Native yang dirancang untuk membantu administrasi layanan dokter spesialis di DKI Jakarta. Aplikasi ini menawarkan fitur berbasis lokasi untuk memudahkan administrasi rumah sakit, terutama dalam pengelolaan jadwal dan penyediaan layanan kesehatan yang lebih terjangkau bagi masyarakat.

Aplikasi ini dikembangkan sebagai respons terhadap kebutuhan pemerataan fasilitas kesehatan (faskes) di wilayah metropolitan Jakarta, di mana akses terhadap dokter spesialis sering kali menjadi tantangan. Dengan fitur integrasi peta, Heal Connect menyediakan kemudahan bagi admin rumah sakit untuk mengelola jadwal tenaga medis secara efisien.

**Penggunaan Data**
Aplikasi ini memanfaatkan dua jenis sumber data utama:
(1) Rumah Sakit di DKI Jakarta
Sumber: Google Maps
Data ini digunakan untuk menampilkan lokasi rumah sakit secara akurat pada peta interaktif.
(2) Nama Dokter Spesialis
Sumber: Halodoc
Digunakan untuk menampilkan informasi lengkap tentang dokter spesialis yang tersedia di setiap rumah sakit.

**Komponen Aplikasi**
_Framework:_ Aplikasi dikembangkan menggunakan React Native, sebuah framework yang memungkinkan pengembangan lintas platform untuk perangkat iOS dan Android.
_Server:_ JSON Server digunakan sebagai backend sederhana untuk menyimpan dan menyajikan data dokter dan rumah sakit (berbasis CRUD).
_Map View:_ Aplikasi memanfaatkan Leaflet, pustaka JavaScript untuk peta interaktif, yang terintegrasi dengan React Native untuk menampilkan lokasi rumah sakit secara dinamis.

![image](https://github.com/user-attachments/assets/c4ecb719-c812-4fa1-8f38-8c35476e1c70)

**Fitur Utama**
(1) Create, Read, Update, Delete : Pembuatan data administrasi sederhana dari tenaga kesehatan seperti dokter spesialis yang dapat terupdate.
(2) Pengelolaan Jadwal: Admin dapat membuat dan mengedit jadwal kerja dokter spesialis yang Rumah Sakitnya bekerja sama agar mudah dijangkau.
(3) Peta Interaktif: Memvisualisasikan lokasi rumah sakit yang telah bekerja sama dengan aplikasi sehingga memudahkan tampilan pemerataan fungsionalitas aplikasi di wilayah yang jelas.
