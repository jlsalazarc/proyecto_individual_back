const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {

  const { authorization } = req.headers
  if (!authorization) {
    res.status(401).json({ message: 'Su sesión expiró' });
    return;
  }

  const token = authorization.split(' ')[1] 

  console.log(token);
  if (!token) {
    res.status(401).json({ message: 'Su sesión expiró' });
    return;
  }

  const { id } = jwt.verify(token, process.env.SECRET);

  req.userId = id;
  next();
}
