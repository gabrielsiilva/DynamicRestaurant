import Sequelize, { Model } from 'sequelize';

export default class Table extends Model {
  static init(sequelize) {
    super.init(
      {
        status: Sequelize.ENUM(['available', 'unavailable']),
        table_number: Sequelize.INTEGER,
        total: Sequelize.VIRTUAL,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Order, { foreignKey: 'table_id', as: 'orders' });
  }
}
