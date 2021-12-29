const queue = require('./queue')
queue.consume("fila1", message => {
    //process the message
    console.log("processing " + message.content.toString())
})
