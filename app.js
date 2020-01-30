const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/json', (req, res) => {
  res.send({
    name: 'Manisha',
    age: 24,
    hobby: ['Tailoring', 'Shopping', 'Reading'],
    engaged: 'Not till now'
  });
});

app.get('/post/:id', (req, res) => {
  res.send(req.params.id);
});

app.get('/posts/:year/:month', (req, res) => {
  // ?search=CallOfDuty
  res.send(req.query);
});

// PORT=5000 node app.js
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
