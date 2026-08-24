import express, {Request, Response} from "express";
import productRoutes from "./route/product.route.js"
const app = express()

app.use(express.json(), express.urlencoded({ extended: false }))
app.use('/api', productRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send("Hello world")
})

export default app 