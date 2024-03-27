import Joi from 'joi';

const addData = {
  body: Joi.object().keys({
    hashedKey: Joi.string().required(),
    nftMetadata: Joi.object().required(),
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
  body: Joi.object()
    .keys({
      hashedKey: Joi.string().required(),
      nftMetadata: Joi.object().required(),
    })
    .min(1),
};

const deleteData = {
  params: Joi.object().keys({
    hashedKey: Joi.string().required(),
  }),
};

export default { addData, getDatas, getData, updateData, deleteData };
