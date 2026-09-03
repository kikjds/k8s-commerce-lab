import express from "express"
import { getOrder } from "../controller/order.controller.js"

const Router = express.Router()

Router.get("/orders", getOrder)


export default Router