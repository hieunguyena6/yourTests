-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th9 14, 2019 lúc 09:18 PM
-- Phiên bản máy phục vụ: 5.7.27-0ubuntu0.18.04.1
-- Phiên bản PHP: 7.2.19-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `test`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `answers`
--

CREATE TABLE `answers` (
  `a_id` int(10) NOT NULL,
  `q_id` int(10) DEFAULT NULL,
  `a_data` varchar(300) DEFAULT NULL,
  `a_true` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `do_test`
--

CREATE TABLE `do_test` (
  `u_id` int(6) DEFAULT NULL,
  `t_id` int(10) DEFAULT NULL,
  `mark` double(2,1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `questions`
--

CREATE TABLE `questions` (
  `q_id` int(10) NOT NULL,
  `u_id` int(6) NOT NULL,
  `q_content` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `q_types`
--

CREATE TABLE `q_types` (
  `q_id` int(10) DEFAULT NULL,
  `q_subClass` varchar(20) DEFAULT NULL,
  `q_level` varchar(20) DEFAULT NULL,
  `q_ansType` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tests`
--

CREATE TABLE `tests` (
  `t_id` int(10) NOT NULL,
  `u_id` int(10) NOT NULL,
  `t_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tests_questions`
--

CREATE TABLE `tests_questions` (
  `t_id` int(10) DEFAULT NULL,
  `q_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `u_id` int(6) NOT NULL,
  `u_userName` varchar(28) NOT NULL,
  `u_email` varchar(50) NOT NULL,
  `u_password` varchar(50) NOT NULL,
  `u_role` varchar(20) NOT NULL,
  `u_firstName` varchar(20) NOT NULL,
  `u_lastName` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
-- Chỉ mục cho bảng `do_test`
--
ALTER TABLE `do_test`
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
  ADD KEY `q_id` (`q_id`);

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
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`u_id`,'u_email');

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `answers`
--
ALTER TABLE `answers`
  MODIFY `a_id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `questions`
--
ALTER TABLE `questions`
  MODIFY `q_id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `tests`
--
ALTER TABLE `tests`
  MODIFY `t_id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `u_id` int(6) NOT NULL AUTO_INCREMENT;
--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`q_id`) REFERENCES `questions` (`q_id`);

--
-- Các ràng buộc cho bảng `do_test`
--
ALTER TABLE `do_test`
  ADD CONSTRAINT `do_test_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `users` (`u_id`),
  ADD CONSTRAINT `do_test_ibfk_2` FOREIGN KEY (`t_id`) REFERENCES `tests` (`t_id`);

--
-- Các ràng buộc cho bảng `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `u_q` FOREIGN KEY (`u_id`) REFERENCES `users` (`u_id`);

--
-- Các ràng buộc cho bảng `q_types`
--
ALTER TABLE `q_types`
  ADD CONSTRAINT `q_types_ibfk_1` FOREIGN KEY (`q_id`) REFERENCES `questions` (`q_id`);

--
-- Các ràng buộc cho bảng `tests`
--
ALTER TABLE `tests`
  ADD CONSTRAINT `tests_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `users` (`u_id`);

--
-- Các ràng buộc cho bảng `tests_questions`
--
ALTER TABLE `tests_questions`
  ADD CONSTRAINT `tests_questions_ibfk_1` FOREIGN KEY (`t_id`) REFERENCES `tests` (`t_id`),
  ADD CONSTRAINT `tests_questions_ibfk_2` FOREIGN KEY (`q_id`) REFERENCES `questions` (`q_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
