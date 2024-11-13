-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 13, 2024 at 10:19 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bd_voting`
--

-- --------------------------------------------------------

--
-- Table structure for table `campaigns`
--

CREATE TABLE `campaigns` (
  `campaign_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `campaigns`
--

INSERT INTO `campaigns` (`campaign_id`, `name`, `description`, `start_date`, `end_date`, `created_at`, `updated_at`, `image_url`) VALUES
(12, 'Futuro Joven', 'Una campaña que promueve la innovación en el ámbito educativo, enfocándose en mejorar las oportunidades tecnológicas y de desarrollo personal para los estudiantes.', '2024-09-01 08:19:00', '2024-10-01 08:19:00', '2024-09-26 13:19:58', '2024-10-11 02:39:38', '/uploads/12_campaign/uploaded_file.jpg'),
(13, 'Voces por la Educación', 'Iniciativa que busca mejorar el acceso a la educación de calidad en comunidades rurales, ofreciendo recursos educativos y capacitación a maestros.', '2024-10-11 14:28:00', '2024-11-30 14:28:00', '2024-09-26 19:28:42', '2024-10-10 19:39:00', '/uploads/13_campaign/uploaded_file.jpg'),
(14, ' Unidos por el Cambio', 'Campaña que busca fomentar la inclusión y la igualdad en la comunidad estudiantil, promoviendo la participación activa de todos los grupos en la toma de decisiones.', '2024-09-14 14:31:00', '2024-11-02 14:31:00', '2024-09-26 19:32:04', '2024-10-10 19:41:12', '/uploads/14_campaign/uploaded_file.jpg'),
(16, 'Estudiantes al Frente', 'Iniciativa centrada en poner a los estudiantes como protagonistas en la toma de decisiones, mejorando la comunicación entre el alumnado y los directivos.', '2024-10-07 17:21:00', '2024-10-23 17:21:00', '2024-10-03 22:21:34', '2024-10-10 19:42:09', '/uploads/16_campaign/uploaded_file.jpg'),
(17, 'Juntos por el Progreso', 'Enfocada en la colaboración y el trabajo en equipo, esta campaña busca avanzar en temas de sostenibilidad, tecnología y mejores oportunidades para los estudiantes.', '2024-10-11 19:14:00', '2024-11-02 19:14:00', '2024-10-04 00:14:13', '2024-10-10 19:42:46', '/uploads/17_campaign/uploaded_file.jpg'),
(18, 'Transformación Estudiantil', 'Un llamado a la renovación y transformación de las estructuras de gobierno estudiantil, proponiendo una administración más eficiente y transparente.', '2024-10-10 19:15:00', '2024-10-19 19:15:00', '2024-10-04 00:15:25', '2024-10-10 19:59:25', '/uploads/18_campaign/uploaded_file.jpg'),
(19, 'Elecciones Presidenciales 2025', 'campaña prueba', '2024-11-10 13:01:00', '2024-11-16 13:01:00', '2024-11-13 18:01:35', '2024-11-13 20:34:04', '/uploads/19_campaign/uploaded_file.png');

-- --------------------------------------------------------

--
-- Table structure for table `campaign_keys`
--

