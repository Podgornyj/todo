import React, { useState } from 'react';
import { useCreateTodo } from '../../queries/todo';

const CreateTodo: React.FC = () => {
    const [todo, setTodo] = useState<string>('');

    const createTodo = useCreateTodo()

    return (
        <form className="flex items-center mb-4">
            <input
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                type="text"
                placeholder="Введите задачу..."
                className="flex-1 border border-gray-300 rounded-lg p-2 mr-2 focus:outline-none focus:ring focus:ring-blue-300" />
            <button
                type="submit"
                onClick={(e) => {
                    e.preventDefault();
                    if (!todo) {
                        return;
                    }
                    createTodo.mutate({ id: new Date().getTime(), title: todo });
                    setTodo('');
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300">
                Добавить
            </button>
        </form>
    );
};

export default CreateTodo;