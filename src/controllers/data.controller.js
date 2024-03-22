const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

const createData = catchAsync(async (req, res) => {
  res.status(httpStatus.CREATED).send('user');
});

const getDatas = catchAsync(async (req, res) => {
  res.send('success');
});

const getData = catchAsync(async (req, res) => {
  res.send('success');
});

const updateData = catchAsync(async (req, res) => {
  res.send('success');
});

const deleteData = catchAsync(async (req, res) => {
  res.status(httpStatus.NO_CONTENT).send();
});

export default { createData, getDatas, getData, updateData, deleteData };
