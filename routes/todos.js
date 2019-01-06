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

router.get('/add', (req, res) => {
    res.render('./todos/add.pug', {

    })
})

router.get('/:id/edit', (req, res) => {
    res.render('./todos/edit.pug', {
        id: req.params.id
    })
})

router.get('/:id', (req, res) => {

    return Todos.getOnlyOne(req.params.id)
    .then((todos) => {
        res.format({
            json: () => {res.json(todos)},

            html: () => {
                res.render('./todos/show.pug', {
                    Todolist: todos
                })
            }
        })
    })
    .catch((err) => {
        return res.send(err)
    })
})

router.post('/', (req, res) => {
    message = req.body.message
    completion = req.body.completion
    user_id = req.body.user_id

    return Todos.add(message, completion, user_id)
    .then(() => {
        res.format({
            json: () => {res.json({message: "success"})},

            html: () => {
                res.redirect('/todos')
            }
        })
    })
    .catch((err) => {
        return res.send(err)
    })
})

router.put('/:id', (req, res) => {
    message = req.body.message
    completion = req.body.completion

    return Todos.modify(req.params.id ,message, completion)
    .then(() => {
        res.format({
            json: () => {res.json({message: "success"})},

            html: () => {
                res.redirect('/todos')
            }
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
            json: () => {res.json({message: "success"})},

            html: () => {
                res.redirect('/todos')
            }
        })
    })
    .catch((err) => {
        return res.send(err)
    })
})

module.exports = router;
