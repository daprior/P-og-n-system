import { DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize'; // Adjust the path as necessary

const SettingsModel = sequelize.define('Settings', {
  onboardmails: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  offboardmails: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  itmails: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  // other fields...
}, {
  timestamps: true,
});

export default SettingsModel;
