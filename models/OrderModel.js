// models/OrderModel.js
import { DataTypes } from "sequelize";
import sequelize from "../utils/sequelize";

const OrderModel = sequelize.define(
  "Order",
  {
    medarbejderensnavn: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    udfyldtaf: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hardware: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    andet: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    modtageradresse: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "orders",
  }
);

export default OrderModel;