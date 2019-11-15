-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th10 15, 2019 lúc 11:11 AM
-- Phiên bản máy phục vụ: 10.3.16-MariaDB
-- Phiên bản PHP: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `yourtests`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `answers`
--

CREATE TABLE `answers` (
  `a_id` int(10) NOT NULL,
  `q_id` int(10) DEFAULT NULL,
  `a_data` varchar(300) DEFAULT NULL,
  `a_true` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `answers`
--

INSERT INTO `answers` (`a_id`, `q_id`, `a_data`, `a_true`) VALUES
(1, 14, '2', 1),
(2, 14, '3', 0),
(3, 14, '4', 0),
(4, 14, '5', 0),
(5, 30, '1', 1),
(6, 31, '1', 1),
(7, 32, '1111', 1),
(8, 32, '222', 0),
(9, 32, '333', 0),
(10, 32, '4444', 0),
(11, 33, '11111111111', 0),
(12, 33, '22222222222', 0),
(13, 33, '33333333333', 0),
(14, 33, '44444444444', 1),
(15, 34, '111111111', 0),
(16, 34, '2222222222222', 0),
(17, 34, '3333333333333', 1),
(18, 34, '33444444444444444', 0),
(19, 36, '1111', 1),
(20, 36, '22', 0),
(21, 36, '333', 1),
(22, 36, '444', 1),
(23, 36, '', 0),
(24, 36, '', 0),
(25, 36, '', 0),
(26, 36, '', 0),
(27, 36, '', 0),
(28, 36, '', 0),
(29, 37, '2', 0),
(30, 37, '33', 0),
(31, 37, '44', 0),
(32, 37, '4445', 0),
(33, 37, '', 0),
(34, 37, '', 0),
(35, 37, '', 0),
(36, 37, '', 0),
(37, 37, '', 0),
(38, 37, '', 0),
(39, 38, '2', 0),
(40, 38, '3', 0),
(41, 38, '4', 0),
(42, 38, '5', 0),
(43, 38, '', 0),
(44, 38, '', 0),
(45, 38, '', 0),
(46, 38, '', 0),
(47, 38, '', 0),
(48, 38, '', 0),
(49, 39, '1111', 0),
(50, 39, '222', 0),
(51, 39, '33', 0),
(52, 39, '444', 0),
(53, 40, '2', 0),
(54, 40, '3', 0),
(55, 40, '4', 0),
(56, 40, '5', 0),
(57, 41, '112', 0),
(58, 41, '2323', 1),
(59, 41, '444', 1),
(60, 42, '1', 1),
(61, 42, '2', 0),
(62, 42, '4', 0),
(63, 42, '4', 0),
(64, 43, '2', 0),
(65, 43, '4', 0),
(66, 43, '5', 0),
(67, 43, '6', 1),
(68, 44, '1', 1),
(69, 45, '1', 1),
(70, 46, '1', 1),
(71, 47, '1', 1),
(72, 48, '0', 0),
(73, 49, '1', 1),
(74, 50, '1', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `do_detail`
--

CREATE TABLE `do_detail` (
  `do_id` int(10) DEFAULT NULL,
  `q_id` int(10) DEFAULT NULL,
  `answers` varchar(500) COLLATE utf8_vietnamese_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `do_test`
--

CREATE TABLE `do_test` (
  `do_id` int(10) NOT NULL,
  `u_id` int(6) DEFAULT NULL,
  `t_id` int(10) DEFAULT NULL,
  `mark` int(3) DEFAULT NULL,
  `timeRemain` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `questions`
--

CREATE TABLE `questions` (
  `q_id` int(10) NOT NULL,
  `u_id` int(6) NOT NULL,
  `q_content` varchar(1000) DEFAULT NULL,
  `q_type` tinyint(4) DEFAULT NULL,
  `q_linhvuc` char(15) DEFAULT NULL,
  `q_level` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `questions`
--

INSERT INTO `questions` (`q_id`, `u_id`, `q_content`, `q_type`, `q_linhvuc`, `q_level`) VALUES
(1, 1, '11111111', 1, 'toan', NULL),
(2, 1, NULL, 2, 'toan', NULL),
(3, 1, NULL, 2, 'toan', NULL),
(4, 1, '22222', 2, 'toan', NULL),
(5, 1, 'đại số', 1, 'khac', NULL),
(6, 1, '1', 2, 'toan', NULL),
(7, 1, '1', 2, 'toan', NULL),
(8, 1, '123', 2, 'toan', NULL),
(9, 1, '111111', 2, 'toan', NULL),
(10, 1, 'hajau ngu', 2, 'toan', NULL),
(11, 1, '1', 2, 'toan', NULL),
(12, 1, '1', 2, 'toan', NULL),
(13, 1, 'a', 2, 'toan', NULL),
(14, 1, '12', 2, 'toan', NULL),
(15, 1, '1', 3, 'toan', NULL),
(16, 1, '11111111', NULL, 'toan', NULL),
(17, 1, '11111111', NULL, 'toan', NULL),
(18, 1, '1', 2, 'toan', NULL),
(19, 2, '', NULL, NULL, NULL),
(20, 2, '', NULL, 'toan', NULL),
(21, 2, '', NULL, 'toan', NULL),
(22, 2, '', NULL, 'toan', NULL),
(23, 2, '', NULL, 'toan', NULL),
(24, 2, '', NULL, 'toan', NULL),
(25, 2, '', NULL, 'toan', NULL),
(26, 2, '', NULL, 'toan', NULL),
(27, 2, 'âaaaaa', 1, 'khac', 'de'),
(28, 5, 'aaaaaaaa', 1, 'khac', 'de'),
(29, 2, 'abcd', 1, 'toan', 'de'),
(30, 2, 'aaaaaaaaa', 1, 'toan', 'de'),
(31, 2, 'âaaaaaaa', 1, 'khac', 'de'),
(32, 2, 'aaaaaaaaaa', 2, 'toan', NULL),
(33, 2, '1234', 2, '12', 'de'),
(34, 2, '123456765432', 2, 'toan', 'de'),
(35, 2, 'adsfbgfsdvdbb f', NULL, 'aaaa', 'de'),
(36, 2, '11111', 3, 'toan', 'de'),
(37, 2, '111', 3, 'toan', 'de'),
(38, 2, '1111', 3, 'toan', 'de'),
(39, 2, '112122', 3, 'toan', 'de'),
(40, 2, '1111', 3, 'toan', 'de'),
(41, 2, '11212', 3, 'toan', 'de'),
(42, 2, 'hello', 2, 'toan', 'de'),
(43, 2, 'hello', 2, 'anh', 'tb'),
(44, 2, 'hello', 1, 'ly', 'tb'),
(45, 2, 'Hello là xin chào ? ', 1, 'anh', 'kho'),
(46, 2, 'Hello là xin chào ? ', 1, 'anh', 'kho'),
(47, 2, 'abcxyz', 1, 'anh', 'de'),
(48, 2, 'hello world', 1, 'toan', 'de'),
(49, 11, 'aaaa', 1, 'toan', 'de'),
(50, 11, 'bnb', 1, 'toan', 'de');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `q_types`
--

CREATE TABLE `q_types` (
  `q_id` int(10) DEFAULT NULL,
  `q_subClass` varchar(20) DEFAULT NULL,
  `q_ansType` varchar(20) DEFAULT NULL,
  `u_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reports`
--

CREATE TABLE `reports` (
  `t_id` int(10) DEFAULT NULL,
  `u_idto` int(10) DEFAULT NULL,
  `r_content` varchar(500) COLLATE utf8_vietnamese_ci DEFAULT NULL,
  `u_idfrom` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tests`
--

CREATE TABLE `tests` (
  `t_id` int(6) NOT NULL,
  `u_id` int(10) NOT NULL,
  `t_name` varchar(100) DEFAULT NULL,
  `t_time` int(11) DEFAULT NULL,
  `t_timeCreate` datetime DEFAULT NULL,
  `t_password` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tests`
--

INSERT INTO `tests` (`t_id`, `u_id`, `t_name`, `t_time`, `t_timeCreate`, `t_password`) VALUES
(9, 2, 'Kiểm tra giữa kỳ', 60, '2019-11-01 23:09:01', '123456'),
(12, 2, 'test', 15, '2019-11-02 12:58:03', ''),
(13, 2, 'h', 20, '2019-11-02 13:00:59', ''),
(14, 2, 'hello', 25, '2019-11-02 13:02:12', ''),
(15, 2, 'hello', 14, '2019-11-02 13:11:01', NULL),
(17, 2, '2', 25, '2019-11-05 15:14:29', '123456'),
(18, 11, '1', 1, '2019-11-05 15:24:21', NULL),
(19, 2, '123', 12, '2019-11-05 17:35:12', '123'),
(20, 2, 'hieunguyen', 20, '2019-11-06 21:41:31', '12345'),
(21, 2, 'hello world', 1, '2019-11-07 22:06:04', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tests_questions`
--

CREATE TABLE `tests_questions` (
  `t_id` int(10) DEFAULT NULL,
  `q_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tests_questions`
--

INSERT INTO `tests_questions` (`t_id`, `q_id`) VALUES
(4, 30),
(4, 34),
(5, 30),
(5, 32),
(5, 34),
(6, 30),
(6, 32),
(7, 30),
(7, 32),
(7, 33),
(7, 34),
(8, 30),
(8, 32),
(8, 33),
(8, 37),
(8, 40),
(9, 31),
(9, 36),
(9, 38),
(9, 41),
(10, 31),
(10, 33),
(10, 37),
(11, 32),
(11, 33),
(11, 34),
(12, 33),
(12, 36),
(12, 38),
(13, 30),
(13, 31),
(13, 32),
(14, 30),
(14, 31),
(15, 30),
(15, 31),
(15, 32),
(15, 33),
(16, 30),
(16, 31),
(16, 32),
(17, 30),
(17, 31),
(17, 32),
(17, 33),
(18, 50),
(18, 49),
(19, 30),
(19, 31),
(19, 32),
(19, 33),
(19, 34),
(19, 36),
(20, 30),
(20, 31),
(20, 32),
(20, 33),
(20, 34),
(20, 36),
(20, 37),
(20, 38),
(20, 39),
(20, 40),
(20, 41),
(20, 42),
(20, 44),
(20, 45),
(20, 47),
(20, 48),
(21, 30),
(21, 31),
(22, 30),
(22, 32),
(22, 36);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `t_types`
--

CREATE TABLE `t_types` (
  `t_id` int(10) DEFAULT NULL,
  `t_time` time DEFAULT NULL,
  `t_subClass` varchar(100) COLLATE utf8_vietnamese_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_vietnamese_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `u_id` int(6) NOT NULL,
  `u_email` varchar(50) NOT NULL,
  `u_password` varchar(50) NOT NULL,
  `u_role` varchar(20) NOT NULL,
  `u_firstName` varchar(20) NOT NULL,
  `u_lastName` varchar(20) NOT NULL,
  `u_description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`u_id`, `u_email`, `u_password`, `u_role`, `u_firstName`, `u_lastName`, `u_description`) VALUES
(1, '1@ae', '1234', '0', 'Trương', 'Hoàng', NULL),
(2, 'member1@gmail.com', '123456', '0', 'Nguyen', 'Hieu', ''),
(3, 'hieunguyena6@gmail.com', '12', '0', 'Nguyen', 'Hieu', NULL),
(4, 'member2@gmail.com', '123456', '0', 'Nguyen', 'Hieu', NULL),
(5, '12@gmail.com', '123456', '0', 'Nguyen', 'Hieu', NULL),
(11, 'abc@gmail.com', '123456', '0', 'v', 'a', NULL),
(12, 'admin@admin', 'admin', '1', 'Admin', 'Admin', NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`a_id`),
  ADD KEY `q_id` (`q_id`);

--
-- Chỉ mục cho bảng `do_detail`
--
ALTER TABLE `do_detail`
  ADD KEY `do_id` (`do_id`),
  ADD KEY `q_id` (`q_id`);

--
-- Chỉ mục cho bảng `do_test`
--
ALTER TABLE `do_test`
  ADD PRIMARY KEY (`do_id`),
  ADD KEY `u_id` (`u_id`),
  ADD KEY `t_id` (`t_id`);

--
-- Chỉ mục cho bảng `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`q_id`),
  ADD KEY `u_q` (`u_id`);

--
-- Chỉ mục cho bảng `q_types`
--
ALTER TABLE `q_types`
  ADD KEY `q_id` (`q_id`),
  ADD KEY `u_id` (`u_id`);

--
-- Chỉ mục cho bảng `reports`
--
ALTER TABLE `reports`
  ADD KEY `t_id` (`t_id`),
  ADD KEY `u_idreport` (`u_idto`),
  ADD KEY `u_idfrom` (`u_idfrom`);

--
-- Chỉ mục cho bảng `tests`
--
ALTER TABLE `tests`
  ADD PRIMARY KEY (`t_id`),
  ADD KEY `u_id` (`u_id`);

--
-- Chỉ mục cho bảng `tests_questions`
--
ALTER TABLE `tests_questions`
  ADD KEY `t_id` (`t_id`),
  ADD KEY `q_id` (`q_id`);

--
-- Chỉ mục cho bảng `t_types`
--
ALTER TABLE `t_types`
  ADD KEY `t_id` (`t_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`u_id`),
  ADD UNIQUE KEY `u_email` (`u_email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `answers`
--
ALTER TABLE `answers`
  MODIFY `a_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT cho bảng `do_test`
--
ALTER TABLE `do_test`
  MODIFY `do_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `questions`
--
ALTER TABLE `questions`
  MODIFY `q_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT cho bảng `tests`
--
ALTER TABLE `tests`
  MODIFY `t_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `u_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `do_detail`
--
ALTER TABLE `do_detail`
  ADD CONSTRAINT `do_detail_ibfk_1` FOREIGN KEY (`do_id`) REFERENCES `do_test` (`do_id`),
  ADD CONSTRAINT `do_detail_ibfk_2` FOREIGN KEY (`q_id`) REFERENCES `questions` (`q_id`);

--
-- Các ràng buộc cho bảng `do_test`
--
ALTER TABLE `do_test`
  ADD CONSTRAINT `do_test_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `users` (`u_id`),
  ADD CONSTRAINT `do_test_ibfk_2` FOREIGN KEY (`t_id`) REFERENCES `tests` (`t_id`);

--
-- Các ràng buộc cho bảng `q_types`
--
ALTER TABLE `q_types`
  ADD CONSTRAINT `q_types_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `users` (`u_id`);

--
-- Các ràng buộc cho bảng `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`t_id`) REFERENCES `tests` (`t_id`),
  ADD CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`u_idto`) REFERENCES `users` (`u_id`),
  ADD CONSTRAINT `reports_ibfk_3` FOREIGN KEY (`u_idfrom`) REFERENCES `users` (`u_id`);

--
-- Các ràng buộc cho bảng `t_types`
--
ALTER TABLE `t_types`
  ADD CONSTRAINT `t_types_ibfk_1` FOREIGN KEY (`t_id`) REFERENCES `tests` (`t_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
