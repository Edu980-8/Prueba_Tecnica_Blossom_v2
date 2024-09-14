CREATE DATABASE IF NOT EXISTS `rick_morty_db`
/*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */
/*!80016 DEFAULT ENCRYPTION='N' */
;

USE `rick_morty_db`;

-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: rick_morty_db
-- ------------------------------------------------------
-- Server version	8.0.39
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;

/*!50503 SET NAMES utf8 */
;

/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;

/*!40103 SET TIME_ZONE='+00:00' */
;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;

/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

--
-- Table structure for table `character_episodes`
--
DROP TABLE IF EXISTS `character_episodes`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `character_episodes` (
  `character_id` int NOT NULL,
  `episode_id` int NOT NULL,
  PRIMARY KEY (`character_id`, `episode_id`),
  KEY `episode_id` (`episode_id`),
  CONSTRAINT `character_episodes_ibfk_1` FOREIGN KEY (`character_id`) REFERENCES `characters` (`id`),
  CONSTRAINT `character_episodes_ibfk_2` FOREIGN KEY (`episode_id`) REFERENCES `episodes` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `character_episodes`
--
LOCK TABLES `character_episodes` WRITE;

/*!40000 ALTER TABLE `character_episodes` DISABLE KEYS */
;

/*!40000 ALTER TABLE `character_episodes` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `characters`
--
DROP TABLE IF EXISTS `characters`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `characters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` enum('Alive', 'Dead', 'unknown') NOT NULL,
  `species` varchar(255) NOT NULL,
  `gender` enum('Female', 'Male', 'Genderless', 'unknown') NOT NULL,
  `origin` varchar(255) DEFAULT NULL,
  `image` varchar(1000) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 16 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `characters`
--
LOCK TABLES `characters` WRITE;

/*!40000 ALTER TABLE `characters` DISABLE KEYS */
;

INSERT INTO
  `characters`
VALUES
  (
    1,
    'Rick Sanchez',
    'Alive',
    'Human',
    'Male',
    'Earth (C-137)',
    'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    '2024-09-14 00:27:45',
    '2024-09-14 00:27:45'
  ),
(
    2,
    'Morty Smith',
    'Alive',
    'Human',
    'Male',
    'unknown',
    'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    '2024-09-14 00:27:45',
    '2024-09-14 00:27:45'
  ),
(
    3,
    'Summer Smith',
    'Alive',
    'Human',
    'Female',
    'Earth (Replacement Dimension)',
    'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
    '2024-09-14 00:27:45',
    '2024-09-14 00:27:45'
  ),
(
    4,
    'Beth Smith',
    'Alive',
    'Human',
    'Female',
    'Earth (Replacement Dimension)',
    'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
    '2024-09-14 00:27:45',
    '2024-09-14 00:27:45'
  ),
(
    5,
    'Jerry Smith',
    'Alive',
    'Human',
    'Male',
    'Earth (Replacement Dimension)',
    'https://rickandmortyapi.com/api/character/avatar/5.jpeg',
    '2024-09-14 00:27:45',
    '2024-09-14 00:27:45'
  ),
(
    6,
    'Abadango Cluster Princess',
    'Alive',
    'Alien',
    'Female',
    'Abadango',
    'https://rickandmortyapi.com/api/character/avatar/6.jpeg',
    '2024-09-14 00:27:45',
    '2024-09-14 00:27:45'
  ),
(
    7,
    'Abradolf Lincler',
    'unknown',
    'Human',
    'Male',
    'Earth (Replacement Dimension)',
    'https://rickandmortyapi.com/api/character/avatar/7.jpeg',
    '2024-09-14 00:27:45',
    '2024-09-14 00:27:45'
  ),
(
    8,
    'Adjudicator Rick',
    'Dead',
    'Human',
    'Male',
    'unknown',
    'https://rickandmortyapi.com/api/character/avatar/8.jpeg',
    '2024-09-14 00:27:45',
    '2024-09-14 00:27:45'
  ),
(
    9,
    'Agency Director',
    'Dead',
    'Human',
    'Male',
    'Earth (Replacement Dimension)',
    'https://rickandmortyapi.com/api/character/avatar/9.jpeg',
    '2024-09-14 00:27:45',
    '2024-09-14 00:27:45'
  ),
(
    10,
    'Alan Rails',
    'Dead',
    'Human',
    'Male',
    'unknown',
    'https://rickandmortyapi.com/api/character/avatar/10.jpeg',
    '2024-09-14 00:27:45',
    '2024-09-14 00:27:45'
  ),
(
    11,
    'Albert Einstein',
    'Dead',
    'Human',
    'Male',
    'Earth (C-137)',
    'https://rickandmortyapi.com/api/character/avatar/11.jpeg',
    '2024-09-14 00:27:45',
    '2024-09-14 00:27:45'
  ),
(
    12,
    'Alexander',
    'Dead',
    'Human',
    'Male',
    'Earth (C-137)',
    'https://rickandmortyapi.com/api/character/avatar/12.jpeg',
    '2024-09-14 00:27:45',
    '2024-09-14 00:27:45'
  ),
(
    13,
    'Alien Googah',
    'unknown',
    'Alien',
    'unknown',
    'unknown',
    'https://rickandmortyapi.com/api/character/avatar/13.jpeg',
    '2024-09-14 00:27:45',
    '2024-09-14 00:27:45'
  ),
(
    14,
    'Alien Morty',
    'unknown',
    'Alien',
    'Male',
    'unknown',
    'https://rickandmortyapi.com/api/character/avatar/14.jpeg',
    '2024-09-14 00:27:45',
    '2024-09-14 00:27:45'
  ),
(
    15,
    'Alien Rick',
    'unknown',
    'Alien',
    'Male',
    'unknown',
    'https://rickandmortyapi.com/api/character/avatar/15.jpeg',
    '2024-09-14 00:27:45',
    '2024-09-14 00:27:45'
  );

/*!40000 ALTER TABLE `characters` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `episodes`
--
DROP TABLE IF EXISTS `episodes`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `episodes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `episodes`
--
LOCK TABLES `episodes` WRITE;

/*!40000 ALTER TABLE `episodes` DISABLE KEYS */
;

/*!40000 ALTER TABLE `episodes` ENABLE KEYS */
;

UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;

/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;

-- Dump completed on 2024-09-14 17:57:41