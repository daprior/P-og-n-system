// models/EmployeeModel.js
import { DataTypes } from "sequelize";
import sequelize from "../utils/sequelize";

const EmployeeModel = sequelize.define(
  "Employee",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "employees",
  }
);

export default EmployeeModel;
