'use strict';
import { Model } from 'sequelize';

class Accounts extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    Accounts.hasMany(models.transactions, {
      foreignKey: 'fkAuthor',
    });
  }
}

const initAccounts = (sequelize, DataTypes) => {
  Accounts.init(
    {
      nik: DataTypes.STRING,
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      role: DataTypes.STRING,
      noTelp: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'accounts',
    }
  );
  return Accounts;
};

export { initAccounts as default, Accounts };