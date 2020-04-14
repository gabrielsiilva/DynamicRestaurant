import Sequelize, { Model } from 'sequelize';

export default class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        client_name: Sequelize.VIRTUAL,
        status: Sequelize.ENUM(['received', 'preparing', 'ready', 'sent']),
        amount: Sequelize.VIRTUAL,
        total: Sequelize.VIRTUAL,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Table, { foreignKey: 'table_id', as: 'table' });
    this.belongsTo(models.Item, { foreignKey: 'item_id', as: 'item' });
  }
}
