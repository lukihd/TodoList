const router = require('express').Router()
const Todos = require('./../models/todos')

router.get('/', (req, res) => {
    return Todos.getAll()
    .then((todos) => {
        res.format({
            json: () => {res.json(todos)},

            html: () => {
                res.render('index.pug', {
                    key: 'todos',
                    Todolist: todos
                })
            }
        })
    })
    .catch((err) => {
        return res.send(err)
    })
})

router.get('/:id', (req, res) => {
    return Todos.getOnlyOne(req.params.id)
    .then((todos) => {
        res.format({
            json: () => {res.json(todos)}
        })
    })
    .catch((err) => {
        return res.send(err)
    })
})

router.post('/', (req, res) => {
    message = req.body.message
    completion = req.body.completion
    created_at = req.body.created_at
    updated_at = req.body.updated_at
    user_id = req.body.user_id

    return Todos.add(message, completion, created_at, updated_at, user_id)
    .then(() => {
        res.format({
            json: () => {res.json({message: "success"})}
        })
    })
    .catch((err) => {
        return res.send(err)
    })
})

router.put('/:id', (req, res) => {
    message = req.body.message
    completion = req.body.completion
    updated_at = req.body.updated_at

    return Todos.modify(req.params.id ,message, completion, updated_at)
    .then(() => {
        res.format({
            json: () => {res.json({message: "success"})}
        })
    })
    .catch((err) => {
        return res.send(err)
    })
})

router.delete('/:id', (req, res) => {
    return Todos.delete(req.params.id)
    .then(() => {
        res.format({
            json: () => {res.json({message: "success"})}
        })
    })
    .catch((err) => {
        return res.send(err)
    })
})

module.exports = router;
