import express from 'express';
import { dataController } from '../../controllers/index.js';
import validate from '../../middlewares/validate.js';
import { dataValidation } from '../../validations/index.js';
import auth from '../../middlewares/auth.js';
const router = express.Router();

// OrbitDB apis
router.get('/createdb', dataController.createData);

router.get('/getDatas', validate(dataValidation.getDatas), dataController.getAll);

router.get('/:hashedKey', validate(dataValidation.getData), dataController.getData);

router.post('/', auth(), validate(dataValidation.addData), dataController.addData);

router.put('/', auth(), validate(dataValidation.updateData), dataController.updateData);

router.delete('/:hashedKey', auth(), validate(dataValidation.deleteData), dataController.deleteData);

// NFC apis
router.get('/nfc/dilithiumGenKeyPair', dataController.do_dilithiumGenKeyPair);
router.get('/nfc/dilithiumSign', dataController.do_dilithiumSign);
router.get('/nfc/dilithiumVerifySig', dataController.do_dilithiumVerifySig);

export default router;
