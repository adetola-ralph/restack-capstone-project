import Boom from 'boom';
import jwt from 'jsonwebtoken';

import UserModel from '../model/user';

const secretkey = process.env.SECRET_KEY || 'secret';

class Authorization {
  static *checkAuthentication(req) {
    const token = req.headers['x-access-token'] || req.headers.token;
    let decoded;

    console.log(token)
    if (!token) {
      throw Boom.unauthorized('Token not provided');
    }

    try{
      decoded = jwt.verify(token, secretkey);
    } catch (err) {
      throw Boom.unauthorized('Invalid token');
    }

    const user = yield UserModel.findById(decoded._id);

    if (!user) {
      throw Boom.unauthorized('User with token was not found');
    }

    return;
  }
};

export default Authorization;
