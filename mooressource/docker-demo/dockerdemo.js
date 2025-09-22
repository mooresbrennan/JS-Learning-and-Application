const http = require("http");
const port = 3000; //localhost

const server = http.createServer((req, res) => {
    res.end("This ain't your granddad's demo!");
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

