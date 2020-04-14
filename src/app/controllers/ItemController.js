import * as Yup from 'yup';
import Item from '../models/Item';
import PhoneticKey from '../models/PhoneticKey';

class ItemController {
  async index(req, res) {
    const items = await Item.findAll();
    return res.json(items);
  }

  async show(req, res) {
    const { id } = req.params;

    const item = await Item.findOne({ where: { id } });

    if (!item) return res.status(400).json({ error: 'Item not found' });

    return res.json(item);
  }

  async search(req, res) {
    let { search } = req.query;
    search = PhoneticKey.encode(search.toUpperCase());

    const item = await Item.findAll({
      attributes: ['id', 'name', 'status', 'price'],
      include: [
        {
          model: PhoneticKey,
          as: 'phonetic_key',
          where: { key: search },
        },
      ],
    });

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
