import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database";

dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is ON!");
});

// app.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// });
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});