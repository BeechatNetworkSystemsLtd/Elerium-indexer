import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import { dilithiumVerifySig } from '@beechatnetwork/lib-dqx';

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    return new Promise(async (resolve, reject) => {
      // check header parameters

      if (!req.headers.signature) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please include signature code'));
      }
      if (!req.headers.publickey) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please include public Key'));
      }
      if (!req.headers.challenge) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please include challenge code'));
      }

      // veirfy signature

      const { publickey, signature, challenge } = req.headers;

      let b_publicKey = Buffer.from(publickey, 'hex');
      let b_challenge = Buffer.from(challenge, 'hex');
      let b_signature = Buffer.from(signature, 'hex');

      const isVerifiedSignature = await dilithiumVerifySig({
        publicKey: b_publicKey,
        challenge: b_challenge,
        signature: b_signature,
      })
        .then((res) => res)
        .catch((err) => reject(new ApiError(httpStatus.FORBIDDEN, err)));

      if (!isVerifiedSignature) {
        reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden cause of invlid signature'));
      }

      resolve();
    })
      .then(() => next())
      .catch((err) => {
        console.log('err', err);
        next(err);
      });
  };

export default auth;
