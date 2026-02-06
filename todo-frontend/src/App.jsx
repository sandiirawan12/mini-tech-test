import { useEffect, useState } from 'react';
import { api } from './api';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTodos = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/todos', {
        params: search ? { search } : {},
      });
      setTodos(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (!title.trim()) return;
    try {
      await api.post('/todos', { title });
      setTitle('');
      fetchTodos(); 
    } catch {
      setError('Failed to add todo');
    }
  };

  const updateStatus = async (id, status) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, status }
          : todo
      )
    );

    try {
      await api.patch(`/todos/${id}`, { status });
    } catch {
      setError('Failed to update status');
      fetchTodos();
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [search]);

  return (
    <div className="page">
      <div className="card">
        <h1>Todo List</h1>

        <div className="two-column">
          <input
            className="search"
            placeholder="Search todo..."
            onChange={e => setSearch(e.target.value)}
          />
          <div className="row">
            <input
              placeholder="Add new todo..."
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <button onClick={addTodo}>Add</button>
          </div>
        </div>

        {loading && <p className="info">Loading...</p>}
        {error && <p className="error">{error}</p>}

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, i) => (
              <tr key={todo.id}>
                <td>{i + 1}</td>
                <td>{todo.title}</td>
                <td>
                  <select
                    value={todo.status}
                    onChange={e =>
                      updateStatus(todo.id, e.target.value)
                    }
                  >
                    <option value="created">Created</option>
                    <option value="on_going">On going</option>
                    <option value="completed">Completed</option>
                    <option value="problem">Problem</option>
                  </select>
                </td>
              </tr>
            ))}

            {!loading && todos.length === 0 && (
              <tr>
                <td colSpan="3" className="empty">
                  No todos found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;