import CreateTodo from "./components/CreateTodo";
import TodoList from "./components/TodoList";


function App() {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-[600px]">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo App</h1>
      <CreateTodo />
      <TodoList />
    </div>
  )
}

export default App
