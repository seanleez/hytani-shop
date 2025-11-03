import { getMyBalanceController, postUpdateBalanceController } from '@controllers';
import express from 'express';

const balanceRouter = express.Router();

balanceRouter.route('/').post(postUpdateBalanceController);
balanceRouter.route('/me').get(getMyBalanceController);

export default balanceRouter;
