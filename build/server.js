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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const convert_hour_string_to_minutes_1 = require("./utils/convert-hour-string-to-minutes");
const convert_minutes_to_hour_string_1 = require("./utils/convert-minutes-to-hour-string");
const app = (0, express_1.default)();
const port = process.env.PORT || 3333;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const prisma = new client_1.PrismaClient({
    log: ['query']
});
// Listagem de tarefas por dia
app.get('/tarefas', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const tarefas = yield prisma.tarefa.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            date: true,
            hourStart: true,
            hourEnd: true,
            location: true
        }
    });
    return response.send(tarefas.map(tarefa => {
        return Object.assign(Object.assign({}, tarefa), { hourStart: (0, convert_minutes_to_hour_string_1.convertMinutesToHoursString)(tarefa.hourStart), hourEnd: (0, convert_minutes_to_hour_string_1.convertMinutesToHoursString)(tarefa.hourEnd) });
    }));
}));
// Criação de nova tarefa OK
app.post('/tarefas', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    const tarefa = yield prisma.tarefa.create({
        data: {
            title: body.title,
            description: body.description,
            date: body.date,
            hourStart: (0, convert_hour_string_to_minutes_1.convertHourStringToMinutes)(body.hourStart),
            hourEnd: (0, convert_hour_string_to_minutes_1.convertHourStringToMinutes)(body.hourEnd),
            location: body.location
        }
    });
    return response.status(201).json(tarefa);
}));
app.put('/tarefas/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const body = request.body;
    const tarefa = yield prisma.tarefa.update({
        where: { id },
        data: {
            title: body.title,
            description: body.description,
            hourStart: (0, convert_hour_string_to_minutes_1.convertHourStringToMinutes)(body.hourStart),
            hourEnd: (0, convert_hour_string_to_minutes_1.convertHourStringToMinutes)(body.hourEnd),
            location: body.location
        }
    });
    response.json(tarefa);
}));
app.delete('/tarefas/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const tarefa = yield prisma.tarefa.delete({
        where: {
            id
        }
    });
    res.json(tarefa);
}));
// localhost:3333/tarefas
app.listen(port, () => {
    console.info('Aplicação rodando em http://localhost:3333');
});
