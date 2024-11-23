-- MySQL dump 10.13  Distrib 8.0.38, for macos14 (arm64)
--
-- Host: 127.0.0.1    Database: ssafytrip
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `media` (
  `no` int NOT NULL AUTO_INCREMENT,
  `post_no` int NOT NULL,
  `url` varchar(500) NOT NULL,
  `media_type` enum('image','video') NOT NULL,
  `alt_text` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`no`),
  UNIQUE KEY `url` (`url`),
  KEY `post_no` (`post_no`),
  CONSTRAINT `media_ibfk_1` FOREIGN KEY (`post_no`) REFERENCES `posts` (`no`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
INSERT INTO `media` VALUES (1,1,'http://localhost:8080/media/1/18854ed9-de5f-4cf9-90a3-4dde01a5c59b_SamplePhoto_1.jfif','image',NULL),(2,2,'http://localhost:8080/media/2/1d45b4ba-c87d-4fd4-b50a-03735dc88af3_SamplePhoto_3.jfif','image',NULL),(3,3,'http://localhost:8080/media/3/d41c6493-8dd6-42c7-b999-52bf21e9d268_SamplePhoto_2.jpeg','image',NULL),(4,4,'http://localhost:8080/media/4/09952b5b-f943-408a-bffa-83237aec1f98_SamplePhoto_6.jpg','image',NULL),(5,5,'http://localhost:8080/media/5/206fcf1b-c657-4410-ae0a-c74595d42189_SamplePhoto_4.jpg','image',NULL),(6,6,'http://localhost:8080/media/6/ffd9bf34-8576-4f0f-af5c-3fa924f1c82c_SamplePhoto_5.jfif','image',NULL);
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-23 21:41:46
