import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import { Task } from '../models/Task';

const router = express.Router();

const JWT_SECRET = 'your_jwt_secret';

router.post(
  '/register',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    (async () => {
      const { username, password } = req.body;
      console.log('Received data:', req.body);

      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists!' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      try {
        const user = await User.create({
          username,
          password: hashedPassword,
        });

        const token = jwt.sign({ id: user.id }, JWT_SECRET, {
          expiresIn: '1h',
        });

        res.status(201).json({
          message: 'User created successfully',
          id: user.id,
          username: user.username,
          token,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    })().catch(next);
  }
);

router.post(
  '/login',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    (async () => {
      const { username, password } = req.body;
      console.log('Received data:', req.body);

      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(400).json({ message: 'User not found!' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password!' });
      }

      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({
        message: 'Login successful',
        id: user.id,
        username: user.username,
        token,
      });
    })().catch(next);
  }
);

router.post(
  '/token',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    (async () => {
      const { token } = req.body;
      console.log('Received token:', token);

      if (!token) {
        return res.status(400).json({ message: 'Token not provided!' });
      }

      let verifyToken = false;

      jwt.verify(
        token,
        JWT_SECRET,
        (err: jwt.VerifyErrors | null, decoded: any) => {
          if (err) {
            return res.status(401).json({ message: 'Invalid token!' });
          }
          verifyToken = decoded.id;
        }
      );

      const user = await User.findOne({ where: { id: verifyToken } });
      if (!user) {
        return res.status(402).json({ message: 'User not found!' });
      }
      const tasks = await Task.findAll({ where: { userId: user.id } });
      res.status(200).json({
        id: user.id,
        username: user.username,
        tasks: tasks,
      });
    })().catch(next);
  }
);

export default router;
