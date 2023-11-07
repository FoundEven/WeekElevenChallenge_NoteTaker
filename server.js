const express = require('express');
const path = require('path');
const fs = require('fs');


let reviewJson = require('./db/db.json');


const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

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
  const { title, text } = req.body;

  if (title && text ) {

    const newReview = {
      title,
      text,
    };

    reviewJson.push(newReview)
    // Convert the data to a string so we can save it
    const reviewString = JSON.stringify(reviewJson);

    // Write the string to a file
    fs.writeFile(`./db/db.json`, reviewString, (err) =>
      err
        ? console.error(err)
        : console.log(
            `Review for ${newReview} has been written to JSON file`
          )
    );
  };
});


app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));