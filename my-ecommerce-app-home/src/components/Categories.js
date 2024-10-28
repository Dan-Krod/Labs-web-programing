import React from 'react';
import '../styles/Categories.css';

const Categories = () => {
  return(
      <section className="categories">
        <h2>Explore Our Categories</h2>
        <div className="category-cards">
          <div className="category-card">
            <img src="books.jpg" alt="Books" className="category-image" />
            <h3>Books</h3>
            <p>Find the latest releases and bestsellers.</p>
            <ul>
              <li>Fiction</li>
              <li>Historical</li>
              <li>Other...</li>
            </ul>
          </div>
          <div className="category-card">
            <img src="audiobooks.jpg" alt="Audiobooks" className="category-image" />
            <h3>Audiobooks</h3>
            <p>Listen to your favorite books on the go.</p>
            <ul>
              <li>New Releases</li>
              <li>Bestsellers</li>
              <li>Exclusive Collections</li>
            </ul>
          </div>
          <div className="category-card">
            <img src="sign-writer.jpg" alt="Author Photos" className="category-image" />
            <h3>Author signs</h3>
            <p>Explore exclusive photographs of famous authors.</p>
            <ul>
              <li>Signed Photos</li>
              <li>High-Quality Prints</li>
              <li>Limited Editions</li>
            </ul>
          </div>
          <div className="category-card">
            <img src="book-event.jpg" alt="Book Events" className="category-image" />
            <h3>Book Events</h3>
            <p>Buy tickets to upcoming book events and meetings.</p>
            <ul>
              <li>Meet & Greet Events</li>
              <li>Book Signings</li>
              <li>Author Talks</li>
            </ul>
          </div>
        </div>
      </section>
  );
};
export default Categories;

