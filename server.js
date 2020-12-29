const { PORT } = require('./config')
const express = require('express');
const connectDB = require('./config/db');
const indexRouter = require('./routes/index');


// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// API logger
app.use((req, res, next) => {
  console.log(`\x1b[32m` + `api hitted ${(new Date()).toLocaleTimeString()} ${req.url} ${req.method}`);
  next();
});

// Routes
app.use('/', indexRouter);


app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
