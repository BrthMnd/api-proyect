-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-05-2023 a las 02:57:11
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `rcservicedb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `Id_Proveedores` int(11) NOT NULL,
  `Numero_identificacion_p` varchar(15) NOT NULL,
  `Nombres` varchar(20) NOT NULL,
  `Apellidos` varchar(20) NOT NULL,
  `Correo` varchar(50) NOT NULL,
  `Telefono/Celular` varchar(15) NOT NULL,
  `Direccion` varchar(50) NOT NULL,
  `Servicios` varchar(20) NOT NULL,
  `Hoja_Vida` longblob NOT NULL,
  `Experiencias/Conocimientos` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`Id_Proveedores`, `Numero_identificacion_p`, `Nombres`, `Apellidos`, `Correo`, `Telefono/Celular`, `Direccion`, `Servicios`, `Hoja_Vida`, `Experiencias/Conocimientos`) VALUES
(1, '10388555', 'Jose Antonio', 'Martinez Perez', 'duff@gmail.com', '3122222', 'calle 13', 'electricidad', '', 'Intale os cables de las piramides de egipto'),
(2, '20554883', 'Ana Maria', 'Garcia Castro', 'anamariagc@gmail.com', '5551111', 'carrera 4', 'plomeria', '', 'Reparacion de tuberias en edificios'),
(3, '1087654321', 'Pedro', 'Rodriguez Rodriguez', 'prodrodrig@gmail.com', '3125555', 'avenida 23', 'carpinteria', '', 'Construcción de puertas y ventanas de madera'),
(4, '1098765432', 'Maria Fernanda', 'Lopez Perea', 'mariaflopez@gmail.com', '3004444', 'calle 80', 'pintura', '', 'Pintura de interiores y exteriores de casas y edificios'),
(1, '10388555', 'Jose Antonio', 'Martinez Perez', 'duff@gmail.com', '3122222', 'calle 13', 'electricidad', '', 'Intale os cables de las piramides de egipto'),
(2, '20554883', 'Ana Maria', 'Garcia Castro', 'anamariagc@gmail.com', '5551111', 'carrera 4', 'plomeria', '', 'Reparacion de tuberias en edificios'),
(3, '1087654321', 'Pedro', 'Rodriguez Rodriguez', 'prodrodrig@gmail.com', '3125555', 'avenida 23', 'carpinteria', '', 'Construcción de puertas y ventanas de madera'),
(4, '1098765432', 'Maria Fernanda', 'Lopez Perea', 'mariaflopez@gmail.com', '3004444', 'calle 80', 'pintura', '', 'Pintura de interiores y exteriores de casas y edificios');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;