import Boom from 'boom';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserModel from '../model/user';

const secretkey = process.env.SECRET_KEY || 'secret';
const exp = process.env.TOKEN_EXP || '20m';


class AuthController {
  static* login({ email, password }) {
    if (!email || !password) {
      throw Boom.badData('Missing fields');
    }

    const user = yield UserModel.findOne({ email });

    if (!user) {
      throw Boom.notFound('User not found');
    }

    const passwordCompare = yield bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      throw Boom.unauthorized('Wrong password');
    }

    const userObject = user.toJSON();
    delete userObject.password;

    const token = jwt.sign(userObject, secretkey, { expiresIn: exp });

    return {
      user: userObject,
      token,
    };
  }

  static* register(user) {
    const {
      firstname, lastname, email, password,
    } = user;

    // check all the fields are available
    if (!firstname || !lastname || !email || !password) {
      const missingFields = ['firstname', 'lastname', 'email', 'password'].reduce((agg, field) => {
        if (!user[field]) {
          agg.push(field);
        }

        return agg;
      }, []);

      throw Boom.badData(JSON.stringify({
        message: 'Missing field',
        fields: missingFields,
      }));
    }

    const existingUser = yield UserModel.findOne({ email });

    if (existingUser) {
      throw Boom.conflict('User with email already exists');
    }

    const salt = yield bcrypt.genSalt(10);
    const hashedPassword = yield bcrypt.hash(password, salt);

    const newUser = new UserModel({ ...user, password: hashedPassword });

    const savedUser = yield newUser.save();
    const userObject = savedUser.toJSON();
    delete userObject.password;


    const token = jwt.sign(userObject, secretkey, { expiresIn: exp });

    return {
      user: userObject,
      token,
    };
  }
}

export { AuthController };