CREATE TABLE `campaign_keys` (
  `key_id` int(11) NOT NULL,
  `campaign_id` int(11) NOT NULL,
  `public_key` text NOT NULL,
  `private_key` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `campaign_keys`
--

INSERT INTO `campaign_keys` (`key_id`, `campaign_id`, `public_key`, `private_key`) VALUES
(1, 19, '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApSPlPBEItCMEtl6Ub9C7\nYB6Xjs33L2snVkan357hYpr1leUM6a4h1TJJIJIkpGE2wCrk8KujiouPnr/tZUCl\nM/4KdM+T06n6XbNnbTfICujJ/m4+fM7/SQwtzq1SjcSvf1NV27CrvHmqXRHU8jfJ\nuYtPrLHVa4+ddLIEpl97JuDIh1jw4970MFAqG6txjyLR6VMPP4woQNbGqsS/tryu\nE5hAR67MgdXSHu1Q9+Kq7yL3WiZT/MjYNo/jqLlAurvtX4RjAusPRlY6RunZ9EZO\nXw8EDsfvWEJRQaa9Bys8E8sfqwLbWoNSVDwvlu6pBl6ImcHW9Zsgso1izPLZ4FMz\n3wIDAQAB\n-----END PUBLIC KEY-----\n', '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQClI+U8EQi0IwS2\nXpRv0LtgHpeOzfcvaydWRqffnuFimvWV5QzpriHVMkkgkiSkYTbAKuTwq6OKi4+e\nv+1lQKUz/gp0z5PTqfpds2dtN8gK6Mn+bj58zv9JDC3OrVKNxK9/U1XbsKu8eapd\nEdTyN8m5i0+ssdVrj510sgSmX3sm4MiHWPDj3vQwUCobq3GPItHpUw8/jChA1saq\nxL+2vK4TmEBHrsyB1dIe7VD34qrvIvdaJlP8yNg2j+OouUC6u+1fhGMC6w9GVjpG\n6dn0Rk5fDwQOx+9YQlFBpr0HKzwTyx+rAttag1JUPC+W7qkGXoiZwdb1myCyjWLM\n8tngUzPfAgMBAAECggEABQYNhYFDJtpgh1JjPkThnlqajlvnpsf3X2GGM9WifPHC\ngiKAp7nbX5/y/OGqlFw8t9CA5xgMQT0I9nGs6Bqfq/A7eIg5XVlbZhmnY3mB8AsF\nh2Q/1GN7p/ON5S6n8etyJ0kYCzcu/Ox6k/A57nsR+5SoV37lbis6mqqGXQVPOsR+\nlJaWCeSOTsN+U1oakeUOEBMz3ziqrIn1vaRyI3pb+Y8p79IZWjGTV+oma03JMqHk\nvR08iKsyFsU1XNFMlEmFDjnUr+PdYzrU+LIvdxxZc1fB2sWBmcBeOfpY/ZJYtGrO\ngUwcBQ1gxc8a3MWapQv1pqDGk4QsWI0+C3E4hRtZYQKBgQDdYv21Mne23HCNAn9F\nSZNEN3dbIYuRM8viuLWjO7y5Gd3XBFbO9s7UDDlu8GozAxPjl265ZmgYVfE8OoC2\nqH9wSUO69b6yBke12hVDG4LsaFsevTwgsC+zuYwdBaYWrvZV9aFgOqDBCI57D24O\nFSpfakwOIhX4JH8It89bh4oNDwKBgQC+9aNGPxZ9JcIcilRJ5BsCL4jCfLJ9TOhb\nHXqziguKfnuZddiA0poT1tg40QrqfiGQGZve04jCBZr/r3O6BSBH36bLL2MSl01e\nLYF9THBGOX2C+g4MpNLivb8/Eb3dxfgnC/nxy1encXIfuMsc+jNCEEnB8L5RKq3t\ncsF7ORYMMQKBgGeWbxH+qEdWxA8m0PhRoee0cFOi0ZRCgS73sH3NcNPHh6aZMCkt\nEL/lbGY9deOimAbRD40OnrxsUjEVSq6tDtwyW8+6Nt1D1QABKBu7XrpRZflvIBhH\neDqHIkleIEXS3g6AnV7Sb++CmnB4Ws2aF7aHnUirqE3wfcRNhWfVdsH/AoGBAK10\n3uzOHZVsGNhn5oyAAPCJUQao0lDy7RTmwDAZssYIgikxXIoXwxFGVH23lNzP2ZjV\nSjqrl0v2X4blTo+oXFwtEYr67llSylpDp52zM0D2s8Wncd+WUGDZzsBxUzABxZli\nTZWPCX31lJ6v8v/NXYYi2XyrO5Tq2bYYSRuvDRHhAoGAK/maGD2Z/6g5Fjs4NCwp\nd9OU91O3Hla8wzSdO+1WLBmx3ZOq4Cqx4toL0CKEh2bhddNDmVIGV3mrmOr18ROn\nRZ00YeyPFDI66Zd356jahC5lO4hQ03/jbx+A4WE/evrWiVrciEPzzFF8ixX8r6oz\n0EWarDlhGrcYDnOdbjOAs1o=\n-----END PRIVATE KEY-----\n');

-- --------------------------------------------------------

--
-- Table structure for table `candidates`
--

CREATE TABLE `candidates` (
  `candidate_id` int(11) NOT NULL,
  `person_id` int(11) NOT NULL,
  `campaign_id` int(11) NOT NULL,
  `political_party` varchar(100) DEFAULT NULL,
  `campaign_slogan` text DEFAULT NULL,
  `biography` text DEFAULT NULL,
  `social_media_links` text DEFAULT NULL,
  `is_approved` enum('true','false') DEFAULT 'false'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `candidates`
--

INSERT INTO `candidates` (`candidate_id`, `person_id`, `campaign_id`, `political_party`, `campaign_slogan`, `biography`, `social_media_links`, `is_approved`) VALUES
(1, 1, 19, 'Party A', 'For a better tomorrow', 'Experienced leader in the field', 'https://twitter.com/johndoe', 'true'),
(2, 2, 19, 'Party B', 'Change for the future', 'A strong advocate for equality', 'https://twitter.com/janesmith', 'false'),
(3, 3, 19, 'Party A', 'Innovation and growth', 'Tech-savvy candidate with a vision', 'https://twitter.com/alicejohnson', 'true'),
(4, 4, 19, 'Party C', 'Unity in diversity', 'A new voice for the people', 'https://twitter.com/bobwilliams', 'true'),
(5, 5, 19, 'Party B', 'Empowerment through education', 'Passionate about youth empowerment', 'https://twitter.com/carolbrown', 'false'),
(13, 48, 19, 'Voto en Blanco', 'Voto en Blanco', 'Opción de voto en blanco para la campaña.', NULL, 'true');

-- --------------------------------------------------------

--
-- Table structure for table `education_level`
--

CREATE TABLE `education_level` (
  `education_level_id` int(11) NOT NULL,
  `level` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `education_level`
--

INSERT INTO `education_level` (`education_level_id`, `level`) VALUES
(11, 'Primer Semestre'),
(12, 'Segundo Semestre'),
(13, 'Tercer Semestre'),
(14, 'Cuarto Semestre'),
(15, 'Quinto Semestre'),
(16, 'Sexto Semestre'),
(17, 'Séptimo Semestre'),
(18, 'Octavo Semestre'),
(19, 'Noveno Semestre'),
(20, 'Décimo Semestre'),
(21, 'Undécimo Semestre'),
(22, 'Duodécimo Semestre');

-- --------------------------------------------------------

--
-- Table structure for table `encrypted_votes`
--

CREATE TABLE `encrypted_votes` (
  `encrypted_vote_id` int(11) NOT NULL,
  `campaign_id` int(11) DEFAULT NULL,
  `encrypted_vote` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gender`
--

CREATE TABLE `gender` (
  `gender_id` int(11) NOT NULL,
  `gender` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gender`
--

INSERT INTO `gender` (`gender_id`, `gender`) VALUES
(7, 'Masculino'),
(8, 'Femenino'),
(9, 'No Binario'),
(10, 'Prefiere no decirlo');

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `location_id` int(11) NOT NULL,
  `country` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `marital_status`
--

CREATE TABLE `marital_status` (
  `marital_status_id` int(11) NOT NULL,
  `status_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `marital_status`
--

INSERT INTO `marital_status` (`marital_status_id`, `status_name`) VALUES
(1, 'Soltero'),
(2, 'Casado'),
(3, 'Divorciado'),
(4, 'Viudo'),
(5, 'En pareja');

-- --------------------------------------------------------

--
-- Table structure for table `occupation`
--

CREATE TABLE `occupation` (
  `occupation_id` int(11) NOT NULL,
  `occupation_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `occupation`
--

INSERT INTO `occupation` (`occupation_id`, `occupation_name`) VALUES
(1, 'Empleado'),
(2, 'Desempleado'),
(3, 'Estudiante'),
(4, 'Jubilado'),
(5, 'Independiente'),
(6, 'Amas de Casa'),
(7, 'Freelancer');

-- --------------------------------------------------------

--
-- Table structure for table `person`
--

CREATE TABLE `person` (
  `person_id` int(11) NOT NULL,
  `national_id_number` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `profile_picture_url` varchar(255) DEFAULT NULL,
  `gender_id` int(11) DEFAULT NULL,
  `program_id` int(11) DEFAULT NULL,
  `occupation_id` int(11) DEFAULT NULL,
  `education_level_id` int(11) DEFAULT NULL,
  `marital_status_id` int(11) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `person`
--

INSERT INTO `person` (`person_id`, `national_id_number`, `first_name`, `last_name`, `date_of_birth`, `phone_number`, `address`, `profile_picture_url`, `gender_id`, `program_id`, `occupation_id`, `education_level_id`, `marital_status_id`, `location_id`) VALUES
(1, '1234567890', 'John', 'Doe', '1990-05-12', '123-456-7890', '123 Main St, City', 'https://example.com/profile1.jpg', 7, 1, 1, 11, 1, NULL),
(2, '1234567891', 'Jane', 'Smith', '1985-11-23', '234-567-8901', '456 Elm St, Town', 'https://example.com/profile2.jpg', 8, 2, 2, 12, 2, NULL),
(3, '1234567892', 'Alice', 'Johnson', '1992-02-15', '345-678-9012', '789 Oak St, Village', 'https://example.com/profile3.jpg', 9, 3, 3, 12, 3, NULL),
(4, '1234567893', 'Bob', 'Williams', '1988-07-09', '456-789-0123', '123 Pine St, City', 'https://example.com/profile4.jpg', 10, 1, 2, 12, 1, NULL),
(5, '1234567894', 'Carol', 'Brown', '1995-04-30', '567-890-1234', '321 Cedar St, Town', 'https://example.com/profile5.jpg', 9, 2, 1, 13, 2, NULL),
(48, '12345', 'voto en ', 'blanco', NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL),
(49, '1005564237', 'pedro', 'moreno', NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `program`
--

CREATE TABLE `program` (
  `program_id` int(11) NOT NULL,
  `program` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `program`
--

INSERT INTO `program` (`program_id`, `program`) VALUES
(1, 'Ingeniería de Sistemas'),
(2, 'Medicina'),
(3, 'Derecho'),
(4, 'Arquitectura'),
(5, 'Administración de Empresas'),
(6, 'Psicología'),
(7, 'Contaduría Pública'),
(8, 'Ingeniería Civil'),
(9, 'Biología'),
(10, 'Ciencias Políticas'),
(11, 'Economía'),
(12, 'Ingeniería Mecánica'),
(13, 'Ingeniería Electrónica'),
(14, 'Filosofía'),
(15, 'Literatura'),
(16, 'Química'),
(17, 'Física'),
(18, 'Matemáticas'),
(19, 'Enfermería'),
(20, 'Ingeniería Industrial');

-- --------------------------------------------------------

--
-- Table structure for table `program_participants`
--

CREATE TABLE `program_participants` (
  `participant_id` int(11) NOT NULL,
  `campaign_id` int(11) NOT NULL,
  `program_participants` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role` enum('admin','student') NOT NULL DEFAULT 'student'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role`) VALUES
(4, 'student'),
(5, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `person_id` int(11) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `is_verified` tinyint(1) DEFAULT 0,
  `last_login` timestamp NULL DEFAULT NULL,
  `registration_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `email` varchar(100) NOT NULL,
  `token` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `person_id`, `password_hash`, `is_verified`, `last_login`, `registration_date`, `email`, `token`) VALUES
(1, 1, 'hashed_password1', 1, '2024-11-01 13:00:00', '2024-11-13 21:17:43', 'john.doe@example.com', 'token1abc'),
(2, 2, 'hashed_password2', 0, '2024-11-02 14:15:00', '2024-11-13 21:17:43', 'jane.smith@example.com', 'token2abc'),
(3, 3, 'hashed_password3', 1, '2024-11-03 15:30:00', '2024-11-13 21:17:43', 'alice.johnson@example.com', 'token3abc'),
(4, 4, 'hashed_password4', 1, '2024-11-04 16:45:00', '2024-11-13 21:17:43', 'bob.williams@example.com', 'token4abc'),
(5, 5, 'hashed_password5', 0, '2024-11-05 17:00:00', '2024-11-13 21:17:43', 'carol.brown@example.com', 'token5abc'),
(33, 48, '$2b$10$910HCjZIrj9s.lJ0BUqgOuSmnh2WaCpG/LOCi/mhoAd51EIT3bJz2', 1, NULL, '2024-11-13 17:38:18', 'example@gmail.com', ''),
(34, 49, '$2b$10$aGdv.fp8e5lmgQ7VwsDcwOT0ypSjJ1.RenoAo32qSsyrLjetgyPWi', 0, '2024-11-13 20:48:50', '2024-11-13 20:48:33', 'pedroduban15@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBlZHJvZHViYW4xNUBnbWFpbC5jb20iLCJpYXQiOjE3MzE1MzA5MzAsImV4cCI6MjU5NTUzMDkzMH0.QOsZo0nPSsfN-DBud2Ef_xSWSVxOKX6qYanWuSXrZPM');

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
(33, 4),
(34, 5);

-- --------------------------------------------------------

--
-- Table structure for table `verification`
--

CREATE TABLE `verification` (
  `user_id` int(11) NOT NULL,
  `verification_code` int(6) NOT NULL,
  `verification_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `verification`
--

INSERT INTO `verification` (`user_id`, `verification_code`, `verification_date`) VALUES
(33, 874903, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `votes`
--

CREATE TABLE `votes` (
  `vote_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `campaign_id` int(11) DEFAULT NULL,
  `voted_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `digital_signature` text NOT NULL,
  `email_notification` enum('SENT','FAILURE') DEFAULT 'FAILURE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `campaigns`
--
ALTER TABLE `campaigns`
  ADD PRIMARY KEY (`campaign_id`);

--
-- Indexes for table `campaign_keys`
--
ALTER TABLE `campaign_keys`
  ADD PRIMARY KEY (`key_id`),
  ADD KEY `campaign_id` (`campaign_id`);

--
-- Indexes for table `candidates`
--
ALTER TABLE `candidates`
  ADD PRIMARY KEY (`candidate_id`),
  ADD KEY `person_id` (`person_id`),
  ADD KEY `campaign_id` (`campaign_id`);

--
-- Indexes for table `education_level`
--
ALTER TABLE `education_level`
  ADD PRIMARY KEY (`education_level_id`);

--
-- Indexes for table `encrypted_votes`
--
ALTER TABLE `encrypted_votes`
  ADD PRIMARY KEY (`encrypted_vote_id`),
  ADD KEY `campaign_id` (`campaign_id`);

--
-- Indexes for table `gender`
--
ALTER TABLE `gender`
  ADD PRIMARY KEY (`gender_id`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`location_id`);

--
-- Indexes for table `marital_status`
--
ALTER TABLE `marital_status`
  ADD PRIMARY KEY (`marital_status_id`);

--
-- Indexes for table `occupation`
--
ALTER TABLE `occupation`
  ADD PRIMARY KEY (`occupation_id`);

--
-- Indexes for table `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`person_id`),
  ADD UNIQUE KEY `national_id_number` (`national_id_number`),
  ADD KEY `person_ibfk_1` (`gender_id`),
  ADD KEY `person_ibfk_5` (`program_id`),
  ADD KEY `occupation_id` (`occupation_id`),
  ADD KEY `education_level_id` (`education_level_id`),
  ADD KEY `marital_status_id` (`marital_status_id`),
  ADD KEY `location` (`location_id`);

--
-- Indexes for table `program`
--
ALTER TABLE `program`
  ADD PRIMARY KEY (`program_id`);

--
-- Indexes for table `program_participants`
--
ALTER TABLE `program_participants`
  ADD PRIMARY KEY (`participant_id`),
  ADD KEY `constrain_campaing` (`campaign_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `person_id` (`person_id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `verification`
--
ALTER TABLE `verification`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`vote_id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`campaign_id`),
  ADD KEY `campaign_id` (`campaign_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `campaigns`
--
ALTER TABLE `campaigns`
  MODIFY `campaign_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `campaign_keys`
--
ALTER TABLE `campaign_keys`
  MODIFY `key_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `candidates`
--
ALTER TABLE `candidates`
  MODIFY `candidate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `education_level`
--
ALTER TABLE `education_level`
  MODIFY `education_level_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `encrypted_votes`
--
ALTER TABLE `encrypted_votes`
  MODIFY `encrypted_vote_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `gender`
--
ALTER TABLE `gender`
  MODIFY `gender_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `marital_status`
--
ALTER TABLE `marital_status`
  MODIFY `marital_status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `occupation`
--
ALTER TABLE `occupation`
  MODIFY `occupation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `person`
--
ALTER TABLE `person`
  MODIFY `person_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `program`
--
ALTER TABLE `program`
  MODIFY `program_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `program_participants`
--
ALTER TABLE `program_participants`
  MODIFY `participant_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `votes`
--
ALTER TABLE `votes`
  MODIFY `vote_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `campaign_keys`
--
ALTER TABLE `campaign_keys`
  ADD CONSTRAINT `campaign_keys_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`campaign_id`);

--
-- Constraints for table `candidates`
--
ALTER TABLE `candidates`
  ADD CONSTRAINT `candidates_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `person` (`person_id`),
  ADD CONSTRAINT `candidates_ibfk_2` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`campaign_id`);

--
-- Constraints for table `encrypted_votes`
--
ALTER TABLE `encrypted_votes`
  ADD CONSTRAINT `encrypted_votes_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`campaign_id`) ON DELETE CASCADE;

--
-- Constraints for table `person`
--
ALTER TABLE `person`
  ADD CONSTRAINT `location` FOREIGN KEY (`location_id`) REFERENCES `locations` (`location_id`),
  ADD CONSTRAINT `person_ibfk_1` FOREIGN KEY (`gender_id`) REFERENCES `gender` (`gender_id`),
  ADD CONSTRAINT `person_ibfk_5` FOREIGN KEY (`program_id`) REFERENCES `program` (`program_id`),
  ADD CONSTRAINT `person_ibfk_6` FOREIGN KEY (`occupation_id`) REFERENCES `occupation` (`occupation_id`),
  ADD CONSTRAINT `person_ibfk_7` FOREIGN KEY (`education_level_id`) REFERENCES `education_level` (`education_level_id`),
  ADD CONSTRAINT `person_ibfk_8` FOREIGN KEY (`marital_status_id`) REFERENCES `marital_status` (`marital_status_id`);

--
-- Constraints for table `program_participants`
--
ALTER TABLE `program_participants`
  ADD CONSTRAINT `constrain_campaing` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`campaign_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `person` (`person_id`);

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);

--
-- Constraints for table `verification`
--
ALTER TABLE `verification`
  ADD CONSTRAINT `verification_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `votes_ibfk_2` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`campaign_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
