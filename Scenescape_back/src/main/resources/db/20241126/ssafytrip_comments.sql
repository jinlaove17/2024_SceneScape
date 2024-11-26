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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `no` int NOT NULL AUTO_INCREMENT,
  `post_no` int NOT NULL,
  `user_id` varchar(20) NOT NULL,
  `parent_no` int DEFAULT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`no`),
  KEY `post_id` (`post_no`),
  KEY `user_id` (`user_id`),
  KEY `parent_id` (`parent_no`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_no`) REFERENCES `posts` (`no`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`parent_no`) REFERENCES `comments` (`no`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,1,'bb',NULL,'안녕하세요. 공유입니다.','2024-11-22 08:37:52','2024-11-22 08:37:52'),(2,4,'bb',NULL,'안녕하세요. 공유입니다.','2024-11-22 08:38:08','2024-11-22 08:38:08'),(3,5,'bb',NULL,'안녕하세요. 공유입니다.','2024-11-22 08:38:28','2024-11-22 08:38:28'),(4,1,'aa',1,'TEST','2024-11-22 08:38:52','2024-11-22 08:38:52'),(5,2,'aa',NULL,'TEST','2024-11-22 08:39:10','2024-11-22 08:39:10'),(6,3,'aa',NULL,'TEST','2024-11-22 08:39:21','2024-11-22 08:39:21'),(7,4,'aa',NULL,'TEST','2024-11-22 08:39:26','2024-11-22 08:39:26'),(8,6,'aa',NULL,'TEST','2024-11-22 08:39:43','2024-11-22 08:39:43'),(9,5,'admin',3,'헉 진짜 공유님이신가요??','2024-11-22 08:40:18','2024-11-22 08:40:18'),(10,1,'admin',NULL,'감사합니다~~ 꼭 가볼게요','2024-11-22 08:40:38','2024-11-22 08:40:38'),(11,2,'admin',NULL,'멋져요~~','2024-11-22 08:40:48','2024-11-22 08:40:48'),(12,3,'admin',NULL,'날씨 좋은 날 다녀오셨네요!','2024-11-22 08:41:13','2024-11-22 08:41:13'),(13,6,'admin',NULL,'와 공유님 팬이에요~~','2024-11-22 08:41:46','2024-11-22 08:41:46'),(14,1,'ssafy',NULL,'우왕','2024-11-22 08:42:46','2024-11-22 08:42:46'),(15,2,'ssafy',NULL,'Lorem ipsum dolor sit amet','2024-11-22 08:42:58','2024-11-22 08:42:58'),(16,3,'ssafy',12,'아 예','2024-11-22 08:43:11','2024-11-22 08:43:11'),(17,5,'ssafy',NULL,'좋아요 눌렀습니다','2024-11-22 08:43:31','2024-11-22 08:43:31'),(18,5,'ssafy',3,'와 팬이에요','2024-11-22 08:43:38','2024-11-22 08:43:38'),(19,6,'ssafy',NULL,'뭐야 공유 아니네','2024-11-22 08:43:50','2024-11-22 08:43:50'),(20,1,'ll',NULL,'good','2024-11-22 08:44:52','2024-11-22 08:44:52'),(21,5,'ll',3,'공유님 싸인해주세요','2024-11-22 08:45:08','2024-11-22 08:45:08'),(22,6,'ll',19,'ㅋㅋㅋ','2024-11-22 08:45:30','2024-11-22 08:45:30'),(23,5,'jj',3,'와 공유','2024-11-22 08:45:52','2024-11-22 08:45:52'),(24,5,'jj',17,'저도 좋아요 눌렀습니당','2024-11-22 08:46:05','2024-11-22 08:46:05'),(25,6,'jj',19,'공유 사칭으로 신고하겠습니다.','2024-11-22 08:46:18','2024-11-22 08:46:18'),(26,2,'jj',NULL,'유남쌩','2024-11-22 08:46:38','2024-11-22 08:46:38'),(27,32,'ll',NULL,'dlkkafjdslfkn','2024-11-26 08:07:39','2024-11-26 08:07:39');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-26 17:21:29
