import { Router } from 'express';
import  userRegister  from "../controller/user.js";


const router = Router();
router.post('/register', userRegister);

export default router;
