import 'dotenv/config'
import express from 'express' 
import { sendToQueue } from './queue'
const app = express()          

import './datasource/generate'
app.use(express.json()) 
 
const router = express.Router() 
 
router.post('/task', (req, res) => {
    sendToQueue("fila1", req.body) 
    console.log('messagem enviada')
    res.json({ message: 'Your request will be proscessed!' }) 
}) 
 
app.use('/', router)  
app.listen(3000, () => console.log('server running')) 