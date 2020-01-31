const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const members = [
  { id: 1, name: 'Sameer', age: 20 },
  { id: 2, name: 'Anshu', age: 19 },
  { id: 3, name: 'Anjali', age: 23 },
  { id: 4, name: 'Sumit', age: 18 },
  { id: 5, name: 'Manisha', age: 24 }
];
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/members', (req, res) => {
  res.send(members);
});

app.post('/members', (req, res) => {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    age: Joi.number().required()
  };

  const result = Joi.validate(req.body, schema);

  if (result.error) {
    // 400 Bad Request
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const member = {
    id: members.length + 1,
    name: req.body.name,
    age: req.body.age
  };
  members.push(member);
  res.send(member);
});

app.get('/member/:id', (req, res) => {
  const member = members.find(c => c.id === parseInt(req.params.id));
  if (!member) {
    res.status(404).send('There is no member with given ID');
  }
  res.send(member);
});

app.put('/member/:id', (req, res) => {
  // Look up for member
  // If not existing, return 404
  // Validate
  // If invalid, return 400 - Bad request
  // Update member
  // Return the updated member
});

// PORT=5000 node app.js
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
