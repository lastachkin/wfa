function Book(title, publisher, author){
    this.title = title;
    this.publisher = publisher;
    this.author = author;

    this.getTitle = function(){
        return this.title;
    }

    this.getPublisher = function(){
        return this.publisher;
    }

    this.getAuthor = function(){
        return this.author;
    }
}

function Audiobook(availabilityCD, availabilityDVD){
    Book.call(this);

    this.availabilityCD = availabilityCD;
    this.availabilityDVD = availabilityDVD;
}

function Textbook(numOfPages){
    Book.call(this);

    this.numOfPages = numOfPages;
}


function onCreate(ev) {
    ev.preventDefault();
   
    var data = JSON.stringify({
         "title": String(document.getElementById("title").value),
         "numOfPages": String(document.getElementById("numOfPages").value),
         "publisher": String(document.getElementById("publisher").value),
         "author": String(document.getElementById("author").value),
    });

    console.log(data);
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            alert("Data added successfully!");
            document.getElementById("createForm").dispatchEvent(new Event('submit'));
        } 
    });

    xhr.open("POST", "http://localhost:2403/books");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}

function onRead() {
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            result=JSON.parse(this.response);
            var resultTBody=document.createElement('tbody');
            result.map(function(book){
                resultTBody.appendChild(parseBookToTableRow(book));
            });

            var table=document.getElementById('rTBody').parentElement;
            table.replaceChild(resultTBody,document.getElementById('rTBody'));
            resultTBody.id='rTBody';
        }
    });

    xhr.open("GET", "http://localhost:2403/books");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

function onPrepareUpdate(ev){

    ev.preventDefault();
    xhrids = new XMLHttpRequest();
    xhrids.withCredentials = true;

    xhrids.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
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
    });
    xhrids.open("GET", "http://localhost:2403/books/");
    xhrids.setRequestHeader("Content-Type", "application/json");
    xhrids.send();
}

function onUpdate(ev) {
    ev.preventDefault();

    var data = JSON.stringify({
        "title": String(document.getElementById("utitle").value),
        "numOfPages": String(document.getElementById("unumOfPages").value),
        "publisher": String(document.getElementById("upublisher").value),
        "author": String(document.getElementById("uauthor").value),
    });
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            alert("Data changed successfully!");
        }
    });

    xhr.open("PUT", "http://localhost:2403/books/"+document.getElementById("uid").value);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}

function onPrepareDelete(ev){

    ev.preventDefault();
    xhrids = new XMLHttpRequest();
    xhrids.withCredentials = true;

    xhrids.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            result=JSON.parse(this.response);
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
    xhrids.open("GET", "http://localhost:2403/books/");
    xhrids.setRequestHeader("Content-Type", "application/json");
    xhrids.send();
}

function onDelete(ev) {
    ev.preventDefault();
     xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            alert("Data deleted successfully!");
        }
    });

    xhr.open("DELETE", "http://localhost:2403/books/"+document.getElementById("did").value);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
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

var book1 = new Book("Title1", "Moskau", "Author1");
console.log(book1.getAuthor());