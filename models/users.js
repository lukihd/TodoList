const db = require('sqlite')

module.exports = {
    getAll() {
        return db.all("select * from users")
    },
    getOnlyOne(id) {
        return db.get("select * from users where rowid = " + id)
    },
    add(firstname, lastname, username, password, email, created_at, updated_at) {
        return db.run("insert into users (firstname, lastname, username, password, email, created_at, updated_at) values ('" + firstname + "', '" + lastname + "', '" + username + "', '" + password + "', '" + email + "', '" + created_at + "', '" + updated_at + "')")
    },
    modify(id, firstname, lastname, username, password, email, updated_at) {
        return db.run("update users set firstname = '" + firstname 
                                    + "', lastname = '" + lastname 
                                    + "', username = '" + username 
                                    + "', password = '" + password
                                    + "', email = '" + email
                                    + "', updated_at = '" + updated_at 
                                    + "' where rowid = " + id )
    },
    delete(id) {
        return db.run("delete from users where rowid = " + id)
    }
}