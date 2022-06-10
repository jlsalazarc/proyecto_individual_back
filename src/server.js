require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connect } = require('./database');
const proyectosRouter = require('./routes/proyectos');
const usersRouter = require('./routes/users');
const { auth } = require('./utils/auth');

const port = process.env.PORT || 8000;
const app = express();
connect();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/',auth, (req, res) => {
  console.log(req.userId);
  res.status(200).json({ message: "it's working" });
});

app.use('/proyectos', proyectosRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
