const db = require('sqlite')

module.exports = {
    getAll() {
        return db.all("select * from todos")
    },
    getOnlyOne(id) {
        return db.get("select * from todos where rowid = " + id)
    },
    add(message, completion, created_at, updated_at, user_id) {
        return db.run("insert into todos (message, completion, created_at, updated_at, user_id) values ('" + message + "', '" + completion + "', '" + created_at + "', '" + updated_at + "', '" + user_id + "')")
    },
    modify(id, message, completion, updated_at) {
        console.log(id, message, completion, updated_at)
        return db.run("update todos set message = '" + message 
                                    + "', completion = '" + completion 
                                    + "', updated_at = '" + updated_at 
                                    + "' where rowid = " + id )
    },
    delete(id) {
        return db.run("delete from todos where rowid = " + id)
    }
}