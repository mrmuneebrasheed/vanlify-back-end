require("dotenv").config({
    path: '.env'
})
const express = require("express")
const app = express()
const path = require("path")
const cors = require("cors")
const mongoose = require("mongoose")
const {
    PORT,
    URI
} = process.env
const userRoutes = require("./routes/userRoutes")
const locationRoutes = require("./routes/locationRoutes")

const Location = require("./models/Location")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use("/images", express.static(path.join(__dirname, "images")))
// app.use("/users", userRoutes)
// app.use("/locations", locationRoutes)

const location = new Location({
    title: "Parc naturel du Morvan",
    coordinate: {
        lat: 47.27555682805901,
        lng: 4.098141813360119
    },
    images: ["/locations/morvan1", "/locations/morvan2", "/locations/morvan3"],
    userId: "6183ae29fa3287412cc0cbaf"
})

location.save()


mongoose.connect(URI, (err) => {
    if (err) {
        console.log(`Error while connecting to ${URI}`)
        console.log(err)
        process.exit(1)
    }
    console.log(`Mongoose is connected to ${URI}`)

})

app.listen(PORT, () => {
    console.log(`VanlifY API driving on port ${PORT}`)
})