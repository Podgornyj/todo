import React from 'react';
import { TodoType } from '../../types/todo';
import { useDeleteTodo } from '../../queries/todo';

interface TodoProps {
    todo: TodoType;
}

const Todo: React.FC<TodoProps> = ({ todo }) => {

    const deleteTodo = useDeleteTodo()

    return (
        <li className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow">
            <span className="text-gray-700">{todo.title}</span>
            <div>
                {/* <button
                    className="text-blue-500 hover:text-red-700 focus:outline-none">
                    Изменить
                </button> */}

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        deleteTodo.mutate(Number(todo.id));
                    }}
                    className="text-red-500 hover:text-red-700 focus:outline-none ml-3">
                    Удалить
                </button>
            </div>
        </li>
    );
};

export default Todo;