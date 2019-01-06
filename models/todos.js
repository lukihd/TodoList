const db = require('sqlite')
const moment = require('moment')

module.exports = {
    getAll() {
        return db.all("select * from todos")
    },
    getOnlyOne(id) {
        return db.get("select * from todos where rowid = " + id)
    },
    add(message, completion, user_id) {
        updated_at = moment().format("YYYY MM DD")
        created_at = moment().format("YYYY MM DD")
        return db.run("insert into todos (message, completion, created_at, updated_at, user_id) values ('" + message + "', '" + completion + "', '" + created_at + "', '" + updated_at + "', '" + user_id + "')")
    },
    modify(id, message, completion) {
        updated_at = moment().format("YYYY MM DD")
        return db.run("update todos set message = '" + message 
                                    + "', completion = '" + completion 
                                    + "', updated_at = '" + updated_at 
                                    + "' where rowid = " + id )
    },
    delete(id) {
        return db.run("delete from todos where rowid = " + id)
    }
}