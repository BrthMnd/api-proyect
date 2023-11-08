const allowedOrigins = ["http://localhost:5173", "https://hoppscotch.io"];
const CORSConfiguration = {
  origin: allowedOrigins,
  credentials: true,
  methods: "GET,PUT,POST,DELETE",
};

module.exports = { CORSConfiguration };
