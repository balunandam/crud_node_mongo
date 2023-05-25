const express = require('express');

const app = express();
const db = require('./db');
const collection = 'todo';

app.use(express.json());

app.post('/post', (req, res) => {

  function addRecords() {
    let promises = new Promise((resolve, reject) => {
      const { body } = req;
      const obj = {
        studentName: body && body.studentName || 'Test Value',
        id: body && body.id,
        class: body && body.class,
        school: body && body.school
      }
      db.getDB().collection(collection).insertOne(obj, (err, result) => {
        if (err) {
          reject("Rejected!");
        } else {
          resolve("Resolved!");
        }
      });
    });
    return promises;
  }
  
  addRecords().then((result) => {
    res.send({ res: 'Added new record', status: 'Success', message: 'Saved' });
    console.log(result);
  }).catch((result) => {
    console.log(result);
  });
});

app.get('/getTodos', (req, res) => {
  db.getDB().collection(collection).find({}).toArray((arr, documents) => {
    if (arr) {
      console.log(arr);
    } else {
      res.json(documents);
    }
  })
});

app.put('/:id', (req, res) => {
  const id = req.params.id;
  const userInput = req.body;
  db.getDB().collection(collection).findOneAndUpdate({ id: id }, { $set: { studentName: userInput.studentName } }, { returnOrigin: false }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  db.getDB().collection(collection).findOneAndDelete({ id: id }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  })
})

db.connect((err) => {
  if (err) {
    console.log('unable to connect to database');
    process.exit(1);
  } else {
    app.listen(3000, () => {
      console.log('Connected to database, app listening on port 3000')
    })
  }
});