import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/db'; // переконайтеся, що sequelize ініціалізовано тут
import { User } from './User'; // імпортуйте модель User

export class Task extends Model {
  public id!: number;
  public title!: string;
  public done!: boolean;
  public userId!: number; // FK до User
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // посилання на модель User
        key: 'id', // поле в моделі User
      },
    },
  },
  {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
  }
);
