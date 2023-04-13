/*
    toFixed() method in JavaScript to convert a number to a string with a fixed number of digits after the decimal point.
    join() method creates and returns a new string by concatenating all of the elements in an array

*/
let books;

async function renderBooks(filter) {
    const booksWrapper = document.querySelector('.books');

    booksWrapper.classList += ' books__loading'
    if (!books) {
        books = await getBooks(); 
    }

    booksWrapper.classList.remove('books__loading')
    if (!filter || filter === 'DEFAULT') {
        books.sort((a, b) => a.id- b.id)
    }
    else if (filter === 'LOW_TO_HIGH') {
        books.sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice));
    } else if (filter ==='HIGH_TO_LOW') {
        books.sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice));
    } else if (filter === 'RATING') {
        books.sort((a, b) => a.rating - b.rating);
    }

    const booksHtml = books.map(book => {
        return  `<div class="book">
        <figure class="book__img--wrapper">
            <img src= "${book.url}" alt="" class="book__img">
        </figure>
        <div class="book__title">
            ${book.title}
        </div>
        <div class="book__ratings">
            ${ratingHTML(book.rating)}
        </div>
        <div class="book__price">
            ${priceHTML(book.originalPrice, book.salePrice)}
        </div>
    </div>`
    })
    .join("");

    booksWrapper.innerHTML = booksHtml;
};

function priceHTML(originalPrice, salePrice) {
    if (!salePrice) {
        return `$${originalPrice.toFixed(2)}`
    }
    return `<span class="book__price--normal">$${originalPrice.toFixed(2)}</span> $${salePrice.toFixed(2)}`
    // <span>$${book.originalPrice.toFixed(2)}</span>
}

function ratingHTML(rating) {
    let ratingHTML = '';

    for (let i = 0; i < Math.floor(rating); ++i) {
        ratingHTML +=  '<i class="fas fa-star"></i>'
    }
    if (!Number.isInteger(rating)) {
        ratingHTML += '<i class="fas fa-star-half-alt"></i>'
    }

    return ratingHTML;
}

function filterBooks(event) {
    renderBooks(event.target.value);
}

setTimeout( () => {
    renderBooks();
});

//  FAKE DATA
function getBooks() {
    return new Promise((resolve) => {
        setTimeout(() =>{
            resolve([
            {
                id: 1,
                title: "Crack the Coding Interview",
                url: "assets/crack the coding interview.png",
                originalPrice: 19.95,
                salePrice: null,
                rating: 3
            },
            {
                id: 2,
                title: "Mystery",
                url: "assets/book-8.jpeg",
                originalPrice: 29.95,
                salePrice: null,
                rating: 2
            },
            {
                id: 3,
                title: "Deep Work",
                url: "assets/deep work.jpeg",
                originalPrice: 14.95,
                salePrice: 4.95,
                rating: 5
            },
            {
                id: 4,
                title: "Your Next Five Moves",
                url: "assets/book-7.jpg",
                originalPrice: 59.95,
                salePrice: 1.95,
                rating: 5
            },
            {
                id: 5,
                title: "Power",
                url: "assets/book-5.jpeg",
                originalPrice: 39.95,
                salePrice: 22.95,
                rating: 4.5
            },
            {
                id: 6,
                title: "5 Second Rule",
                url: "assets/book-6.jpeg",
                originalPrice: 47.95,
                salePrice: 32.95,
                rating: 4.5
            },
            {
                id: 7,
                title: "5 Second Rule",
                url: "assets/book-6.jpeg",
                originalPrice: 47.95,
                salePrice: 32.95,
                rating: 4.5
            }

            ])
        }, 1000);
    });
};