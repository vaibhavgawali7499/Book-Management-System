const Loader = () => {
  return (
    <div className="book-grid">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="book-card" style={{ height: '200px' }}>
          <div className="skeleton" style={{ height: '20px', width: '40%', marginBottom: '1rem' }}></div>
          <div className="skeleton" style={{ height: '30px', width: '80%', marginBottom: '0.5rem' }}></div>
          <div className="skeleton" style={{ height: '20px', width: '60%', marginBottom: '1rem' }}></div>
          <div className="skeleton" style={{ height: '15px', width: '30%' }}></div>
        </div>
      ))}
    </div>
  );
};

export default Loader;
