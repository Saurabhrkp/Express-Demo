const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Hello World');
    res.end();
  }

  if (req.url === '/json') {
    res.write(
      JSON.stringify({
        name: 'Anshu',
        age: 19,
        hobby: ['Cooking', 'Singing', 'Reading']
      })
    );
    res.end();
  }
});

server.listen(3000);

console.log('Listening on port 3000...');
