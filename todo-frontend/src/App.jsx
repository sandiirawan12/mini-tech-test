import { useEffect, useState } from 'react';
import { api } from './api';

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
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create todo');
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/todos/${id}`, { status });
      fetchTodos();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [search]);

  return (
    <div style={{ padding: 20, maxWidth: 700 }}>
      <h2>Todo App</h2>

      {/* ADD TODO */}
      <div>
        <input
          placeholder="New todo"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <br />

      {/* SEARCH */}
      <input
        placeholder="Search todo"
        onChange={e => setSearch(e.target.value)}
      />

      <br /><br />

      {/* STATE */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* TABLE */}
      <table border="1" cellPadding="8" width="100%">
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
                  <option value="created">created</option>
                  <option value="on_going">on_going</option>
                  <option value="completed">completed</option>
                  <option value="problem">problem</option>
                </select>
              </td>
            </tr>
          ))}

          {!loading && todos.length === 0 && (
            <tr>
              <td colSpan="3">No todos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
