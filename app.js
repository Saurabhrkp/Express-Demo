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

// PORT=5000 node app.js
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
