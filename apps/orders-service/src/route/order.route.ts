import express from "express"
import { createOrder, getOrder } from "../controller/order.controller.js"

const Router = express.Router()

Router.get("/orders", getOrder)

Router.post("/orders", createOrder)

export default Router