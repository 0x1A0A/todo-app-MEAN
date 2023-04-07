import express, { Router, Request, Response } from "express";
import mongoose from 'mongoose';
import { Todo } from "../model/todo";

const route = Router();

route.use(express.json());

async function create_list(req: Request, res: Response) {
    const task = new Todo(req.body);
    res.set('content-type', 'application/json');
    // validate return return undefine if it is pass validate?
    const valid = task.validateSync();
    if ( valid ) {
        res.send({
            Error: "Invalid Payload",
            Validate: valid,
        });
        return;
    }

    const saved = await task.save();

    res.status(200);
    res.send(saved);
}

async function get_all_task(req: Request, res: Response) {
    Todo.find({}).then( (result)=> {
        res.set('content-type', 'application/json');
        res.status(200);
        res.send(result);
    } ).catch((reason) => {
        res.status(500);
        res.send(reason);
    });

}

async function update_task(req: Request, res: Response) {
    const task = new Todo(req.body);
    const valid = task.validateSync();
    res.set('content-type', 'application/json');

    if ( valid ) {
        res.send({
            Error: "Invalid Payload",
        });
        return;
    }

    Todo.updateOne({_id: task._id}, {status: task.status}).then( (result:mongoose.mongo.UpdateResult) => {
        res.status(200);
        res.send( {
            result
        } );
    }).catch(reason=> res.send(reason));
}

async function delete_task(req: Request, res: Response) {
    const id: string = req.params['id'];

    if (!id) {
        res.send({
            Error: "Invalid Payload",
        });
        return;
    }

    await Todo.deleteOne({_id:id}).then( (result:mongoose.mongo.DeleteResult)=> {
        res.status(200);
        res.send(result);
    } ).catch(reason=> res.send(reason));

}

route.post('/', create_list);
route.get('/', get_all_task);
route.put('/', update_task);
route.delete('/:id', delete_task);

export {route};
