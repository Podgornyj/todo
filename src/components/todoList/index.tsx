import React from 'react';
import Todo from '../Todo';
import TodoModal from '../TodoModal';
import { useFetchTodos } from '../../queries/todo';

const TodoList: React.FC = () => {

    const { data = [] } = useFetchTodos();

    return (
        <>
            <ul className="space-y-2 mt-[10%]">
                {
                    data.map((todo) => {
                        return <Todo key={todo.id} todo={todo} />
                    })
                }
            </ul>
            <TodoModal />
        </>
    );
};

export default TodoList;