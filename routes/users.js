const router = require('express').Router()
const Users = require('./../models/users')

router.get('/', (req, res) => {
    return Users.getAll()
    .then((users) => {
        res.format({
            json: () => {res.json(users)}
        })
    })
    .catch((err) => {
        return res.send(err)
    })
})

router.get('/:id', (req, res) => {
    return Users.getOnlyOne(req.params.id)
    .then((user) => {
        res.format({
            json: () => {res.json(user)}
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
    created_at = req.body.created_at
    updated_at = req.body.updated_at

    return Users.add(firstname, lastname, username, password, email, created_at, updated_at)
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
    firstname = req.body.firstname
    lastname = req.body.lastname
    username = req.body.username
    password = req.body.password
    email = req.body.email
    updated_at = req.body.updated_at

    return Users.modify(req.params.id, firstname, lastname, username, password, email, updated_at)
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

module.exports = router;