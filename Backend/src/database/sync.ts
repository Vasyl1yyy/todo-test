import { User } from '../models/User';
import { Task } from '../models/Task';
import { sequelize } from './db'; // Імпорт sequelize з вашого файлу конфігурації

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Зв'язок між моделями
    User.hasMany(Task, { foreignKey: 'userId' });
    Task.belongsTo(User, { foreignKey: 'userId' });

    // Синхронізація бази даних
    await sequelize.sync({ force: true }); // force: true — перезаписати таблиці
    console.log('Database synced');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

syncDatabase();
