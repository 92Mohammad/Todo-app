const express = require('express')
const app = express();
const connection = require('../connectDB')

module.exports = {
    getTodo: (req, res) => {
        const value = [req.userId]
        const sql =  'SELECT * FROM todos WHERE user_id = ?'
        connection.query(sql, value, (err, results) => {
            if (err){
                console.error("Query related error : ", err.message)
            }
            else {
    
                return res.json( results)
            }

        })



    },
    createTodo: (req, res) => {
        const task = req.body.task;
        const loggedUserId = req.userId 
        console.log('inside the create todo end point')
       
        
        if(!task || !loggedUserId){
        
            return res.status(401).send({ ssage: "Please fulfill the input box" })
        }
        const values = [task, loggedUserId]
        const sql = 'INSERT INTO todos (task, user_id) VALUES(?, ?)'
        connection.query(sql, values, (err, results) => {
            if(err){
                console.error("Query related error : ", err.message)
            }
            else {
                return res.status(201).send({ message: "todo created successfuly" })
            }
        })

    },
    deleteTodo: (req, res) => {
        const Id = [req.body.userId];
        const sql = 'DELETE FROM todos WHERE id = ?; '
        connection.query(sql, Id, (err, results) => {
            if (err){
                console.error("Query related error : ", err.message)
            }
            else {
                return res.status(204).send({ message: "task deleted successfully"})
            }
        })

    }
}