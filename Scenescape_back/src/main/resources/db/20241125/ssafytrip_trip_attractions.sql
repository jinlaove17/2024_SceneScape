-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ssafytrip
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `trip_attractions`
--

DROP TABLE IF EXISTS `trip_attractions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trip_attractions` (
  `no` int NOT NULL AUTO_INCREMENT,
  `trip_no` int NOT NULL,
  `attraction_no` int NOT NULL,
  `sequence` int NOT NULL,
  PRIMARY KEY (`no`),
  KEY `trip_no` (`trip_no`),
  KEY `attraction_no` (`attraction_no`),
  CONSTRAINT `trip_attractions_ibfk_1` FOREIGN KEY (`trip_no`) REFERENCES `trips` (`no`) ON DELETE CASCADE,
  CONSTRAINT `trip_attractions_ibfk_2` FOREIGN KEY (`attraction_no`) REFERENCES `attractions` (`no`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trip_attractions`
--

LOCK TABLES `trip_attractions` WRITE;
/*!40000 ALTER TABLE `trip_attractions` DISABLE KEYS */;
INSERT INTO `trip_attractions` VALUES (1,1,1,1),(2,1,2,2),(3,1,3,3),(4,1,4,4),(5,2,64555,1),(6,2,64566,2),(7,2,64570,3),(8,3,55973,1),(9,3,55977,2),(10,4,18137,1),(11,4,36765,2),(12,4,12956,3),(13,4,47476,4),(14,4,47840,5),(15,4,5,6),(16,5,16497,1),(17,5,16622,2),(18,5,16690,3),(19,5,16825,4),(20,5,17721,5),(21,5,18137,1),(22,5,36765,2),(23,5,12956,3),(24,5,47476,4),(25,5,47840,5),(26,5,5,6);
/*!40000 ALTER TABLE `trip_attractions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-25 17:00:50
