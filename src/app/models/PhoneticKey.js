import Sequelize, { Model } from 'sequelize';

import PHONETIC_RULES from '../../util/phonetic-rules';

export default class PhoneticKey extends Model {
  static init(sequelize) {
    super.init(
      {
        key: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Item, { foreignKey: 'item_id', as: 'item' });
  }

  static encode(text) {
    text.toUpperCase();
    text = this.applyRules(text);
    text = this.removeDuplicateCharacters(text);
    return text;
  }

  static removeDuplicateCharacters(string) {
    return string
      .split('')
      .filter((item, pos, self) => self.indexOf(item) === pos)
      .join('');
  }

  static applyRules(str) {
    PHONETIC_RULES.forEach((regra) => {
      const regex = new RegExp(regra[0], 'gi');
      str = str.replace(regex, regra[1]);
    });

    return str;
  }
}
