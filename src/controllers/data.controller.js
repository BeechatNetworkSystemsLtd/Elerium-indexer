import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import { dataModel } from '../models/index.js';
import DB from '../models/db.js';
import { sha256 } from 'js-sha256';

import { Buffer } from 'buffer/index.js';
import { dilithiumGenKeyPair, dilithiumSign, dilithiumVerifySig } from '@beechatnetwork/lib-dqx';

const initDb = catchAsync(async (req, res) => {
  const dbName = await dataModel.init();
  res.status(httpStatus.OK).send({ dbName });
});

const addData = catchAsync(async (req, res) => {
  let db = DB.getDb();

  const { metadata1, metadata2 } = req.body;

  const hashedKey = sha256(Buffer.from(metadata1, 'hex'));

  const data = await db.get(hashedKey);
  if (data === undefined) {
    const result = await db.put(hashedKey, metadata2);
    res.status(httpStatus.OK).send({ hash: result });
  } else {
    res.status(httpStatus.CONFLICT).send();
  }
});

const getData = catchAsync(async (req, res) => {
  let db = DB.getDb();
  const { hashedKey } = req.params;

  const data = await db.get(hashedKey);

  if (data === undefined) res.status(httpStatus.OK).send();
  else res.status(httpStatus.OK).send({ data });
});

const getAll = catchAsync(async (req, res) => {
  let db = DB.getDb();

  // for await (const record of db.iterator()) {
  //   console.log(record);
  // }

  const data = await db.all();

  res.status(httpStatus.OK).send({ data });
});

const updateData = catchAsync(async (req, res) => {
  let db = DB.getDb();
  const { metadata2 } = req.body;
  const { hashedKey } = req.params;

  const result = await db.put(hashedKey, metadata2);

  res.status(httpStatus.OK).send({ message: 'Successfully updated' });
});

const deleteData = catchAsync(async (req, res) => {
  let db = DB.getDb();
  const { hashedKey } = req.params;

  const data = await db.del(hashedKey);

  res.status(httpStatus.OK).send({ result: 'Successfully deleted' });
});

// APIs related NFC key

const do_dilithiumGenKeyPair = catchAsync(async (req, res) => {
  const data = await dilithiumGenKeyPair({
    randomBytes: (size = 1) => Buffer.alloc(size),
  });
  res.status(httpStatus.OK).send({
    data: {
      publicKey: data.publicKey.toString('hex'),
      secretKey: data.secretKey.toString('hex'),
    },
  });
});

const do_dilithiumSign = catchAsync(async (req, res) => {
  const { secretKey, challenge } = req.body;

  const b_secretKey = Buffer.from(secretKey, 'hex');
  const b_challenge = Buffer.from(challenge, 'hex');

  let data = await dilithiumSign({ secretKey: b_secretKey, challenge: b_challenge });

  res.status(httpStatus.OK).send({ data: data.toString('hex') });
});

const do_dilithiumVerifySig = catchAsync(async (req, res) => {
  const { publicKey, challenge, signature } = req.body;

  let b_publicKey = Buffer.from(publicKey, 'hex');
  let b_challenge = Buffer.from(challenge, 'hex');
  let b_signature = Buffer.from(signature, 'hex');

  const result = await dilithiumVerifySig({ publicKey: b_publicKey, challenge: b_challenge, signature: b_signature });

  res.status(httpStatus.OK).send({ result });
});

export default {
  initDb,
  addData,
  getAll,
  getData,
  updateData,
  deleteData,

  // APIs related NFC key
  do_dilithiumGenKeyPair,
  do_dilithiumSign,
  do_dilithiumVerifySig,
};
