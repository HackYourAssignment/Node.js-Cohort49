import newDatabase from './database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Change this boolean to true if you wish to keep your
// users between restart of your application
const isPersistent = true;
const database = newDatabase({ isPersistent });
const secretKey = 'super-secret-key';
// Create middlewares required for routes defined in app.js

//register
// export const register = async (req, res) => {};
export const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = database.create({ username, password: hashedPassword });
    res.status(201).json({ id: newUser.id, username: newUser.username });
  } catch (error) {
    res.status(500).send('An error occurred while registering the user');
  }
};

//login
export const login = async (req, res) => {
  const { username, password } = req.body;
  const users = database.getAll();
  const user = users.find((user) => user.username === username);

  if (!user) {
    return res.status(404).send('User not found');
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: 'Invalid password' });
  }
  const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
  return res.status(200).json({ token });
};

//getProfile

export const getProfile = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    const user = database.getById(decoded.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ id: user.id, username: user.username });
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// You can also create helper functions in this file to help you implement logic
// inside middlewares
//logout
export const logout = async (req, res) => {
  res.status(204).send('Logged out successfully');
};
