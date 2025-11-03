type TJWTDecodePayload = {
  userId?: string;
  username?: string;
  iat?: string;
  exp?: string;
};

declare global {
  namespace Express {
    interface Locals {
      user?: TJWTDecodePayload;
    }
  }
}

export {};
