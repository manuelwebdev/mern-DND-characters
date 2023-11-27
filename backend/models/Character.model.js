import { Schema, model } from 'mongoose'

const characterSchema = new Schema(
  {
    name: { type: String, required: true },
    class: { type: String, required: true },
    level: { type: Number, required: false },
    race: { type: String, required: false },
    background: { type: String, required: false },
    alignment: { type: String, required: false },
  },
  { timestamps: true }
)

// export model
export default model('Character', characterSchema)
