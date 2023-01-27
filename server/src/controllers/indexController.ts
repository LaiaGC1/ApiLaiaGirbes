import { Request, Response } from 'express';
class IndexController {
    public async index (req: Request, res: Response) {
        res.send('API is on /api/clients');
    }
}
export const indexController = new IndexController();