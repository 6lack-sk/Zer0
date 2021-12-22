import express from  "express"

const server = express()

server.all("", (req, res)=>{
  res.send("Bot is running")
})

function keepAliveser() {
  server.listen(9000, () => {
    console.log("Server is online")
  })
}

export default keepAliveser