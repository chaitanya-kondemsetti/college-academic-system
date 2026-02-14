require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname))


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});



db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    }
    else {
        console.log("Connected to MySQL Database");
    }
});



app.post("/signup", (req, res) => {
    db.query(
        'INSERT INTO users1 (username,password) VALUES (?, ?)',
        [req.body.username, req.body.password],
        (err) => {
            if (err) {
                console.error("Error creating user:", err);
                res.redirect('http://localhost:3000/signup.html?error=1');
            } else {
                res.redirect('http://localhost:3000/login.html?success=1');
            }
        }
    );
});



app.post("/login", (req, res) => {
    db.query(
        "SELECT * FROM users1 WHERE username = ? AND password = ?",
        [req.body.username, req.body.password],
        (err, results) => {
            if (err) {
                console.error("Error checking user:", err);
                res.redirect("http://localhost:3000/login.html?error=1");
            }
            else if (results.length > 0) {
                res.redirect("http://localhost:3000/dashboard");
            }
            else {
                res.redirect("http://localhost:3000/login.html?error=1");
            }
        }
    );
});



app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "dashboard.html"));
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});