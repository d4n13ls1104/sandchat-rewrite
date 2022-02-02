import { Request, Response } from 'express';

export interface UserSession {
  userId: string;
  username: string;
}

export interface HttpContext {
  req: Request;
  res: Response;
}
