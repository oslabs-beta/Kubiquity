const express = require('express');
const path = require('path');
const errorsRouter = require('./routers/errorsRouter');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname + '../src')));
app.use('/build', express.static(path.join(__dirname + '../build')));

app.use('/errors', errorsRouter);
app.use('/metrics', metricsRouter);

app.use((req, res) => res.status(404).send('Unable to find item'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };

  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);

  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}...`);
});

module.exports = app;
