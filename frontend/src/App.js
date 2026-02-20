
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, AlertCircle, Loader2, Save } from 'lucide-react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/posts';

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch students (posts)
  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();
      setStudents(data);
    } catch (e) {
      setError('Failed to connect to the server.');
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update student
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed to save');

      setForm({ title: '', content: '' });
      setEditingId(null);
      fetchStudents();
    } catch (e) {
      setError('Failed to save student.');
      console.error(e);
    }
    setLoading(false);
  };

  // Edit student
  const handleEdit = (student) => {
    setForm({ title: student.title, content: student.content });
    setEditingId(student.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete student
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student?')) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      fetchStudents();
    } catch (e) {
      setError('Failed to delete student.');
      console.error(e);
    }
    setLoading(false);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="App">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        Student Khabri
      </motion.h1>

      <motion.div
        className="professional-message"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <p>
          Thank you, <strong>Student Khabri</strong> team, for this opportunity. I have built this assignment with passion and attention to detail, aiming to deliver a high-quality, modern user experience.
        </p>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div
            className="error-message"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <AlertCircle size={20} />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="glass-panel"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit} className="student-form">
          <input
            name="title"
            placeholder="Student Name"
            value={form.title}
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <input
            name="content"
            placeholder="Details (e.g. Class, Roll No)"
            value={form.content}
            onChange={handleChange}
            required
            autoComplete="off"
          />

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" disabled={loading} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              {loading ? <Loader2 className="spin" size={20} /> : (editingId ? <Save size={20} /> : <Plus size={20} />)}
              {editingId ? 'Update' : 'Add Student'}
            </button>

            {editingId && (
              <button
                type="button"
                className="secondary"
                onClick={() => { setForm({ title: '', content: '' }); setEditingId(null); }}
              >
                <X size={20} />
              </button>
            )}
          </div>
        </form>
      </motion.div>

      <motion.div
        className="student-grid"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence>
          {students.map((student) => (
            <motion.div
              key={student.id}
              className="student-card"
              variants={item}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            >
              <div className="card-header">
                <div className="avatar">
                  {student.title.charAt(0).toUpperCase()}
                </div>
                <h3 className="student-name">{student.title}</h3>
              </div>

              <p className="student-details">{student.content}</p>

              <div className="card-actions">
                <button
                  className="icon-btn"
                  onClick={() => handleEdit(student)}
                  disabled={loading}
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  className="icon-btn delete"
                  onClick={() => handleDelete(student.id)}
                  disabled={loading}
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {students.length === 0 && !loading && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          style={{ marginTop: '40px' }}
        >
          No students found. Be the first to add one!
        </motion.p>
      )}

      <footer>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Designed & Developed by <span>Yashika Paryani</span> | Student Khabri Assignment {new Date().getFullYear()}
        </motion.p>
      </footer>
    </div>
  );
}

export default App;
