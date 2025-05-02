import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User';

const router = express.Router();

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

        res.status(201).json({
          message: 'User created successfully',
          id: user.id,
          username: user.username,
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

      res.status(200).json({
        message: 'Login successful',
        id: user.id,
        username: user.username,
      });
    })().catch(next);
  }
);

export default router;
