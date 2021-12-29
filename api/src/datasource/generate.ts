import { createWriteStream, WriteStream } from 'fs'
import { Readable, pipeline } from 'stream'
import { randomUUID } from 'crypto'

const sellersIds = []

for(let i = 0; i< 100; i++){
  sellersIds[i] = randomUUID()
}

const productsIds = []

for(let i = 0; i< 30; i++){
  productsIds[i] = randomUUID()
}

const makeSales = () => {
  const readableStream = new Readable({
    async read() {
      for (let i = 0; i < 1e6; i++) {
        const SELLER = sellersIds[Math.floor(Math.random() * 99 )]
        const QUANTITY = Math.floor(Math.random() * (20 - 1)) + 1
        const PRODUCT = sellersIds[Math.floor(Math.random() * 29 )]
        const sale = { 
          sellerId: SELLER,
          productid: PRODUCT,
          quantity: QUANTITY,
          createdAt: new Date() 
        }
        const preparedData = i !== 1e6 - 1  ? i === 0 ? `[${JSON.stringify(sale)},` : `${JSON.stringify(sale)},` : `${JSON.stringify(sale)}]`
  
         
        this.push(preparedData)
      } 
  
      this.push(null)
    }
  })

  save(readableStream, createWriteStream(`${__dirname}/data.json`))
}

const makeProducts = () => {

}

const save = (source: any, destination: WriteStream) => {
  pipeline(source, destination, err => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  })      
}

console.time('sales')
makeSales()
console.timeEnd('sales')