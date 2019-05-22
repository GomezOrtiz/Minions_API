const express = require('express')
const router = express.Router()

const Character = require('../models/Character')

router.get("/", (req,res,next) => {
  Character.find()
  .then(allCharacters => res.json(allCharacters))
  .catch(err => res.status(200).json(err))
})

router.get("/:id", (req,res,next) => {
  Character.findOne({id: req.params.id})
  .then(character => res.json(character))
  .catch(err => res.status(200).json(err))
})

router.post("/", (req,res,next) => {
const {name, occupation,cartoon, weapon} = req.body

Character.find()
.then(allCharacters => {
  allCharacters = allCharacters.sort((a,b) => b.id - a.id)
  const id = allCharacters[allCharacters.length - 1].id + 1

  const newCartoon = new Character({name, occupation,cartoon, weapon, id})

  newCartoon.save()
  .then(cartoon => res.json(cartoon))
  .catch(err => res.status(200).json(err))
  })

})



router.put("/:id", (req,res,next) => {
  const {name, occupation,cartoon, weapon} = req.body

  Character.findOneAndUpdate({id: req.params.id}, {name,occupation,cartoon,weapon}, {new: true})
  .then(character => res.json(character))
  .catch(err => res.status(200).json(err))

})

router.delete("/:id", (req,res,next) => {
  
  Character.findOneAndDelete({id: req.params.id})
  .then(deletedCharacter => res.json(deletedCharacter))
  .catch(err => res.status(200).json(err))

})

module.exports = router