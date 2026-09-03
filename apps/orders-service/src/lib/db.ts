import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import dotenv from "dotenv"
dotenv.config()

const adapter = new PrismaMariaDb( {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_DATABASE || 'orders'
})

const prisma = new PrismaClient({ adapter: adapter })

export default prisma