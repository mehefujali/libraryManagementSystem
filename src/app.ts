import express, { Application } from 'express'
import { configDotenv } from 'dotenv'
import { mongoDB } from './config/db'

configDotenv()
mongoDB()

export const app:Application = express()

