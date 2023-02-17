import dotenv from 'dotenv'
dotenv.config()
export const dbURI =
  process.env.DB_URI || 'mongodb://127.0.0.1:27017/cities'
export const port = process.env.PORT || 4000
export const secret = process.env.SECRET || 'shhhh its a secret'