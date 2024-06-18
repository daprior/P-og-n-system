// models/EmployeeModel.js
import { DataTypes } from "sequelize";
import sequelize from "../utils/sequelize";

const EmployeeModel = sequelize.define(
  "Employee",
  {
    createdby: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    jobtitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    department: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    position: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    accesses: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    misc: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    phonemodel: {
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
