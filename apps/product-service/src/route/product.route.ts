import express from "express";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../controller/product.controller.js";
const Router = express.Router()

Router.get('/products', getProducts)

Router.post('/products', createProduct)

Router.put('/products/:id', updateProduct)

Router.delete('/products/:id', deleteProduct)

export default Router