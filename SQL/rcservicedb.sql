-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-05-2023 a las 20:37:29
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
-- Estructura de tabla para la tabla `ofertas`
--

CREATE TABLE `ofertas` (
  `id` int(11) NOT NULL,
  `servicios` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `inmueble` varchar(255) DEFAULT NULL,
  `OfertaEstado` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ofertas`
--

INSERT INTO `ofertas` (`id`, `servicios`, `descripcion`, `inmueble`, `OfertaEstado`) VALUES
(1, 'Mantenimiento', 'Hermoso apartamento en el centro de la ciudad. Incluye servicio de mantenimiento y seguridad las 24 horas.', 'Apartamento', 'Disponible'),
(2, 'Limpieza', 'Amplia bodega en zona industrial con servicio de limpieza incluido. Ideal para almacenamiento de productos.', 'Bodega', 'Disponible'),
(3, 'Jardinería', 'Oficina moderna y elegante con hermosa vista a la ciudad. Incluye servicio de jardinería y mantenimiento.', 'Oficina', 'Reservada'),
(4, 'Electricidad', 'Local comercial en el corazón de la ciudad. Incluye servicio de electricidad y aire acondicionado.', 'Local', 'Vendida'),
(5, 'Seguridad', 'Casa amplia y cómoda en zona residencial exclusiva. Incluye servicio de seguridad las 24 horas y mantenimiento.', 'Casa', 'Disponible'),
(6, 'Mantenimiento', 'Oficina amplia y luminosa en edificio de lujo. Incluye servicio de mantenimiento y limpieza.', 'Oficina', 'Reservada'),
(7, 'Jardinería', 'Apartamento acogedor y moderno en zona tranquila. Incluye servicio de jardinería y mantenimiento.', 'Apartamento', 'Disponible'),
(8, 'Limpieza', 'Local comercial en zona turística de la ciudad. Incluye servicio de limpieza y electricidad.', 'Local', 'Vendida'),
(9, 'Electricidad', 'Casa espaciosa y elegante en zona exclusiva. Incluye servicio de electricidad y seguridad las 24 horas.', 'Casa', 'Reservada'),
(10, 'Seguridad', 'Oficina amplia y luminosa en zona empresarial. Incluye servicio de seguridad las 24 horas y mantenimiento.', 'Oficina', 'Disponible');

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `NumeroIdentificacionPersonal` varchar(50) NOT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `fechaRegistro` varchar(50) NOT NULL,
  `estadoUsuario` tinyint(1) NOT NULL DEFAULT 1,
  `rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `NumeroIdentificacionPersonal`, `telefono`, `direccion`, `fechaRegistro`, `estadoUsuario`, `rol`) VALUES
(1, 'Juan', 'Pérez', '123456789', '1234567', 'Calle 123, Ciudad', '', 1, 'Admin'),
(2, 'María', 'González', '987654321', '7654321', 'Avenida 456, Ciudad', '', 1, 'Usuario'),
(4, 'Karla Darlery', 'Salcedo', '128763213', '3001231234', 'Copacabana, Ciudad', '20/12/2022', 1, 'Empleado');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ofertas`
--
ALTER TABLE `ofertas`
  ADD PRIMARY KEY (`id`);

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
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ofertas`
--
ALTER TABLE `ofertas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tabla_prueba`
--
ALTER TABLE `tabla_prueba`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
