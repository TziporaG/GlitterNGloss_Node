-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 10, 2022 at 06:52 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project`
--

-- --------------------------------------------------------

--
-- Table structure for table `authorizedusers`
--

CREATE TABLE `validusers` (
  `AuthorizedUsersID` int(11) NOT NULL,
  `UserName` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `RoleID` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `authorizedusers`
--

INSERT INTO `validusers` (`AuthorizedUsersID`, `UserName`, `Password`, `RoleID`) VALUES
(1, 'newuser', 'mypwd', 1),
(4, 'Sam', '1234', 1),
(5, 'Miss', '124', 2),
(6, 'Bob', '123456', 2),
(7, 'Paul', '3422', 1),
(8, 'hdiohda', '$2y$10$6Mqxr8HBQthzOnTP8v0vwOJto7C1Zh92cjodN9.LUnjFKP.Outn/i', 1),
(9, 'hi', '$2y$10$ixiUsD1TnvuSct7DFhs6aOsnlIC.0yYeocEA7O/PElgKhQ75lsebG', 5);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `OrderID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `OrderAmount` double NOT NULL,
  `OrderDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`OrderID`, `UserID`, `OrderAmount`, `OrderDate`) VALUES
(1, 1, 50, '2006-04-19'),
(2, 2, 30, '2007-02-19'),
(3, 3, 10, '2005-10-19'),
(4, 4, 18, '2003-10-18'),
(5, 1, 8, '2004-04-14'),
(6, 2, 6, '2001-02-18');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productid` int(11) NOT NULL,
  `description` text NOT NULL,
  `price` float NOT NULL,
  `category` text NOT NULL,
  `color` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productid`, `description`, `price`, `category`, `color`) VALUES
(1, 'eye shadow', 5, 'eye', ''),
(2, 'Eye Shadow', 5, 'eye', 'red'),
(3, 'Eye Shadow', 7, 'eye', 'blue'),
(4, 'Eye Shadow', 9, 'eye', 'pink'),
(5, 'Eye Shadow', 5, 'eye', 'silver'),
(6, 'Eye Shadow', 5, 'eye', 'gold'),
(7, 'Lip Stick', 7, 'lip', 'deep red'),
(8, 'Lip Stick', 9, 'lip', 'pink'),
(9, 'Lip Stick', 5, 'lip', 'Sparkle'),
(10, 'Foundation', 15, 'face', 'pale'),
(11, 'Foundation', 15, 'face', 'dark'),
(12, 'Foundation', 10, 'face', 'tan'),
(13, 'Mascara', 9, 'eye', 'black'),
(14, 'Mascara', 9, 'eye', 'blue'),
(15, 'Mascara', 9, 'eye', 'silver');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `RoleID` int(11) NOT NULL,
  `RoleDescription` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`RoleID`, `RoleDescription`) VALUES
(1, 'Administrator'),
(2, 'User');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authorizedusers`
--
ALTER TABLE `validusers`
  ADD PRIMARY KEY (`AuthorizedUsersID`),
  ADD UNIQUE KEY `UserName` (`UserName`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`OrderID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productid`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`RoleID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authorizedusers`
--
ALTER TABLE `validusers`
  MODIFY `AuthorizedUsersID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `OrderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `RoleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
