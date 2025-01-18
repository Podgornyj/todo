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

export const ChangeTodo = async (ChangedTodo: TodoType): Promise<TodoType> => {
    const response = await fetch(`http://localhost:3001/todos/${ChangedTodo.id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ChangedTodo)
    });
    return response.json();
}

export const useChangeTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ChangeTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })

}

export const CompletedTodo = async (CompletedTodo: { id: number, completed: boolean }): Promise<TodoType> => {
    const response = await fetch(`http://localhost:3001/todos/${CompletedTodo.id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(CompletedTodo)
    });
    return response.json();
}

export const useCompletedTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: CompletedTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })

}