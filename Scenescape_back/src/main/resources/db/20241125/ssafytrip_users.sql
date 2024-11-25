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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `no` int NOT NULL AUTO_INCREMENT,
  `id` varchar(20) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`no`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `nickname` (`nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,'jj','$2a$10$VxEyyjgo3KXCkEP9ocBLpeX7kSJhRh6gwQHyhdTTs7Y24NCff.qCO','전종우','jj@ssafy.com',0),(6,'ll','$2a$10$SQp3lMcyE61ft9jjClb2hO9PPmOKX9zSKwCZm5ilV.huvc8Nnsrp2','이주현','ljh@ssafy.com',0),(7,'admin','$2a$10$4RwSovDRjI/VLBJLDsCZ4u7k0sew1.1vYMzxShRXsSSPuHoY78HOe','관리자','admin@ssafy.com',0),(8,'ssafy','$2a$10$qWgOXV0R267wTrlCFN87du1tdIR6Q013GoAwZwamVE5YRyznCBLR6','김싸피','ssafy@ssafy.com',0),(9,'aa','$2a$10$yWyLguKHSWxqPKT2BE9qN.kSG42ja4V42AkckX4BZmlWAJXX0muLe','홍길동','aa@ssafy.com',0),(10,'bb','$2a$10$kXX44wIX7QY35Y/ZEa/tKe3685PR8DfJ77Bq.8InLO1Hvny6.ApsK','공유','bb@ssafy.com',0),(11,'cc','$2a$10$4rAxpz/LJL0aSkhv/NxSZ.bKf7PHdc7etI.3WajjKPGVdFuxwOYjm','최준혁','cc@ssafy.com',0),(12,'dd','$2a$10$ySGBD.JK9yEBzojA7uAQmuVW9GUMc93XlSB3LhTZj3PTFU3bg9Fx6','문진수','dd@ssafy.com',0),(13,'ee','$2a$10$eiBI.iqE4gJ5dPgWkFrkseFQ3AZ/9CZLumi2Vb4wB3USJgZqb7w6y','권민채','ee@ssafy.com',0),(14,'ff','$2a$10$QhTau53PEf3Xincql7G5hOIWGn3dZNe5fj0S1QSFKZI2N.1KPwmV2','이성준','ff@ssafy.com',0),(15,'gg','$2a$10$KPNy7IXkmQ/tCDGRVVBZCeLsfsie87uuGPCOdJjq24qyInNBZlhuW','이재홍','gg@ssafy.com',0),(16,'hh','$2a$10$eLCifP5cCw5wWnXUwgQJWOpPINCmzwy3dphusUr1HkFjt8/xHjcau','박종하','hh@ssafy.com',0),(17,'ii','$2a$10$ltrI3fJppy.yGAuKGcZutenn9S2bB7c416Ra30J1MkbfaN8JHXDEm','배승호','ii@ssafy.com',0),(18,'kk','$2a$10$GgW89/T8pHoYh5CUpDTsvO6nhGW6X.n5c67pNrzntWVWnHuqg3CsC','이재백','kk@ssafy.com',0),(19,'mm','$2a$10$S2KhRWupNyUVmy/Unhsfe.z3gb7b8Brx8UyYxm6e.bTWzJWHzXHIa','김지민','mm@ssafy.com',0),(20,'nn','$2a$10$AF2mDseuqV08cV96FJIWmO.MUQC7GUHEXghWaVaG4xXWk8jJLnIsO','이남재','nn@ssafy.com',0),(21,'oo','$2a$10$snHBMilhuBoX25X5g6T.h.G/u.rYjCIFjlIcrTNnlL4tM3x09V/e2','김태영','oo@ssafy.com',0),(22,'pp','$2a$10$L0ZXQDeImrN0/P5XNRnh9eMjXwgeUasIPoZvJ52n5iE1tAKEih6De','백명규','pp@ssafy.com',0),(23,'qq','$2a$10$FG2xBcR.Zf6mcPZ/GGoZleBsSx2jyZ.ApyQATias213UtNVCEKnnu','박창조','qq@ssafy.com',0),(24,'rr','$2a$10$Gn.ZVx/2f1k0zfzu8GS9BO49cN7gdDGKzrCqWqapCfW/yzL9tFZi6','엄예림','rr@ssafy.com',0),(25,'ss','$2a$10$X.hADxEQvvO5mM384gFsE.bk2TbOaiwzMWMS1Nf2b0ezEEJDV4E7a','한종우','ss@ssafy.com',0),(26,'tt','$2a$10$nJiz4UvPvxnb0//Rcghde.Um/kgpRa1O1v/82UwTYMgkborbfSYTq','김수민','tt@ssafy.com',0),(27,'uu','$2a$10$kaUC.akjudwaGSdyIf/aPetS2mSU4EU2tL/37X3wQJbuWc67/0GHe','박동민','uu@ssafy.com',0),(28,'ww','$2a$10$vfpOKl0EiulVXQNk3jDw3.QVoUaUHKv4g3a5oe9H1bdNQ.eIhln/q','김수현','ww@ssafy.com',0),(29,'xx','$2a$10$QRMjQLJr/tKbypd35CpIHualbmpJ1HCXafifCcejB/yQmaeMT2/YO','강진주','xx@ssafy.com',0),(30,'yy','$2a$10$MnLdRtvRWhvhZHCgCLfUkOlNdl80A4xvqT11Bh18LHS6NVudgq6Be','이혜인','yy@ssafy.com',0),(31,'zz','$2a$10$gfFjEaG.fQbf5N.IC7IrnO5h3RUodX519gtx/5nCUV2SUuKg7FXuW','윤서희','zz@ssafy.com',0);
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

-- Dump completed on 2024-11-25 17:00:51
