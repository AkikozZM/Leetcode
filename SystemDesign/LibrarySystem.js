const BookGenre = {
  SCIFI: "SciFi",
  ROMANTIC: "Romantic",
  OTHER: "Other",
};

class User {
  constructor(id, name, email = null) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.borrowingBooks = new Set(); // Currently borrowed books
    this.borrowedBooksHistory = new Map(); // Book -> {frequency, lastBorrowedDate}
  }

  getUserId() {
    return this.id;
  }

  getUserName() {
    return this.name;
  }

  getBorrowingBooks() {
    return this.borrowingBooks;
  }

  getBorrowedBooksHistory() {
    return this.borrowedBooksHistory;
  }

  canBorrowBook(book) {
    return !this.borrowingBooks.has(book);
  }

  canReturnBook(book) {
    return this.borrowingBooks.has(book);
  }

  borrowBook(book) {
    if (!this.canBorrowBook(book)) return false;

    this.borrowingBooks.add(book);
    const history = this.borrowedBooksHistory.get(book) || {
      frequency: 0,
      lastBorrowedDate: null,
    };
    history.frequency += 1;
    history.lastBorrowedDate = new Date();
    this.borrowedBooksHistory.set(book, history);
    return true;
  }

  returnBook(book) {
    if (!this.canReturnBook(book)) return false;
    this.borrowingBooks.delete(book);
    return true;
  }
}

class Book {
  constructor(id, genre, title, count) {
    this.id = id;
    this.genre = genre;
    this.title = title;
    this.count = count;
  }

  getBookId() {
    return this.id;
  }

  getBookCount() {
    return this.count;
  }

  setBookCount(count) {
    if (count >= 0) {
      this.count = count;
      return true;
    }
    return false;
  }

  getBookTitle() {
    return this.title;
  }

  setBookTitle(title) {
    if (typeof title === "string" && title.trim().length > 0) {
      this.title = title;
      return true;
    }
    return false;
  }

  getBookGenre() {
    return this.genre;
  }

  isAvailable() {
    return this.count > 0;
  }

  incrementCount(amount = 1) {
    this.count += amount;
    return this.count;
  }

  decrementCount(amount = 1) {
    if (this.count >= amount) {
      this.count -= amount;
      return this.count;
    }
    return -1; // Indicate insufficient stock
  }
}

class LibrarySystem {
  constructor() {
    this.books = new Map(); // id -> Book
    this.users = new Map(); // id -> User
  }

  // User management
  addUser(user) {
    if (!(user instanceof User)) return false;
    this.users.set(user.getUserId(), user);
    return true;
  }

  getUser(userId) {
    return this.users.get(userId) || null;
  }

  // Book management
  addBook(book) {
    if (!(book instanceof Book)) return false;
    this.books.set(book.getBookId(), book);
    return true;
  }

  getBook(bookId) {
    return this.books.get(bookId) || null;
  }

  // Borrow/return operations
  borrowBook(userId, bookId) {
    const user = this.getUser(userId);
    const book = this.getBook(bookId);

    if (!user || !book) return false;
    if (!book.isAvailable()) return false;
    if (!user.canBorrowBook(book)) return false;

    if (book.decrementCount() === -1) return false;
    return user.borrowBook(book);
  }

  returnBook(userId, bookId) {
    const user = this.getUser(userId);
    const book = this.getBook(bookId);

    if (!user || !book) return false;
    if (!user.canReturnBook(book)) return false;

    book.incrementCount();
    return user.returnBook(book);
  }

  // Search functionality
  searchBooksByTitle(titleQuery) {
    const results = [];
    const query = titleQuery.toLowerCase();

    for (const book of this.books.values()) {
      if (book.getBookTitle().toLowerCase().includes(query)) {
        results.push(book);
      }
    }
    return results;
  }

  getBooksByGenre(genre) {
    return Array.from(this.books.values()).filter(
      (book) => book.getBookGenre() === genre
    );
  }

  getUserBorrowingStatus(userId) {
    const user = this.getUser(userId);
    if (!user) return null;

    return {
      user: user,
      currentlyBorrowing: Array.from(user.getBorrowingBooks()),
      borrowingHistory: Array.from(user.getBorrowedBooksHistory().entries()),
    };
  }
}

// Usage Example
const library = new LibrarySystem();

// Add books
library.addBook(
  new Book(377111, BookGenre.SCIFI, "JavaScript: The Good Parts", 10)
);
library.addBook(new Book(377112, BookGenre.ROMANTIC, "Pride and Prejudice", 5));
library.addBook(
  new Book(377113, BookGenre.OTHER, "The Pragmatic Programmer", 3)
);

// Add users
const user1 = new User(99001, "Jack", "jack@example.com");
const user2 = new User(99002, "Jill", "jill@example.com");
library.addUser(user1);
library.addUser(user2);

// Borrow books
console.log("Borrowing book 377111:", library.borrowBook(99001, 377111)); // true
console.log("Book count after borrow:", library.getBook(377111).getBookCount()); // 9

// Try to borrow same book again
console.log("Borrow same book again:", library.borrowBook(99001, 377111)); // false

// Another user borrows same book
console.log("Second user borrows:", library.borrowBook(99002, 377111)); // true

// Return book
console.log("Returning book:", library.returnBook(99001, 377111)); // true
console.log("Book count after return:", library.getBook(377111).getBookCount()); // 9

// Search functionality
console.log(
  "Search for 'java':",
  library.searchBooksByTitle("java").map((b) => b.getBookTitle())
);
console.log(
  "SciFi books:",
  library.getBooksByGenre(BookGenre.SCIFI).map((b) => b.getBookTitle())
);

// User status
console.log("User 99001 status:", library.getUserBorrowingStatus(99001));
