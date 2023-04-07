import {Schema, model} from "mongoose";

interface ITodo {
    title: string,
    status: string
};

const todoSchema = new Schema<ITodo>({
    title: { type: String, required: true },
    status: { type: String, enum: ['todo','doing','done'], default:'todo' }
});

const Todo = model<ITodo>("todo", todoSchema);

export {Todo};