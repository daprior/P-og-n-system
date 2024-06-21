// models/SettingsModel.js
import { DataTypes } from "sequelize";
import sequelize from "../utils/sequelize";

const SettingsModel = sequelize.define(
  "Settings",
  {
    emailRecipients: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    timestamps: true,
    tableName: "settings",
  }
);

export default SettingsModel;
