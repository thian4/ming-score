import mongoose, { Document, Schema } from 'mongoose'

export interface IScore extends Document {
  id: string
  name: string
  score: number
  createdAt?: Date
  updatedAt?: Date
}

const ScoreSchema: Schema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    score: { type: Number, required: true },
  },
  { timestamps: true }
)

export const Score = mongoose.model<IScore>('Score', ScoreSchema)
