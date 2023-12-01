import express from "express";
const app = express()

app.use(express.json())

import apiRouter from "./routes/api.js";


app.use("/api", apiRouter)


app.listen(3000)
