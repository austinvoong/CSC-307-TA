import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import userServices from './models/user-services.js'

const app = express()
const port = 8001

const allowedOrigins = [
    'http://localhost:3000',
    'https://taskarena-hxd7fcczhcdgfnch.westus3-01.azurewebsites.net',
]

app.use(
    cors({
        origin: allowedOrigins, // Allow these origins
        methods: ['GET', 'POST', 'DELETE', 'PUT'], // Allowed HTTP methods
    })
)

app.use(express.json())

//  FIRST FETCH
app.get('/users', async (req, res) => {
    const name = req.query['username']
    const job = req.query['password']
    try {
        const result = await userServices.getUsers(name, job)
        console.log('app.get-result== ', result)
    } catch (error) {
        console.log(error)
        res.status(500).send('An error ocurred in the server.')
    }
})

app.get('/findaccount', async (req, res) => {
    const username = req.query.username
    const password = req.query.password
    console.log(req.query)
    try {
        const result = await userServices.findOneAccount(username, password)
        if (result === null) {
            throw new Error('Could not find account')
        } else {
            res.status(201).send({ LoginStatus: true })
        }
    } catch (error) {
        console.log(error)
        res.status(404).send({ LoginStatus: false })
    }
})

app.get('/findusername', async (req, res) => {
    const username = req.query['username']
    try {
        const result = await userServices.findUserByName(username)
        console.log('backend result is === ', result)
        if (result) {
            res.status(200).send({ exits: true, message: 'account exist' })
        } else {
            res.status(201).send({ exits: false, message: 'account NOT exist' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('users/findusername has error')
    }
})
app.get('/users/:id', async (req, res) => {
    const id = req.params['id']
    const result = await userServices.findUserById(id)
    if (result === undefined || result === null)
        res.status(404).send('Resource not found.')
    else {
        res.send({ users_list: result })
    }
})

//   ADD USER
app.post('/adduser', async (req, res) => {
    const user = req.body

    const savedUser = await userServices.addUser(user)
    if (savedUser) res.status(201).send(savedUser)
    else res.status(500).end()
})

//-------------delete-----------------
app.delete('/users/:id', async (req, res) => {
    const id = req.params['id'] //or req.params.id
    try {
        const deleting = await userServices.deleteUser(id)

        if (deleting) {
            res.status(204).send()
        } else {
            res.status(404).send('404 no user found to delete')
        }
    } catch {
        res.status(404).send('no user found to delete')
    }
})
//--------------------------------------------
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`)
    console.log(`Request body: ${JSON.stringify(req.body)}`)
    console.log(`Request query: ${JSON.stringify(req.query)}`)
    next()
})

app.listen(process.env.PORT || port, () => {
    console.log('REST API is listening.')
})
