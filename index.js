const express = require("express")

const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 4060

const authRouter = require("./auth/router");
const userRouter = require("./User/router")
const productRouter = require("./Product/router")
const Product = require('./Product/router')

const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(authRouter)
app.use(userRouter)
app.use(productRouter)


app.get('/', (req, res) => res.send("Good morning"))
app.listen(port, () => console.log(`Listening on port ${port}`))