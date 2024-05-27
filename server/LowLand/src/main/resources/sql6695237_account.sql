-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: sql6.freemysqlhosting.net    Database: sql6695237
-- ------------------------------------------------------
-- Server version	5.5.62-0ubuntu0.14.04.1

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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) COLLATE utf8_bin NOT NULL,
  `password` varchar(100) COLLATE utf8_bin NOT NULL,
  `role` varchar(20) COLLATE utf8_bin NOT NULL,
  `full_name` varchar(55) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2033 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'quanna','$2a$10$JjK2GxoYM.heOfiXpD6DOe98OlAM7zCciynYdH53NeMCvEFXocBXC','ADMIN','Nguyễn Anh Quân'),(2,'quanvm','$2a$2a$2a$2a$10$jf6C.5n/9q.J06.8/5lVCuTJDH8FgSUd1ZLu0PyHEKYmaR3XgLXUa','ADMIN','Vũ Minh Quân'),(3,'khoilm','$2a$10$uE9SNTvrDJVBbqR/ZklN9OtEMaMZGLDV8a84V.wZHjPou2d/E8qcK','ADMIN','Lê Minh Khôi'),(4,'quanvmdt','$2a$10$N80j6id92XBu4UOObitPKeS3W4BE/nTN1EHXAtRznTgZA6gPfCSCW','ADMIN','Vũ Minh Quân'),(5,'quanvmdt2','$2a$10$SlMe1DIqUiSsWRAHdQQy3OeWwzSyXmbv.JjhQ/8DzbnMCAazzzsbS','EMPLOYEE','Vũ Minh Quân'),(6,'noicomdien','$2a$10$2j5QRVEsgA.TCHiPlg1JvOBZHSA5P1WU7pik11waRMQFulrRzEkKy','ADMIN','Vũ Minh Quân'),(7,'noicomdien','$2a$10$zJ/Pc84xxlo/gup8Bml44OuVkH6z/BomutJyje5to8MvxSOxSWoq6','ADMIN','Vũ Minh Quân'),(8,'noicomdien','$2a$10$an6eYpR7m430ehkHsQB7i.VIXrlTDTey2zSfYsFrerAffRnBjEJNW','ADMIN','Vũ Minh Quân'),(9,'noicomdien','$2a$10$6cDH0HqqQQe1SONKRAMtBeC4Aba0N6wvCPmoKNer.1sItmqukiiG2','ADMIN','Vũ Minh Quân'),(10,'noicomdien','$2a$10$DF.hbbjiJkTBKoQAOPNme.cPMMQu6o0rupTVBgay9GaB97UI5N2sS','ADMIN','Vũ Minh Quân'),(11,'noicomdien','$2a$10$me6BP6pA5g7hLG2xvF/MaOF0u79H/iquTamemPnBMRTgGhYk.LOJK','ADMIN','Vũ Minh Quân'),(2027,'quanvm4','$2a$10$ymIcmXxq40O1VQ/ZoU2tH.J8rb2vXUDFEl13OuR.Sl0BteP6HfsTa','USER','Vũ Minh Quan'),(2028,'quanvm5','$2a$10$c8z4puounEQ9n6ug7U/uLuVioRl3CXUw1fdBoFsUNn0xWZ2suUcLC','USER','Vũ Minh Quan'),(2029,'quanvm6','$2a$10$FR7l1iKss5H5RA8sc//Bduo0UF8CvNtTn1wW8Uihuq3d3jtWo9pJW','USER','Vũ Minh Quan'),(2030,'quanvm123','$2a$10$2O4XQux2xOucwugWnZLczO6QsBGkPTmGmVJaV1VP7wMSD46PbcMWu','USER','Vũ Minh Quan'),(2031,'quanvm7','$2a$10$9ome7E898t3fKeef33Yiz.NTATZarN1vjHTCRFqbRD8ly7lbV5xRe','USER','Vũ Minh Quan');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-27 13:33:54
