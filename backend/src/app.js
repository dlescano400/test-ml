import express from "express";
import router from "./routes/item_routes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use("/api", router);

app.listen(3001, "0.0.0.0", () => {
  console.log("Server is running on port 3001");
});
