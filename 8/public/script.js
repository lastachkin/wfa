class Book {
    constructor(title, author) {
        this._title = title;
        this._author = author;
    }

    set title(title) {
        this._title = title;
    }

    get title() {
        return this._title;
    }

    set author(author) {
        this._author = author;
    }

    get author() {
        return this._author;
    }
}

class Textbook extends Book {
    constructor(numOfPages, title, publisher, author) {
        super(title, author);
        this._publisher = publisher;
        this._numOfPages = numOfPages;
    }

    get publisher() {
        return this._publisher;
    }

    get numOfPages() {
        return this._numOfPages;
    }

    set publisher(publisher) {
        this._publisher = publisher;
    }

    set numOfPages(numOfPages) {
        this._numOfPages = numOfPages;
    }
}

class Audiobook extends Book {
    constructor(availabilityCD, title, author) {
        super(title, author);
        this._availabilityCD = availabilityCD;
    }

    get availabilityCD() {
        return this._availabilityCD;
    }

    set availabilityCD(av) {
        this._availabilityCD = av;
    }
}

let book = new Book("Книга абстрактная", "Автор1");
let textbook = new Textbook(399, "Книга текстовая", "Издательство", "Автор2");
let audiobook = new Audiobook(true, true, "Книга аудио", "Автор3");

console.log(book.title);
console.log(textbook.numOfPages);
console.log(audiobook.availabilityCD);


function onCreate(ev) {
    ev.preventDefault();
   
    var data = JSON.stringify({
         "title": String($("#utitle").val()),
         "numOfPages": String($("#unumOfPages").val()),
         "publisher": String($("#upublisher").val()),
         "author": String($("#uauthor").val()),
    });

    let promise = new Promise(function() {
        $.ajax({
            method: "POST",
            url: "http://localhost:2403/books",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            data: data
          })
            .done(function( msg ) {
                alert("Data added successfully!");
                document.getElementById("createForm").dispatchEvent(new Event('submit'));
            });
      });
}

function onRead() {

    let promise = new Promise(function(resolve, reject) {
        $.ajax({
            method: "GET",
            url: "http://localhost:2403/books/",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(res) {
                result=JSON.parse(res);
                var resultTBody=document.createElement('tbody');
                result.map(function(book){
                    resultTBody.appendChild(parseBookToTableRow(book));
                });
    
                var table=document.getElementById('rTBody').parentElement;
                table.replaceChild(resultTBody,document.getElementById('rTBody'));
                resultTBody.id='rTBody';
            }
          })
    });
}

function onPrepareUpdate(ev){

    ev.preventDefault();

    let promise = new Promise(function(resolve, reject) {
        $.ajax({
            method: "GET",
            url: "http://localhost:2403/books/",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            success: function(res) {
                result=JSON.parse(this.response);
                var ids=document.createElement('select');
                ids.className='form-control';
                result.map(function(nthCPU){
                    var id=document.createElement('option');
                    id.innerHTML=nthCPU['id'];
                    ids.appendChild(id);
                });
                var form=document.getElementById('uid').parentElement;
                form.replaceChild(ids,document.getElementById('uid'));
                ids.id='uid';
            }
          })
    });
}

function onUpdate(ev) {
    ev.preventDefault();

    var data = JSON.stringify({
         "title": String($("#utitle").val()),
         "numOfPages": String($("#unumOfPages").val()),
         "publisher": String($("#upublisher").val()),
         "author": String($("#uauthor").val()),
    });

    let promise = new Promise(function(resolve, reject) {
        $.ajax({
            method: "PUT",
            url: "http://localhost:2403/books/"+document.getElementById("uid").value,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-Type", "application/json");
            },
            data: data
          })
            .done(function( msg ) {
                alert("Data changed successfully!");
            });
    });
}

function onPrepareDelete(ev){

    ev.preventDefault();

    let promise = new Promise(function(resolve, reject) {
        $.ajax({
            url: "http://localhost:2403/books/",
            type: 'GET',
            headers: {"Content-Type": "application/json"},
            success: function (result) {
                result=JSON.parse(result);
                var ids=document.createElement('select');
                ids.className='form-control';
                result.map(function(book){
                    var id=document.createElement('option');
                    id.innerHTML=book['id'];
                    ids.appendChild(id);
                });
                var form=document.getElementById('did').parentElement;
                form.replaceChild(ids,document.getElementById('did'));
                ids.id='did';
            }
        });
      });
}

function onDelete(ev) {
    ev.preventDefault();

    let promise = new Promise(function(resolve, reject) {
        $.ajax({
            method: "DELETE",
            url: "http://localhost:2403/books/"+document.getElementById("did").value,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-Type", "application/json");
            }
          })
            .done(function( msg ) {
                alert("Data changed successfully!");
            });
      });
}

function parseBookToTableRow(books){
    var row=document.createElement('tr');

    id=document.createElement('th');
    id.innerText=books['id'];
    row.appendChild(id);

    title=document.createElement('td');
    title.innerText=books['title'];
    row.appendChild(title);

    numOfPages=document.createElement('td');
    numOfPages.innerText=books['numOfPages'];
    row.appendChild(numOfPages);
   
    publisher=document.createElement('td');
    publisher.innerText=books['publisher'];
    row.appendChild(publisher);
    
    author=document.createElement('td');
    author.innerText=books['author'];
    row.appendChild(author);

    return row;
}


(function () {
  
    document.getElementById('cbutton').addEventListener(
        'click', onCreate
    );
    document.getElementById('rbutton').addEventListener(
        'click', onRead
    );
    document.getElementById('ubutton').addEventListener(
        'click', onUpdate
    );
    document.getElementById('pubutton').addEventListener(
        'click', onPrepareUpdate
    );
    document.getElementById('pdbutton').addEventListener(
        'click', onPrepareDelete
    );
    document.getElementById('dbutton').addEventListener(
        'click', onDelete
    );
})()