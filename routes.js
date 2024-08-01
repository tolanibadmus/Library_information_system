const express = require('express')
const router = express.Router()

router.get("/library", (req, res) => {
  res.send('I am working')
 })



module.exports = router