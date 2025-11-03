import { getProfileController } from '@controllers';
import express from 'express';

const profileRouter = express.Router();

profileRouter.route('/').get(getProfileController);

export default profileRouter;
