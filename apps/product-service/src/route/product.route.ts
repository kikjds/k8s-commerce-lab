import express from "express";
import { getProducts } from "../controller/product.controller.js";
const Router = express.Router()

Router.get('/products', getProducts)

export default Router