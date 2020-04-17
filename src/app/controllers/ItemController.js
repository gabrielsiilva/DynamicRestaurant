import * as Yup from 'yup';
import Item from '../models/Item';
import PhoneticKey from '../models/PhoneticKey';

import Cache from '../../lib/Cache';

class ItemController {
  async index(req, res) {
    const cached = await Cache.get('items');

    if (cached) {
      return res.json(cached);
    }
    const items = await Item.findAll();

    await Cache.set('items', items);

    return res.json(items);
  }

  async show(req, res) {
    const { id } = req.params;

    const item = await Item.findOne({ where: { id } });

    if (!item) return res.status(400).json({ error: 'Item not found' });

    return res.json(item);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      status: Yup.string().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Item object is not valid!!' });
    }

    const item = await Item.create(req.body);

    await Cache.invalidate('items');

    const array = item.name
      .toUpperCase()
      .trim()
      .split(/\s+/gi)
      .filter((element) => element.length > 2);

    array.forEach(async (element) => {
      const key = PhoneticKey.encode(element);
      await PhoneticKey.create({
        key,
        item_id: item.id,
      });
    });

    return res.json(item);
  }
}

export default new ItemController();
