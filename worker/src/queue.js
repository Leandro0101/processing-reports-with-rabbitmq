require('dotenv/config')
const amqplib = require('amqplib') 

const URI = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`
const connect = () => amqplib.connect(URI).then(conn => conn.createChannel()) 

const createQueue = (channel, queue) => new Promise((resolve, reject) => {
  try{
    channel.assertQueue(queue) 
    resolve(channel) 
  }
  catch(err){ reject(err) }
}) 


const consume = (queue, callback) => {
  connect()
    .then(channel => createQueue(channel, queue))
    .then(channel => channel.consume(queue, callback, { noAck: true  }))
    .catch(err => console.log(err)) 
}

module.exports = { consume }