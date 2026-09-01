import express, { Request, Response } from "express"
import cors from "cors"

var corsOptions = {
    origin: process.env.FRONTEND_SERVICE_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"]
}

const app = express()
app.use(cors(corsOptions))
app.use(express.json(), express.urlencoded({ extended: true }))


app.get('/', (req: Request, res: Response) => {
    res.send("Hello world")
})

export default app