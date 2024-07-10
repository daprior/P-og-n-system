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
      type: DataTypes.JSON,
      allowNull: true,
    },
    email: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    jobtitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    employmentdate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    paidphone: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    phonenote: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    card: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    department: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    accesses: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    other: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    note: {
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
