CREATE DATABASE  IF NOT EXISTS `rsappdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `rsappdb`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: rsappdb
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requests` (
  `requestID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `rspID` int NOT NULL,
  `rText` varchar(500) NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT '0',
  `paid` tinyint(1) NOT NULL DEFAULT '0',
  `price` float DEFAULT '0',
  PRIMARY KEY (`requestID`),
  KEY `userID` (`userID`),
  KEY `rspID` (`rspID`),
  CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  CONSTRAINT `requests_ibfk_2` FOREIGN KEY (`rspID`) REFERENCES `rsp` (`rspID`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

LOCK TABLES `requests` WRITE;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
INSERT INTO `requests` VALUES (2,1,2,'PC doesn\'t turn on',1,0,0),(3,1,1,'Problem with a laptop',1,0,0),(4,1,3,'Problem with a monitor',1,0,0),(14,1,2,'123',0,0,0),(15,2,2,'problem description',1,0,0),(16,2,3,'PC problem',1,0,0),(17,2,3,'another problem',1,0,0),(18,2,3,'sasf',1,0,0),(19,2,3,'Problem with a phone',1,0,0),(20,2,2,'1234',1,0,0),(21,2,2,'1',0,0,0),(22,2,2,'a',0,0,0),(23,2,2,'b',1,0,0),(24,2,1,'Problem with PC',1,0,0);
/*!40000 ALTER TABLE `requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `reviewID` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `rspID` int NOT NULL,
  `rating` int DEFAULT NULL,
  `pricing` int DEFAULT NULL,
  `comment` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`reviewID`),
  KEY `userID` (`userID`),
  KEY `rspID` (`rspID`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`rspID`) REFERENCES `rsp` (`rspID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,1,2,3,5,'Cheap, but took to long to fix the problem.'),(2,1,1,5,2,'Fast, but the price is a bit steep.'),(3,1,3,3,3,'Just average'),(4,1,2,5,5,'good service'),(5,2,1,4,5,'Comment about RSP');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rsp`
--

DROP TABLE IF EXISTS `rsp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rsp` (
  `rspID` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(25) NOT NULL,
  `lastName` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(200) DEFAULT NULL,
  `address` varchar(50) NOT NULL,
  `companyName` varchar(50) NOT NULL,
  `phoneNumber` varchar(15) DEFAULT NULL,
  `minPrice` int NOT NULL DEFAULT '0',
  `description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`rspID`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `address` (`address`),
  UNIQUE KEY `companyName` (`companyName`),
  UNIQUE KEY `phoneNumber` (`phoneNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rsp`
--

LOCK TABLES `rsp` WRITE;
/*!40000 ALTER TABLE `rsp` DISABLE KEYS */;
INSERT INTO `rsp` VALUES (1,'Alex','Briggs','alex@briggs.com','$2b$10$KiZLyCffq98Sj88yeHATPO1hkimz041eI4buUJrEii/.rJxehIbEm','Placeholder RSP address, 1','Fast repairs','1235431235',5,'Will repair your PC quickly!'),(2,'Ollie','Sharpe','o.sharpe@email.com','$2b$10$A.ETKIjWZHWs4e5yNyIgXu74y.Zw2BUVJKbv97OLNARkg4OjN4/Uq','Placeholder RSP address, 2','Cheap Repairs','53421342623',0,NULL),(3,'Denise','Gile','denise@gile.com','$2b$10$qnkngPpejHhVFGPKerPdHO3CumpUWUMRelgSGhdIH7HAgiCH32Bpu','Placeholder RSP address, 3','Average repairs','999999999999999',3,NULL);
/*!40000 ALTER TABLE `rsp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(25) NOT NULL,
  `lastName` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `address` varchar(50) NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `address` (`address`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'John','Smith','john@smith.com','$2b$10$VvGd58y/D5raD7LbYq/ey.FBExipC4sy.rRrdURx9ZzzOthNGzWPq','Random Address, 1'),(2,'Jane','Allen','jane@allen.com','$2b$10$FjJTEGH7V8qqunZXzSoe6.sV7bAZZ98fA0ntsp6A2K6MSJ5ejWPHa','Another random address, house 2');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-28 10:36:31
