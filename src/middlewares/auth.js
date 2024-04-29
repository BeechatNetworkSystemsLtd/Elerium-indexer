import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import { dilithiumVerifySig } from '@beechatnetwork/lib-dqx';

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    return new Promise(async (resolve, reject) => {
      // veirfy signature

      const { publickey, signature, challenge } = req.headers;

      let b_publicKey = Buffer.from(publickey, 'hex');
      let b_challenge = Buffer.from(challenge, 'hex');
      let b_signature = Buffer.from(signature, 'hex');

      const isVerifiedSignature = await dilithiumVerifySig({
        publicKey: b_publicKey,
        challenge: b_challenge,
        signature: b_signature,
      });

      if (!isVerifiedSignature) {
        reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden cause of invlid signature'));
      }

      // verify the hashKey

      // if (req.method !== 'DELETE') {
      //   const { hashedKey, metadata } = req.body;

      //   const isVerifiedHash = sha256(signature + JSON.stringify(metadata)) === hashedKey;
      //   if (!isVerifiedHash) reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden cause of invlid hashkey'));
      // }

      resolve();
    })
      .then(() => next())
      .catch((err) => next(err));
  };

export default auth;
