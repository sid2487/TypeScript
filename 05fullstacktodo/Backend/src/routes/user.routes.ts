import express from 'express';
import { signupUser } from '../controllers/user.controller';
import { Request, Response, NextFunction } from 'express';

const router = express.Router();

// this can be the another solution but suggestion is go with proper industry grade and use middleware and other things properly

router.post("/signup", signupUser as (req: Request, res: Response, next: NextFunction) => any);
// router.post("/signup", signupUser);
// router.post("/login", login);
// router.post("/logout", logout);

export default router;