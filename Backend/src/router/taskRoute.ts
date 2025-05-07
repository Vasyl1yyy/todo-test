import express from 'express';
import { Task } from '../models/Task';

const router = express.Router();

router.post(
  '/create',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    (async () => {
      const { title, userId } = req.body;
      console.log('Received data:', req.body);

      try {
        const task = await Task.create({
          title,
          userId,
        });

        res.status(201).json({
          message: 'Task created successfully',
          id: task.id,
          title: task.title,
          done: task.done,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    })().catch(next);
  }
);

router.get(
  '/:userId',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    (async () => {
      const { userId } = req.params;
      console.log('Received data:', req.params);

      try {
        const tasks = await Task.findAll({
          where: { userId },
        });

        res.status(200).json(tasks);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    })().catch(next);
  }
);

router.post('/:id/done', (req, res, next) => {
  (async () => {
    const { id, userId } = req.body;
    try {
      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      task.done = !task.done;
      await task.save();

      const tasks = await Task.findAll({
        where: { userId },
      });
      res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  })().catch(next);
});

export default router;
