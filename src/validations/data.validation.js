import Joi from 'joi';

const addData = {
  headers: Joi.object().keys({
    publickey: Joi.string().required(),
    signature: Joi.string().required(),
    challenge: Joi.string().required(),
  }),
  body: Joi.object().keys({
    metadata1: Joi.string().required(),
    metadata2: Joi.object().required(),
  }),
};

const getList = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
  }),
};

const getByPublicKey = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
  }),
  params: Joi.object().keys({
    publickey: Joi.string().required(),
  }),
};

const getData = {
  params: Joi.object().keys({
    hashedKey: Joi.string().required(),
  }),
};

const updateData = {
  headers: Joi.object().keys({
    publickey: Joi.string().required(),
    signature: Joi.string().required(),
    challenge: Joi.string().required(),
  }),
  params: Joi.object().keys({
    hashedKey: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      metadata2: Joi.object().required(),
    })
    .min(1),
};

const deleteData = {
  headers: Joi.object().keys({
    publickey: Joi.string().required(),
    signature: Joi.string().required(),
    challenge: Joi.string().required(),
  }),
  params: Joi.object().keys({
    hashedKey: Joi.string().required(),
  }),
};

export default { addData, getList, getByPublicKey, getData, updateData, deleteData };
