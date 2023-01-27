import {json, Request, Response} from 'express';
import pool from '../database';

class ClientsController{

    //Conseguir todos los clientes
    public async list(req: Request, res:Response){
        try{
            const clients = await pool.then((r:any) => r.query('SELECT * FROM clients'))
            res.json(clients);
        } catch (e){
            console.log(e);
        }
    }


    //Conseguir solo un cliente por su ID
    public async getOne(req: Request, res:Response){
        try{
            const {id} = req.params;
            const clients = await pool.then((r:any) => r.query('SELECT * FROM clients WHERE id = ?', [id]));
            if(clients.length > 0){
                return res.json(clients[0]);
            }
            res.status(404).json({text: 'El juego no existe'});
        }catch (e){
            console.log(e);
        }
    }


    //Crear un Cliente
    public async create(req: Request, res: Response){
        try {
            await pool.then((r:any) => r.query('INSERT INTO clients set ?', [req.body]));
            res.json({message: 'Cliente guardado'});
        }catch(e:any){
            console.log(e.sqlMessage);
            res.send(e.sqlMessage);
        }
    }

    //Eliminar
    public async delete(req: Request, res: Response) {
        try {
            const {id} = req.params;
            await pool.then((r: any) => r.query('DELETE FROM clients WHERE id = ?', [id])
                .then((data: any) => {
                    if (data.affectedRows > 0) {
                        res.json({message: 'El cliente ha sido eliminado'});
                    } else{
                        res.status(404).json({text: "El cliente no existe"})
                    }
                }));
        } catch (e:any) {
            res.send(e.sqlMessage);
        }
    }

    //Actualizar un cliente
    public async update(req: Request, res: Response) {
        try {
            const {id} = req.params;
            await pool.then((r: any) => r.query('UPDATE clients set ? WHERE id = ?', [req.body, id])
                .then((data: any) => {
                    console.log(data);
                    if (data.affectedRows > 0) {
                        res.json({message: 'El cliente ha sido actualizado'});
                    } else res.status(404).json({text: "El cliente no existe"});
                }))
        } catch (e: any) {
            res.send(e.sqlMessage);
        }
    }

}
const clientController = new ClientsController();
export default clientController;