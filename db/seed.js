const db = require("./dbConfig");
const mongoose = require("mongoose");

async function seedDatabase() {
	const Db = new db.DatabaseConnector();
	Db.connect();
	try {
		// Crear permisos
		const InmueblesPermission = await db.Permiso.create({
			permiso: "Inmuebles",
		});
		const ProveedoresPermission = await db.Permiso.create({
			permiso: "Proveedores",
		});
		const ServiciosPermission = await db.Permiso.create({
			permiso: "Servicios",
		});
		const OfertasPermission = await db.Permiso.create({
			permiso: "Ofertas",
		});

		// Crear roles
		const adminRole = await db.Role.create({ nombreRol: "Admin" });

		await db.RolesPermisos.create({
			id_rol: adminRole._id,
			id_permiso: InmueblesPermission._id,
		});
		await db.RolesPermisos.create({
			id_rol: adminRole._id,
			id_permiso: ProveedoresPermission._id,
		});
		await db.RolesPermisos.create({
			id_rol: adminRole._id,
			id_permiso: ServiciosPermission._id,
		});
		await db.RolesPermisos.create({
			id_rol: adminRole._id,
			id_permiso: OfertasPermission._id,
		});

		const proveedorRole = await db.Role.create({ nombreRol: "Proveedor" });

		await db.RolesPermisos.create({
			id_rol: proveedorRole._id,
			id_permiso: OfertasPermission._id,
		});

		const empleadoRole = await db.Role.create({ nombreRol: "Empleado" });

		await db.RolesPermisos.create({
			id_rol: empleadoRole._id,
			id_permiso: InmueblesPermission._id,
		});
		await db.RolesPermisos.create({
			id_rol: empleadoRole._id,
			id_permiso: ProveedoresPermission._id,
		});
		await db.RolesPermisos.create({
			id_rol: empleadoRole._id,
			id_permiso: ServiciosPermission._id,
		});
		await db.RolesPermisos.create({
			id_rol: empleadoRole._id,
			id_permiso: OfertasPermission._id,
		});

		// Crear usuarios con roles y permisos
		const adminUser = await db.User.create({
			correo: "admin@example.com",
			contraseña: "admin123",
			rol: adminRole._id,
		});

		await db.UsersPermiso.create({
			id_usuario: adminUser._id,
			id_permiso: InmueblesPermission._id,
		});
		await db.UsersPermiso.create({
			id_usuario: adminUser._id,
			id_permiso: ProveedoresPermission._id,
		});
		await db.UsersPermiso.create({
			id_usuario: adminUser._id,
			id_permiso: ServiciosPermission._id,
		});
		await db.UsersPermiso.create({
			id_usuario: adminUser._id,
			id_permiso: OfertasPermission._id,
		});

		const empleadoUser = await db.User.create({
			correo: "empleado@example.com",
			contraseña: "user123",
			rol: empleadoRole._id,
		});

		await db.UsersPermiso.create({
			id_usuario: empleadoUser._id,
			id_permiso: InmueblesPermission._id,
		});
		await db.UsersPermiso.create({
			id_usuario: empleadoUser._id,
			id_permiso: ProveedoresPermission._id,
		});
		await db.UsersPermiso.create({
			id_usuario: empleadoUser._id,
			id_permiso: ServiciosPermission._id,
		});
		await db.UsersPermiso.create({
			id_usuario: empleadoUser._id,
			id_permiso: OfertasPermission._id,
		});

		const proveedorUser = await db.User.create({
			correo: "proveedor@example.com",
			contraseña: "user123",
			rol: proveedorRole._id,
		});

		await db.UsersPermiso.create({
			id_usuario: proveedorUser._id,
			id_permiso: OfertasPermission._id,
		});

		console.log("Data seeded successfully");
	} catch (error) {
		console.error("Error seeding data:", error);
	} finally {
		mongoose.disconnect();
	}

	Db.close();
}

seedDatabase();
