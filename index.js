import express from "express";
import * as dotenv from "dotenv";
import recipesRoute from "./routes/recipes.routes.js";
import connect from "./config/db.config.js";

dotenv.config()
const app = express()
app.use(express.json())

connect()

app.use("/recipes", recipesRoute)

app.listen(process.env.PORT, () => {
  console.log(
    `Server App up and running on http://localhost:${process.env.PORT}`
  )
})