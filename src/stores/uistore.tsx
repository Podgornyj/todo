import { create } from 'zustand';
// import { devtools } from 'zustand/middleware';

type uiStore = {
    selectedTodoId: number | null,
    setSelectedTodoId: (id: number) => void,
    clearSelectedTodoId: () => void,
}

export const uiStore = create<uiStore>((set) => ({
    selectedTodoId: null,
    setSelectedTodoId: (id) => set(() => ({ selectedTodoId: id })),
    clearSelectedTodoId: () => set(() => ({ selectedTodoId: null })),
}))

// export const uiStore = create<uiStore>()(devtools((set) => ({
//     selectedTodoId: null,
//     setSelectedTodoId: (id) => set(() => ({ selectedTodoId: id })),
//     clearSelectedTodoId: () => set(() => ({ selectedTodoId: null })),
// })))
