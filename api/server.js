import express from "express";
import apiRouter from "./routes/api.js";
const app = express()

app.use(express.json())
app.use("/api", apiRouter)

app.listen(3000)
