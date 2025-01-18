import React, { useEffect, useState } from 'react';
import { TodoType } from '../../types/todo';
import { useDeleteTodo, useCompletedTodo } from '../../queries/todo';
import { uiStore } from '../../stores/uistore';

interface TodoProps {
    todo: TodoType;
}

const Todo: React.FC<TodoProps> = ({ todo }) => {

    const deleteTodo = useDeleteTodo();
    const completedTodo = useCompletedTodo();

    const setSelectedTodoId = uiStore((store) => store.setSelectedTodoId);
    const [completed, setCompleted] = useState(todo.completed)

    useEffect(() => {
        setCompleted(todo.completed);
    }, [todo.completed])

    return (
        <li className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow">
            <div>
                <input className='mr-3' type="checkbox" checked={completed} onChange={(e) => {
                    const isChecked = e.target.checked;
                    completedTodo.mutate({ id: todo.id, completed: isChecked }, {
                        onSuccess: () => {
                            setCompleted(isChecked);
                        }
                    });
                }} />
                <span className="text-gray-700">{todo.title}</span>
            </div>
            <div>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setSelectedTodoId(todo.id)
                    }}
                    className="text-blue-500 hover:text-red-700 focus:outline-none">
                    Редактировать
                </button>

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