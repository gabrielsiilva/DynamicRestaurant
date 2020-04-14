import * as Yup from 'yup';

import Order from '../models/Order';

class OrderController {
  async index(req, res) {
    const { tableNumber } = req.params;

    const orders = Order.findAll({
      where: { table_number: tableNumber },
    });

    res.json(orders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      client_name: Yup.string().required(),
      status: Yup.string().required(),
      amount: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation fails' });

    const { client_name, status, amount } = req.body;

    const order = await Order.create({
      client_name,
      status,
      table_id: 1,
      item_id: 1,
      amount,
    });

    return res.json(order);
  }
}

export default new OrderController();
