"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = __importStar(require("express"));
const todo_1 = require("../model/todo");
const route = (0, express_1.Router)();
exports.route = route;
route.use(express_1.default.json());
function create_list(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const task = new todo_1.Todo(req.body);
        res.set('content-type', 'application/json');
        // validate return return undefine if it is pass validate?
        const valid = task.validateSync();
        if (valid) {
            res.send({
                Error: "Invalid Payload",
                Validate: valid,
            });
            return;
        }
        const saved = yield task.save();
        res.status(200);
        res.send(saved);
    });
}
function get_all_task(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        todo_1.Todo.find({}).then((result) => {
            res.set('content-type', 'application/json');
            res.status(200);
            res.send(result);
        }).catch((reason) => {
            res.status(500);
            res.send(reason);
        });
    });
}
function update_task(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const task = new todo_1.Todo(req.body);
        const valid = task.validateSync();
        res.set('content-type', 'application/json');
        if (valid) {
            res.send({
                Error: "Invalid Payload",
            });
            return;
        }
        todo_1.Todo.updateOne({ _id: task._id }, { status: task.status }).then((result) => {
            res.status(200);
            res.send({
                result
            });
        }).catch(reason => res.send(reason));
    });
}
function delete_task(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params['id'];
        if (!id) {
            res.send({
                Error: "Invalid Payload",
            });
            return;
        }
        yield todo_1.Todo.deleteOne({ _id: id }).then((result) => {
            res.status(200);
            res.send(result);
        }).catch(reason => res.send(reason));
    });
}
route.post('/', create_list);
route.get('/', get_all_task);
route.put('/', update_task);
route.delete('/:id', delete_task);
