const myLibrary = [];

function Book(title, author, pages, alreadyRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.alreadyRead = alreadyRead;
}

function resetForm(){
    const form = document.querySelector('form');
    form.reset();
}

function modalDisplaySettings(event){
    const eventTarget = event.target;
    const modalWindow = document.querySelector('.new-book-modal');

    if(eventTarget.getAttribute('class') === 'new-book-btn'){
        modalWindow.style.display = 'block';
    }else{
        modalWindow.style.display = 'none';
        resetForm();
    }
}

document.querySelector('.new-book-btn').addEventListener('click', modalDisplaySettings);

document.querySelector('.close').addEventListener('click', modalDisplaySettings);


function addBookToLibrary(bookObj){
    myLibrary.push(bookObj);
}

function createBookObject(title, author, numOfPages, hasRead){
    const book = new Book(title, author, numOfPages, hasRead);
    addBookToLibrary(book);
}

function checkFormInputs(event){
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const pages = document.querySelector('#pages');
    const hasBeenRead = document.querySelector('#hasBeenRead');

    if(title.value == '' || author.value == '' || pages.value == ''){
        const requiredInputsMessage = document.querySelector('.input-error-message');
        requiredInputsMessage.textContent = 'Fill out required fields to add book';

    }else{
        createBookObject(title.value, author.value, pages.value, hasBeenRead.value);
        modalDisplaySettings(event);
        resetForm();

        displayBooksOnPage();
    }

    event.preventDefault();
}

const addBookBtn = document.querySelector('.add-book-btn');
addBookBtn.addEventListener('click', checkFormInputs);


function displayBooksOnPage(){
    const bookShelf = document.querySelector('.book-shelf');

    myLibrary.forEach((bookObj) => {
        const bookContainer = document.createElement('div');
        bookContainer.style.backgroundColor = 'red';
        bookContainer.style.border = '2px solid black';
        
        for(key in bookObj){
            const bookInfo = document.createElement('div');
            bookInfo.textContent = `${key}: ${bookObj[key]}`;

            bookContainer.appendChild(bookInfo);
        }
        
        bookShelf.appendChild(bookContainer);
    });
}

