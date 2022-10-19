import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'

import { PrismaClient } from '@prisma/client'
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes'
import { convertMinutesToHoursString } from './utils/convert-minutes-to-hour-string'

import 'express-async-errors'

const app = express()

const port = process.env.PORT || 3333

app.use(express.json())
app.use(cors())

const prisma = new PrismaClient({
  log: ['query']
})

// Listagem de tarefas por dia
app.get('/tarefas', async (request, response) => {
  const tarefas = await prisma.tarefa.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      date: true,
      hourStart: true,
      hourEnd: true,
      location: true
    }
  })

  return response.send(
    tarefas.map(tarefa => {
      return {
        ...tarefa,
        hourStart: convertMinutesToHoursString(tarefa.hourStart),
        hourEnd: convertMinutesToHoursString(tarefa.hourEnd)
      }
    })
  )
})

// Criação de nova tarefa OK
app.post('/tarefas', async (request, response) => {
  const body: any = request.body
  const tarefa = await prisma.tarefa.create({
    data: {
      title: body.title,
      description: body.description,
      date: body.date,
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      location: body.location
    }
  })

  return response.status(201).json(tarefa)
})

app.put('/tarefas/:id', async (request, response) => {
  const { id } = request.params
  const body: any = request.body
  const tarefa = await prisma.tarefa.update({
    where: { id },
    data: {
      title: body.title,
      description: body.description,
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      location: body.location
    }
  })

  response.json(tarefa)
})

app.delete('/tarefas/:id', async (req, res) => {
  const { id } = req.params
  const tarefa = await prisma.tarefa.delete({
    where: {
      id
    }
  })
  res.json(tarefa)
})

// app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
//   console.log('aqui')
//   res.status(500)
//   res.send('Oops, something went wrong.')
// })

// localhost:3333/tarefas
app.listen(port, () => {
  console.info('Aplicação rodando em http://localhost:3333')
})
