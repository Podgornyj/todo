import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TodoType } from "../types/todo";

export const fetchTodos = async (): Promise<TodoType[]> => {
    const response = await fetch('http://localhost:3001/todos');
    return response.json()
}

export const useFetchTodos = () => {
    return useQuery<TodoType[]>({
        queryKey: ['todos'],
        queryFn: fetchTodos,
    })
}

export const createTodo = async (newTodo: TodoType): Promise<TodoType> => {
    const response = await fetch('http://localhost:3001/todos', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(newTodo)
    });
    return response.json();
}

export const useCreateTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createTodo,
        onSuccess: (addedTodo: TodoType) => {
            queryClient.setQueryData<TodoType[]>(['todos'], (oldTodos = []) => {
                return [...oldTodos, addedTodo];
            })
        }
    })
}

export const deleteTodo = async (id: number): Promise<{ id: number }> => {
    const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'DELETE'
    });
    return response.json();
}

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTodo,
        onSuccess: (data) => {
            queryClient.setQueryData<TodoType[]>(['todos'], (oldTodos = []) => {
                return oldTodos.filter((todo) => todo.id !== data.id);
            })
        }
    })

}