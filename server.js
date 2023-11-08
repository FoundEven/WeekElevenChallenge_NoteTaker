const express = require('express');
const path = require('path');
const fs = require('fs');

//connection to json file
let reviewJson = require('./db/db.json');


const PORT = process.env.PORT || 3001;  
const app = express();
//Middleware for parsing application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Middleware to public 
app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


app.get('/api/notes', (req, res) => {
  // Log our request to the terminal
  console.info(`${req.method} request received to get notes`);

  // Sending all reviews to the client
  return res.json(reviewJson);
});


app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  let { title, text ,id } = req.body;



    let newReview = {
      title,
      text,
      id: Math.random(),
    };

    //appending new object to end of array
    reviewJson.push(newReview)
    const reviewString = JSON.stringify(reviewJson);

    // Write the string to a file
    fs.writeFile(`./db/db.json`, reviewString, (err) =>
      err
        ? console.error(err)
        : console.log(
            `Review for ${newReview} has been written to JSON file`
          )
    );
});

//listens for port call
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));