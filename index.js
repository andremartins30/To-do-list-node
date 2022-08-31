const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

//models
const Task = require('./models/Task')

//routes
const taskRoutes = require('./routes/taskRoutes')

const app = express()

const hbs = exphbs.create({
    partialsDir: ["views/partials"],
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.use(express.static('public'))

app.use('/tasks', taskRoutes)


conn.sync().then(() => {
    app.listen(3000)
        console.log('App rodando na porta: http://localhost:3000/tasks')
}).catch((err) => console.log(err))
    