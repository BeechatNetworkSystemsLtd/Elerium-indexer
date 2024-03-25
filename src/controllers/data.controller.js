import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import { dataModel } from '../models/index.js';
import DB from '../models/db.js';

const createData = catchAsync(async (req, res) => {
  const dbName = await dataModel.create();
  res.status(httpStatus.OK).send({ dbName });
});

const addData = catchAsync(async (req, res) => {
  let db = DB.getDb();

  const result = await db.put(req.body.hashedKey, req.body.nftMetadata);
  const data = await await db.get(req.params.key);

  res.status(httpStatus.OK).send({ result, data });
});

const getData = catchAsync(async (req, res) => {
  let db = DB.getDb();

  const data = await db.get(req.params.hashedKey);

  res.status(httpStatus.OK).send({ data });
});

const getAll = catchAsync(async (req, res) => {
  let db = DB.getDb();

  for await (const record of db.iterator()) {
    console.log(record);
  }

  const data = await db.all();

  res.status(httpStatus.OK).send({ data });
});

const updateData = catchAsync(async (req, res) => {
  let db = DB.getDb();

  const result = await db.put(req.body.hashedKey, req.body.nftMetadata);

  res.status(httpStatus.OK).send({ result });
});

const deleteData = catchAsync(async (req, res) => {
  let db = DB.getDb();

  const data = await db.del(req.params.hashedKey);

  res.status(httpStatus.OK).send({ data });
});

export default { createData, addData, getAll, getData, updateData, deleteData };
