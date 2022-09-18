const mongoose = require('mongoose');
const app = require("./app");
const port = process.env.PORT;

mongoose.connect(process.env.DATABASE, {}).then((con) => {
    console.log('Connected to mongo');
});

const server = app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', (error) => {
    console.log('unhandledRejection', error);
    console.log('Shutting down');
    server.close(() => {
        process.exit(1);
    });
});