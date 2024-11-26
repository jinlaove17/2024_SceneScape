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
-- Table structure for table `attractionlikes`
--

DROP TABLE IF EXISTS `attractionlikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attractionlikes` (
  `no` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(20) NOT NULL,
  `attraction_no` int NOT NULL,
  PRIMARY KEY (`no`),
  KEY `user_id_idx` (`user_id`),
  KEY `attraction_no_idx` (`attraction_no`),
  CONSTRAINT `attraction_no` FOREIGN KEY (`attraction_no`) REFERENCES `attractions` (`no`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attractionlikes`
--

LOCK TABLES `attractionlikes` WRITE;
/*!40000 ALTER TABLE `attractionlikes` DISABLE KEYS */;
INSERT INTO `attractionlikes` VALUES (1,'jj',64544),(2,'jj',64545),(3,'jj',64546),(4,'jj',64547),(5,'jj',64548),(6,'jj',64549),(7,'jj',64550),(8,'jj',64551),(9,'jj',64552),(10,'jj',64553),(11,'jj',64554),(12,'jj',64555),(13,'jj',64556),(14,'jj',64557),(15,'jj',64558),(16,'jj',64559),(17,'jj',64560),(18,'jj',64561),(19,'jj',64562),(20,'jj',64563),(21,'jj',64564),(22,'jj',64565),(23,'jj',64566),(24,'jj',64567),(25,'jj',64568),(26,'jj',64569),(27,'jj',64570),(28,'jj',64571),(29,'jj',64572),(30,'jj',64573);
/*!40000 ALTER TABLE `attractionlikes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-26 17:21:28
