// Импорт необходимых модулей
import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3001;

// Определение __dirname для ES-модулей
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Путь к файлу с данными
const TODOS_FILE = path.join(__dirname, 'todos.json');

// Middleware для работы с JSON
app.use(express.json());
app.use(cors());

// Функция для чтения данных из файла
const readTodos = async () => {
    try {
        const data = await fs.readFile(TODOS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return [];
        }
        throw error;
    }
};

// Функция для записи данных в файл
const writeTodos = async (todos) => {
    try {
        await fs.writeFile(TODOS_FILE, JSON.stringify(todos, null, 2));
    } catch (error) {
        throw new Error('Ошибка при записи данных');
    }
};

// GET /todos - получение списка задач
app.get('/todos', async (req, res) => {
    try {
        const todos = await readTodos();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при чтении задач' });
    }
});

// POST /todos - создание новой задачи
app.post('/todos', async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Поле title обязательно' });
        }

        const todos = await readTodos();
        const newTodo = { id: Date.now(), title, completed: false };
        todos.push(newTodo);

        await writeTodos(todos);

        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при создании задачи' });
    }
});

// PUT /todos/:id - изменение задачи по ID
app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;

        const todos = await readTodos();
        const todoIndex = todos.findIndex((todo) => todo.id === Number(id));

        if (todoIndex === -1) {
            return res.status(404).json({ message: 'Задача не найдена' });
        }

        if (title) {
            todos[todoIndex].title = title;
        }
        if (completed) {
            todos[todoIndex].completed = completed;
        }

        await writeTodos(todos);

        res.status(200).json(todos[todoIndex]);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при изменении задачи' });
    }
});

// DELETE /todos/:id - удаление задачи по ID
app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todos = await readTodos();

        const filteredTodos = todos.filter((todo) => todo.id !== Number(id));

        if (todos.length === filteredTodos.length) {
            return res.status(404).json({ message: 'Задача не найдена' });
        }

        await writeTodos(filteredTodos);

        res.status(200).json({ id: Number(id) });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении задачи' });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
