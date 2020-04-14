import Sequelize, { Model } from 'sequelize';

export default class Item extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        status: Sequelize.ENUM(['unavailable', 'available']),
        price: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.PhoneticKey, {
      foreignKey: 'item_id',
      as: 'phonetic_key',
    });
  }
}
