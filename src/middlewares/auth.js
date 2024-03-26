import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import { dilithiumVerifySig } from '@beechatnetwork/lib-dqx';

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    // console.log('req.headers', req.headers.signature, '==\n\n', req.headers.publickey, '==\n\n', req.headers.challenge);
    return new Promise((resolve, reject) => {
      // passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
      if (!req.headers.signature || !req.headers.publickey || !req.headers.challenge) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
      }
      const { publickey, challenge, signature } = req.headers;

      let b_publicKey = Buffer.from(publickey, 'hex');
      let b_challenge = Buffer.from(challenge, 'hex');
      let b_signature = Buffer.from(signature, 'hex');

      dilithiumVerifySig({ publicKey: b_publicKey, challenge: b_challenge, signature: b_signature })
        .then((res) => {
          if (res) resolve();
          else reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
        })
        .catch((err) => reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden')));
    })
      .then(() => next())
      .catch((err) => next(err));
  };

export default auth;
