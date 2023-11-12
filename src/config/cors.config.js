const allowedOrigins = ["http://localhost:5173", "https://hoppscotch.io","http://localhost:19006"];
const CORSConfiguration = {
  origin: allowedOrigins,
  credentials: true,
  methods: "GET,PUT,POST,DELETE",
};

module.exports = { CORSConfiguration };
