const express = require('express');
const app = express();

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
