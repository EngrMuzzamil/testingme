import express from "express"
import dotenv from 'dotenv'
import mongoose from "mongoose"
import upload from "express-fileupload"
import chat from "./websockets/chat.js"
import usersRoutes from "./routes/usersRoutes.js"
import volunteerRoutes from "./routes/volunteer.js"
import AuthenticationRoute from "./routes/authenticationRoutes.js"
import shelterRoutes from "./routes/shelterRoutes.js"
import breedsRoutes from "./routes/breedsRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"

dotenv.config()

var PORT = process.env.PORT,
DB_URL = process.env.DB_URL






mongoose.connect(DB_URL,
{ useNewUrlParser: true, useUnifiedTopology: true },()=>{
    console.log("Db connected");
});

chat.initChat()

const app = express()
app.use(express.json())
app.use(upload())
app.use(express.static('public'))

app.use("/api/Authentication", AuthenticationRoute)
app.use("/api/users", usersRoutes)
app.use("/api/volunteer", volunteerRoutes)
app.use("/api/shelter", shelterRoutes)
app.use("/api/breeds", breedsRoutes)
app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)

app.get("/", (req, res) => res.send("Welcome to the Pawndr App!"))
app.all("*", (req, res) => res.status(404).send("You've tried reaching a route that doesn't exist."))


app.listen(PORT, () =>console.log(`Server running on port: http://localhost:${PORT}`))