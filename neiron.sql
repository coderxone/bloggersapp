-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 14, 2021 at 08:13 AM
-- Server version: 8.0.16
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `neiron`
--

-- --------------------------------------------------------

--
-- Table structure for table `accountAgePoints`
--

CREATE TABLE `accountAgePoints` (
  `id` bigint(20) NOT NULL,
  `point` int(11) NOT NULL,
  `min` int(11) NOT NULL COMMENT 'min count of month',
  `max` int(11) NOT NULL COMMENT 'max count of mouth'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `accountAgePoints`
--

INSERT INTO `accountAgePoints` (`id`, `point`, `min`, `max`) VALUES
(1, 1, 0, 11),
(2, 2, 12, 23),
(3, 3, 24, 35),
(4, 4, 36, 47),
(5, 5, 48, 59),
(6, 6, 60, 71),
(7, 7, 72, 10000);

-- --------------------------------------------------------

--
-- Table structure for table `appParams`
--

CREATE TABLE `appParams` (
  `id` bigint(20) NOT NULL,
  `pricevideo` int(11) NOT NULL,
  `peoplecount` bigint(20) NOT NULL DEFAULT '0',
  `minviews` int(11) NOT NULL DEFAULT '0',
  `minvideos` int(11) NOT NULL DEFAULT '0',
  `workPrice` decimal(10,2) NOT NULL,
  `mintaskcount` int(20) NOT NULL,
  `stockprice` decimal(10,2) NOT NULL,
  `totalStock` int(11) NOT NULL,
  `countBoughtstocks` int(11) NOT NULL,
  `min_pay_rate` decimal(10,0) NOT NULL DEFAULT '32',
  `platform_percent` int(11) NOT NULL DEFAULT '2',
  `minUsersSubscribers` int(11) NOT NULL DEFAULT '10000',
  `platformMaxSubscribers` int(11) NOT NULL DEFAULT '20000',
  `famousPrice` int(11) NOT NULL COMMENT 'price for Famous Influencers',
  `minUsersSubscribersHighRate` bigint(20) NOT NULL DEFAULT '200000',
  `platformMaxSubscribersHighRate` bigint(20) NOT NULL DEFAULT '1000000',
  `execute_day` int(11) DEFAULT '2',
  `postamount` decimal(55,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `appParams`
--

INSERT INTO `appParams` (`id`, `pricevideo`, `peoplecount`, `minviews`, `minvideos`, `workPrice`, `mintaskcount`, `stockprice`, `totalStock`, `countBoughtstocks`, `min_pay_rate`, `platform_percent`, `minUsersSubscribers`, `platformMaxSubscribers`, `famousPrice`, `minUsersSubscribersHighRate`, `platformMaxSubscribersHighRate`, `execute_day`, `postamount`) VALUES
(1, 200, 0, 100, 1, '1.00', 20, '100.00', 10000, 0, '32', 2, 101000, 125000, 500, 200000, 1000000, 7, '55');

-- --------------------------------------------------------

--
-- Table structure for table `AppStatus`
--

CREATE TABLE `AppStatus` (
  `id` int(11) NOT NULL,
  `text` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `AppStatus`
--

INSERT INTO `AppStatus` (`id`, `text`) VALUES
(1, 'open task'),
(2, 'under consideration by business'),
(5, 'approved by business'),
(6, 'waiting system approval'),
(7, 'ready for withdrawal');

-- --------------------------------------------------------

--
-- Table structure for table `appstatus_1`
--

CREATE TABLE `appstatus_1` (
  `COL 1` int(1) DEFAULT NULL,
  `COL 2` varchar(31) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `appstatus_1`
--

INSERT INTO `appstatus_1` (`COL 1`, `COL 2`) VALUES
(1, 'open task'),
(2, 'under consideration by business'),
(5, 'approved by business'),
(6, 'waiting system approval');

-- --------------------------------------------------------

--
-- Table structure for table `businessCategories`
--

CREATE TABLE `businessCategories` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `businessCategories`
--

INSERT INTO `businessCategories` (`id`, `name`) VALUES
(1, 'Architecture'),
(2, 'Aritificial Intelligence');

-- --------------------------------------------------------

--
-- Table structure for table `businessGoals`
--

CREATE TABLE `businessGoals` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `nameRu` varchar(250) NOT NULL DEFAULT '_'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `businessGoals`
--

INSERT INTO `businessGoals` (`id`, `name`, `nameRu`) VALUES
(1, 'Brand Awareness: Getting more people to know, recognize, and like your brand.', '_'),
(2, 'Building Brand Identity: Getting people to see your brand personality and values.', '_'),
(3, 'Audience Building: Getting more people to follow and subscribe.', '_'),
(4, 'Engagement: Getting more shares, comments, and likes for your content.', '_'),
(5, 'Lead Generation: Getting more people to sign up for your lead magnets and offers.', '_'),
(6, 'Sales: Getting more people to purchase your products/services.', '_'),
(7, 'Customer Loyalty: Getting people to stay interested and connected with your brand.', '_'),
(8, 'Link Building: Getting more links directed back to your site.', '_');

-- --------------------------------------------------------

--
-- Table structure for table `carddata`
--

CREATE TABLE `carddata` (
  `id` bigint(20) NOT NULL,
  `cardnumber` bigint(20) NOT NULL,
  `cardname` varchar(200) NOT NULL,
  `location_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `location_point` text NOT NULL,
  `address` varchar(200) NOT NULL,
  `user_email` varchar(200) NOT NULL,
  `bankname` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `carddata`
--

INSERT INTO `carddata` (`id`, `cardnumber`, `cardname`, `location_name`, `location_point`, `address`, `user_email`, `bankname`) VALUES
(4, 4444444444444441, 'amir tyras', 'New York', 'a:1:{s:6:\"places\";a:1:{i:0;a:17:{s:18:\"address_components\";a:3:{i:0;a:3:{s:9:\"long_name\";s:8:\"New York\";s:10:\"short_name\";s:8:\"New York\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:1;a:3:{s:9:\"long_name\";s:8:\"New York\";s:10:\"short_name\";s:2:\"NY\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:2;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}}s:11:\"adr_address\";s:109:\"<span class=\"locality\">New York</span>, <span class=\"region\">NY</span>, <span class=\"country-name\">USA</span>\";s:17:\"formatted_address\";s:17:\"New York, NY, USA\";s:8:\"geometry\";a:2:{s:8:\"location\";a:2:{s:3:\"lat\";d:40.7127753;s:3:\"lng\";d:-74.0059728;}s:8:\"viewport\";a:4:{s:5:\"south\";d:40.4773991;s:4:\"west\";d:-74.25908989999999;s:5:\"north\";d:40.9175771;s:4:\"east\";d:-73.7002721;}}s:4:\"icon\";s:64:\"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png\";s:2:\"id\";s:40:\"7eae6a016a9c6f58e2044573fb8f14227b6e1f96\";s:4:\"name\";s:8:\"New York\";s:6:\"photos\";a:10:{i:0;a:3:{s:6:\"height\";i:498;s:17:\"html_attributions\";a:1:{i:0;s:86:\"<a href=\"https://maps.google.com/maps/contrib/110599717529221836319/photos\">Amer Z</a>\";}s:5:\"width\";i:999;}i:1;a:3:{s:6:\"height\";i:400;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/109563403909369877892/photos\">Manfred White</a>\";}s:5:\"width\";i:600;}i:2;a:3:{s:6:\"height\";i:1080;s:17:\"html_attributions\";a:1:{i:0;s:94:\"<a href=\"https://maps.google.com/maps/contrib/110161312347829694373/photos\">Roisin McGarry</a>\";}s:5:\"width\";i:1080;}i:3;a:3:{s:6:\"height\";i:720;s:17:\"html_attributions\";a:1:{i:0;s:109:\"<a href=\"https://maps.google.com/maps/contrib/109211857686808261282/photos\">Вячеслав Сысоев</a>\";}s:5:\"width\";i:1280;}i:4;a:3:{s:6:\"height\";i:1082;s:17:\"html_attributions\";a:1:{i:0;s:95:\"<a href=\"https://maps.google.com/maps/contrib/104726016541182086111/photos\">giacomo orlando</a>\";}s:5:\"width\";i:1080;}i:5;a:3:{s:6:\"height\";i:4032;s:17:\"html_attributions\";a:1:{i:0;s:90:\"<a href=\"https://maps.google.com/maps/contrib/111376783004243095356/photos\">Allen Todd</a>\";}s:5:\"width\";i:2268;}i:6;a:3:{s:6:\"height\";i:3006;s:17:\"html_attributions\";a:1:{i:0;s:94:\"<a href=\"https://maps.google.com/maps/contrib/102539025756009807530/photos\">Barbara Felder</a>\";}s:5:\"width\";i:5344;}i:7;a:3:{s:6:\"height\";i:3840;s:17:\"html_attributions\";a:1:{i:0;s:88:\"<a href=\"https://maps.google.com/maps/contrib/108734159295953479798/photos\">sriram *</a>\";}s:5:\"width\";i:2160;}i:8;a:3:{s:6:\"height\";i:3036;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/112016336994989292437/photos\">Hillary Dovel</a>\";}s:5:\"width\";i:4048;}i:9;a:3:{s:6:\"height\";i:2048;s:17:\"html_attributions\";a:1:{i:0;s:94:\"<a href=\"https://maps.google.com/maps/contrib/116808183867255260610/photos\">Ramón Vinyeta</a>\";}s:5:\"width\";i:1536;}}s:8:\"place_id\";s:27:\"ChIJOwg_06VPwokRYv534QaPC8g\";s:9:\"reference\";s:27:\"ChIJOwg_06VPwokRYv534QaPC8g\";s:5:\"scope\";s:6:\"GOOGLE\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}s:3:\"url\";s:87:\"https://maps.google.com/?q=New+York,+NY,+USA&ftid=0x89c24fa5d33f083b:0xc80b8f06e177fe62\";s:10:\"utc_offset\";i:-240;s:8:\"vicinity\";s:8:\"New York\";s:7:\"website\";s:19:\"http://www.nyc.gov/\";s:17:\"html_attributions\";a:0:{}}}}', '1225 flushing ave', '2clickorg@gmail.com', 'american bank'),
(5, 4443222345332235, 'aibit carlos', 'Los Angeles', 'a:1:{s:6:\"places\";a:1:{i:0;a:17:{s:18:\"address_components\";a:4:{i:0;a:3:{s:9:\"long_name\";s:11:\"Los Angeles\";s:10:\"short_name\";s:11:\"Los Angeles\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:1;a:3:{s:9:\"long_name\";s:18:\"Los Angeles County\";s:10:\"short_name\";s:18:\"Los Angeles County\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_2\";i:1;s:9:\"political\";}}i:2;a:3:{s:9:\"long_name\";s:10:\"California\";s:10:\"short_name\";s:2:\"CA\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:3;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}}s:11:\"adr_address\";s:112:\"<span class=\"locality\">Los Angeles</span>, <span class=\"region\">CA</span>, <span class=\"country-name\">USA</span>\";s:17:\"formatted_address\";s:20:\"Los Angeles, CA, USA\";s:8:\"geometry\";a:2:{s:8:\"location\";a:2:{s:3:\"lat\";d:34.0522342;s:3:\"lng\";d:-118.2436849;}s:8:\"viewport\";a:4:{s:5:\"south\";d:33.7036519;s:4:\"west\";d:-118.6681759;s:5:\"north\";d:34.3373061;s:4:\"east\";d:-118.1552891;}}s:4:\"icon\";s:64:\"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png\";s:2:\"id\";s:40:\"7f7b7d8118ae8db8ed3f541159ac928c484d12ad\";s:4:\"name\";s:11:\"Los Angeles\";s:6:\"photos\";a:10:{i:0;a:3:{s:6:\"height\";i:535;s:17:\"html_attributions\";a:1:{i:0;s:90:\"<a href=\"https://maps.google.com/maps/contrib/103332637656610292865/photos\">Roony Golf</a>\";}s:5:\"width\";i:802;}i:1;a:3:{s:6:\"height\";i:678;s:17:\"html_attributions\";a:1:{i:0;s:91:\"<a href=\"https://maps.google.com/maps/contrib/104450334649774418724/photos\">Uriel Nieto</a>\";}s:5:\"width\";i:1200;}i:2;a:3:{s:6:\"height\";i:3264;s:17:\"html_attributions\";a:1:{i:0;s:96:\"<a href=\"https://maps.google.com/maps/contrib/105049828994536941898/photos\">Michaela Müller</a>\";}s:5:\"width\";i:2448;}i:3;a:3:{s:6:\"height\";i:433;s:17:\"html_attributions\";a:1:{i:0;s:94:\"<a href=\"https://maps.google.com/maps/contrib/104949121987198987785/photos\">Vladimir Iliev</a>\";}s:5:\"width\";i:650;}i:4;a:3:{s:6:\"height\";i:1920;s:17:\"html_attributions\";a:1:{i:0;s:105:\"<a href=\"https://maps.google.com/maps/contrib/109264179898303407123/photos\">Martín Suárez Carzoglio</a>\";}s:5:\"width\";i:2560;}i:5;a:3:{s:6:\"height\";i:2560;s:17:\"html_attributions\";a:1:{i:0;s:96:\"<a href=\"https://maps.google.com/maps/contrib/101894883490462941291/photos\">The Mojado Power</a>\";}s:5:\"width\";i:1536;}i:6;a:3:{s:6:\"height\";i:3265;s:17:\"html_attributions\";a:1:{i:0;s:87:\"<a href=\"https://maps.google.com/maps/contrib/104194521796425707300/photos\">TRAN AN</a>\";}s:5:\"width\";i:4898;}i:7;a:3:{s:6:\"height\";i:565;s:17:\"html_attributions\";a:1:{i:0;s:94:\"<a href=\"https://maps.google.com/maps/contrib/104949121987198987785/photos\">Vladimir Iliev</a>\";}s:5:\"width\";i:850;}i:8;a:3:{s:6:\"height\";i:960;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/100122364025727921400/photos\">William andry</a>\";}s:5:\"width\";i:1280;}i:9;a:3:{s:6:\"height\";i:2080;s:17:\"html_attributions\";a:1:{i:0;s:95:\"<a href=\"https://maps.google.com/maps/contrib/111996083847537481108/photos\">Józef Jakubina</a>\";}s:5:\"width\";i:4160;}}s:8:\"place_id\";s:27:\"ChIJE9on3F3HwoAR9AhGJW_fL-I\";s:9:\"reference\";s:27:\"ChIJE9on3F3HwoAR9AhGJW_fL-I\";s:5:\"scope\";s:6:\"GOOGLE\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}s:3:\"url\";s:90:\"https://maps.google.com/?q=Los+Angeles,+CA,+USA&ftid=0x80c2c75ddc27da13:0xe22fdf6f254608f4\";s:10:\"utc_offset\";i:-420;s:8:\"vicinity\";s:11:\"Los Angeles\";s:7:\"website\";s:22:\"http://www.lacity.org/\";s:17:\"html_attributions\";a:0:{}}}}', '9 street', '2clickorg@gmail.com', 'fargo bank');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Architecture'),
(2, 'Aritificial Intelligence');

-- --------------------------------------------------------

--
-- Table structure for table `complete_approve_task`
--

CREATE TABLE `complete_approve_task` (
  `id` bigint(20) NOT NULL,
  `user_email` varchar(255) DEFAULT NULL COMMENT 'user complete task',
  `task_id` bigint(20) NOT NULL COMMENT 'UsersData table id',
  `payed` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `complete_approve_task`
--

INSERT INTO `complete_approve_task` (`id`, `user_email`, `task_id`, `payed`) VALUES
(56, '2clickorg@gmail.com', 38, 0),
(57, '2clickorg@gmail.com', 40, 0);

-- --------------------------------------------------------

--
-- Table structure for table `complete_task`
--

CREATE TABLE `complete_task` (
  `id` bigint(20) NOT NULL,
  `user_email` varchar(255) DEFAULT NULL COMMENT 'user complete task',
  `task_id` bigint(20) NOT NULL COMMENT 'UsersData table id',
  `payed` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '0 - under consideration by business,1 confirmed,2 rejected, 3 Suggest to update things'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Contacts`
--

CREATE TABLE `Contacts` (
  `id` bigint(20) NOT NULL,
  `contacts` text NOT NULL,
  `deviceid` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `countryPrices`
--

CREATE TABLE `countryPrices` (
  `id` bigint(20) NOT NULL,
  `country_code` varchar(20) NOT NULL,
  `price` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `countryPrices`
--

INSERT INTO `countryPrices` (`id`, `country_code`, `price`) VALUES
(1, 'KZ', '2'),
(2, 'US', '3');

-- --------------------------------------------------------

--
-- Table structure for table `currency`
--

CREATE TABLE `currency` (
  `id` bigint(20) NOT NULL,
  `ru_kzt_russia` decimal(10,2) NOT NULL DEFAULT '0.00',
  `ru_usd` decimal(10,2) NOT NULL DEFAULT '0.00',
  `unix_time` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `currency`
--

INSERT INTO `currency` (`id`, `ru_kzt_russia`, `ru_usd`, `unix_time`) VALUES
(1, '5.88', '75.00', '1616503327683');

-- --------------------------------------------------------

--
-- Table structure for table `downloadVideoLinks`
--

CREATE TABLE `downloadVideoLinks` (
  `id` bigint(20) NOT NULL,
  `filename` varchar(50) NOT NULL,
  `uploadDate` int(11) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `downloadVideoLinks`
--

INSERT INTO `downloadVideoLinks` (`id`, `filename`, `uploadDate`, `email`) VALUES
(8, 'video-1623841609500', 1623841610, 'hhh@gmail.com'),
(9, 'video-1623842524146', 1623842524, 'hhh@gmail.com'),
(10, 'video-1624134472354', 1624134472, 'hhh@gmail.com'),
(11, 'video-1624138910177', 1624138910, 'hhh@gmail.com'),
(12, 'video-1624139126415', 1624139126, 'hhh@gmail.com'),
(13, 'video-1624140122907', 1624140123, 'hhh@gmail.com'),
(14, 'video-1624346552108', 1624346554, 'echohub@gmail.com'),
(15, 'video-1624348474250', 1624348480, 'echohub@gmail.com'),
(16, 'video-1626126759683', 1626126759, 'test1234@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `EmailTasks`
--

CREATE TABLE `EmailTasks` (
  `id` bigint(20) NOT NULL,
  `data` text NOT NULL COMMENT 'html data',
  `date` int(11) NOT NULL COMMENT 'created date',
  `role` int(11) NOT NULL DEFAULT '4' COMMENT 'role'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `EmailTasks`
--

INSERT INTO `EmailTasks` (`id`, `data`, `date`, `role`) VALUES
(1, '<h1>test data</h1>', 1234421212, 4);

-- --------------------------------------------------------

--
-- Table structure for table `FavoritefromUsersData`
--

CREATE TABLE `FavoritefromUsersData` (
  `id` bigint(20) NOT NULL,
  `usersdata_page_Id` bigint(100) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `FavoritefromUsersData`
--

INSERT INTO `FavoritefromUsersData` (`id`, `usersdata_page_Id`, `email`) VALUES
(4, 24, 'astana7777777@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `followersCount`
--

CREATE TABLE `followersCount` (
  `id` bigint(20) NOT NULL,
  `point` varchar(80) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'point name',
  `min` int(11) NOT NULL COMMENT 'min range point',
  `max` int(11) NOT NULL COMMENT 'max range point'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `followersCount`
--

INSERT INTO `followersCount` (`id`, `point`, `min`, `max`) VALUES
(1, '1', 500, 1999),
(2, '2', 2000, 9999),
(3, '3', 10000, 29999),
(4, '4', 30000, 99999),
(5, '5', 100000, 499999);

-- --------------------------------------------------------

--
-- Table structure for table `followersViews`
--

CREATE TABLE `followersViews` (
  `id` bigint(20) NOT NULL,
  `point` varchar(80) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'point name',
  `min` int(11) NOT NULL COMMENT 'min range point',
  `max` int(11) NOT NULL COMMENT 'max range point'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `followersViews`
--

INSERT INTO `followersViews` (`id`, `point`, `min`, `max`) VALUES
(1, '1', 1, 1999),
(2, '2', 2000, 9999),
(3, '3', 10000, 29999),
(4, '4', 30000, 99999),
(5, '5', 100000, 499999);

-- --------------------------------------------------------

--
-- Table structure for table `instructions`
--

CREATE TABLE `instructions` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `text` text NOT NULL,
  `prioritynumber` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `instructions`
--

INSERT INTO `instructions` (`id`, `title`, `text`, `prioritynumber`) VALUES
(1, NULL, 'Completed task is the video you created. You must tell in a video about the topic of the assignment. The task is considered completed after a set of views in the task counter. For the view counter to work, you must click on the \"copy url to share\" button to copy the link and paste it under the video on YouTube and Instagram. So that people follow it. The accumulated number of clicks on the link serves as a guarantee that the task is completed correctly.', NULL),
(2, NULL, 'You must specify the banking information in the tab \"Bank Information\" so that at the end of the required number of tasks you can receive payments.', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `investors`
--

CREATE TABLE `investors` (
  `id` bigint(20) NOT NULL,
  `sum` decimal(10,2) NOT NULL,
  `stockprice` bigint(20) NOT NULL,
  `count` decimal(10,2) NOT NULL,
  `useremail` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `investors`
--

INSERT INTO `investors` (`id`, `sum`, `stockprice`, `count`, `useremail`) VALUES
(1, '100.00', 100, '1.00', '2clickorg@gmail.com'),
(2, '100.00', 100, '1.00', '2clickorg@gmail.com'),
(3, '100.00', 100, '1.00', '2clickorg@gmail.com'),
(4, '1000.00', 100, '10.00', '2clickorg@gmail.com'),
(5, '1000.00', 100, '10.00', '2clickorg@gmail.com'),
(6, '11.00', 100, '0.00', '2clickorg@gmail.com'),
(7, '11.00', 100, '0.11', '2clickorg@gmail.com'),
(8, '1.00', 100, '0.00', '2clickorg@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `Messages`
--

CREATE TABLE `Messages` (
  `id` bigint(20) NOT NULL,
  `fromEmail` varchar(60) NOT NULL,
  `toEmail` varchar(60) NOT NULL,
  `message` text NOT NULL,
  `date` bigint(100) NOT NULL,
  `read_status` int(100) NOT NULL DEFAULT '0' COMMENT '0 - false, 1 - true',
  `projectId` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Messages`
--

INSERT INTO `Messages` (`id`, `fromEmail`, `toEmail`, `message`, `date`, `read_status`, `projectId`) VALUES
(914, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612617307285, 1, 0),
(915, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612617323427, 1, 0),
(916, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612617343812, 1, 0),
(917, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612617523358, 1, 0),
(969, 'neirointellectinfo@gmail.com', 'testblogger@gmail.com', 'Проверьте пожалуйста свой список задач', 1612698133237, 1, 0),
(970, 'neirointellectinfo@gmail.com', 'testblogger@gmail.com', 'Проверьте пожалуйста свой список задач', 1612698747159, 1, 0),
(971, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612698993503, 1, 0),
(972, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612699155943, 1, 0),
(973, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612699225392, 1, 0),
(974, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612699267573, 1, 0),
(975, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612699368529, 1, 0),
(976, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612699425697, 1, 0),
(977, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612699470399, 1, 0),
(978, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612699581544, 1, 0),
(979, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612700035059, 1, 0),
(980, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612700381336, 1, 0),
(981, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612700382668, 1, 0),
(982, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612700413780, 1, 0),
(983, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612700462873, 1, 0),
(984, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612700849935, 1, 0),
(985, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612700963992, 1, 0),
(986, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612701012140, 1, 0),
(987, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612701089657, 1, 0),
(988, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612701753785, 1, 0),
(989, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612701929407, 1, 0),
(990, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612701967229, 1, 0),
(991, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612703570664, 1, 0),
(992, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612703722794, 1, 0),
(993, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612703815049, 1, 0),
(994, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612703963479, 1, 0),
(995, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612704228443, 1, 0),
(996, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612704378982, 1, 0),
(997, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612704425374, 1, 0),
(998, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612704651636, 1, 0),
(999, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612704756103, 1, 0),
(1000, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612704783792, 1, 0),
(1001, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612704835750, 1, 0),
(1002, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612704956632, 1, 0),
(1003, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612704962892, 1, 0),
(1004, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612705198985, 1, 0),
(1005, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612776833325, 1, 0),
(1006, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612777277974, 1, 0),
(1007, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612777491674, 1, 0),
(1008, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612777642529, 1, 0),
(1009, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612777794957, 1, 0),
(1010, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612777880466, 1, 0),
(1011, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612777971044, 1, 0),
(1012, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612779452715, 1, 0),
(1013, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612779709852, 1, 0),
(1014, 'neirointellectinfo@gmail.com', 'hh@gmail.com', 'Проверьте пожалуйста свой список задач', 1612780020326, 1, 0),
(1015, 'hh@gmail.com', 'business@gmail.com', 'dfdfdfdfd', 1612939186481, 1, 70),
(1016, 'business@gmail.com', 'hh@gmail.com', 'hi', 1612939719246, 1, 11),
(1017, 'hh@gmail.com', 'business@gmail.com', 'dfdfdfdfd', 1612939724064, 1, 11),
(1018, 'business@gmail.com', 'hh@gmail.com', 'dfdfdfd', 1612939727569, 1, 11),
(1019, 'hh@gmail.com', 'business@gmail.com', '2', 1612939731359, 1, 11),
(1020, 'business@gmail.com', 'hh@gmail.com', '3', 1612939734447, 1, 11),
(1021, 'hh@gmail.com', 'business@gmail.com', '4', 1612939738432, 1, 11),
(1022, 'hh@gmail.com', 'business@gmail.com', 'xxsdsds', 1613393596517, 0, 11),
(1023, 'testbl@gmail.com', 'business@gmail.com', 'hhh', 1626149716170, 0, 70);

-- --------------------------------------------------------

--
-- Table structure for table `payout`
--

CREATE TABLE `payout` (
  `id` bigint(20) NOT NULL,
  `user_email` varchar(200) NOT NULL,
  `sum` decimal(10,2) NOT NULL,
  `date` bigint(100) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `payout`
--

INSERT INTO `payout` (`id`, `user_email`, `sum`, `date`, `status`) VALUES
(2, '2clickorg@gmail.com', '1.00', 1565133592, 0);

-- --------------------------------------------------------

--
-- Table structure for table `raiting`
--

CREATE TABLE `raiting` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `rate` float NOT NULL,
  `text` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `raiting`
--

INSERT INTO `raiting` (`id`, `userid`, `rate`, `text`) VALUES
(23, 71, 3, 'fdfdfdfd');

-- --------------------------------------------------------

--
-- Table structure for table `rejected_task`
--

CREATE TABLE `rejected_task` (
  `id` bigint(20) NOT NULL,
  `user_email` varchar(255) DEFAULT NULL COMMENT 'user complete task',
  `task_id` bigint(20) NOT NULL COMMENT 'UsersData table id',
  `payed` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT 'status of current task',
  `text` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rejected_task`
--

INSERT INTO `rejected_task` (`id`, `user_email`, `task_id`, `payed`, `status`, `text`) VALUES
(139, 'testbl@gmail.com', 75, 0, 6, NULL),
(140, 'testbl@gmail.com', 70, 0, 6, NULL),
(141, 'testbl@gmail.com', 76, 0, 6, NULL),
(142, 'testbl@gmail.com', 74, 0, 6, NULL),
(143, 'testbl@gmail.com', 78, 0, 6, NULL),
(144, 'testbl@gmail.com', 79, 0, 6, NULL),
(145, 'testbl@gmail.com', 80, 0, 6, NULL),
(146, 'testbl@gmail.com', 81, 0, 6, NULL),
(147, 'testbl@gmail.com', 85, 0, 6, NULL),
(148, 'testbl@gmail.com', 89, 0, 6, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sendmessages`
--

CREATE TABLE `sendmessages` (
  `id` bigint(20) NOT NULL,
  `text` text NOT NULL,
  `type` int(1) NOT NULL COMMENT '1 - after registration',
  `role` int(11) NOT NULL,
  `fromEmail` varchar(200) DEFAULT NULL,
  `status` int(11) DEFAULT '2' COMMENT '1 active 2 disabled'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sendmessages`
--

INSERT INTO `sendmessages` (`id`, `text`, `type`, `role`, `fromEmail`, `status`) VALUES
(1, 'Проверьте пожалуйста свой список задач', 1, 1, 'info.echohub@gmail.com', 2);

-- --------------------------------------------------------

--
-- Table structure for table `social_network_list`
--

CREATE TABLE `social_network_list` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `social_network_list`
--

INSERT INTO `social_network_list` (`id`, `name`) VALUES
(1, 'Instagram'),
(2, 'Facebook'),
(3, 'Youtube'),
(4, 'Twitter');

-- --------------------------------------------------------

--
-- Table structure for table `TempTokens`
--

CREATE TABLE `TempTokens` (
  `id` int(11) NOT NULL,
  `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `TimesLogs`
--

CREATE TABLE `TimesLogs` (
  `id` bigint(20) NOT NULL,
  `insideTime` bigint(100) NOT NULL DEFAULT '0',
  `outsideTime` bigint(100) NOT NULL DEFAULT '0',
  `roomId` bigint(100) NOT NULL,
  `userId` bigint(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `TimesLogs`
--

INSERT INTO `TimesLogs` (`id`, `insideTime`, `outsideTime`, `roomId`, `userId`) VALUES
(46, 1555355773099, 1555355764725, 16, 1),
(47, 1555355799376, 1555355798700, 16, 4),
(48, 1555355867645, 1555355866987, 16, 3),
(49, 1555358412889, 1555358407449, 16, 1),
(50, 1555358421482, 1555358419603, 16, 2);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `transactionId` varchar(100) NOT NULL,
  `unix_time` varchar(200) DEFAULT NULL,
  `orderID` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `payerID` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `given_name` varchar(50) DEFAULT NULL,
  `surname` varchar(50) DEFAULT NULL,
  `amount` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `transactionId`, `unix_time`, `orderID`, `payerID`, `email`, `given_name`, `surname`, `amount`) VALUES
(1, '6JT64417PH010551D', NULL, '6JT64417PH010551D', '5D4YEDFSB9LTS', 'Mylive_astana-buyer@mail.ru', 'test', 'buyer', '0'),
(2, '9RG47304LH9522052', NULL, '9RG47304LH9522052', '5D4YEDFSB9LTS', 'Mylive_astana-buyer@mail.ru', 'test', 'buyer', '0'),
(3, '2KU913696H7820111', NULL, '2KU913696H7820111', '5D4YEDFSB9LTS', 'Mylive_astana-buyer@mail.ru', 'test', 'buyer', '0'),
(4, '7JJ465630A6301801', NULL, '7JJ465630A6301801', '5D4YEDFSB9LTS', 'Mylive_astana-buyer@mail.ru', 'test', 'buyer', '0'),
(5, '4EM78363DM391334S', NULL, '4EM78363DM391334S', '5D4YEDFSB9LTS', 'Mylive_astana-buyer@mail.ru', 'test', 'buyer', '0.01'),
(6, '8HK85847AN5631003', NULL, '8HK85847AN5631003', '5D4YEDFSB9LTS', 'Mylive_astana-buyer@mail.ru', 'test', 'buyer', '0.01'),
(7, '3GM53175SY488472L', NULL, '3GM53175SY488472L', '5D4YEDFSB9LTS', 'Mylive_astana-buyer@mail.ru', 'test', 'buyer', '0.01'),
(8, '82R68044RY8818320', NULL, '82R68044RY8818320', '5D4YEDFSB9LTS', 'Mylive_astana-buyer@mail.ru', 'test', 'buyer', '0.01'),
(9, '2MR46807CV687454L', NULL, '2MR46807CV687454L', '5D4YEDFSB9LTS', 'Mylive_astana-buyer@mail.ru', 'test', 'buyer', '0.01'),
(10, '4K7315593R619723R', '1607603960000', '4K7315593R619723R', '5D4YEDFSB9LTS', 'Mylive_astana-buyer@mail.ru', 'test', 'buyer', '0.01'),
(11, '3MK44144CB2044108', '1611714221000', '3MK44144CB2044108', '5D4YEDFSB9LTS', 'Mylive_astana-buyer@mail.ru', 'test', 'buyer', '0.01'),
(12, '7E67621488358515G', '1611714427000', '7E67621488358515G', '5D4YEDFSB9LTS', 'Mylive_astana-buyer@mail.ru', 'test', 'buyer', '0.01'),
(13, '6W940659S06342535', '1611715134000', '6W940659S06342535', '5D4YEDFSB9LTS', 'Mylive_astana-buyer@mail.ru', 'test', 'buyer', '0.01'),
(14, '0B756121G2460693X', '1618353079000', '0B756121G2460693X', '5D4YEDFSB9LTS', 'Mylive_astana-buyer@mail.ru', 'test', 'buyer', '350.00');

-- --------------------------------------------------------

--
-- Table structure for table `uniquenames`
--

CREATE TABLE `uniquenames` (
  `id` bigint(20) NOT NULL,
  `project_id` bigint(20) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `hash` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '1 -- open task,2- closed task'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `uniquenames`
--

INSERT INTO `uniquenames` (`id`, `project_id`, `user_email`, `hash`, `status`) VALUES
(32, 94, 'hhh@gmail.com', 'tuYSemCqBJv7Jv9u1KeH7u', 4);

-- --------------------------------------------------------

--
-- Table structure for table `UserApproveTasks`
--

CREATE TABLE `UserApproveTasks` (
  `id` bigint(20) NOT NULL,
  `fromPoint` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `toPoint` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `date` bigint(100) NOT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `role` int(11) NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sum` decimal(10,0) NOT NULL,
  `time` bigint(100) NOT NULL,
  `weight` int(100) DEFAULT NULL,
  `status` int(100) NOT NULL DEFAULT '1',
  `url` varchar(255) DEFAULT NULL,
  `location_name` varchar(255) DEFAULT NULL,
  `location_points` text,
  `peoplecount` bigint(100) DEFAULT NULL,
  `pay_status` int(11) NOT NULL DEFAULT '0',
  `countvideo` int(11) NOT NULL DEFAULT '0',
  `lat` float(10,6) DEFAULT NULL,
  `lng` float(10,6) DEFAULT NULL,
  `countarticles` int(11) NOT NULL DEFAULT '0',
  `priority` int(11) NOT NULL DEFAULT '1',
  `approvetask` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `UserApproveTasks`
--

INSERT INTO `UserApproveTasks` (`id`, `fromPoint`, `toPoint`, `date`, `description`, `role`, `email`, `sum`, `time`, `weight`, `status`, `url`, `location_name`, `location_points`, `peoplecount`, `pay_status`, `countvideo`, `lat`, `lng`, `countarticles`, `priority`, `approvetask`) VALUES
(38, NULL, NULL, 1562731200000, 'TEST', 2, 'gulim10071991@gmail.com', '126', 1562739925954, NULL, 1, 'http://kazpoisk.kz', 'United States', 'a:1:{s:6:\"places\";a:1:{i:0;a:16:{s:18:\"address_components\";a:1:{i:0;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}}s:11:\"adr_address\";s:47:\"<span class=\"country-name\">United States</span>\";s:17:\"formatted_address\";s:13:\"United States\";s:8:\"geometry\";a:2:{s:8:\"location\";a:2:{s:3:\"lat\";d:37.09024;s:3:\"lng\";d:-95.71289100000001;}s:8:\"viewport\";a:4:{s:5:\"south\";d:25.82;s:4:\"west\";d:-124.38999999999999;s:5:\"north\";d:49.38;s:4:\"east\";d:-66.94;}}s:4:\"icon\";s:64:\"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png\";s:2:\"id\";s:40:\"88564d30369b045e767b90442f46a1245864c58f\";s:4:\"name\";s:13:\"United States\";s:6:\"photos\";a:10:{i:0;a:3:{s:6:\"height\";i:3146;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/114647298085396208768/photos\">George Morina</a>\";}s:5:\"width\";i:5086;}i:1;a:3:{s:6:\"height\";i:1080;s:17:\"html_attributions\";a:1:{i:0;s:91:\"<a href=\"https://maps.google.com/maps/contrib/112798024289319678603/photos\">Kishore Das</a>\";}s:5:\"width\";i:1080;}i:2;a:3:{s:6:\"height\";i:2534;s:17:\"html_attributions\";a:1:{i:0;s:90:\"<a href=\"https://maps.google.com/maps/contrib/101282448764437270487/photos\">Luis Larco</a>\";}s:5:\"width\";i:10040;}i:3;a:3:{s:6:\"height\";i:3146;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/114647298085396208768/photos\">George Morina</a>\";}s:5:\"width\";i:5086;}i:4;a:3:{s:6:\"height\";i:2560;s:17:\"html_attributions\";a:1:{i:0;s:89:\"<a href=\"https://maps.google.com/maps/contrib/109407784867030852262/photos\">J.C Lopez</a>\";}s:5:\"width\";i:1440;}i:5;a:3:{s:6:\"height\";i:716;s:17:\"html_attributions\";a:1:{i:0;s:94:\"<a href=\"https://maps.google.com/maps/contrib/105916408967514114251/photos\">cedric bourges</a>\";}s:5:\"width\";i:1078;}i:6;a:3:{s:6:\"height\";i:1836;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/104537838038272350709/photos\">Carol McCarty</a>\";}s:5:\"width\";i:3264;}i:7;a:3:{s:6:\"height\";i:5312;s:17:\"html_attributions\";a:1:{i:0;s:107:\"<a href=\"https://maps.google.com/maps/contrib/112651038349599348103/photos\">Лилия Онищенко</a>\";}s:5:\"width\";i:2988;}i:8;a:3:{s:6:\"height\";i:1725;s:17:\"html_attributions\";a:1:{i:0;s:99:\"<a href=\"https://maps.google.com/maps/contrib/108125976952904357296/photos\">Katharina Schützle</a>\";}s:5:\"width\";i:914;}i:9;a:3:{s:6:\"height\";i:3264;s:17:\"html_attributions\";a:1:{i:0;s:90:\"<a href=\"https://maps.google.com/maps/contrib/101529687799567002536/photos\">Adam Duerk</a>\";}s:5:\"width\";i:1836;}}s:8:\"place_id\";s:27:\"ChIJCzYy5IS16lQRQrfeQ5K5Oxw\";s:9:\"reference\";s:27:\"ChIJCzYy5IS16lQRQrfeQ5K5Oxw\";s:5:\"scope\";s:6:\"GOOGLE\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}s:3:\"url\";s:83:\"https://maps.google.com/?q=United+States&ftid=0x54eab584e432360b:0x1c3bb99243deb742\";s:10:\"utc_offset\";i:-300;s:7:\"website\";s:19:\"http://www.usa.gov/\";s:17:\"html_attributions\";a:0:{}}}}', 100, 1, 3, 37.090240, -95.712891, 10, 10, 1),
(40, NULL, NULL, 1564545600000, 'test', 2, '2clickorg@gmail.com', '100', 1564629750516, NULL, 1, 'http://test.kz', 'San Francisco', 'a:1:{s:6:\"places\";a:1:{i:0;a:17:{s:18:\"address_components\";a:4:{i:0;a:3:{s:9:\"long_name\";s:13:\"San Francisco\";s:10:\"short_name\";s:2:\"SF\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:1;a:3:{s:9:\"long_name\";s:20:\"San Francisco County\";s:10:\"short_name\";s:20:\"San Francisco County\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_2\";i:1;s:9:\"political\";}}i:2;a:3:{s:9:\"long_name\";s:10:\"California\";s:10:\"short_name\";s:2:\"CA\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:3;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}}s:11:\"adr_address\";s:114:\"<span class=\"locality\">San Francisco</span>, <span class=\"region\">CA</span>, <span class=\"country-name\">USA</span>\";s:17:\"formatted_address\";s:22:\"San Francisco, CA, USA\";s:8:\"geometry\";a:2:{s:8:\"location\";a:2:{s:3:\"lat\";d:37.7749295;s:3:\"lng\";d:-122.41941550000001;}s:8:\"viewport\";a:4:{s:5:\"south\";d:37.70339999999999;s:4:\"west\";d:-122.52699999999999;s:5:\"north\";d:37.812;s:4:\"east\";d:-122.34820000000002;}}s:4:\"icon\";s:64:\"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png\";s:2:\"id\";s:40:\"1b9ea3c094d3ac23c9a3afa8cd4d8a41f05de50a\";s:4:\"name\";s:13:\"San Francisco\";s:6:\"photos\";a:10:{i:0;a:3:{s:6:\"height\";i:588;s:17:\"html_attributions\";a:1:{i:0;s:92:\"<a href=\"https://maps.google.com/maps/contrib/105610147900941467457/photos\">ozioma erike</a>\";}s:5:\"width\";i:736;}i:1;a:3:{s:6:\"height\";i:854;s:17:\"html_attributions\";a:1:{i:0;s:91:\"<a href=\"https://maps.google.com/maps/contrib/101523784147670981135/photos\">Alex Romero</a>\";}s:5:\"width\";i:960;}i:2;a:3:{s:6:\"height\";i:2770;s:17:\"html_attributions\";a:1:{i:0;s:87:\"<a href=\"https://maps.google.com/maps/contrib/102346012754464346877/photos\">Dholyan</a>\";}s:5:\"width\";i:5775;}i:3;a:3:{s:6:\"height\";i:1102;s:17:\"html_attributions\";a:1:{i:0;s:95:\"<a href=\"https://maps.google.com/maps/contrib/113482343908983147932/photos\">Randolfo Santos</a>\";}s:5:\"width\";i:735;}i:4;a:3:{s:6:\"height\";i:1536;s:17:\"html_attributions\";a:1:{i:0;s:93:\"<a href=\"https://maps.google.com/maps/contrib/118366622035212955924/photos\">Ray Gallagher</a>\";}s:5:\"width\";i:2048;}i:5;a:3:{s:6:\"height\";i:1852;s:17:\"html_attributions\";a:1:{i:0;s:88:\"<a href=\"https://maps.google.com/maps/contrib/112550240505523839845/photos\">Stacey R</a>\";}s:5:\"width\";i:3192;}i:6;a:3:{s:6:\"height\";i:2736;s:17:\"html_attributions\";a:1:{i:0;s:87:\"<a href=\"https://maps.google.com/maps/contrib/110404506754636833347/photos\">Mat San</a>\";}s:5:\"width\";i:3648;}i:7;a:3:{s:6:\"height\";i:1440;s:17:\"html_attributions\";a:1:{i:0;s:107:\"<a href=\"https://maps.google.com/maps/contrib/108340892165463045643/photos\">joan manel rovira fernandez</a>\";}s:5:\"width\";i:1440;}i:8;a:3:{s:6:\"height\";i:1089;s:17:\"html_attributions\";a:1:{i:0;s:90:\"<a href=\"https://maps.google.com/maps/contrib/103762737330285100881/photos\">vienna boy</a>\";}s:5:\"width\";i:1452;}i:9;a:3:{s:6:\"height\";i:3096;s:17:\"html_attributions\";a:1:{i:0;s:95:\"<a href=\"https://maps.google.com/maps/contrib/104045426349853231072/photos\">michael scanlon</a>\";}s:5:\"width\";i:4128;}}s:8:\"place_id\";s:27:\"ChIJIQBpAG2ahYAR_6128GcTUEo\";s:9:\"reference\";s:27:\"ChIJIQBpAG2ahYAR_6128GcTUEo\";s:5:\"scope\";s:6:\"GOOGLE\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}s:3:\"url\";s:92:\"https://maps.google.com/?q=San+Francisco,+CA,+USA&ftid=0x80859a6d00690021:0x4a501367f076adff\";s:10:\"utc_offset\";i:-420;s:8:\"vicinity\";s:13:\"San Francisco\";s:7:\"website\";s:17:\"http://sfgov.org/\";s:17:\"html_attributions\";a:0:{}}}}', 100, 1, 3, 37.774929, -122.419418, 0, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '0',
  `email` varchar(255) NOT NULL DEFAULT '0',
  `image_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'no-image.png',
  `background_image` varchar(70) NOT NULL DEFAULT 'background.jpeg',
  `role` int(11) NOT NULL DEFAULT '0',
  `phone` varchar(50) NOT NULL DEFAULT '0',
  `online` int(50) NOT NULL DEFAULT '0' COMMENT 'true = 1, false = 0',
  `online_latest_time` bigint(100) NOT NULL DEFAULT '0' COMMENT 'latest online time',
  `socketid` varchar(255) NOT NULL DEFAULT '0',
  `password` varchar(255) NOT NULL DEFAULT '0',
  `firebaseToken` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'not',
  `webtoken` varchar(255) NOT NULL DEFAULT 'not',
  `approvestatus` int(11) DEFAULT '0' COMMENT '0 dont approve default,1 approved - all task completed',
  `sendmail_status` int(11) NOT NULL DEFAULT '1' COMMENT 'send email service',
  `subscribers_count` int(20) NOT NULL DEFAULT '300',
  `raiting_stars` float NOT NULL DEFAULT '4',
  `number_of_task` int(11) DEFAULT '0' COMMENT 'number of completed tasks\r\n',
  `country` varchar(50) NOT NULL DEFAULT '0',
  `category` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `age` int(10) NOT NULL DEFAULT '0',
  `firstName` varchar(50) NOT NULL DEFAULT '0',
  `lastName` varchar(50) NOT NULL DEFAULT '0',
  `nickName` varchar(50) NOT NULL DEFAULT '0',
  `paypal` varchar(50) NOT NULL DEFAULT '0',
  `socialNetworks` text,
  `ssn` text,
  `identityPicture` varchar(50) NOT NULL DEFAULT '0',
  `verified` int(11) NOT NULL DEFAULT '0' COMMENT '0 - not verified user, 1- verified user',
  `contactstatus` int(11) NOT NULL DEFAULT '0' COMMENT '0- activated,1- exists',
  `contacts` text,
  `link` varchar(70) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT 'confirmation link',
  `email_confirmed` int(11) NOT NULL DEFAULT '0' COMMENT 'email confirmation checker',
  `accountAge` int(11) NOT NULL DEFAULT '0' COMMENT 'user social network profile age',
  `points` int(11) NOT NULL DEFAULT '0' COMMENT 'its field user points',
  `pointsStatus` int(11) NOT NULL DEFAULT '0',
  `bio` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `facebookAccessToken` varchar(60) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `name`, `email`, `image_url`, `background_image`, `role`, `phone`, `online`, `online_latest_time`, `socketid`, `password`, `firebaseToken`, `webtoken`, `approvestatus`, `sendmail_status`, `subscribers_count`, `raiting_stars`, `number_of_task`, `country`, `category`, `age`, `firstName`, `lastName`, `nickName`, `paypal`, `socialNetworks`, `ssn`, `identityPicture`, `verified`, `contactstatus`, `contacts`, `link`, `email_confirmed`, `accountAge`, `points`, `pointsStatus`, `bio`, `facebookAccessToken`) VALUES
(10, 'Dulat A', 'astana7777777@gmail.com', 'https://lh4.googleusercontent.com/-Y2EJgSMb5Gk/AAAAAAAAAAI/AAAAAAAAAe0/rpIte2XUERg/s96-c/photo.jpg', 'background.jpeg', 1, '+77081110019', 0, 1606436085629, 'iWN8-qXBD-6FC26qAAAH', '123456', 'not', 'not', 0, 2, 300, 1, 0, '0', '0', 0, '0', '0', '0', '0', NULL, NULL, '0', 1, 0, NULL, '0', 0, 0, 0, 0, '', '0'),
(11, 'Electron Insuranse', 'electroninsuranse@gmail.com', 'https://lh6.googleusercontent.com/-AdCV33Isw8M/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rffkZZf7XZ3uz2QT-cmVe2pmwOBIA/s96-c/photo.jpg', 'background.jpeg', 2, '+77081110019', 0, 1557732039562, 'GWSvR6c_yb9JtnhEAAAA', '12345', 'not', 'not', 0, 2, 300, 1, 0, '0', '0', 0, '0', '0', '0', '0', NULL, NULL, '0', 1, 0, NULL, '0', 0, 0, 0, 0, '', '0'),
(39, 'name12', 'u@gmail.com', '0', 'background.jpeg', 1, '+19179820851', 0, 1557558253722, 'S2T52IKp0l5duL3FAAAC', '12', 'not', 'not', 0, 2, 300, 1, 0, '0', '0', 0, '0', '0', '0', '0', NULL, NULL, '0', 1, 0, NULL, '0', 0, 0, 0, 0, '', '0'),
(50, 'Gulim Kanatovna', 'gulim10071991@gmail.com', 'https://lh3.googleusercontent.com/--BvBB0Aclv4/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdnMQMpcdcSEKQc28Du668b0cCDzQ/s96-c/photo.jpg', 'background.jpeg', 2, '+15075911237', 0, 1562729380784, 'uxIpSJx7UmfZLRtBAAAN', '0', 'not', 'not', 0, 2, 300, 1, 0, '0', '0', 0, '0', '0', '0', '0', NULL, NULL, '0', 1, 0, NULL, '0', 0, 0, 0, 0, '', '0'),
(59, 'kazpoisk neiron', 'neirointellectinfo@gmail.com', 'https://lh6.googleusercontent.com/-klcgICAoeqo/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfgfW184mfojn7hVPlTFZsvfdNBcg/s96-c/photo.jpg', 'background.jpeg', 3, '+12334444455', 0, 1566702418879, '2JJaVAaErSjSn9tsAABP', '0', 'not', 'cZVsVm9BN4o:APA91bE-w4Q2cynhyAWpC9SZFHyf2X8ZPo_CtFc9NPIoQGiNuWSIBo6cGFrEOkoCo1euUPQQ1PEGai-5mI4h6gvTelyhhGD21SIqffWguiFLBo3at9mxEUliyS8PW4uuOnq1nzexEul_', 0, 2, 300, 1, 0, '0', '0', 0, '0', '0', '0', '0', NULL, NULL, '0', 1, 0, NULL, '0', 0, 0, 0, 0, '', '0'),
(61, 'owner', '2clickorg@gmail.com', '0', 'background.jpeg', 2, '+9179820851', 0, 1623227460988, 'S5DY5osEXBV1G9GgAAFN', '123456', 'not', 'cjH9w-HCmhhEd93c0pqhlT:APA91bFliq21kx52kr4rvMrLxdqSMbAQP8tq1knlM89pocoFYXzrc-eIx3y4OxV9jovvVX17vBYBnbNOWD1bF-o4g1X8tKNtY7vIRSH9laVMsMWI58F_sf92-v1v0fi0mfy72oE2Qf_2', 0, 2, 300, 1, 0, '0', '0', 0, '0', '0', '0', '0', NULL, NULL, '0', 1, 0, NULL, '0', 0, 0, 0, 0, '', '0'),
(62, 'DSSDSDS', '23232@gmail.com', '0', 'background.jpeg', 1, '+65656565656565', 0, 1606205741869, 'oSz0CFCm-t_aXsXTAAAV', '12345', 'not', 'fzp3xXqPRSo:APA91bH8GhJ3X9b9dzW5Ygc__Qq5PD_FZ5W5btbXoFaXaQG4AG0k4o6tnMcBFMKpGtDUqFbYgE4T2peVUSUUNWxBGwnzpVSkMwoolIQkFbZS7QUA9FBdmsJ5r7aLdq1v6eUq48LxdCZw', 0, 2, 300, 1, 0, '0', '0', 0, '0', '0', '0', '0', NULL, NULL, '0', 1, 0, NULL, '0', 0, 0, 0, 0, '', '0'),
(64, 'Test User', '2cli@gmail.com', '0', 'background.jpeg', 0, '0', 0, 0, '0', '123456', 'not', 'cZVsVm9BN4o:APA91bE-w4Q2cynhyAWpC9SZFHyf2X8ZPo_CtFc9NPIoQGiNuWSIBo6cGFrEOkoCo1euUPQQ1PEGai-5mI4h6gvTelyhhGD21SIqffWguiFLBo3at9mxEUliyS8PW4uuOnq1nzexEul_', 0, 2, 300, 1, 0, '0', '0', 0, '0', '0', '0', '0', NULL, NULL, '0', 1, 0, NULL, '0', 0, 0, 0, 0, '', '0'),
(66, 'Test User', 'b1@gmail.com', '0', 'background.jpeg', 0, '0', 0, 0, '0', '1234561212', 'not', 'not', 0, 2, 300, 4.4, 0, '0', '0', 0, '0', '0', '0', '0', NULL, NULL, '0', 1, 0, NULL, '0', 0, 0, 0, 0, '', '0'),
(67, 'Test User', 'business@gmail.com', '0', 'background.jpeg', 2, '0', 0, 1616588642888, '3htNhX2w-t7z_YjgAAAF', '123456', 'not', 'not', 1, 2, 300, 1, 0, '0', '0', 0, '0', '0', '0', '0', NULL, NULL, '0', 1, 0, NULL, '0', 0, 0, 0, 0, '', '0'),
(68, '0', 'newBusiness@gmail.com', '0', 'background.jpeg', 2, '0', 1, 1621783861402, 'W4pjpdvJ377Q_a11AAAN', '123456', 'not', 'eLBLlm_8EZUhOzjaAOAecm:APA91bFE1UJCtz1wN4DFQbiW2K8lx5IY4mP33qg_3Eimr6mq0sauOzbXPBl_QZiJJcvUkVZMB2n8nwQphTL7-NsPiaYgwDHpHAdLOG2herSlDawOz8jKp49aTxl0VjhBXCJqOZePweTv', 0, 2, 300, 4, 0, '0', '0', 0, '0', '0', '0', '0', NULL, NULL, '0', 1, 0, NULL, '0', 0, 0, 0, 0, '', '0'),
(69, '0', 'newBlogger@gmail.com', '0', 'background.jpeg', 2, '0', 0, 1611715632206, '77Z5Yd5CLsHczNqGAABT', '123456', 'not', 'not', 0, 2, 300, 4, 0, '0', '0', 0, '0', '0', '0', '0', NULL, NULL, '0', 1, 0, NULL, '0', 0, 0, 0, 0, '', '0'),
(70, '0', 'bus@gmail.com', '0', 'background.jpeg', 2, '0', 0, 1611733491663, 'n-BFK3thhfT4DdCMAAAD', '123456', 'not', 'not', 0, 2, 300, 4, 0, '0', '0', 0, '0', '0', '0', '0', NULL, NULL, '0', 1, 0, NULL, '0', 0, 0, 0, 0, '', '0'),
(71, '0', 'hh@gmail.com', 'https://www.daily-sun.com/assets/news_images/2017/08/14/thumbnails/Daily-Sun-38-01-14-08-2017.jpg', 'background.jpeg', 1, '0', 0, 1622900935326, 'i0y0AindAodQl_cuAACt', '123456', 'not', 'cjH9w-HCmhhEd93c0pqhlT:APA91bFliq21kx52kr4rvMrLxdqSMbAQP8tq1knlM89pocoFYXzrc-eIx3y4OxV9jovvVX17vBYBnbNOWD1bF-o4g1X8tKNtY7vIRSH9laVMsMWI58F_sf92-v1v0fi0mfy72oE2Qf_2', 1, 2, 223, 4, 0, 'KZ', 'Architecture', 23, 'D', 's', 's', '2sdsds', 'a:2:{s:9:\"Instagram\";s:9:\"Hdhhdhdhd\";s:6:\"status\";b:1;}', 'a:1:{s:3:\"SSN\";s:12:\"not required\";}', 'photo-1616568000667', 1, 0, NULL, '0', 1, 0, 2, 1, '', '0'),
(72, '0', 'echohub@gmail.com', 'https://www.daily-sun.com/assets/news_images/2017/08/14/thumbnails/Daily-Sun-38-01-14-08-2017.jpg', 'background.jpeg', 2, '0', 0, 1626241723380, '4z--qfprMR81ugGzAAAP', '123456', 'not', 'not', 0, 2, 300, 4, 0, '0', '0', 0, '0', '0', '0', '0', NULL, NULL, '0', 1, 0, NULL, '0', 0, 0, 0, 0, '', '0'),
(73, '0', 'testblogger@gmail.com', 'https://www.daily-sun.com/assets/news_images/2017/08/14/thumbnails/Daily-Sun-38-01-14-08-2017.jpg', 'background.jpeg', 1, '0', 0, 1614638202097, 'uvxOjSjxZ7KO59oDAAAD', '123456', 'not', 'not', 0, 2, 300, 4, 0, '0', '0', 0, '0', '0', '0', '0', NULL, NULL, '0', 1, 0, NULL, '0', 0, 0, 0, 0, '', '0'),
(74, '0', 'testbus@gmail.com', 'https://www.daily-sun.com/assets/news_images/2017/08/14/thumbnails/Daily-Sun-38-01-14-08-2017.jpg', 'background.jpeg', 0, '0', 0, 1618354917546, '-hyPL63KfxfMYlv5AAA8', '123456', 'not', 'f5YqklzcgmZwq9DjBcV85l:APA91bFEcagjuenm9AFFm2RrkmKPqoovlT__E4R0UUHy15FOWVGbIWIUQQRQgyUlNsJOjA5BMzRgIE3mz2cLbayo8YU9BgMR5IAlRzBUIwi2IJKYu8FDQxGZsOhCSRDS9GA4uk67UylG', 0, 2, 300, 4, 0, '0', NULL, 0, '0', '0', '0', '0', NULL, NULL, '0', 0, 0, NULL, '0', 0, 0, 0, 0, '', '0'),
(75, '0', 'buss@gmail.com', 'https://www.daily-sun.com/assets/news_images/2017/08/14/thumbnails/Daily-Sun-38-01-14-08-2017.jpg', 'background.jpeg', 0, '0', 0, 1618393661690, 'B_sxJJ8hCvxfJHLmAAAL', '123456', 'not', 'cdNaTMisvC9zh3nb22eiP4:APA91bHd6yna227I52cfuvoXw1XOs1A12vlgFvtMN6xGVRS3JqDB8NSvXDeDjW-Ty22CRH0V_xwMeQNU6YDla4yBCQwrFV9R8zObRBb4q8EohBRAXOTObqaSNLJSEtgzoHXwroNTNywa', 0, 2, 300, 4, 0, '0', NULL, 0, '0', '0', '0', '0', NULL, NULL, '0', 0, 0, NULL, '0', 0, 0, 0, 0, '', '0'),
(76, '0', 'testsbussiness@gmail.com', 'https://www.daily-sun.com/assets/news_images/2017/08/14/thumbnails/Daily-Sun-38-01-14-08-2017.jpg', 'background.jpeg', 0, '0', 0, 1618393657795, 'xSXIbgQfeoE8dGs2AAAH', '123456', 'not', 'djzLbnnM5vapxTUz7xVExH:APA91bHdt9rESrlpwQL4BpoJki--WCj5wmV9rho91zjkY0M_spyfaIzJkM2RNJbWXQl44Rnn04NYla2ulWJ_wJmItXbxmvT2VdBZpbjkzOuP9wU0AunBHv_CSqdSgWKwZ3pTeQo6itTC', 0, 2, 300, 4, 0, '0', NULL, 0, '0', '0', '0', '0', NULL, NULL, '0', 0, 0, NULL, '0', 0, 0, 0, 0, '', '0'),
(77, '0', 'hhh@gmail.com', 'photo-1626117476551', 'photo-1626117455464', 1, '0', 0, 1626121868511, '16xeYxDJYk2uxlQ9AAAj', '123456', 'not', 'eLBLlm_8EZUhOzjaAOAecm:APA91bFE1UJCtz1wN4DFQbiW2K8lx5IY4mP33qg_3Eimr6mq0sauOzbXPBl_QZiJJcvUkVZMB2n8nwQphTL7-NsPiaYgwDHpHAdLOG2herSlDawOz8jKp49aTxl0VjhBXCJqOZePweTv', 0, 2, 500, 4, 0, 'US', 'a:1:{i:0;s:12:\"Architecture\";}', 20, 'Dulat', 'Akan', 'dulat', 'jkkjh', 'a:2:{s:9:\"Instagram\";s:9:\"dfdfdfdfd\";s:6:\"status\";b:1;}', 'a:2:{s:3:\"SSN\";s:9:\"121212121\";s:6:\"status\";b:1;}', 'photo-1623969141909', 1, 0, NULL, '0', 1, 0, 6, 1, 'Hi I am best developer You did it', '0'),
(79, 'Dulat Akan', 'dulat@gmail.com', 'https://graph.facebook.com/5680059475399218/picture', 'background.jpeg', 1, '0', 0, 0, '0', '2624157068419.228', 'not', 'not', 0, 2, 300, 4, 0, '0', NULL, 0, '0', '0', '0', '0', NULL, NULL, '0', 0, 0, NULL, '3Xkt6F6h2oyJ8f9TWiUcvT', 0, 0, 0, 0, '', '0'),
(80, '0', 'test1234@gmail.com', '0', 'background.jpeg', 2, '0', 0, 1626127133542, 'h8nR2AjQuNrd5EkaAADf', '123456', 'not', 'not', 0, 2, 300, 4, 0, '0', NULL, 0, '0', '0', '0', '0', NULL, NULL, '0', 0, 0, NULL, 'nv5NeWbt5RKA9ZXGpHJKJH', 0, 0, 0, 0, NULL, '0'),
(83, '0', 'testbl@gmail.com', '0', 'background.jpeg', 1, '0', 0, 1626249428326, 'FEXoscm-XM-uZLCaAADb', '123456', 'not', 'not', 0, 2, 500, 4, 0, 'US', 'a:1:{i:0;s:12:\"Architecture\";}', 18, 'dfdfdfd', 'dfdfdfdfd', 'dfdfdfdfd', 'dfdfdfdfd', 'a:2:{s:9:\"Instagram\";s:10:\"dfddfdfdfd\";s:6:\"status\";b:1;}', 'a:2:{s:3:\"SSN\";s:9:\"121211212\";s:6:\"status\";b:1;}', 'photo-1626153672540', 1, 0, NULL, 'jqXo1jRis6YDFPDPZwuFhL', 1, 0, 6, 1, NULL, '0');

-- --------------------------------------------------------

--
-- Table structure for table `usersarticles`
--

CREATE TABLE `usersarticles` (
  `id` bigint(20) NOT NULL,
  `url` varchar(255) NOT NULL,
  `project_id` int(11) NOT NULL,
  `user_email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usersarticles`
--

INSERT INTO `usersarticles` (`id`, `url`, `project_id`, `user_email`) VALUES
(1, 'https://drongeek.ru/novichkam/vybiraem-dvigatel#i-9', 38, '2clickorg@gmail.com'),
(2, 'https://www.ecalc.ch/xcoptercalc.php', 38, '2clickorg@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `UsersData`
--

CREATE TABLE `UsersData` (
  `id` bigint(20) NOT NULL,
  `fromPoint` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `toPoint` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `date` bigint(100) NOT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `role` int(11) NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sum` decimal(10,0) NOT NULL,
  `time` bigint(100) NOT NULL,
  `weight` int(100) DEFAULT NULL,
  `status` int(100) NOT NULL DEFAULT '1',
  `url` varchar(255) DEFAULT NULL,
  `location_name` varchar(255) DEFAULT NULL,
  `location_points` text,
  `peoplecount` bigint(100) DEFAULT NULL,
  `pay_status` int(11) NOT NULL DEFAULT '0',
  `countvideo` int(11) NOT NULL DEFAULT '0',
  `lat` float(10,6) DEFAULT NULL,
  `lng` float(10,6) DEFAULT NULL,
  `countarticles` int(11) NOT NULL DEFAULT '0',
  `priority` int(11) NOT NULL DEFAULT '1',
  `approvetask` int(11) NOT NULL DEFAULT '0',
  `subscribers` int(30) NOT NULL DEFAULT '1000',
  `gps` int(11) NOT NULL DEFAULT '2' COMMENT '1 gps on, 2 gps off',
  `famous` int(11) NOT NULL DEFAULT '2' COMMENT '1 - work with famous enabled,2 - common influencers\r\n',
  `companyName` varchar(50) NOT NULL,
  `category` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `businessAnswers` text,
  `type` int(1) NOT NULL DEFAULT '1' COMMENT '1- model 1 or just post, 2 - model 2 with GPS',
  `videourl` varchar(200) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `UsersData`
--

INSERT INTO `UsersData` (`id`, `fromPoint`, `toPoint`, `date`, `description`, `role`, `email`, `sum`, `time`, `weight`, `status`, `url`, `location_name`, `location_points`, `peoplecount`, `pay_status`, `countvideo`, `lat`, `lng`, `countarticles`, `priority`, `approvetask`, `subscribers`, `gps`, `famous`, `companyName`, `category`, `businessAnswers`, `type`, `videourl`) VALUES
(70, NULL, NULL, 1612598400, 'We would like you to promote our service Echohub.io. We are connecting companies with several creators at the same time allowing business to promote their services locally on multiple platforms, and allowing all creators to earn.\r\nPlease make sure to include the following:\r\n- Echohub.io is currently offering “one” month free of all service fee and “one” additional month free for every influencer/creator you invite ,that have over 500 subscribers or followers. \r\n- Echohub.io use real time GPS to match businesses with at least “six” creators. \r\n- Echohub.io allows companies to promote their products/services using influencer marketing at an “affordable” price. \r\n \r\nWe would love to see your creativity and authenticity. Please make sure to add the link of Echohub.io under your post. \r\n', 2, 'business@gmail.com', '200', 1612181534, NULL, 1, 'https://stackoverflow.com/', '1075 Space Park Way, Mountain View, CA 94043, USA', 'a:7:{i:0;a:3:{s:9:\"long_name\";s:4:\"1075\";s:10:\"short_name\";s:4:\"1075\";s:5:\"types\";a:1:{i:0;s:13:\"street_number\";}}i:1;a:3:{s:9:\"long_name\";s:14:\"Space Park Way\";s:10:\"short_name\";s:14:\"Space Park Way\";s:5:\"types\";a:1:{i:0;s:5:\"route\";}}i:2;a:3:{s:9:\"long_name\";s:13:\"Mountain View\";s:10:\"short_name\";s:13:\"Mountain View\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:3;a:3:{s:9:\"long_name\";s:18:\"Santa Clara County\";s:10:\"short_name\";s:18:\"Santa Clara County\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_2\";i:1;s:9:\"political\";}}i:4;a:3:{s:9:\"long_name\";s:10:\"California\";s:10:\"short_name\";s:2:\"CA\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:5;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}i:6;a:3:{s:9:\"long_name\";s:5:\"94043\";s:10:\"short_name\";s:5:\"94043\";s:5:\"types\";a:1:{i:0;s:11:\"postal_code\";}}}', 6, 1, 6, 37.416431, -122.069458, 0, 1, 0, 500, 2, 2, '', NULL, NULL, 1, 'https://echohub.io/video-1626126759683'),
(71, NULL, NULL, 1613030400, 'sdsdsds', 2, 'echohub@gmail.com', '200', 1612191163, NULL, 1, 'https://soundcloud.com/', '1075 Parkway Blvd, Flowood, MS 39232, USA', 'a:8:{i:0;a:3:{s:9:\"long_name\";s:4:\"1075\";s:10:\"short_name\";s:4:\"1075\";s:5:\"types\";a:1:{i:0;s:13:\"street_number\";}}i:1;a:3:{s:9:\"long_name\";s:17:\"Parkway Boulevard\";s:10:\"short_name\";s:12:\"Parkway Blvd\";s:5:\"types\";a:1:{i:0;s:5:\"route\";}}i:2;a:3:{s:9:\"long_name\";s:7:\"Flowood\";s:10:\"short_name\";s:7:\"Flowood\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:3;a:3:{s:9:\"long_name\";s:13:\"Rankin County\";s:10:\"short_name\";s:13:\"Rankin County\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_2\";i:1;s:9:\"political\";}}i:4;a:3:{s:9:\"long_name\";s:11:\"Mississippi\";s:10:\"short_name\";s:2:\"MS\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:5;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}i:6;a:3:{s:9:\"long_name\";s:5:\"39232\";s:10:\"short_name\";s:5:\"39232\";s:5:\"types\";a:1:{i:0;s:11:\"postal_code\";}}i:7;a:3:{s:9:\"long_name\";s:4:\"8856\";s:10:\"short_name\";s:4:\"8856\";s:5:\"types\";a:1:{i:0;s:18:\"postal_code_suffix\";}}}', 6, 0, 6, 32.337330, -90.090866, 0, 1, 0, 732390, 2, 2, '', NULL, NULL, 1, '0'),
(72, NULL, NULL, 1613030400, 'sdsdsds', 2, 'echohub@gmail.com', '200', 1612191499, NULL, 1, 'https://soundcloud.com/', '1075 Parkway Blvd, Flowood, MS 39232, USA', 'a:8:{i:0;a:3:{s:9:\"long_name\";s:4:\"1075\";s:10:\"short_name\";s:4:\"1075\";s:5:\"types\";a:1:{i:0;s:13:\"street_number\";}}i:1;a:3:{s:9:\"long_name\";s:17:\"Parkway Boulevard\";s:10:\"short_name\";s:12:\"Parkway Blvd\";s:5:\"types\";a:1:{i:0;s:5:\"route\";}}i:2;a:3:{s:9:\"long_name\";s:7:\"Flowood\";s:10:\"short_name\";s:7:\"Flowood\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:3;a:3:{s:9:\"long_name\";s:13:\"Rankin County\";s:10:\"short_name\";s:13:\"Rankin County\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_2\";i:1;s:9:\"political\";}}i:4;a:3:{s:9:\"long_name\";s:11:\"Mississippi\";s:10:\"short_name\";s:2:\"MS\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:5;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}i:6;a:3:{s:9:\"long_name\";s:5:\"39232\";s:10:\"short_name\";s:5:\"39232\";s:5:\"types\";a:1:{i:0;s:11:\"postal_code\";}}i:7;a:3:{s:9:\"long_name\";s:4:\"8856\";s:10:\"short_name\";s:4:\"8856\";s:5:\"types\";a:1:{i:0;s:18:\"postal_code_suffix\";}}}', 6, 0, 6, 32.337330, -90.090866, 0, 1, 0, 707784, 2, 2, '', NULL, NULL, 1, '0'),
(73, NULL, NULL, 1613030400, 'sdsdssdsd', 2, 'business@gmail.com', '200', 1612191994, NULL, 1, 'https://soundcloud.com/', '1075 Space Park Way, Mountain View, CA 94043, USA', 'a:7:{i:0;a:3:{s:9:\"long_name\";s:4:\"1075\";s:10:\"short_name\";s:4:\"1075\";s:5:\"types\";a:1:{i:0;s:13:\"street_number\";}}i:1;a:3:{s:9:\"long_name\";s:14:\"Space Park Way\";s:10:\"short_name\";s:14:\"Space Park Way\";s:5:\"types\";a:1:{i:0;s:5:\"route\";}}i:2;a:3:{s:9:\"long_name\";s:13:\"Mountain View\";s:10:\"short_name\";s:13:\"Mountain View\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:3;a:3:{s:9:\"long_name\";s:18:\"Santa Clara County\";s:10:\"short_name\";s:18:\"Santa Clara County\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_2\";i:1;s:9:\"political\";}}i:4;a:3:{s:9:\"long_name\";s:10:\"California\";s:10:\"short_name\";s:2:\"CA\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:5;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}i:6;a:3:{s:9:\"long_name\";s:5:\"94043\";s:10:\"short_name\";s:5:\"94043\";s:5:\"types\";a:1:{i:0;s:11:\"postal_code\";}}}', 6, 0, 6, 37.416431, -122.069458, 0, 1, 0, 647646, 2, 2, '', NULL, NULL, 1, '0'),
(74, NULL, NULL, 1613116800, 'without location - 2', 2, 'echohub@gmail.com', '200', 1612169107, NULL, 1, 'test.com', '1240 Monument Blvd, Concord, CA 94520, USA', 'a:7:{i:0;a:3:{s:9:\"long_name\";s:4:\"1240\";s:10:\"short_name\";s:4:\"1240\";s:5:\"types\";a:1:{i:0;s:13:\"street_number\";}}i:1;a:3:{s:9:\"long_name\";s:18:\"Monument Boulevard\";s:10:\"short_name\";s:13:\"Monument Blvd\";s:5:\"types\";a:1:{i:0;s:5:\"route\";}}i:2;a:3:{s:9:\"long_name\";s:7:\"Concord\";s:10:\"short_name\";s:7:\"Concord\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:3;a:3:{s:9:\"long_name\";s:19:\"Contra Costa County\";s:10:\"short_name\";s:19:\"Contra Costa County\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_2\";i:1;s:9:\"political\";}}i:4;a:3:{s:9:\"long_name\";s:10:\"California\";s:10:\"short_name\";s:2:\"CA\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:5;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}i:6;a:3:{s:9:\"long_name\";s:5:\"94520\";s:10:\"short_name\";s:5:\"94520\";s:5:\"types\";a:1:{i:0;s:11:\"postal_code\";}}}', 6, 1, 6, 37.416431, -122.069458, 0, 1, 0, 699210, 2, 2, '', NULL, NULL, 1, '0'),
(75, NULL, NULL, 1613116800, 'with location - 1', 2, 'business@gmail.com', '200', 1612169162, NULL, 1, 'test.com', '1240 Monument Blvd, Concord, CA 94520, USA', 'a:7:{i:0;a:3:{s:9:\"long_name\";s:4:\"1240\";s:10:\"short_name\";s:4:\"1240\";s:5:\"types\";a:1:{i:0;s:13:\"street_number\";}}i:1;a:3:{s:9:\"long_name\";s:18:\"Monument Boulevard\";s:10:\"short_name\";s:13:\"Monument Blvd\";s:5:\"types\";a:1:{i:0;s:5:\"route\";}}i:2;a:3:{s:9:\"long_name\";s:7:\"Concord\";s:10:\"short_name\";s:7:\"Concord\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:3;a:3:{s:9:\"long_name\";s:19:\"Contra Costa County\";s:10:\"short_name\";s:19:\"Contra Costa County\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_2\";i:1;s:9:\"political\";}}i:4;a:3:{s:9:\"long_name\";s:10:\"California\";s:10:\"short_name\";s:2:\"CA\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:5;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}i:6;a:3:{s:9:\"long_name\";s:5:\"94520\";s:10:\"short_name\";s:5:\"94520\";s:5:\"types\";a:1:{i:0;s:11:\"postal_code\";}}}', 6, 1, 6, 37.416431, -122.069458, 0, 1, 0, 712872, 1, 2, '', NULL, NULL, 2, '0'),
(76, NULL, NULL, 1614499200, 'dtset', 2, 'echohub@gmail.com', '200', 1612174360, NULL, 1, 'test11.com', '1075 Space Park Way, Mountain View, CA 94043, USA', 'a:7:{i:0;a:3:{s:9:\"long_name\";s:4:\"1075\";s:10:\"short_name\";s:4:\"1075\";s:5:\"types\";a:1:{i:0;s:13:\"street_number\";}}i:1;a:3:{s:9:\"long_name\";s:14:\"Space Park Way\";s:10:\"short_name\";s:14:\"Space Park Way\";s:5:\"types\";a:1:{i:0;s:5:\"route\";}}i:2;a:3:{s:9:\"long_name\";s:13:\"Mountain View\";s:10:\"short_name\";s:13:\"Mountain View\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:3;a:3:{s:9:\"long_name\";s:18:\"Santa Clara County\";s:10:\"short_name\";s:18:\"Santa Clara County\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_2\";i:1;s:9:\"political\";}}i:4;a:3:{s:9:\"long_name\";s:10:\"California\";s:10:\"short_name\";s:2:\"CA\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:5;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}i:6;a:3:{s:9:\"long_name\";s:5:\"94043\";s:10:\"short_name\";s:5:\"94043\";s:5:\"types\";a:1:{i:0;s:11:\"postal_code\";}}}', 6, 1, 6, 37.416431, -122.069458, 0, 1, 0, 735804, 1, 1, '', NULL, NULL, 2, '0'),
(77, NULL, NULL, 1614585600, 'sdsdsdsdsdsd sdsdsdsds', 2, 'echohub@gmail.com', '200', 1614596483, NULL, 1, 'test66@gmail.com', '1075 Space Park Way, Mountain View, CA 94043, USA', 'a:7:{i:0;a:3:{s:9:\"long_name\";s:4:\"1075\";s:10:\"short_name\";s:4:\"1075\";s:5:\"types\";a:1:{i:0;s:13:\"street_number\";}}i:1;a:3:{s:9:\"long_name\";s:14:\"Space Park Way\";s:10:\"short_name\";s:14:\"Space Park Way\";s:5:\"types\";a:1:{i:0;s:5:\"route\";}}i:2;a:3:{s:9:\"long_name\";s:13:\"Mountain View\";s:10:\"short_name\";s:13:\"Mountain View\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:3;a:3:{s:9:\"long_name\";s:18:\"Santa Clara County\";s:10:\"short_name\";s:18:\"Santa Clara County\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_2\";i:1;s:9:\"political\";}}i:4;a:3:{s:9:\"long_name\";s:10:\"California\";s:10:\"short_name\";s:2:\"CA\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:5;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}i:6;a:3:{s:9:\"long_name\";s:5:\"94043\";s:10:\"short_name\";s:5:\"94043\";s:5:\"types\";a:1:{i:0;s:11:\"postal_code\";}}}', 6, 0, 6, 37.416431, -122.069458, 0, 1, 0, 641460, 2, 1, '', NULL, NULL, 1, '0'),
(78, NULL, NULL, 1614585600, 'We connect creators with businesses. We provide a marketplace for collaboration. We would like creator to record a video about us and post in on Instagram story and post. ', 2, 'echohub@gmail.com', '200', 1614596715, NULL, 1, 'test77.com', '1075 Space Park Way, Mountain View, CA 94043, USA', 'a:7:{i:0;a:3:{s:9:\"long_name\";s:4:\"1075\";s:10:\"short_name\";s:4:\"1075\";s:5:\"types\";a:1:{i:0;s:13:\"street_number\";}}i:1;a:3:{s:9:\"long_name\";s:14:\"Space Park Way\";s:10:\"short_name\";s:14:\"Space Park Way\";s:5:\"types\";a:1:{i:0;s:5:\"route\";}}i:2;a:3:{s:9:\"long_name\";s:13:\"Mountain View\";s:10:\"short_name\";s:13:\"Mountain View\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:3;a:3:{s:9:\"long_name\";s:18:\"Santa Clara County\";s:10:\"short_name\";s:18:\"Santa Clara County\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_2\";i:1;s:9:\"political\";}}i:4;a:3:{s:9:\"long_name\";s:10:\"California\";s:10:\"short_name\";s:2:\"CA\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:5;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}i:6;a:3:{s:9:\"long_name\";s:5:\"94043\";s:10:\"short_name\";s:5:\"94043\";s:5:\"types\";a:1:{i:0;s:11:\"postal_code\";}}}', 6, 1, 6, 37.416431, -122.069458, 0, 1, 0, 725634, 2, 2, '', NULL, NULL, 1, 'AlmagamesVideo.mp4'),
(79, NULL, NULL, 1616577060, ' ', 2, 'business@gmail.com', '200', 1616580613, NULL, 1, 'echohub.io', '1275 Space Park Dr, Houston, TX 77058, USA', 'a:8:{i:0;a:3:{s:9:\"long_name\";s:4:\"1275\";s:10:\"short_name\";s:4:\"1275\";s:5:\"types\";a:1:{i:0;s:13:\"street_number\";}}i:1;a:3:{s:9:\"long_name\";s:16:\"Space Park Drive\";s:10:\"short_name\";s:13:\"Space Park Dr\";s:5:\"types\";a:1:{i:0;s:5:\"route\";}}i:2;a:3:{s:9:\"long_name\";s:7:\"Houston\";s:10:\"short_name\";s:7:\"Houston\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:3;a:3:{s:9:\"long_name\";s:13:\"Harris County\";s:10:\"short_name\";s:13:\"Harris County\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_2\";i:1;s:9:\"political\";}}i:4;a:3:{s:9:\"long_name\";s:5:\"Texas\";s:10:\"short_name\";s:2:\"TX\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:5;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}i:6;a:3:{s:9:\"long_name\";s:5:\"77058\";s:10:\"short_name\";s:5:\"77058\";s:5:\"types\";a:1:{i:0;s:11:\"postal_code\";}}i:7;a:3:{s:9:\"long_name\";s:4:\"3311\";s:10:\"short_name\";s:4:\"3311\";s:5:\"types\";a:1:{i:0;s:18:\"postal_code_suffix\";}}}', 6, 1, 6, 29.546011, -95.101440, 0, 1, 0, 693930, 2, 2, 'echohub.io', 's:81:\"[\"Brand Awareness: Getting more people to know, recognize, and like your brand.\"]\";', 'a:2:{i:0;s:79:\"\'Brand Awareness\': Getting more people to know, recognize, and like your brand.\";i:1;s:65:\"\'Audience Building\': Getting more people to follow and subscribe.\";}', 1, '0'),
(80, NULL, NULL, 1616577060, ' ', 2, 'business@gmail.com', '200', 1616580613, NULL, 1, 'echohub.io', '1275 Space Park Dr, Houston, TX 77058, USA', 'a:8:{i:0;a:3:{s:9:\"long_name\";s:4:\"1275\";s:10:\"short_name\";s:4:\"1275\";s:5:\"types\";a:1:{i:0;s:13:\"street_number\";}}i:1;a:3:{s:9:\"long_name\";s:16:\"Space Park Drive\";s:10:\"short_name\";s:13:\"Space Park Dr\";s:5:\"types\";a:1:{i:0;s:5:\"route\";}}i:2;a:3:{s:9:\"long_name\";s:7:\"Houston\";s:10:\"short_name\";s:7:\"Houston\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:3;a:3:{s:9:\"long_name\";s:13:\"Harris County\";s:10:\"short_name\";s:13:\"Harris County\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_2\";i:1;s:9:\"political\";}}i:4;a:3:{s:9:\"long_name\";s:5:\"Texas\";s:10:\"short_name\";s:2:\"TX\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:5;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}i:6;a:3:{s:9:\"long_name\";s:5:\"77058\";s:10:\"short_name\";s:5:\"77058\";s:5:\"types\";a:1:{i:0;s:11:\"postal_code\";}}i:7;a:3:{s:9:\"long_name\";s:4:\"3311\";s:10:\"short_name\";s:4:\"3311\";s:5:\"types\";a:1:{i:0;s:18:\"postal_code_suffix\";}}}', 6, 1, 6, 29.546011, -95.101440, 0, 1, 0, 731592, 2, 2, 'echohub.io', 's:81:\"[\"Brand Awareness: Getting more people to know, recognize, and like your brand.\"]\";', 'a:2:{i:0;s:79:\"\'Brand Awareness\': Getting more people to know, recognize, and like your brand.\";i:1;s:65:\"\'Audience Building\': Getting more people to follow and subscribe.\";}', 1, '0'),
(81, NULL, NULL, 1616577060, ' ', 2, 'business@gmail.com', '200', 1616580613, NULL, 1, 'echohub.io', '1275 Space Park Dr, Houston, TX 77058, USA', 'a:8:{i:0;a:3:{s:9:\"long_name\";s:4:\"1275\";s:10:\"short_name\";s:4:\"1275\";s:5:\"types\";a:1:{i:0;s:13:\"street_number\";}}i:1;a:3:{s:9:\"long_name\";s:16:\"Space Park Drive\";s:10:\"short_name\";s:13:\"Space Park Dr\";s:5:\"types\";a:1:{i:0;s:5:\"route\";}}i:2;a:3:{s:9:\"long_name\";s:7:\"Houston\";s:10:\"short_name\";s:7:\"Houston\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:3;a:3:{s:9:\"long_name\";s:13:\"Harris County\";s:10:\"short_name\";s:13:\"Harris County\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_2\";i:1;s:9:\"political\";}}i:4;a:3:{s:9:\"long_name\";s:5:\"Texas\";s:10:\"short_name\";s:2:\"TX\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:5;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}i:6;a:3:{s:9:\"long_name\";s:5:\"77058\";s:10:\"short_name\";s:5:\"77058\";s:5:\"types\";a:1:{i:0;s:11:\"postal_code\";}}i:7;a:3:{s:9:\"long_name\";s:4:\"3311\";s:10:\"short_name\";s:4:\"3311\";s:5:\"types\";a:1:{i:0;s:18:\"postal_code_suffix\";}}}', 6, 1, 6, 29.546011, -95.101440, 0, 1, 0, 682518, 2, 2, 'echohub.io', 's:81:\"[\"Brand Awareness: Getting more people to know, recognize, and like your brand.\"]\";', 'a:2:{i:0;s:79:\"\'Brand Awareness\': Getting more people to know, recognize, and like your brand.\";i:1;s:65:\"\'Audience Building\': Getting more people to follow and subscribe.\";}', 1, '0'),
(82, NULL, NULL, 1617836940, 'dfdfdfdfd', 2, 'kkk@gmail.com', '200', 1617836940, NULL, 1, 'dfdfd.com', 'Mountain View, CA, USA', 'a:4:{i:0;a:3:{s:9:\"long_name\";s:13:\"Mountain View\";s:10:\"short_name\";s:13:\"Mountain View\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:1;a:3:{s:9:\"long_name\";s:18:\"Santa Clara County\";s:10:\"short_name\";s:18:\"Santa Clara County\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_2\";i:1;s:9:\"political\";}}i:2;a:3:{s:9:\"long_name\";s:10:\"California\";s:10:\"short_name\";s:2:\"CA\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:3;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}}', 6, 0, 6, 37.386051, -122.083855, 0, 1, 0, 678744, 2, 1, 'dfdfdfd', 'check persona', 'a:1:{i:0;s:65:\"\'Audience Building\': Getting more people to follow and subscribe.\";}', 1, '0'),
(83, NULL, NULL, 1618353120, 'dfdfdfddfdfd', 2, 'buss@gmail.com', '200', 1618353120, NULL, 1, 'bus@gmail.com', 'Mountain View, CA, USA', 'a:4:{i:0;a:3:{s:9:\"long_name\";s:13:\"Mountain View\";s:10:\"short_name\";s:13:\"Mountain View\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:1;a:3:{s:9:\"long_name\";s:18:\"Santa Clara County\";s:10:\"short_name\";s:18:\"Santa Clara County\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_2\";i:1;s:9:\"political\";}}i:2;a:3:{s:9:\"long_name\";s:10:\"California\";s:10:\"short_name\";s:2:\"CA\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:3;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}}', 6, 0, 6, 37.386051, -122.083855, 0, 1, 0, 747390, 2, 2, 'dfdfdfd', 'dfdfddfdfd', 'a:1:{i:0;s:79:\"\'Brand Awareness\': Getting more people to know, recognize, and like your brand.\";}', 1, '0'),
(84, NULL, NULL, 1618354980, 'dfdfdfdf', 2, 'testsbussiness@gmail.com', '200', 1618354980, NULL, 1, 'yytytytyt.com', 'Mountain View, CA, USA', 'a:4:{i:0;a:3:{s:9:\"long_name\";s:13:\"Mountain View\";s:10:\"short_name\";s:13:\"Mountain View\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:1;a:3:{s:9:\"long_name\";s:18:\"Santa Clara County\";s:10:\"short_name\";s:18:\"Santa Clara County\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_2\";i:1;s:9:\"political\";}}i:2;a:3:{s:9:\"long_name\";s:10:\"California\";s:10:\"short_name\";s:2:\"CA\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:3;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}}', 6, 0, 6, 37.386051, -122.083855, 0, 1, 0, 671754, 2, 1, 'dfdfdfd', 'dfdfdfdsf dsfdsfsdfdsfdsfdsf', 'a:1:{i:0;s:72:\"\'Engagement\': Getting more shares, comments, and likes for your content.\";}', 1, '0'),
(85, NULL, NULL, 1621783860, 'нужно опубликовать видео echohub.io в свои социальные сети', 2, 'newbusiness@gmail.com', '200', 1621783860, NULL, 1, 'echohub.io', '1075 Space Park Way, Mountain View, CA 94043, USA', 'a:7:{i:0;a:3:{s:9:\"long_name\";s:4:\"1075\";s:10:\"short_name\";s:4:\"1075\";s:5:\"types\";a:1:{i:0;s:13:\"street_number\";}}i:1;a:3:{s:9:\"long_name\";s:14:\"Space Park Way\";s:10:\"short_name\";s:14:\"Space Park Way\";s:5:\"types\";a:1:{i:0;s:5:\"route\";}}i:2;a:3:{s:9:\"long_name\";s:13:\"Mountain View\";s:10:\"short_name\";s:13:\"Mountain View\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:3;a:3:{s:9:\"long_name\";s:18:\"Santa Clara County\";s:10:\"short_name\";s:18:\"Santa Clara County\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_2\";i:1;s:9:\"political\";}}i:4;a:3:{s:9:\"long_name\";s:10:\"California\";s:10:\"short_name\";s:2:\"CA\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:5;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}i:6;a:3:{s:9:\"long_name\";s:5:\"94043\";s:10:\"short_name\";s:5:\"94043\";s:5:\"types\";a:1:{i:0;s:11:\"postal_code\";}}}', 6, 1, 6, 37.416431, -122.069458, 0, 1, 0, 695112, 2, 2, 'Echohub.io', 'ввавав', 'a:1:{i:0;s:79:\"\'Brand Awareness\': Getting more people to know, recognize, and like your brand.\";}', 1, '0'),
(89, NULL, NULL, 1623187793, 'test  description now', 2, '2clickorg@gmail.com', '55', 1623187793, NULL, 1, 'test.com', '1075 Space Park Way, Mountain View, CA 94043, USA', 'a:7:{i:0;a:3:{s:9:\"long_name\";s:4:\"1075\";s:10:\"short_name\";s:4:\"1075\";s:5:\"types\";a:1:{i:0;s:13:\"street_number\";}}i:1;a:3:{s:9:\"long_name\";s:14:\"Space Park Way\";s:10:\"short_name\";s:14:\"Space Park Way\";s:5:\"types\";a:1:{i:0;s:5:\"route\";}}i:2;a:3:{s:9:\"long_name\";s:13:\"Mountain View\";s:10:\"short_name\";s:13:\"Mountain View\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:3;a:3:{s:9:\"long_name\";s:18:\"Santa Clara County\";s:10:\"short_name\";s:18:\"Santa Clara County\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_2\";i:1;s:9:\"political\";}}i:4;a:3:{s:9:\"long_name\";s:10:\"California\";s:10:\"short_name\";s:2:\"CA\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:5;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}i:6;a:3:{s:9:\"long_name\";s:5:\"94043\";s:10:\"short_name\";s:5:\"94043\";s:5:\"types\";a:1:{i:0;s:11:\"postal_code\";}}}', NULL, 1, 0, 37.416431, -122.069458, 0, 1, 0, 680550, 2, 2, 'test', NULL, NULL, 1, 'https://www.youtube.com/watch?v=uJNkLR4rQZM&t=3s'),
(90, NULL, NULL, 1623843644, 'dfdfdfdfd', 2, 'hhh@gmail.com', '55', 1623843644, NULL, 1, 'test.com', '1075 Space Park Way, Mountain View, CA 94043, USA', 'a:7:{i:0;a:3:{s:9:\"long_name\";s:4:\"1075\";s:10:\"short_name\";s:4:\"1075\";s:5:\"types\";a:1:{i:0;s:13:\"street_number\";}}i:1;a:3:{s:9:\"long_name\";s:14:\"Space Park Way\";s:10:\"short_name\";s:14:\"Space Park Way\";s:5:\"types\";a:1:{i:0;s:5:\"route\";}}i:2;a:3:{s:9:\"long_name\";s:13:\"Mountain View\";s:10:\"short_name\";s:13:\"Mountain View\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:3;a:3:{s:9:\"long_name\";s:18:\"Santa Clara County\";s:10:\"short_name\";s:18:\"Santa Clara County\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_2\";i:1;s:9:\"political\";}}i:4;a:3:{s:9:\"long_name\";s:10:\"California\";s:10:\"short_name\";s:2:\"CA\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:5;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}i:6;a:3:{s:9:\"long_name\";s:5:\"94043\";s:10:\"short_name\";s:5:\"94043\";s:5:\"types\";a:1:{i:0;s:11:\"postal_code\";}}}', NULL, 0, 0, 37.416431, -122.069458, 0, 1, 0, 0, 2, 2, 'sdsds', NULL, NULL, 1, '0'),
(91, NULL, NULL, 1623966429, 'dfdfdfdfd', 2, 'echohub@gmail.com', '55', 1623966429, NULL, 1, 'test.com', '1075 Space Park Way, Mountain View, CA 94043, USA', 'a:7:{i:0;a:3:{s:9:\"long_name\";s:4:\"1075\";s:10:\"short_name\";s:4:\"1075\";s:5:\"types\";a:1:{i:0;s:13:\"street_number\";}}i:1;a:3:{s:9:\"long_name\";s:14:\"Space Park Way\";s:10:\"short_name\";s:14:\"Space Park Way\";s:5:\"types\";a:1:{i:0;s:5:\"route\";}}i:2;a:3:{s:9:\"long_name\";s:13:\"Mountain View\";s:10:\"short_name\";s:13:\"Mountain View\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:3;a:3:{s:9:\"long_name\";s:18:\"Santa Clara County\";s:10:\"short_name\";s:18:\"Santa Clara County\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_2\";i:1;s:9:\"political\";}}i:4;a:3:{s:9:\"long_name\";s:10:\"California\";s:10:\"short_name\";s:2:\"CA\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:5;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}i:6;a:3:{s:9:\"long_name\";s:5:\"94043\";s:10:\"short_name\";s:5:\"94043\";s:5:\"types\";a:1:{i:0;s:11:\"postal_code\";}}}', NULL, 1, 0, 37.416431, -122.069458, 0, 1, 0, 0, 2, 2, 'sdsds', NULL, NULL, 1, 'video-1623842524146'),
(92, NULL, NULL, 1624346400, 'test model2', 2, 'echohub@gmail.com', '200', 1624346400, NULL, 1, 'test.com', '1075 Space Park Way, Mountain View, CA 94043, USA', 'a:7:{i:0;a:3:{s:9:\"long_name\";s:4:\"1075\";s:10:\"short_name\";s:4:\"1075\";s:5:\"types\";a:1:{i:0;s:13:\"street_number\";}}i:1;a:3:{s:9:\"long_name\";s:14:\"Space Park Way\";s:10:\"short_name\";s:14:\"Space Park Way\";s:5:\"types\";a:1:{i:0;s:5:\"route\";}}i:2;a:3:{s:9:\"long_name\";s:13:\"Mountain View\";s:10:\"short_name\";s:13:\"Mountain View\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:3;a:3:{s:9:\"long_name\";s:18:\"Santa Clara County\";s:10:\"short_name\";s:18:\"Santa Clara County\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_2\";i:1;s:9:\"political\";}}i:4;a:3:{s:9:\"long_name\";s:10:\"California\";s:10:\"short_name\";s:2:\"CA\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:5;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}i:6;a:3:{s:9:\"long_name\";s:5:\"94043\";s:10:\"short_name\";s:5:\"94043\";s:5:\"types\";a:1:{i:0;s:11:\"postal_code\";}}}', 6, 0, 6, 37.416431, -122.069458, 0, 1, 0, 659844, 2, 2, 'test.com', 'dfdfdfdfdfd', 'a:1:{i:0;s:79:\"\'Brand Awareness\': Getting more people to know, recognize, and like your brand.\";}', 2, '0'),
(93, NULL, NULL, 1624346560, 'test model1', 2, 'echohub@gmail.com', '55', 1624346560, NULL, 1, 'testmodel1.com', '1075 Space Park Way, Mountain View, CA 94043, USA', 'a:7:{i:0;a:3:{s:9:\"long_name\";s:4:\"1075\";s:10:\"short_name\";s:4:\"1075\";s:5:\"types\";a:1:{i:0;s:13:\"street_number\";}}i:1;a:3:{s:9:\"long_name\";s:14:\"Space Park Way\";s:10:\"short_name\";s:14:\"Space Park Way\";s:5:\"types\";a:1:{i:0;s:5:\"route\";}}i:2;a:3:{s:9:\"long_name\";s:13:\"Mountain View\";s:10:\"short_name\";s:13:\"Mountain View\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:3;a:3:{s:9:\"long_name\";s:18:\"Santa Clara County\";s:10:\"short_name\";s:18:\"Santa Clara County\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_2\";i:1;s:9:\"political\";}}i:4;a:3:{s:9:\"long_name\";s:10:\"California\";s:10:\"short_name\";s:2:\"CA\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:5;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}i:6;a:3:{s:9:\"long_name\";s:5:\"94043\";s:10:\"short_name\";s:5:\"94043\";s:5:\"types\";a:1:{i:0;s:11:\"postal_code\";}}}', NULL, 0, 0, 37.416431, -122.069458, 0, 1, 0, 659844, 2, 2, 'test.com', NULL, NULL, 1, 'https://echohub.io/video-1624348474250'),
(94, NULL, NULL, 1624348488, 'test model1', 2, 'echohub@gmail.com', '55', 1624348488, NULL, 1, 'testmodel1.com', '1075 Space Park Way, Mountain View, CA 94043, USA', 'a:7:{i:0;a:3:{s:9:\"long_name\";s:4:\"1075\";s:10:\"short_name\";s:4:\"1075\";s:5:\"types\";a:1:{i:0;s:13:\"street_number\";}}i:1;a:3:{s:9:\"long_name\";s:14:\"Space Park Way\";s:10:\"short_name\";s:14:\"Space Park Way\";s:5:\"types\";a:1:{i:0;s:5:\"route\";}}i:2;a:3:{s:9:\"long_name\";s:13:\"Mountain View\";s:10:\"short_name\";s:13:\"Mountain View\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:3;a:3:{s:9:\"long_name\";s:18:\"Santa Clara County\";s:10:\"short_name\";s:18:\"Santa Clara County\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_2\";i:1;s:9:\"political\";}}i:4;a:3:{s:9:\"long_name\";s:10:\"California\";s:10:\"short_name\";s:2:\"CA\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:5;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}i:6;a:3:{s:9:\"long_name\";s:5:\"94043\";s:10:\"short_name\";s:5:\"94043\";s:5:\"types\";a:1:{i:0;s:11:\"postal_code\";}}}', NULL, 1, 0, 37.416431, -122.069458, 0, 1, 0, 659844, 2, 2, 'test.com', NULL, NULL, 1, 'https://echohub.io/video-1624348474250'),
(95, NULL, NULL, 1626126769, 'dfdfdfd dfd ', 2, 'test1234@gmail.com', '55', 1626126769, NULL, 1, 'test.com', 'Santiago Villa, 1075 Space Park Way, Mountain View, CA 94043, USA', 'a:8:{i:0;a:3:{s:9:\"long_name\";s:14:\"Santiago Villa\";s:10:\"short_name\";s:14:\"Santiago Villa\";s:5:\"types\";a:5:{i:0;s:10:\"campground\";i:1;s:13:\"establishment\";i:2;s:7:\"lodging\";i:3;s:4:\"park\";i:4;s:17:\"point_of_interest\";}}i:1;a:3:{s:9:\"long_name\";s:4:\"1075\";s:10:\"short_name\";s:4:\"1075\";s:5:\"types\";a:1:{i:0;s:13:\"street_number\";}}i:2;a:3:{s:9:\"long_name\";s:14:\"Space Park Way\";s:10:\"short_name\";s:14:\"Space Park Way\";s:5:\"types\";a:1:{i:0;s:5:\"route\";}}i:3;a:3:{s:9:\"long_name\";s:13:\"Mountain View\";s:10:\"short_name\";s:13:\"Mountain View\";s:5:\"types\";a:2:{i:0;s:8:\"locality\";i:1;s:9:\"political\";}}i:4;a:3:{s:9:\"long_name\";s:18:\"Santa Clara County\";s:10:\"short_name\";s:18:\"Santa Clara County\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_2\";i:1;s:9:\"political\";}}i:5;a:3:{s:9:\"long_name\";s:10:\"California\";s:10:\"short_name\";s:2:\"CA\";s:5:\"types\";a:2:{i:0;s:27:\"administrative_area_level_1\";i:1;s:9:\"political\";}}i:6;a:3:{s:9:\"long_name\";s:13:\"United States\";s:10:\"short_name\";s:2:\"US\";s:5:\"types\";a:2:{i:0;s:7:\"country\";i:1;s:9:\"political\";}}i:7;a:3:{s:9:\"long_name\";s:5:\"94043\";s:10:\"short_name\";s:5:\"94043\";s:5:\"types\";a:1:{i:0;s:11:\"postal_code\";}}}', 6, 1, 0, 37.416431, -122.069458, 0, 1, 0, 642780, 2, 2, 'ddfdfdf', NULL, NULL, 2, 'https://echohub.io/video-1626126759683');

-- --------------------------------------------------------

--
-- Table structure for table `usersIdentityPictures`
--

CREATE TABLE `usersIdentityPictures` (
  `id` bigint(20) NOT NULL,
  `filename` varchar(50) NOT NULL,
  `uploadDate` int(11) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usersIdentityPictures`
--

INSERT INTO `usersIdentityPictures` (`id`, `filename`, `uploadDate`, `email`) VALUES
(22, 'photo-1616568000667', 1616568000, 'hh@gmail.com'),
(23, 'photo-1622796655531', 1622796655, '2clickorg@gmail.com'),
(24, 'photo-1623828761942', 1623828762, 'hhh@gmail.com'),
(32, 'photo-1623966883113', 1623966883, 'hhh@gmail.com'),
(33, 'photo-1623969141909', 1623969141, 'hhh@gmail.com'),
(34, 'photo-1626127671555', 1626127671, 'testbl@gmail.com'),
(35, 'photo-1626152865233', 1626152865, 'testbl@gmail.com'),
(36, 'photo-1626153672540', 1626153672, 'testbl@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `usersvideo`
--

CREATE TABLE `usersvideo` (
  `id` bigint(20) NOT NULL,
  `url` varchar(255) NOT NULL,
  `project_id` bigint(20) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `date` bigint(20) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '2' COMMENT 'approved 1,under consideration 2,banned 3 ',
  `type` varchar(50) NOT NULL DEFAULT 'youtube'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usersvideo`
--

INSERT INTO `usersvideo` (`id`, `url`, `project_id`, `user_email`, `date`, `status`, `type`) VALUES
(52, 'https://www.instagram.com/stories/zhibek_in_cali/2494901091968542110/', 76, 'hh@gmail.com', 1614510288, 1, 'Instagram'),
(53, 'https://www.facebook.com/bboyworld/videos/1112624789198329', 76, 'hh@gmail.com', 1614510316, 1, 'Facebook'),
(54, 'https://www.youtube.com/watch?v=dRcIZwKX3-k', 76, 'hh@gmail.com', 1614510327, 1, 'Youtube'),
(57, 'https://twitter.com/tombrady/status/1353580080623210498', 76, 'hh@gmail.com', 1614513670, 1, 'Twitter'),
(58, 'https://www.instagram.com/stories/zhibek_in_cali/2494901091968342110/', 76, 'testblogger@gmail.com', 1614515175, 2, 'Instagram'),
(59, 'https://www.facebook.com/bboyworld/videos/1112114789198329', 76, 'testblogger@gmail.com', 1614515194, 2, 'Facebook'),
(60, 'https://www.youtube.com/watch?v=dRcIZwUX3-k', 76, 'testblogger@gmail.com', 1614515206, 2, 'Youtube'),
(62, 'https://www.instagram.com/stories/zhibek_in_cali/2494901091968542110/', 75, 'hh@gmail.com', 1614861532, 1, 'Instagram'),
(63, 'https://www.facebook.com/bboyworld/videos/1112624789198329', 75, 'hh@gmail.com', 1614861540, 1, 'Facebook'),
(64, 'https://www.youtube.com/watch?v=dRcIZwKX3-k', 75, 'hh@gmail.com', 1614861546, 1, 'Youtube'),
(66, 'https://twitter.com/tombrady/status/1353580080623210498', 75, 'hh@gmail.com', 1614861837, 1, 'Twitter'),
(74, 'https://www.instagram.com/wealth/sdsdsdsd', 94, 'hhh@gmail.com', 1624353169, 1, 'Instagram');

-- --------------------------------------------------------

--
-- Table structure for table `views`
--

CREATE TABLE `views` (
  `id` bigint(20) NOT NULL,
  `date` bigint(20) NOT NULL,
  `ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `hash` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `views`
--

INSERT INTO `views` (`id`, `date`, `ip`, `hash`) VALUES
(13, 1613054539609, '73.158.191.9', '39yEUiVoT4nYp9bvqUywD7');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accountAgePoints`
--
ALTER TABLE `accountAgePoints`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `appParams`
--
ALTER TABLE `appParams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `AppStatus`
--
ALTER TABLE `AppStatus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `businessCategories`
--
ALTER TABLE `businessCategories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `businessGoals`
--
ALTER TABLE `businessGoals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `carddata`
--
ALTER TABLE `carddata`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `complete_approve_task`
--
ALTER TABLE `complete_approve_task`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `complete_task`
--
ALTER TABLE `complete_task`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Contacts`
--
ALTER TABLE `Contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `countryPrices`
--
ALTER TABLE `countryPrices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `currency`
--
ALTER TABLE `currency`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `downloadVideoLinks`
--
ALTER TABLE `downloadVideoLinks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `EmailTasks`
--
ALTER TABLE `EmailTasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `FavoritefromUsersData`
--
ALTER TABLE `FavoritefromUsersData`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `followersCount`
--
ALTER TABLE `followersCount`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `followersViews`
--
ALTER TABLE `followersViews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `instructions`
--
ALTER TABLE `instructions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `investors`
--
ALTER TABLE `investors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Messages`
--
ALTER TABLE `Messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payout`
--
ALTER TABLE `payout`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `raiting`
--
ALTER TABLE `raiting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rejected_task`
--
ALTER TABLE `rejected_task`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sendmessages`
--
ALTER TABLE `sendmessages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `social_network_list`
--
ALTER TABLE `social_network_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `TempTokens`
--
ALTER TABLE `TempTokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `TimesLogs`
--
ALTER TABLE `TimesLogs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `uniquenames`
--
ALTER TABLE `uniquenames`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `UserApproveTasks`
--
ALTER TABLE `UserApproveTasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usersarticles`
--
ALTER TABLE `usersarticles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `UsersData`
--
ALTER TABLE `UsersData`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usersIdentityPictures`
--
ALTER TABLE `usersIdentityPictures`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usersvideo`
--
ALTER TABLE `usersvideo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `views`
--
ALTER TABLE `views`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accountAgePoints`
--
ALTER TABLE `accountAgePoints`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `appParams`
--
ALTER TABLE `appParams`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `AppStatus`
--
ALTER TABLE `AppStatus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `businessCategories`
--
ALTER TABLE `businessCategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `businessGoals`
--
ALTER TABLE `businessGoals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `carddata`
--
ALTER TABLE `carddata`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `complete_approve_task`
--
ALTER TABLE `complete_approve_task`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `complete_task`
--
ALTER TABLE `complete_task`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT for table `Contacts`
--
ALTER TABLE `Contacts`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `countryPrices`
--
ALTER TABLE `countryPrices`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `currency`
--
ALTER TABLE `currency`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `downloadVideoLinks`
--
ALTER TABLE `downloadVideoLinks`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `EmailTasks`
--
ALTER TABLE `EmailTasks`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `FavoritefromUsersData`
--
ALTER TABLE `FavoritefromUsersData`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `followersCount`
--
ALTER TABLE `followersCount`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `followersViews`
--
ALTER TABLE `followersViews`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `instructions`
--
ALTER TABLE `instructions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `investors`
--
ALTER TABLE `investors`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Messages`
--
ALTER TABLE `Messages`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1024;

--
-- AUTO_INCREMENT for table `payout`
--
ALTER TABLE `payout`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `raiting`
--
ALTER TABLE `raiting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `rejected_task`
--
ALTER TABLE `rejected_task`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=149;

--
-- AUTO_INCREMENT for table `sendmessages`
--
ALTER TABLE `sendmessages`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `social_network_list`
--
ALTER TABLE `social_network_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `TempTokens`
--
ALTER TABLE `TempTokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `TimesLogs`
--
ALTER TABLE `TimesLogs`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `uniquenames`
--
ALTER TABLE `uniquenames`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `UserApproveTasks`
--
ALTER TABLE `UserApproveTasks`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `usersarticles`
--
ALTER TABLE `usersarticles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `UsersData`
--
ALTER TABLE `UsersData`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT for table `usersIdentityPictures`
--
ALTER TABLE `usersIdentityPictures`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `usersvideo`
--
ALTER TABLE `usersvideo`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `views`
--
ALTER TABLE `views`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
