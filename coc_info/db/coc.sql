-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 03, 2018 at 07:02 PM
-- Server version: 10.1.26-MariaDB
-- PHP Version: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coc`
--

-- --------------------------------------------------------

--
-- Table structure for table `registration_request`
--

CREATE TABLE `registration_request` (
  `id_registration_request` int(10) UNSIGNED NOT NULL,
  `name_coc` varchar(15) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int(10) UNSIGNED NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `addresse` mediumtext,
  `age_user` int(10) UNSIGNED DEFAULT NULL,
  `age_clan` int(10) UNSIGNED DEFAULT NULL,
  `time_local` int(10) UNSIGNED DEFAULT NULL,
  `Password` varchar(255) NOT NULL,
  `acces` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `name`, `addresse`, `age_user`, `age_clan`, `time_local`, `Password`, `acces`) VALUES
(2, 'Roman', 'Canada', NULL, NULL, NULL, '$2y$10$pIfUms51L9wj8dhL.C1fyeM/8BdMpmdesmZfu86lmwFsUbgSYuXiu', 'allowed');

-- --------------------------------------------------------

--
-- Table structure for table `users_coc`
--

CREATE TABLE `users_coc` (
  `id_users_coc` int(10) UNSIGNED NOT NULL,
  `tag` varchar(30) NOT NULL,
  `id_user_ref` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users_coc`
--

INSERT INTO `users_coc` (`id_users_coc`, `tag`, `id_user_ref`) VALUES
(1, '89R8RY0JG', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `registration_request`
--
ALTER TABLE `registration_request`
  ADD PRIMARY KEY (`id_registration_request`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- Indexes for table `users_coc`
--
ALTER TABLE `users_coc`
  ADD PRIMARY KEY (`id_users_coc`),
  ADD KEY `id_user_ref` (`id_user_ref`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `registration_request`
--
ALTER TABLE `registration_request`
  MODIFY `id_registration_request` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `users_coc`
--
ALTER TABLE `users_coc`
  MODIFY `id_users_coc` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `users_coc`
--
ALTER TABLE `users_coc`
  ADD CONSTRAINT `users_coc_ibfk_1` FOREIGN KEY (`id_user_ref`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
