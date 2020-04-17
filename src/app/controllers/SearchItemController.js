import Item from '../models/Item';
import PhoneticKey from '../models/PhoneticKey';

class SearchItemController {
  async index(req, res) {
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
}

export default new SearchItemController();
