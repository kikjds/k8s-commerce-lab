import express, { Request, Response } from "express"
import cors from "cors"
import orderRoutes from "./route/order.route.js"

var corsOptions = {
    origin: process.env.FRONTEND_SERVICE_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"]
}

const app = express()
app.use(cors(corsOptions))
app.use(express.json(), express.urlencoded({ extended: true }))
app.use('/api', orderRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send("Hello world")
})

export default app