const express = require("express");
const app = express();
const port = 8080;
const members = require('./routes/memberRoutes');
const cors = require('cors'); // Import the cors middleware

// Configure CORS middleware (adjust origin as needed)
const corsOptions = {
  origin: 'http://localhost:3000' // Allow requests from your frontend origin
};
app.use(cors(corsOptions));
//const cors = require('cors');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// הגדרות CORS
// const corsOptions = {
//   origin: '*', // מאפשר בקשות מכל מקור
//   credentials: true, // מאפשר קבלת קובץ cookie בקריאות מ-CORS
//   optionSuccessStatus: 200 // מאפשר חזרת קוד 200 לבקשות OPTIONS
// };
// app.use(cors(corsOptions));

// מעביר את הגדרת ה-ROUTES לקוד זה
app.use('/api/members', members);

app.listen(port, (req, res) => {
  console.log(`Example app listening at http://localhost:${port}`);
});
