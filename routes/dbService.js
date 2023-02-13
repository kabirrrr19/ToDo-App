
const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');
const PORT = dotenv.PORT || 3000;
// const { resolveSoa } = require('dns');
const router = express.Router();

dotenv.config({
    path:"../.env"
})

const publicDirectory = path.join(__dirname, "./public");
router.use(express.static(publicDirectory));
router.use(express.static("views/images"));

//Parse URL-encoded bodies (as sent by the forms)
router.use(express.urlencoded({ extended: false }));
//Parse JSON bodies (as sent by the API clients)
router.use(express.json());

router.use(cookieParser()); 


const db = mysql.createConnection({
    host : process.env.DATABASE_HOST, // ip address of your server
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
});

// create
router.post('/addTask', (req, res) => {
    const { id, task} = req.body;
    const query = "INSERT INTO tasktable(id, task) VALUES(?,?)";
    db.query(query, [id, task], (err, result) => {
        if (err) {
            res.send(err)
        }
        else {
            res.send({
                status: 200,
                message: 'Inserted successfully'
            })
        }
    })
})


// get
router.get('/getTask', (req, res) => {
    try {
        const query = "SELECT * FROM tasktable";
        db.query(query, (err, result) => {
            if (err) res.send(err);
            res.send(result);
        });
    }
    catch (err) {
        res.send(err);
    }
})


// update
router.put('/updateTask', (req, res) => {
    try {
        const { id, task} = req.body;
        const query = "UPDATE tasktable SET task = ? WHERE id = ?";
        db.query(query, [task, id], (err, result) => {
            if (err) {
                console.log(err + " heh backend");
                res.send(err);
            }
            else {
                res.send({
                    status: 200,
                    message: 'Updated successfully'
                })
            }
        })
    } catch (err) {
        res.send(err);
    }
})



// delete
router.delete('/deleteTask', (req, res) => {
  const { id, task, date_time } = req.body;
  console.log("ele data")
  console.log(id, task, date_time)
    const query = "DELETE FROM tasktable WHERE id = ? AND task = ?";
    db.query(query, [id, task], (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      } 
        else {
            res.send({  
                status: 200,
                message: 'Deleted successfully'
            })
        }
    })
})



module.exports = router;
