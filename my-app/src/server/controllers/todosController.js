const connection = require('../connectDB')

module.exports = {
    getTodo: (req, res) => {
        const  userId   = req.userId;
        const sql =  'SELECT * FROM todos WHERE userId = ?'
        connection.query(sql, [userId], (err, results) => {
            if (err){
                console.error("Query failed in getTodo method : ", err.message)
            }
            else {
                return res.status(200).json(results)
            }
        })
    },
    createTodo: (req, res) => {
        const { task } = req.body;
        const loggedUserId = req.userId 
        
        if(!task || !loggedUserId){
            return res.status(401).send({ ssage: "Please fulfill the input box" })
        }
        const values = [task, loggedUserId]
        const sql = 'INSERT INTO todos (task, userId) VALUES(?, ?)'
        connection.query(sql, values, (err, results) => {
            if(err){
                console.error("Query failed in createTodo method : ", err.message)
            }
            else {
                return res.status(201).send({ message: "todo created successfuly" })
            }
        })

    },
    deleteTodo: (req, res) => {
        const userId = [req.body.userId];
        const sql = 'DELETE FROM todos WHERE todo_id = ?'
        connection.query(sql, userId, (err, results) => {
            if (err){
                console.error("Query failed in deleteTodo method : ", err.message)
            }
            else {
                return res.status(204).send({ message: "task deleted successfully"})
            }
        })

    }
}