import * as Yup from 'yup';

import Table from '../models/Table';
import Order from '../models/Order';

class TableController {
  async index(req, res) {
    const tables = await Table.findAll({
      include: [
        {
          model: Order,
          as: 'orders',
        },
      ],
    });

    res.json(tables);
  }

  async show(req, res) {
    const table = await Table.findOne({
      where: { table_number: req.params.id },
      include: [
        {
          model: Order,
          as: 'orders',
        },
      ],
    });

    if (!table)
      return res.status(404).json({
        error: 'Table not found, please check the number of the table',
      });

    return res.json(table);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      status: Yup.string().required(),
      table_number: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation failed' });

    const table = await Table.create(req.body);

    return res.json(table);
  }
}

export default new TableController();
