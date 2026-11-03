import express from 'express'
const app = express()
import userRoute from './routes/userRoute'
import categoryRoute from './routes/categoryRoute'
import productRoute from './routes/productRoute'
import orderRoute from "./routes/orderRoute"
import cartRoute from "./routes/cartRoute"
import adminRoute from './routes/adminRoute'
import "./database/connection"
import cors from "cors"

app.use(express.json())
app.use(express.static("./src/uploads"))

app.use(cors({
    origin : "*"
}))

app.use("/api/auth", userRoute)
app.use('/api/category', categoryRoute)
app.use('/api/product', productRoute)
app.use('/api/order', orderRoute)
app.use('/api/cart', cartRoute)
app.use('/api/admin', adminRoute)

export default app

