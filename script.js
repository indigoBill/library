const myLibrary = [];

class Book {
    constructor(title, author, pages, alreadyRead){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.alreadyRead = alreadyRead;
    } 
}

function modalReset(){
    const form = document.querySelector('form');
    form.reset();

    const requiredInputsMessage = document.querySelector('.input-error-message');
    requiredInputsMessage.textContent = '';
}

function toggleModalDisplay(event){
    const modalWindow = document.querySelector('.new-book-modal');

    if(event.target.getAttribute('class').includes('new-book-btn')){
        modalWindow.style.display = 'block';
    }else{
        modalWindow.style.display = 'none';
        modalReset();
    }
}

const modalButtons = document.querySelectorAll('.modal-btn')
modalButtons.forEach((button) => button.addEventListener('click', toggleModalDisplay));

function addBookToLibrary(bookObj){
    myLibrary.push(bookObj);
}

function updateDataIndex(){
    const bookContainers = document.querySelectorAll('[data-index]');
    let newIndex = 0;

    bookContainers.forEach((container) => {
        if(myLibrary[newIndex] !== undefined){
            container.setAttribute("data-index", newIndex);
            newIndex++;
        }
    });
}

function removeBook(event){
    const bookObj = event.target.parentElement;
    const bookShelf = document.querySelector('.book-shelf');
    let index = bookObj.getAttribute('data-index');

    myLibrary.splice(index, 1);
    bookShelf.removeChild(bookObj);

    updateDataIndex();
}

function addRemoveBtnEventListener(){
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

    if(buttonContent === 'READ'){
        event.target.textContent = 'NOT READ';
        bookObj.alreadyRead = 'false';
    }else{
        event.target.textContent = 'READ';
        bookObj.alreadyRead = 'true';
    }
}

function addReadBtnEventListener(){
    const readStatusBtns = document.querySelectorAll('.has-been-read');

    readStatusBtns.forEach((button) => {
        button.addEventListener('click', changeReadStatus);
    });
}

function displayBooksOnPage(){
    const bookShelf = document.querySelector('.book-shelf');
    const recentlyAddedBook = myLibrary[myLibrary.length - 1];
    const bookContainer = document.createElement('div');

    bookContainer.setAttribute("data-index", `${myLibrary.indexOf(recentlyAddedBook)}`);
    
    function addBookInfo(){
        for(key in recentlyAddedBook){
            if(key != 'alreadyRead'){
                const bookInfo = document.createElement('div');
                bookInfo.textContent = `${key}: ${recentlyAddedBook[key]}`;
    
                bookContainer.appendChild(bookInfo);
            }
        }
    }

    function addReadButton(){
        const hasBeenReadBtn = document.createElement('button');
        const hasBeenReadCheckbox = document.querySelector('#hasBeenRead');
        hasBeenReadBtn.classList.add('has-been-read');
        hasBeenReadBtn.textContent = (hasBeenReadCheckbox.value == 'true') ? 'READ' : 'NOT READ';
        bookContainer.appendChild(hasBeenReadBtn);
    }

    function addRemoveButton(){
        const removeBookBtn = document.createElement('button');
        removeBookBtn.classList.add('remove-btn');
        removeBookBtn.textContent = 'REMOVE';
        bookContainer.appendChild(removeBookBtn);
    }
    
    addBookInfo();
    addReadButton();
    addRemoveButton();
    bookShelf.appendChild(bookContainer);

    addRemoveBtnEventListener();
    addReadBtnEventListener();
}

function checkFormInputs(){
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const pages = document.querySelector('#pages');

    if(title.value == '' || author.value == '' || pages.value == ''){
        const requiredInputsMessage = document.querySelector('.input-error-message');
        requiredInputsMessage.textContent = 'Please fill out required fields';
        return;
    }

    return true;
}

function createBook(event){
    
    let canAddBook = checkFormInputs();
    
    if(canAddBook){
        const hasBeenRead = document.querySelector('#hasBeenRead');
        hasBeenRead.value = hasBeenRead.checked ? true : false;

        const book = new Book(title.value, author.value, pages.value, hasBeenRead.value);
        addBookToLibrary(book);

        toggleModalDisplay(event);
        modalReset();

        displayBooksOnPage();
    }

    event.preventDefault();
}

const addBookBtn = document.querySelector('.add-book-btn');
addBookBtn.addEventListener('click', createBook);

