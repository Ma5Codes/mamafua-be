'use strict';
import { Model } from 'sequelize';

class Activities extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}

const initActivities = (sequelize, DataTypes) => {
  Activities.init(
    {
      action: DataTypes.STRING,
      notaId: DataTypes.STRING,
      name: DataTypes.STRING,
      time: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'activities',
    }
  );
  return Activities;
};

export default initActivities;