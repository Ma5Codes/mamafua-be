'use strict';
import { Model } from 'sequelize';

class Transactions extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}

const initTransactions = (sequelize, DataTypes) => {
  Transactions.init(
    {
      transactionId: DataTypes.STRING,
      notaId: DataTypes.STRING,
      weight: DataTypes.FLOAT,
      service: DataTypes.STRING,
      price: DataTypes.FLOAT,
      perprice: DataTypes.FLOAT,
      name: DataTypes.STRING,
      noTelp: DataTypes.STRING,
      address: DataTypes.STRING,
      createdBy: DataTypes.STRING,
      fkAuthor: DataTypes.INTEGER,
      dateIn: DataTypes.DATE,
      dateOut: DataTypes.DATE,
      dateDone: DataTypes.DATE,
      amountPayment: DataTypes.FLOAT,
      datePayment: DataTypes.DATE,
      status: DataTypes.STRING,
      notes: DataTypes.STRING,
      cashier: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'transactions',
    }
  );
  return Transactions;
};

export default initTransactions;