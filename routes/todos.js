import express from 'express';

var todos = [
  { id: "2", title: 'Run', isComplete: true, dueDate: '2023-08-31' },
  { id: "3", title: 'Sleep', isComplete: true, dueDate: '2023-08-27' },
  { id: "1", title: 'Dance', isComplete: true, dueDate: '2023-08-30' }
];

const todoRouter = express.Router();

todoRouter.get('/', (req, res) => {
  res.send(todos);
});


todoRouter.post('/', (req, res) => {

  todos.push(req.body);

  res.send(todos);
});


todoRouter.put('/:todoId', (req, res) => {

  const { todoId } = req.params;

  const newTodo = req.body;

  const oldTodo = todos.find(todo => todo.id === todoId);

  todos = todos.filter(todo => todo.id !== oldTodo.id);

  todos.push(newTodo);

  res.send(todos);

});


todoRouter.delete('/:todoId', (req, res) => {

  const { todoId } = req.params;

  todos = todos.filter(todo => todo.id !== todoId);

  res.send(todos);
});

export default todoRouter;