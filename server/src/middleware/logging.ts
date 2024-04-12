import { NextFunction, Request, Response } from "express";

const logging = (req: Request, _res: Response, next: NextFunction) => {
    console.log(
        req.method,
        req.path,
        JSON.stringify(req.body)
    );
    next();
}

export default logging;
