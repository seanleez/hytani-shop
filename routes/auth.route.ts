import { postLoginController, postRegisterController } from '@controllers';
import express from 'express';

const authRouter = express.Router();

authRouter.route('/register').post(postRegisterController);
authRouter.route('/login').post(postLoginController);

export default authRouter;
