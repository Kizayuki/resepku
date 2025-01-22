-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 22, 2025 at 03:43 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `resepku`
--

-- --------------------------------------------------------

--
-- Table structure for table `favorit`
--

CREATE TABLE `favorit` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_resep` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `favorit`
--

INSERT INTO `favorit` (`id`, `id_user`, `id_resep`) VALUES
(1, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `login_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`id`, `username`, `login_time`) VALUES
(1, 'admin', '2025-01-21 14:48:34'),
(2, 'admin', '2025-01-21 14:48:57'),
(3, 'abc', '2025-01-21 14:54:35'),
(4, 'abc', '2025-01-21 14:57:30'),
(5, 'admin', '2025-01-21 14:57:42'),
(6, 'abc', '2025-01-21 15:07:04'),
(7, 'admin', '2025-01-21 15:16:15'),
(8, 'admin', '2025-01-22 02:34:50'),
(9, 'admin', '2025-01-22 02:35:04'),
(10, 'admin', '2025-01-22 02:36:37'),
(11, 'admin', '2025-01-22 02:41:20');

-- --------------------------------------------------------

--
-- Table structure for table `komentar`
--

CREATE TABLE `komentar` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_resep` int(11) NOT NULL,
  `komen` text NOT NULL,
  `tanggal` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `komentar`
--

INSERT INTO `komentar` (`id`, `id_user`, `id_resep`, `komen`, `tanggal`) VALUES
(1, 2, 1, 'Tes', '2025-01-21 15:07:20');

-- --------------------------------------------------------

--
-- Table structure for table `resep`
--

CREATE TABLE `resep` (
  `id` int(11) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `deskripsi` text NOT NULL,
  `kategori` varchar(50) NOT NULL,
  `bahan` text NOT NULL,
  `langkah` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `tanggal` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `resep`
--

INSERT INTO `resep` (`id`, `judul`, `deskripsi`, `kategori`, `bahan`, `langkah`, `image`, `tanggal`) VALUES
(1, 'Nasi Goreng', 'Nasi Goreng nikmat yang mudah dibuat bahkan oleh pemula', 'Sarapan', '1. 2 piring nasi putih\r\n2. 3 siung bawang putih (cincang halus)\r\n3. 5 siung bawang merah (iris tipis)\r\n4. 1 butir telur ayam\r\n5. 2 sdm kecap manis\r\n6. 1 sdm saus tiram (opsional)\r\n7. 1 sdt terasi (bakar sebentar)\r\n8. Cabai merah atau rawit (sesuai selera, iris kecil)\r\n9. 2 sdm minyak goreng atau margarin\r\n10. secukupnya Garam, lada, dan penyedap\r\n11. Irisan timun dan kerupuk untuk pelengkap ', '1. Panaskan minyak atau margarin di wajan dengan api sedang. \r\n2. Tumis bawang merah, bawang putih, dan cabai sampai harum. Masukkan terasi, aduk hingga bumbu matang dan menggoda.\r\n3. Masukkan telur. Geser bumbu ke pinggir wajan, lalu pecahkan telur di tengah. Aduk hingga hancur seperti orak-arik.\r\n4. Tambahkan nasi. Masukkan nasi putih, aduk hingga tercampur dengan bumbu. Jangan lupa hancurkan gumpalan nasi agar lebih merata.\r\n5. Bumbui nasi. Tambahkan kecap manis, saus tiram (jika pakai), garam, lada, dan penyedap. Aduk terus hingga nasi berubah warna dan harum.\r\n6. Cicipi nasi goreng, tambahkan bumbu sesuai selera jika perlu. Aduk sebentar lagi hingga matang sempurna.', '/uploads/1737513739698-nasi-goreng.jpg', '2025-01-21 22:04:35');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL,
  `status` enum('active','blocked') NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `role`, `status`) VALUES
(1, 'admin', '123', 'admin', 'active'),
(2, 'abc', '123', 'user', 'active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `favorit`
--
ALTER TABLE `favorit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_resep` (`id_resep`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `komentar`
--
ALTER TABLE `komentar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_resep` (`id_resep`);

--
-- Indexes for table `resep`
--
ALTER TABLE `resep`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `favorit`
--
ALTER TABLE `favorit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `komentar`
--
ALTER TABLE `komentar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `resep`
--
ALTER TABLE `resep`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `favorit`
--
ALTER TABLE `favorit`
  ADD CONSTRAINT `favorit_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `favorit_ibfk_2` FOREIGN KEY (`id_resep`) REFERENCES `resep` (`id`);

--
-- Constraints for table `komentar`
--
ALTER TABLE `komentar`
  ADD CONSTRAINT `komentar_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `komentar_ibfk_2` FOREIGN KEY (`id_resep`) REFERENCES `resep` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
