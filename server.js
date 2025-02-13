const app = require('./app');
const port = 3000;

app.listen(port, (err) => {
    if (err) console.error("Something went wrong here.");
    console.log(`Server listening at localhost:${port}`)
});
