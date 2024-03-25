import express from 'express';
import { dataController } from '../../controllers/index';

const router = express.Router();

router.get('/createdb', dataController.createData);

router.get('/getAll', dataController.getAll);

router.get('/:hashedKey', dataController.getData);

router.post('/', dataController.addData);

router.put('/', dataController.updateData);

router.delete('/:hashedKey', dataController.deleteData);

export default router;
