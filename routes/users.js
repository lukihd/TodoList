const router = require('express').Router()
const Users = require('./../models/users')

router.get('/', (req, res) => {
    return Users.getAll()
    .then((users) => {
        console.log(users)
        res.format({
            json: () => {res.json(users)},

            html: () => {
                res.render('index.pug', {
                    key: 'users',
                    Users: users
                })
            }
        })
    })
    .catch((err) => {
        return res.send(err)
    })
})

router.get('/add', (req, res) => {
    res.render('./users/add.pug', {

    })
})

router.get('/:id/edit', (req, res) => {
    res.render('./users/edit.pug', {
        id: req.params.id
    })
})

router.get('/:id', (req, res) => {
    return Users.getOnlyOne(req.params.id)
    .then((user) => {
        res.format({
            json: () => {res.json(user)},
            
            html: () => {
                res.render('./users/show.pug', {
                    Users: user
                })
            }
        })
    })
    .catch((err) => {
        return res.send(err)
    })
}) 

router.post('/', (req, res) => {
    firstname = req.body.firstname
    lastname = req.body.lastname
    username = req.body.username
    password = req.body.password
    email = req.body.email

    return Users.add(firstname, lastname, username, password, email)
    .then(() => {
        res.format({
            json: () => {res.json({message: "success"})},

            html: () => {
                res.redirect('/users')
            }
        })
    })
    .catch((err) => {
        return res.send(err)
    })
})

router.put('/:id', (req, res) => {
    firstname = req.body.firstname
    lastname = req.body.lastname
    username = req.body.username
    password = req.body.password
    email = req.body.email

    return Users.modify(req.params.id, firstname, lastname, username, password, email)
    .then(() => {
        res.format({
            json: () => {res.json({message: "success"})},

            html: () => {
                res.redirect('/users')
            }
        })
    })
    .catch((err) => {
        return res.send(err)
    })
})

router.delete('/:id', (req, res) => {
    return Users.delete(req.params.id)
    .then(() => {
        res.format({
            json: () => {res.json({message: "success"})}
        })
    })
    .catch((err) => {
        return res.send(err)
    })
})

router.get('/:id/todos', (req, res) => {
    return Users.getAllTodosForUser(req.params.id)
    .then((todos) => {
        res.format({
            json: () => {res.json(todos)}
        })
    })
    .catch((err) => {
        return res.send(err)
    })
})

module.exports = router;