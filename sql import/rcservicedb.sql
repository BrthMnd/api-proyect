-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-05-2023 a las 06:48:02
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

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
-- Estructura de tabla para la tabla `propietario`
--

CREATE TABLE `propietario` (
  `Id_propietario` varchar(20) NOT NULL,
  `Numero_Identificacion_D` varchar(15) NOT NULL,
  `Nombres` varchar(20) NOT NULL,
  `Apellidos` varchar(20) NOT NULL,
  `TelefonoUCelular` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `propietario`
--

INSERT INTO `propietario` (`Id_propietario`, `Numero_Identificacion_D`, `Nombres`, `Apellidos`, `TelefonoUCelular`) VALUES
('1001', '1038', 'Dufainer  Andres', 'Esquivel Bertel', '3123555'),
('2222', '2323', 'Dufainer  Andres', 'Esquivel Bertel', '3123555');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tabla_prueba`
--

CREATE TABLE `tabla_prueba` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `edad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tabla_prueba`
--

INSERT INTO `tabla_prueba` (`id`, `nombre`, `edad`) VALUES
(1, 'Vetulio Alcaheda', 20),
(2, 'Petronilo', 43);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `propietario`
--
ALTER TABLE `propietario`
  ADD PRIMARY KEY (`Id_propietario`);

--
-- Indices de la tabla `tabla_prueba`
--
ALTER TABLE `tabla_prueba`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tabla_prueba`
--
ALTER TABLE `tabla_prueba`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
