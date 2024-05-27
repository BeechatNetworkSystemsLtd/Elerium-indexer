// import modules
import express from 'express';
import { dataController } from '../../controllers/index.js';
import validate from '../../middlewares/validate.js';
import { dataValidation } from '../../validations/index.js';
import auth from '../../middlewares/auth.js';

const router = express.Router();

// OrbitDB apis
router.get('/initdb', dataController.initDb);

router.get('/getHashList', validate(dataValidation.getList), dataController.getList);

router.get('/getHashListByPublicKey/:publickey', validate(dataValidation.getByPublicKey), dataController.getByPublicKey);

router.get('/getByHashedkey/:hashedKey', validate(dataValidation.getData), dataController.getData);

router.post('/', validate(dataValidation.addData), auth(), dataController.addData);

router.put('/:hashedKey', validate(dataValidation.updateData), auth(), dataController.updateData);

router.delete('/:hashedKey', validate(dataValidation.deleteData), auth(), dataController.deleteData);

// NFC apis
router.get('/nfc/dilithiumGenKeyPair', dataController.do_dilithiumGenKeyPair);
router.get('/nfc/dilithiumSign', dataController.do_dilithiumSign);
router.get('/nfc/dilithiumVerifySig', dataController.do_dilithiumVerifySig);

export default router;
