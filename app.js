const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const express = require('express');
const logger = require('./logger');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

// NODE_ENV=production npm test
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan enabled...');
}

app.use(logger);

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
  const { error } = validateMember(req.body);

  if (error) {
    // 400 Bad Request
    res.status(400).send(error.details[0].message);
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
  const member = members.find(c => c.id === parseInt(req.params.id));
  if (!member) {
    res.status(404).send('There is no member with given ID');
  }
  const { error } = validateMember(req.body);

  if (error) {
    // 400 Bad Request
    res.status(400).send(error.details[0].message);
    return;
  }

  member.name = req.body.name;
  res.send(member);
});

app.delete('/member/:id', (req, res) => {
  const member = members.find(c => c.id === parseInt(req.params.id));
  if (!member) {
    res.status(404).send('There is no member with given ID');
  }
  const index = members.indexOf(member);
  members.splice(index, 1);
  res.send(member);
});

function validateMember(member) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    age: Joi.number().required()
  };

  return Joi.validate(member, schema);
}

// PORT=5000 node app.js
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
