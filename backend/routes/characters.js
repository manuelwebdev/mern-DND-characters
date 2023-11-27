import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import {
  getCharacters,
  getCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} from '../controllers/Character.controller.js'

// initiate express router
const router = express.Router()

// GET all dnd characters
router.get('/', getCharacters)

// POST new dnd character
router.post('/', createCharacter)

// GET single dnd character
router.get('/:id', getCharacter)

// DELETE dnd character
router.delete('/:id', deleteCharacter)

// UPDATE dnd character
router.patch('/:id', updateCharacter)

// export router
export default router
