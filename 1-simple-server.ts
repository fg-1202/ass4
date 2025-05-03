import http from 'http'

let server = http.createServer((req, res) => {
  let date = new Date()
  res.end(`Hello TypeScript. Now is ${date.toLocaleString()}`)
})

server.listen(3000)
