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
      const filteredBooks = response.data.docs.slice(0, 5); // Limit to 5 books
      setBooks(filteredBooks);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleBookClick = async (book) => {
    try {
      const response = await axios.get(`https://openlibrary.org${book.key}.json`);
      const description = response.data.description || 'No description available.';
      const author = book.author_name ? book.author_name.join(', ') : 'Unknown Author';
      const publishYear = book.first_publish_year || 'Unknown Year';
      const quote = response.data.first_sentence ? response.data.first_sentence.value : 'No quote available.';
      const ebooks = response.data.ebooks || [];

      setBookDetails({ ...response.data, description, author, publishYear, quote, ebooks });
      setSelectedBook(book);
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  const handleDownload = (ebook) => {
    const url = `https://openlibrary.org${ebook.read_url}`;
    axios({
      url,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `${selectedBook.title}.pdf`);
      document.body.appendChild(link);
      link.click();
    });
  };

  return (
    <div  data-aos="slide-up" 
    className='py-10'>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div id="Search" className="text-center mb-10 max-w-[600px] mx-auto">
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
        {/* Search Bar */}
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
        {/* Books Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {books.map((book) => (
            <div
              key={book.key}
              className="space-y-3 cursor-pointer"
              onClick={() => handleBookClick(book)}
            >
              <img
                src={`http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
                className="h-[220px] w-[150px] object-cover rounded-md"
              />
              <div>
                <h2 className="font-semibold">
                  {book.title}
                </h2>
                <p className="text-sm text-gray-700 dark:text-gray-400">{book.author_name?.join(', ')}</p>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span>{book.first_publish_year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Book Details Modal */}
        {selectedBook && bookDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-900 dark:text-white p-6 rounded-md shadow-lg max-w-lg mx-auto">
              <h2 className="text-2xl font-bold mb-4">{bookDetails.title}</h2>
              <p className="text-lg mb-2"><strong>Author:</strong> {bookDetails.author}</p>
              <p className="text-lg mb-2"><strong>Published:</strong> {bookDetails.publishYear}</p>
              <p className="text-lg mb-4"><strong>Quote:</strong> {bookDetails.quote}</p>
              <p className="text-lg mb-4">{bookDetails.description}</p>
              {bookDetails.ebooks && bookDetails.ebooks.length > 0 && (
                <button
                  onClick={() => handleDownload(bookDetails.ebooks[0])}
                  className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark"
                >
                  Download PDF
                </button>
              )}
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
        <div className="flex justify-center mt-10">
          <button className="text-center cursor-pointer bg-primary text-white py-1 px-5 rounded-full hover:bg-primary-dark">
            View All Books
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllBooks;
