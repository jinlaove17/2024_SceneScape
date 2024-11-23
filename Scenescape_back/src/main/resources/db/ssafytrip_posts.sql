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
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `no` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `content` varchar(10000) DEFAULT NULL,
  `user_id` varchar(20) DEFAULT NULL,
  `view_count` int DEFAULT '0',
  `like_count` int DEFAULT '0',
  `dislike_count` int DEFAULT '0',
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `category` varchar(10) DEFAULT NULL,
  `thumbnail_url` varchar(255) DEFAULT NULL,
  `scene_title` varchar(100) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `attraction_no` int DEFAULT NULL,
  `attraction_title` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`no`),
  KEY `user_id` (`user_id`),
  KEY `fk_thumbnail_url` (`thumbnail_url`),
  KEY `fk_posts_attractions` (`attraction_no`),
  CONSTRAINT `fk_posts_attractions` FOREIGN KEY (`attraction_no`) REFERENCES `attractions` (`no`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_thumbnail_url` FOREIGN KEY (`thumbnail_url`) REFERENCES `media` (`url`) ON DELETE SET NULL,
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'도깨비 촬영지 [영진 해변] 다녀왔습니다.','\n![image description](http://localhost:8080/media/1/18854ed9-de5f-4cf9-90a3-4dde01a5c59b_SamplePhoto_1.jfif)\n\n주말에 여자친구와 함께 다녀왔구요\n\n유명한 관광지다보니 사람들이 엄청 많더라구요\n연인들도 많이 오고 가족 단위 관광객 분들도 많이 계셨어요\n\n여러분도 꼭 한 번 방문해보시길 추천드립니다~~','jj',10,3,2,'2024-11-22 08:30:49','2024-11-23 07:28:41','SCENE','http://localhost:8080/media/1/18854ed9-de5f-4cf9-90a3-4dde01a5c59b_SamplePhoto_1.jfif','도깨비',0,55973,'영진해변'),(2,'도깨비 영진해변','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa. Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Mi eget mauris pharetra et. Non tellus orci ac auctor augue. Elit at imperdiet dui accumsan sit. Ornare arcu dui vivamus arcu felis. Egestas integer eget aliquet nibh praesent. In hac habitasse platea dictumst quisque sagittis purus. Pulvinar elementum integer enim neque volutpat ac.\n\n![image description](http://localhost:8080/media/2/1d45b4ba-c87d-4fd4-b50a-03735dc88af3_SamplePhoto_3.jfif)\n\nSenectus et netus et malesuada. Nunc pulvinar sapien et ligula ullamcorper malesuada proin. Neque convallis a cras semper auctor. Libero id faucibus nisl tincidunt eget. Leo a diam sollicitudin tempor id. A lacus vestibulum sed arcu non odio euismod lacinia. In tellus integer feugiat scelerisque. Feugiat in fermentum posuere urna nec tincidunt praesent. Porttitor rhoncus dolor purus non enim praesent elementum facilisis.','ll',10,1,1,'2024-11-22 08:32:17','2024-11-23 08:51:51','SCENE','http://localhost:8080/media/2/1d45b4ba-c87d-4fd4-b50a-03735dc88af3_SamplePhoto_3.jfif','도깨비',0,55973,'영진해변'),(3,'요즘 여기가 그렇게 핫하다고','Nisi scelerisque eu ultrices vitae auctor eu augue ut lectus. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Et malesuada fames ac turpis egestas sed. Sit amet nisl suscipit adipiscing bibendum est ultricies. Arcu ac tortor dignissim convallis aenean et tortor at. Pretium viverra suspendisse potenti nullam ac tortor vitae purus. Eros donec ac odio tempor orci dapibus ultrices. Elementum nibh tellus molestie nunc. Et magnis dis parturient montes nascetur. Est placerat in egestas erat imperdiet. Consequat interdum varius sit amet mattis vulputate enim.\n\nSit amet nulla facilisi morbi tempus. Nulla facilisi cras fermentum odio eu. Etiam erat velit scelerisque in dictum non consectetur a erat. Enim nulla aliquet porttitor lacus luctus accumsan tortor posuere. Ut sem nulla pharetra diam. Fames ac turpis egestas maecenas. Bibendum neque egestas congue quisque egestas diam. Laoreet id donec ultrices tincidunt arcu non sodales neque. Eget felis eget nunc lobortis mattis aliquam faucibus purus. Faucibus interdum posuere lorem ipsum dolor sit.\n\n![image description](http://localhost:8080/media/3/d41c6493-8dd6-42c7-b999-52bf21e9d268_SamplePhoto_2.jpeg)\n','ssafy',11,4,0,'2024-11-22 08:34:05','2024-11-23 08:51:54','SCENE','http://localhost:8080/media/3/d41c6493-8dd6-42c7-b999-52bf21e9d268_SamplePhoto_2.jpeg','도깨비',0,55973,'영진해변'),(4,'관리자입니다.','저도 다녀왔습니다.\n\n![image description](http://localhost:8080/media/4/09952b5b-f943-408a-bffa-83237aec1f98_SamplePhoto_6.jpg)\n','admin',8,2,3,'2024-11-22 08:34:54','2024-11-23 08:51:56','SCENE','http://localhost:8080/media/4/09952b5b-f943-408a-bffa-83237aec1f98_SamplePhoto_6.jpg','도깨비',0,55973,'영진해변'),(5,'TEST','\n![image description](http://localhost:8080/media/5/206fcf1b-c657-4410-ae0a-c74595d42189_SamplePhoto_4.jpg)\n','aa',9,6,0,'2024-11-22 08:36:48','2024-11-22 13:32:45','SCENE','http://localhost:8080/media/5/206fcf1b-c657-4410-ae0a-c74595d42189_SamplePhoto_4.jpg','도깨비',0,55973,'영진해변'),(6,'안녕하세요. 공유입니다.','\n![image description](http://localhost:8080/media/6/ffd9bf34-8576-4f0f-af5c-3fa924f1c82c_SamplePhoto_5.jfif)\n안녕하세요. 공유입니다.','bb',11,2,2,'2024-11-22 08:37:30','2024-11-23 11:06:05','SCENE','http://localhost:8080/media/6/ffd9bf34-8576-4f0f-af5c-3fa924f1c82c_SamplePhoto_5.jfif','도깨비',0,55973,'영진해변');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-23 21:41:47
