import CharacterModel from '../models/Character.model.js'
import mongoose from 'mongoose'

// GET all dnd characters
async function getCharacters(req, res) {
  try {
    const characters = await CharacterModel.find({}).sort({
      createdAt: -1,
    })
    return res.status(200).json(characters)
  } catch (error) {
    res.status(400).json({ error: error?.message })
  }
}

// GET single dnd character
async function getCharacter(req, res) {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No character with that id' })
    }
    const character = await CharacterModel.findById(id)
    if (!character) {
      return res.status(404).json({ error: 'Character not found' })
    }
    res.status(200).json(character)
  } catch (error) {
    res.status(400).json({ error: error?.message })
  }
}

// Create new dnd character
async function createCharacter(req, res) {
  try {
    // Get data from request body
    const {
      name,
      class: _class,
      level,
      race,
      background,
      alignment,
    } = req?.body

    let emptyFields = []

    if (!name) {
      emptyFields.push('name')
    }
    if (!_class) {
      emptyFields.push('class')
    }
    if (!race) {
      emptyFields.push('race')
    }
    if (!background) {
      emptyFields.push('background')
    }
    if (!alignment) {
      emptyFields.push('alignment')
    }

    if (emptyFields.length > 0) {
      return res
        .status(400)
        .json({ error: 'Please fill in all the fields', emptyFields })
    }

    // Create new character following Character model
    const newCharacter = new CharacterModel({
      name,
      class: _class,
      level,
      race,
      background,
      alignment,
    })
    const character = await CharacterModel.create(newCharacter)
    res.status(200).json(character)
  } catch (error) {
    res.status(400).json({ error: error?.message })
  }
}

// DELETE dnd character
async function deleteCharacter(req, res) {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No character with that id' })
    }
    const character = await CharacterModel.findOneAndDelete({
      _id: id,
    })
    if (!character) {
      return res.status(404).json({ error: 'Character not found' })
    }
    res.status(200).json(character)
  } catch (error) {
    res.status(400).json({ error: error?.message })
  }
}

// UPDATE dnd character
async function updateCharacter(req, res) {
  try {
    console.log('body', req.body)
    const { id } = req.params
    const { name, class: _class, level, race, background, alignment } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No character with that id' })
    }

    const updatedCharacter = await CharacterModel.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      { new: true }
    )
    if (!updatedCharacter) {
      return res.status(404).json({ error: 'Character not found' })
    }

    res.status(200).json(updatedCharacter)
  } catch (error) {
    res.status(400).json({ error: error?.message })
  }
}

// export functions
export {
  getCharacters,
  getCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter,
}
