import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Item from '../app/models/Item';
import Order from '../app/models/Order';
import PhoneticKey from '../app/models/PhoneticKey';
import Table from '../app/models/Table';
import User from '../app/models/User';

const models = [Item, Order, PhoneticKey, Table, User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
