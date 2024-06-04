import React, { useState } from 'react';
import axios from 'axios';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookDetails, setBookDetails] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?q=${searchTerm}`);
      const filteredBooks = response.data.docs.slice(0, 5).map(book => ({
        key: book.key,
        title: book.title,
        cover_i: book.cover_i
      }));
      setBooks(filteredBooks);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleBookClick = async (book) => {
    try {
      const response = await axios.get(`https://openlibrary.org${book.key}.json`);
      const description = response.data.description || 'No description available.';
      const author = response.data.author_name ? response.data.author_name.join(', ') : 'Unknown Author';
      const publishYear = response.data.first_publish_year || 'Unknown Year';
      const quote = response.data.first_sentence ? response.data.first_sentence.value : 'No quote available.';
      const ebooks = response.data.ebooks || [];

      setBookDetails({ ...response.data, description, author, publishYear, quote, ebooks });
      setSelectedBook(book);
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  const handleDownload = (pdfUrl) => {
    if (pdfUrl) {
      window.open(pdfUrl);
    } else {
      console.error('No PDF URL found for this book');
    }
  };

  return (
    <div className='py-10'>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Best books
          </p>
          <h1 className="text-3xl font-bold">
            Top books
          </h1>
          <p className="text-lg text-gray-400">
            And now I'm here, finally able to breathe. 
            With the view of hope, 
            with strength in my heart, and fire in my eyes.
          </p>
        </div>
        <div className="flex justify-center mb-10">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary"
            placeholder="Search for books..."
          />
          <button
            onClick={handleSearch}
            className="ml-2 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark"
          >
            Search
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {books.map((book) => (
            <div
              key={book.key}
              className="space-y-3 cursor-pointer border border-gray-300 p-4 rounded-md shadow-md hover:shadow-lg transition-shadow"
              onClick={() => handleBookClick(book)}
            >
              <img
                src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
                className="h-[220px] w-[150px] object-cover rounded-md"
              />
              <h2 className="font-semibold text-center">
                {book.title}
              </h2>
              <div className="flex justify-center">
                {selectedBook && bookDetails && bookDetails.ebooks && bookDetails.ebooks.length > 0 && (
                  <button
                    onClick={() => handleDownload(bookDetails.ebooks[0].read_url)}
                    className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark"
                  >
                    Download PDF
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        {selectedBook && bookDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-900 dark:text-white p-6 rounded-md shadow-lg max-w-lg mx-auto">
              <h2 className="text-2xl font-bold mb-4">{bookDetails.title}</h2>
              <p className="text-lg mb-2"><strong>Author:</strong> {bookDetails.author}</p>
              <p className="text-lg mb-2"><strong>Published:</strong> {bookDetails.publishYear}</p>
              <p className="text-lg mb-4"><strong>Quote:</strong> {bookDetails.quote}</p>
              <p className="text-lg mb-4">{bookDetails.description}</p>
              <button
                onClick={() => {
                  setSelectedBook(null);
                  setBookDetails(null);
                }}
                className="ml-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooks;
