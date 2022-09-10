const mongoose = require('mongoose');
const express = require('express')
const NoteModel  = require("./models/addnotes")
const app = express()
const port = 3000
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
require("./db/connectdb")
app.set('view engine', 'ejs')

app.get('/', async(req, res) => {
  let data = await NoteModel.find()
  console.log(data)
  res.render("index",{data:data})
})
app.post('/', async (req, res) => {
  let {note}= req.body
  const CreateNote = new NoteModel({
    note: note
});
let result = await CreateNote.save()
console.log(result)
  res.redirect("/")
})
app.get('/edit/:id', async (req, res) => {
  let data = await NoteModel.findById(req.params.id)
  console.log(data)
  res.render("edit",{data:data})
})

app.post('/update/:id', async (req, res) => {
  let data = await NoteModel.findByIdAndUpdate(req.params.id,req.body)
  console.log(data)
  res.redirect("/")
})
app.get('/delete/:id', async (req, res) => {
  let data = await NoteModel.findByIdAndDelete(req.params.id)
  console.log(data)
  res.redirect("/")
})

app.listen(port, () => {
  console.log(`Note app listening on http://localhost:${port}`)
})