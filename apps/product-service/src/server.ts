import express from "express";
import cors from "cors"
import productRoutes from "./route/product.route.js"

var corsOptions = {
    origin: process.env.FRONTEND_SERVICE_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"]
}

const app = express()
app.use(cors(corsOptions))
app.use(express.json(), express.urlencoded({ extended: true }))
app.use('/api', productRoutes)



export default app 