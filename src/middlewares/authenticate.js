import createHttpError from 'http-errors';
import { SessionsCollection } from '../models/session.js';
import { UsersCollection } from '../models/user.js';

export const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  // console.log(authorization);

  if (!authorization) {
    next(createHttpError(401, 'Please provide Authorization header'));
    return;
  }

  const bearer = authorization.split(' ')[0];
  const token = authorization.split(' ')[1];

  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Auth header should be of type Bearer'));
    return;
  }

  const session = await SessionsCollection.findOne({ accessToken: token });

  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    return next(createHttpError(401, 'Access token expired'));
  }

  const user = await UsersCollection.findById(session.userId);

  if (!user) {
    return next(createHttpError(401, 'User not found'));
  }

  // req.user = user;
  req.user = { id: user._id, name: user.name };

  next();
};
