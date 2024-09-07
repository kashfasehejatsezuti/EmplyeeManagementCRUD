import express from "express";
import mysql from "mysql";
import cors from "cors";

// Setting Up the Express Server:
const app = express();
// allowing your server to respond to requests from other origins (e.g., your React frontend running on a different port).
app.use(cors());
app.use(express.json());

// Connect with mysql database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

// sets up a route on my server to respond to GET requests when user accesses the root URL ("/")
app.get("/", (req, res) => {
  const sql = "SELECT * FROM student";

  // running the SQL query

  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Server Error" });

    // result back to the client in JSON format

    return res.json(result);
  });
});

app.post("/student", (req, res) => {
  const sql = "INSERT INTO  student (`Name`,`Email`) VALUES(?)";
  const values = [req.body.name, req.body.email];
  db.query(sql, [values], (err, result) => {
    if (err) return res.json({ Message: "Server Error" });

    // result back to the client in JSON format

    return res.json(result);
  });
});

// sets up a route on my server to respond to GET requests when user accesses the root URL ("/read/:id")

app.get("/read/:id", (req, res) => {
  const sql = "SELECT * FROM student WHERE ID = ?";
  const id = req.params.id;

  // running the SQL query with id

  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Server Error" });

    // result back to the client in JSON format

    return res.json(result);
  });
});

app.put("/edit/:id", (req, res) => {
  const sql = "UPDATE student SET `NAME` = ? ,`EMAIL` = ? WHERE ID = ?";
  const id = req.params.id;

  db.query(sql, [req.body.name, req.body.email, id], (err, result) => {
    if (err) return res.json({ Message: "Server Error In Update" });

    // result back to the client in JSON format

    return res.json(result);
  });
});

app.delete("/delete/:id", (req, res) => {
  const sql = "DELETE FROM student  WHERE ID = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Server Error In Update" });

    // result back to the client in JSON format

    return res.json(result);
  });
});

// Start The Server

app.listen(8080, () => {
  console.log("Server Running");
});
