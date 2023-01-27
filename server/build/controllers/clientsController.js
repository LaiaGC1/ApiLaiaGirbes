"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class ClientsController {
    //Conseguir todos los clientes
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clients = yield database_1.default.then((r) => r.query('SELECT * FROM clients'));
                res.json(clients);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    //Conseguir solo un cliente por su ID
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const clients = yield database_1.default.then((r) => r.query('SELECT * FROM clients WHERE id = ?', [id]));
                if (clients.length > 0) {
                    return res.json(clients[0]);
                }
                res.status(404).json({ text: 'El juego no existe' });
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    //Crear un Cliente
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.then((r) => r.query('INSERT INTO clients set ?', [req.body]));
                res.json({ message: 'Cliente guardado' });
            }
            catch (e) {
                console.log(e.sqlMessage);
                res.send(e.sqlMessage);
            }
        });
    }
    //Eliminar
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield database_1.default.then((r) => r.query('DELETE FROM clients WHERE id = ?', [id])
                    .then((data) => {
                    if (data.affectedRows > 0) {
                        res.json({ message: 'El cliente ha sido eliminado' });
                    }
                    else {
                        res.status(404).json({ text: "El cliente no existe" });
                    }
                }));
            }
            catch (e) {
                res.send(e.sqlMessage);
            }
        });
    }
    //Actualizar un cliente
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield database_1.default.then((r) => r.query('UPDATE clients set ? WHERE id = ?', [req.body, id])
                    .then((data) => {
                    console.log(data);
                    if (data.affectedRows > 0) {
                        res.json({ message: 'El cliente ha sido actualizado' });
                    }
                    else
                        res.status(404).json({ text: "El cliente no existe" });
                }));
            }
            catch (e) {
                res.send(e.sqlMessage);
            }
        });
    }
}
const clientController = new ClientsController();
exports.default = clientController;
