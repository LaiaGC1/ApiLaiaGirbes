import { Router } from 'express';
import clientsController from '../controllers/clientsController';

class ClientRoutes{
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void{
        this.router.get('/',clientsController.list);
        this.router.get('/:id',clientsController.getOne);
        this.router.post('/',clientsController.create);
        this.router.delete('/:id',clientsController.delete);
        this.router.put('/:id',clientsController.update)
    }
}

const clientsRoutes = new ClientRoutes();
export default clientsRoutes.router;