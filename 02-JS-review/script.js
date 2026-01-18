"use strict";

// array of object
const data = [
  {
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: [
      "fantasy",
      "high-fantasy",
      "adventure",
      "fiction",
      "novels",
      "literature",
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: "El señor de los anillos",
      chinese: "魔戒",
      french: "Le Seigneur des anneaux",
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: [
      "science fiction",
      "humor",
      "speculative fiction",
      "short stories",
      "fantasy",
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: "",
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: "Harry Potter y la piedra filosofal",
      korean: "해리 포터와 마법사의 돌",
      bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
      portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: "왕좌의 게임",
      polish: "Gra o tron",
      portuguese: "A Guerra dos Tronos",
      spanish: "Juego de tronos",
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}

console.log(getBook(4));
console.log(getBooks());

////1.
//////////// Destructuring Objects and Arrays
//useful- when we want to get some data out of an object or out of an array.

let book = getBook(2);
//////to get data without destructuring
// const title = book.title;
// console.log(title); //dune

//or this also give same result
//it takes id
console.log(data[2].title); //dune

console.log(data[2].author); //frank herbert

//with object destructuring
//relies on properties name
let { title, author, pages, publicationDate, hasMovieAdaptation, genres } =
  book;
console.log(title, author, pages, publicationDate, hasMovieAdaptation, genres);

//Destructuring in array
//relies on order of the elements in array

//without destructuring, to get data out of genres
// const primaryGenre = genres[0];
// const secondaryGenre = genres[1];
// console.log(primaryGenre, secondaryGenre);

//with destructuring
//destructruing genres , above we got the data of genres
//genre of book of id 3
let [primaryGenre, secondaryGenre] = genres;
console.log(primaryGenre, secondaryGenre);

// In other words, doing this:
// const { title, author, pages, publicationDate, genres, hasMovieAdaptation } = book;

// is a shortcut for doing this:

// const title = book.title;
// const author = book.author;
// const pages = book.pages;
// const publicationDate = book.publicationDate;
// const genres = book.genres;
// const hasMovieAdaptation = book.hasMovieAdaptation;
// Once genres is declared as a variable holding the value of
// book.genres, you can use genres directly as the array.
// It is essentially the same thing as accessing book.genres.

//2.
//Rest/Spread Operator

//rest operator
let [primary1Genre, secondary2Genre, ...otherGenres] = genres;
console.log(primary1Genre, secondary2Genre, otherGenres);

//spread operator
let newGenre = [...genres, "epic fantasy"];
console.log(newGenre);

////creating new property in object without spread operator
let updatedBook = { book, moviePublicationDate: "2001-12-19" };
console.log(updatedBook);

//we want one big object which contains all of the above data
updatedBook = {
  ...book,
  moviePublicationDate: "2001-12-19",
  //overwriting a existing property - we will overwrite pages properties,placing it after books object so it overwrite the existing pages property in the object
  pages: 1210,
};
console.log(updatedBook);

///3.
//template literals
const summary = `${title} , a ${pages}-page long book, was written by ${author} and publishes on ${
  publicationDate.split("-")[0]
}
  , The book has ${hasMovieAdaptation ? "" : "not"} been adapted as a movie.`;
console.log(summary);

//4.
//Ternary operator
const pagesRange = pages > 1000 ? "over a thousand" : "less than 1000";
console.log(pagesRange);

//5.
//Arrow Functions

//without arrow function to get the year out of publication date
function getYear(str) {
  return str.split("-")[0];
}

console.log(getYear(publicationDate));

//with arrow function , the same function as above
const getYearA = (str) => str.split("-")[0];
console.log(getYearA(publicationDate));

//6.
//Short Circuiting and Logical Operators: &&, ||, ??
console.log(true && "some string"); //some string
console.log(false && "some string"); //false

console.log(true || "some string"); //true
console.log(false || "some string"); //some string

console.log(book.translations.spanish);

//const count = book.reviews.librarything.reviewsCount ?? "no data";
//console.log(count);

//7.
//Optional Chaining Operator
function getTotalReviewCount(book) {
  const goodreads = book.reviews.goodreads.reviewsCount;
  const librarything = book.reviews.librarything.reviewsCount;
  return goodreads + librarything;
}

//now, for books that have goodreads and library this works fine
//, but book[3] does not have librarything for that it gives
// error
//console.log(getTotalReviewCount(book));
//but with optional chaining , we can put librarything option to be optionally

function getTotalReviewCountWithOptionalChaining(book) {
  const goodreads = book.reviews?.goodreads?.reviewsCount;
  const librarything = book.reviews?.librarything?.reviewsCount ?? 0;
  return goodreads + librarything;
}

console.log(getTotalReviewCountWithOptionalChaining(book));

//8.
//Array Map Method

//example of map method it takes a callback
const books = getBooks();
const x = [1, 2, 3, 4, 5].map(function (el) {
  return el * 2;
});

console.log(x);

//array which has all the titles of all the books
const titles = books.map(function (book) {
  return book.title;
});

console.log(titles);

const essentialData = books.map(function (book) {
  return {
    title: book.title,
    author: book.author,
  };
});

console.log(essentialData);

//9.
//Array Filter Method

//array with books that has more than  500 pages
const longBooks = books.filter(function (book) {
  return book.pages > 500;
});

console.log(longBooks);

//we can combine methods
const adventureBooks = books
  .filter(function (book) {
    return book.genres.includes("adventure");
  })
  .map(function (book) {
    return book.title;
  });

console.log(adventureBooks);

//10.
//Array Reduce Method

//function to know how many total pages all the books in the array has
// so add together all of the books pages properties
const pagesAllBooks = books.reduce(function (acc, book) {
  return acc + book.pages;
}, 0);

console.log(pagesAllBooks);

//11.
//Array Sort Method
const y = [3, 5, 46, 33, 7, 9];
//sorting in ascending order
const sorted = y.sort(function (a, b) {
  return a - b;
});

console.log(sorted);
console.log(y);
//changes the original array

//do .slice().sort() this will create a copy of the array and not mutate the origina array
const z = [3, 5, 2, 522, 53, 1];
const sortedNoMutable = z.slice().sort(function (a, b) {
  return a - b;
});
console.log(sortedNoMutable);
console.log(z);

//12.
//Working With Immutable Arrays

//add a book object to the array
const newBook = {
  id: 6,
  title: "Harry Potter and the Chamber of Secrets",
  author: "J.K. Rowling",
};
const booksAfterAdd = [...books, newBook];
console.log(booksAfterAdd);

//delete a book object from array
const booksAfterDelete = booksAfterAdd.filter(function (book) {
  return book.id !== 3;
});

console.log(booksAfterDelete);

//update a book object in the array
const booksAfterUpdate = booksAfterDelete.map(function (book) {
  return book.id === 1 ? { ...book, pages: 1210 } : book;
});

console.log(booksAfterUpdate);

//13.
//Asynchronous JavaScript: Promises
fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    console.log(data);
  });

//14.
//Asynchronous JavaScript: Async/Await
async function getTodos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/2");
  const data = await response.json();
  console.log(data);
}

getTodos();
