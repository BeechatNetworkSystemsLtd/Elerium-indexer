import express from 'express';
import { dataController } from '../../controllers/index.js';
import auth from '../../middlewares/auth.js';
const router = express.Router();

router.get('/createdb', dataController.createData);

router.get('/getAll', dataController.getAll);

router.get('/:hashedKey', dataController.getData);

router.post('/', auth(), dataController.addData);

router.put('/', auth(), dataController.updateData);

router.delete('/:hashedKey', auth(), dataController.deleteData);

router.get('/nfc/dilithiumGenKeyPair', dataController.do_dilithiumGenKeyPair);
router.get('/nfc/dilithiumSign', dataController.do_dilithiumSign);
router.get('/nfc/dilithiumVerifySig', dataController.do_dilithiumVerifySig);

export default router;
