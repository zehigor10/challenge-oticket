import express from 'express'

import customerRoutes from './routes/customerRoutes.js';
import productRoutes from './routes/productRoutes.js';
import ordersRoutes from './routes/orderRoutes.js';
import cors from 'cors';


const app = express()

app.use(express.json())

app.use(cors({
  origin: 'http://localhost:3000', // ou '*', se for ambiente dev
  credentials: true,
}));


app.use('/api/customer', customerRoutes)
app.use('/api/product', productRoutes)
app.use('/api/order', ordersRoutes)

app.listen(4444, () => {
    console.log('HTTP Server running on port 4444')
})