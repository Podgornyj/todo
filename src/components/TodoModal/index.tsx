import React, { useState, useEffect } from 'react';
import { uiStore } from '../../stores/uistore';
import { useQueryClient } from '@tanstack/react-query';
import { TodoType } from '../../types/todo';
import { useChangeTodo, useCompletedTodo } from '../../queries/todo';

const TodoModal: React.FC = () => {
    const selectedTodoId = uiStore((store) => store.selectedTodoId);
    const clearSelectedTodoId = uiStore((store) => store.clearSelectedTodoId);

    const changeTodo = useChangeTodo();
    const completedTodo = useCompletedTodo();

    const queryClient = useQueryClient();
    const todos = queryClient.getQueryData<TodoType[]>(['todos']) || [];
    const todoById = todos.find((item) => item.id === selectedTodoId);

    const [title, setTitle] = useState('');

    useEffect(() => {
        if (todoById) {
            setTitle(todoById?.title);
        }
    }, [todoById])

    if (!selectedTodoId) {
        return null;
    }

    return (
        <div onClick={() => clearSelectedTodoId()} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div onClick={(e) => e.stopPropagation()} className="relative bg-gray-100 rounded-lg shadow-lg p-6 w-[500px] max-w-full">
                <button
                    onClick={() => clearSelectedTodoId()}
                    className="absolute top-1 right-2 text-gray-600 hover:text-black text-xl"
                >
                    &times;
                </button>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="mt-6 flex justify-between">
                    <button onClick={() => setTitle(todoById?.title || '')} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">
                        Сбросить
                    </button>
                    <button onClick={() => {
                        completedTodo.mutate({ id: selectedTodoId, completed: true }, {
                            onSuccess: () => {
                                clearSelectedTodoId();
                            }
                        });
                    }} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                        Выполнено
                    </button>
                    <button onClick={() => {
                        changeTodo.mutate({ id: selectedTodoId, title, completed: todoById?.completed || false }, {
                            onSuccess: () => {
                                clearSelectedTodoId();
                            }
                        });
                    }} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    )

}

export default TodoModal;