const db = require('sqlite')
const passwordHash = require('password-hash')
const moment = require('moment')

module.exports = {
    getAll() {
        return db.all("select * from users")
    },
    getOnlyOne(id) {
        return db.get("select * from users where rowid = " + id)
    },
    add(firstname, lastname, username, password, email) {
        updated_at = moment().format("YYYY MM DD")
        created_at = moment().format("YYYY MM DD")
        passwordHashed = passwordHash.generate(password)
        return db.run("insert into users (firstname, lastname, username, password, email, created_at, updated_at) values ('" + firstname + "', '" + lastname + "', '" + username + "', '" + passwordHashed + "', '" + email + "', '" + created_at + "', '" + updated_at + "')")
    },
    modify(id, firstname, lastname, username, password, email) {
        updated_at = moment().format("YYYY MM DD")
        passwordHashed = passwordHash.generate(password)
        return db.run("update users set firstname = '" + firstname 
                                    + "', lastname = '" + lastname 
                                    + "', username = '" + username 
                                    + "', password = '" + passwordHashed
                                    + "', email = '" + email
                                    + "', updated_at = '" + updated_at 
                                    + "' where rowid = " + id )
    },
    delete(id) {
        return db.run("delete from users where rowid = " + id)
    },
    getAllTodosForUser(id) {
        return db.all("select * from todos where user_id = '" + id + "'")
    }
}