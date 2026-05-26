import { useState, useEffect, useMemo, useCallback } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import * as api from './services/api';
import BookCard from './components/BookCard';
import BookForm from './components/BookForm';
import Loader from './components/Loader';

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  
  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('');

  // Toast Notifications State
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const fetchBooks = useCallback(async () => {
    await Promise.resolve();
    try {
      setLoading(true);
      const data = await api.getBooks();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError('Failed to load books. Make sure the backend server is running.');
      addToast('Failed to load books from server.', 'error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBooks();
  }, [fetchBooks]);

  const handleAddOrUpdate = async (formData) => {
    try {
      if (editingBook) {
        await api.updateBook(editingBook.id, formData);
        addToast(`"${formData.title}" updated successfully!`, 'success');
      } else {
        await api.addBook({ ...formData, id: Date.now().toString() });
        addToast(`"${formData.title}" added to Shelf!`, 'success');
      }
      fetchBooks();
      setIsModalOpen(false);
      setEditingBook(null);
    } catch (err) {
      console.error(err);
      addToast('Error saving book. Please try again.', 'error');
    }
  };

  const handleDelete = async (id) => {
    const bookToDelete = books.find(b => b.id === id);
    const title = bookToDelete ? bookToDelete.title : 'book';
    
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await api.deleteBook(id);
        addToast(`"${title}" deleted successfully.`, 'info');
        fetchBooks();
      } catch (err) {
        console.error(err);
        addToast('Error deleting book. Please try again.', 'error');
      }
    }
  };

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const titleMatch = book.title ? book.title.toLowerCase().includes(searchTerm.toLowerCase()) : false;
      const authorMatch = book.author ? book.author.toLowerCase().includes(searchTerm.toLowerCase()) : false;
      const matchesSearch = titleMatch || authorMatch;
      
      const matchesGenre = genreFilter === '' || book.genre === genreFilter;
      return matchesSearch && matchesGenre;
    });
  }, [books, searchTerm, genreFilter]);

  const genres = ['Classic', 'Fiction', 'Dystopian', 'Romance', 'Sci-Fi', 'Non-Fiction'];

  return (
    <div className="container" id="app-container">
      <header>
        <div className="header-top">
          <h1 className="logo" id="app-logo">BookShelf</h1>
          <button 
            className="btn btn-primary" 
            onClick={() => { setEditingBook(null); setIsModalOpen(true); }}
            id="add-book-trigger-btn"
            aria-label="Add a new book"
          >
            <Plus size={20} /> Add Book
          </button>
        </div>

        <div className="controls">
          <div style={{ position: 'relative', flex: 1 }}>
            <Search 
              size={18} 
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} 
              aria-hidden="true"
            />
            <input
              id="search-input"
              type="text"
              placeholder="Search by title or author..."
              style={{ paddingLeft: '40px', width: '100%' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search books by title or author"
            />
          </div>
          <div style={{ position: 'relative' }}>
            <Filter 
              size={18} 
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} 
              aria-hidden="true"
            />
            <select
              id="genre-filter-select"
              style={{ paddingLeft: '40px' }}
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              aria-label="Filter books by genre"
            >
              <option value="">All Genres</option>
              {genres.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>
      </header>

      {loading ? (
        <Loader />
      ) : error ? (
        <div 
          style={{ textAlign: 'center', padding: '4rem', color: 'var(--danger)', fontWeight: '600' }}
          id="error-message-display"
        >
          {error}
        </div>
      ) : (
        <div className="book-grid" id="books-grid-layout">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={(b) => { setEditingBook(b); setIsModalOpen(true); }}
              onDelete={handleDelete}
            />
          ))}
          {filteredBooks.length === 0 && (
            <div 
              style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}
              id="no-books-fallback"
            >
              No books found matching your criteria.
            </div>
          )}
        </div>
      )}

      {isModalOpen && (
        <BookForm
          key={editingBook ? editingBook.id : 'new'}
          book={editingBook}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddOrUpdate}
        />
      )}

      {/* Floating Toast Notifications */}
      <div className="toast-container" id="global-toast-container" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`} role="alert" id={`toast-${toast.id}`}>
            <span className="toast-message">{toast.message}</span>
            <button 
              className="toast-close" 
              onClick={() => removeToast(toast.id)}
              aria-label="Close notification"
              id={`close-toast-btn-${toast.id}`}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
