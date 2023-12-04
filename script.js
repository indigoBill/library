const myLibrary = [];

function Book(title, author, pages, alreadyRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.alreadyRead = alreadyRead;
}

function modalReset(){
    const form = document.querySelector('form');
    form.reset();

    const requiredInputsMessage = document.querySelector('.input-error-message');
    requiredInputsMessage.textContent = '';
}

function modalDisplaySettings(event){
    const eventTarget = event.target;
    const modalWindow = document.querySelector('.new-book-modal');

    if(eventTarget.getAttribute('class') === 'new-book-btn'){
        modalWindow.style.display = 'block';
    }else{
        modalWindow.style.display = 'none';
        modalReset();
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
        requiredInputsMessage.textContent = 'Please fill out required fields';
    }else{
        hasBeenRead.value = hasBeenRead.checked ? true : false;

        createBookObject(title.value, author.value, pages.value, hasBeenRead.value);
        modalDisplaySettings(event);
        modalReset();

        displayBooksOnPage();
    }

    event.preventDefault();
}

const addBookBtn = document.querySelector('.add-book-btn');
addBookBtn.addEventListener('click', checkFormInputs);

function removeBook(event){
    const bookObj = event.target.parentElement;
    const bookShelf = document.querySelector('.book-shelf');
    let index = bookObj.getAttribute('data-index');

    myLibrary.splice(index, 1);
    bookShelf.removeChild(bookObj);
}

function getRemoveBtns(){
    const removeBtns = document.querySelectorAll('.remove-btn');

    removeBtns.forEach((button) => {
        button.addEventListener('click', removeBook);
    });
}

function changeReadStatus(event){
    let buttonContent = event.target.textContent;
    const bookDomObj = event.target.parentElement;
    let index = bookDomObj.getAttribute('data-index');
    let bookObj = myLibrary[index];

    if(buttonContent == 'READ'){
        event.target.textContent = 'NOT READ';
        bookObj.alreadyRead = 'false';
    }else{
        event.target.textContent = 'READ';
        bookObj.alreadyRead = 'true';
    }
}

function getReadStatusBtns(){
    const readStatusBtns = document.querySelectorAll('.has-been-read');

    readStatusBtns.forEach((button) => {
        button.addEventListener('click', changeReadStatus);
    });
}

function displayBooksOnPage(){
    const bookShelf = document.querySelector('.book-shelf');

    let bookAddedObserver = new MutationObserver(getRemoveBtns);
    bookAddedObserver.observe(bookShelf, {childList: true});

    let bookReadObserver = new MutationObserver(getReadStatusBtns);
    bookReadObserver.observe(bookShelf, {childList: true});

    const recentlyAddedBook = myLibrary[myLibrary.length - 1];
    const bookContainer = document.createElement('div');
    bookContainer.setAttribute("data-index", `${myLibrary.indexOf(recentlyAddedBook)}`);
    
    for(key in recentlyAddedBook){
        if(key != 'alreadyRead'){
            const bookInfo = document.createElement('div');
            bookInfo.textContent = `${key}: ${recentlyAddedBook[key]}`;

            bookContainer.appendChild(bookInfo);
        }
    }

    const hasBeenReadBtn = document.createElement('button');
    const hasBeenReadCheckbox = document.querySelector('#hasBeenRead');
    hasBeenReadBtn.classList.add('has-been-read');
    hasBeenReadBtn.textContent = (hasBeenReadCheckbox.value == 'true') ? 'READ' : 'NOT READ';
    bookContainer.appendChild(hasBeenReadBtn);

    const removeBookBtn = document.createElement('button');
    removeBookBtn.classList.add('remove-btn');
    removeBookBtn.textContent = 'REMOVE';
    bookContainer.appendChild(removeBookBtn);

    bookShelf.appendChild(bookContainer);
}