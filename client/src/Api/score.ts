import axios from 'axios'

// const API_URL = 'http://localhost:3001'
const API_URL = 'https://score-ming-api.fly.dev'

export interface IScore {
  id: string
  name: string
  score: number
  updatedAt?: string
}

export const getScores = async (): Promise<IScore[]> => {
  const response = await axios.get<IScore[]>(`${API_URL}/scores`)
  return response.data
}

export const saveScore = async (score: IScore): Promise<void> => {
  await axios.post(`${API_URL}/scores`, score)
}
