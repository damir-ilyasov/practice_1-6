const cors = require("cors");

App.use(cors({
  origin: "http://local:3001",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))