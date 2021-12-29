import 'dotenv/config'
import amqplib from 'amqplib'

const URI = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`
const connect = () => amqplib.connect(URI).then(conn => conn.createChannel()) 

const createQueue = (channel, queue) => new Promise((resolve, reject) => {
  try{
    channel.assertQueue(queue) 
    resolve(channel) 
  }
  catch(err){ reject(err) }
}) 


export const sendToQueue = (queue, message) => {
  message = Buffer.from(JSON.stringify(message))
  connect()
    .then(channel => createQueue(channel, queue))
    .then(channel => channel.sendToQueue(queue, message))
    .catch(err => console.log(err))
}
