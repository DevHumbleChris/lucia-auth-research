import { Request, Response } from "express";

const healthCheck = (req: Request, res: Response) => {
  return res.json({
    message: "Everything is super okey 😂🚀",
  });
};

export { healthCheck };
