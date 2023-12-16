const express=require("express")
const mysql=require("mysql")
const cors=require("cors")

const PORT = 8081;
const app=express()

app.use(cors())
app.use(express.json());

// connect with database
const db=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"test"
})

// post data
app.post('/updateData', (req, res) => {
  const {id, heading, card_heading, description } = req.body;

  const sql = 'INSERT INTO users (id,heading, card_heading, description) VALUES (?,?, ?, ?) ON DUPLICATE KEY UPDATE id = VALUES(id), heading = VALUES(heading), card_heading = VALUES(card_heading), description = VALUES(description)';

  db.query(sql, [id,heading, card_heading, description], (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
      return;
    }

    console.log('Data updated successfully');
    res.json({ success: true, result });
  });
});


app.get("/",(req,res)=>{
  return res.json("from backend side")
})

// get data
app.get("/users",(req,res)=>{
  const sql="SELECT * FROM users"
  db.query(sql,(err,data)=>{
    if(err) return res.json(err);
    return res.json(data) 
  })
})

// server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});