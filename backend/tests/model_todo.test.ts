import { Todo } from "../model/todo";

test("task with no title should not pass model validate", ()=>{
    const task = new Todo();
    const validate = task.validateSync();

    expect(validate).toBeTruthy();
});

test("task with empty string should not pass model validate", ()=>{
    const task = new Todo({title:""});
    const validate = task.validateSync();

    expect(validate).toBeTruthy();
});

test("task with title should pass model validate", ()=>{
    const task = new Todo({title:"I have title"});
    const validate = task.validateSync();

    expect(validate).toBeFalsy();
});

test("task status default should be 'todo'", ()=>{
    const task = new Todo();
    expect( task.status ).toEqual("todo");
});

test("task status should be one of ['todo', 'doing', 'done']", ()=>{
    const taskTodo = new Todo({title:"todo", status:"todo"});
    const taskDoing = new Todo({title:"todo", status:"doing"});
    const taskDone = new Todo({title:"todo", status:"done"});
    
    const taskOK = new Todo({title:"todo", status:"ok"});
    const taskFail = new Todo({title:"todo", status:"failed"});

    expect(taskTodo.validateSync()).toBeFalsy();
    expect(taskDoing.validateSync()).toBeFalsy();
    expect(taskDone.validateSync()).toBeFalsy();
    
    expect(taskOK.validateSync()).toBeTruthy();
    expect(taskFail.validateSync()).toBeTruthy();
});