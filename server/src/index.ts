import express, { Application } from 'express';
import indexRoutes from './routes/indexRoutes';
import clientRoutes from './routes/clientRoutes';
import morgan from 'morgan';
import cors from 'cors';

class Server {
    public app: Application;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());//Para que pueda leer los json el server
        this.app.use(express.urlencoded({extended: false}));
    }
    routes(): void {
        this.app.use('/',indexRoutes);
        this.app.use('/api/clients',clientRoutes);
    }
    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        })
    }
}
const server = new Server();
server.start();