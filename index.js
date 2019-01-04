const express = require('express')
const bodyParser = require('body-parser')
const db = require('sqlite')
const app = express()
const todos = require('./routes/todos') 
const users = require('./routes/users') 


db.open('todolist.db').then(() => {
    console.log('Database ready ')
    return Promise.all([
        db.run("CREATE TABLE IF NOT EXISTS users (firstname, lastname, username, password, email, created_at, updated_at)"),
        db.run("CREATE TABLE IF NOT EXISTS todos (message, completion, created_at, updated_at, user_id, FOREIGN KEY(user_id) REFERENCES users(rowid))"),
    ])
})
.then(() => {
    console.log('tables ready')
})
.catch ((err) =>{
    console.log(err)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/todos', todos)
app.use('/users', users)


app.listen(8080)
