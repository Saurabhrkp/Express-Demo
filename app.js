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

app.listen(3000, () => console.log('Listening on port 3000'));
