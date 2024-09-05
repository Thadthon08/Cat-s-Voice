const express = require("express");
const connectDB = require("./config/db");
const catRoutes = require("./routes/catRoutes");

const app = express();
connectDB();

app.use(express.json());
app.use("/api/cats", catRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
