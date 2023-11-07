const notes = require('express').Router();

notes.get('/', (req, res) =>
  readFromFile('./db/feedback.json').then((data) => res.json(JSON.parse(data)))
);

notes.post('/api/reviews', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a review`);
  
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    if (title && text ) {

      const newReview = {
        title,
        text,
      };
  
      // Convert the data to a string so we can save it
      const reviewString = JSON.stringify(newReview);
  
      // Write the string to a file
      fs.writeFile(`./db/${newReview.product}.json`, reviewString, (err) =>
        err
          ? console.error(err)
          : console.log(
              `Review for ${newReview.product} has been written to JSON file`
            )
      );
    };
});