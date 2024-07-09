// lib/dbConnect.js
import sequelize from './sequelize';
import EmployeeModel from '../models/EmployeeModel';

async function dbConnect() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export default dbConnect;
