import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

import User from '../models/User';

class AuthController {
  async store(req, res) {
    const schema = Yup.object().schema({
      email: Yup.email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(401).json({ error: 'User not found!' });

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Password doesn't match" });
    }

    return res.json({
      user,
      token: jwt.sign({}, 'mysecretsecret', {
        expiresIn: '7d',
      }),
    });
  }
}

export default new AuthController();
