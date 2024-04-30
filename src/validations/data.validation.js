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

const getDatas = {
  query: Joi.object().keys({
    hashedKey: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
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

export default { addData, getDatas, getData, updateData, deleteData };
