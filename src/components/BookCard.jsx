import { Edit2, Trash2 } from 'lucide-react';

const BookCard = ({ book, onEdit, onDelete }) => {
  const getGenreClass = (genre) => {
    if (!genre) return 'genre-default';
    const formatted = genre.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    const validGenres = ['classic', 'fiction', 'dystopian', 'romance', 'sci-fi', 'non-fiction'];
    return validGenres.includes(formatted) ? `genre-${formatted}` : 'genre-default';
  };

  return (
    <div className="book-card" id={`book-card-${book.id}`}>
      <div className="card-actions">
        <button 
          className="btn-icon" 
          onClick={() => onEdit(book)}
          aria-label={`Edit ${book.title}`}
          id={`edit-btn-${book.id}`}
        >
          <Edit2 size={18} />
        </button>
        <button 
          className="btn-icon" 
          onClick={() => onDelete(book.id)} 
          style={{ color: 'var(--danger)' }}
          aria-label={`Delete ${book.title}`}
          id={`delete-btn-${book.id}`}
        >
          <Trash2 size={18} />
        </button>
      </div>
      <span className={`genre-badge ${getGenreClass(book.genre)}`}>
        {book.genre}
      </span>
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">by {book.author}</p>
      <div className="book-footer">
        <span className="book-year">Published in {book.year}</span>
      </div>
    </div>
  );
};

export default BookCard;
