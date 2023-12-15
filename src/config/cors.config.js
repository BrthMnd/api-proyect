const allowedOrigins = [
  "http://localhost:5173",
  "https://hoppscotch.io",
  "http://localhost:19006",
  "https://657ca922c7a0a526e6939e11--aesthetic-manatee-1a0ece.netlify.app/",
];
const CORSConfiguration = {
  origin: allowedOrigins,
  credentials: true,
  methods: "GET,PUT,POST,DELETE",
};

module.exports = { CORSConfiguration };
