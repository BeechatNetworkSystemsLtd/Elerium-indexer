import express from 'express';
import { dataController } from '../../controllers/index';

const router = express.Router();

router.get('/getAll', dataController.getDatas);

router.get('/:id', dataController.getData);

router.post('/', dataController.createData);

router.put('/', dataController.updateData);

export default router;
