import { Request,Response } from "express";
import { title } from "process";

const todos = [
    { id: 1, text: 'Buy milk',createdAt: new Date() },
    { id: 2, text: 'Cook dinner',createdAt: null },
    { id: 3, text: 'Read a book',createdAt: new Date() },
  ];

export class TodosController {

    //* DI
    constructor(){};


    public getTodos = (req:Request, res:Response)=>{
       return res.json(todos);
      }


      public getTodosById = (req:Request, res:Response)=>{
      const id = +req.params.id;
      if(isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'});
      const todo = todos.find(todo => todo.id === id);
      
      (todo)
        ? res.json(todo)
        : res.status(404).json({message: `Todo with id: ${id} not found`});
      
       }



       public createTodo = (req:Request, res:Response) =>{

        const {text} = req.body;
        if (!text) return res.status(400).json({error: 'text is required'})
            const newTodo = {
                id: todos.length + 1,
                text: text,
                createdAt: null,
            }
            todos.push(newTodo)
        res.json(newTodo)
       }


       public updateTodo = (req:Request, res:Response) => {
        
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'});
      
        const todo = todos.find(todo => todo.id === id);
        if(!todo) return res.status(404).json({error: `Todo with ID: ${id} not found`});

        const {text, createdAt} = req.body;
        todo.text = text || todo.text;

        (createdAt === 'null')
        ? todo.createdAt = null
        : todo.createdAt = new Date(createdAt || todo.createdAt);
       
        res.json(todo)
       }



       public deleteTodo = (req:Request,res:Response)=>{
        
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'});
       
        const todo = todos.find(todo => todo.id === id);
        if(!todo) return res.status(404).json({error: `Todo with ID: ${id} not found`});

        todos.splice(todos.indexOf(todo), 1);
        res.json(todo)


       }
}