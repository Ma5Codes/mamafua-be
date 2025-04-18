'use strict';
import { Model } from 'sequelize';

class Customers extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}

const initCustomers = (sequelize, DataTypes) => {
  Customers.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      noTelp: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'customers',
    }
  );
  return Customers;
};

export default initCustomers;