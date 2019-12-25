const express = require("express")
const app = express()
const port = process.env.PORT || 4000
const bodyParser = require("body-parser");
const userRouter = require("./User/router")
const productRouter = require("./Product/router")

app.use(bodyParser.json());
app.use(userRouter)
app.use(productRouter)

app.get('/', (req, res) => res.send("Good morning"))
app.listen(port, () => console.log(`Listening on port ${port}`))