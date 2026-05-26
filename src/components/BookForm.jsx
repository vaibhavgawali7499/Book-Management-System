import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const BookForm = ({ book, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(() => {
    if (book) {
      return {
        ...book,
        year: book.year !== undefined ? book.year.toString() : ''
      };
    }
    return {
      title: '',
      author: '',
      genre: '',
      year: '',
    };
  });

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanData = {
      ...formData,
      title: formData.title.trim(),
      author: formData.author.trim(),
      year: parseInt(formData.year, 10) || 0
    };
    onSubmit(cleanData);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content">
        <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 id="modal-title">{book ? 'Edit Book' : 'Add New Book'}</h2>
          <button 
            className="btn-icon" 
            onClick={onClose}
            aria-label="Close modal"
            id="close-modal-btn"
          >
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} id="book-form">
          <div className="form-group">
            <label htmlFor="book-title-input">Title</label>
            <input
              id="book-title-input"
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter book title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="book-author-input">Author</label>
            <input
              id="book-author-input"
              type="text"
              required
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              placeholder="Enter author name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="book-genre-select">Genre</label>
            <select
              id="book-genre-select"
              required
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
            >
              <option value="">Select Genre</option>
              <option value="Fiction">Fiction</option>
              <option value="Classic">Classic</option>
              <option value="Dystopian">Dystopian</option>
              <option value="Romance">Romance</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Non-Fiction">Non-Fiction</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="book-year-input">Publication Year</label>
            <input
              id="book-year-input"
              type="number"
              required
              min="1000"
              max={new Date().getFullYear() + 1}
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              placeholder="YYYY"
            />
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-icon" 
              onClick={onClose}
              id="cancel-form-btn"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              id="submit-form-btn"
            >
              {book ? 'Update Book' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
