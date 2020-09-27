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

function Audiobook(availabilityCD){
    Book.call(this);

    this.availabilityCD = availabilityCD;

    this.getAvailabilityCD = function(){
        return this.availabilityCD;
    }
}

function Textbook(numOfPages){
    Book.call(this);

    this.numOfPages = numOfPages;

    this.NumOfPages = function(){
        return this.numOfPages;
    }
}

function create(){
    var data = JSON.stringify({
        "title": String(document.getElementById("utitle").value),
        "numOfPages": String(document.getElementById("unum").value),
        "publisher": String(document.getElementById("upub").value),
        "author": String(document.getElementById("uauth").value),
   });

   console.log(data);
   window.alert("json data in console");
}

function update(){
    var data = JSON.stringify({
        "title": String(document.getElementById("utitle").value),
        "numOfPages": String(document.getElementById("unum").value),
        "publisher": String(document.getElementById("upub").value),
        "author": String(document.getElementById("uauth").value),
    });
    console.log(data);

    //search in storage object with the same title and update it

    window.alert("update");
}

function read(){
    var title = document.getElementById("utitle").value;
    
    //search in storage object with the same title

    var jsonresponse = JSON.stringify({
        "title": String("test"),
        "numOfPages": Number(999),
        "publisher": String("test"),
        "author": String("test"),
    });

    var response = JSON.parse(jsonresponse);

    document.getElementById("utitle").value = response['title'];
    document.getElementById("unum").value = response['numOfPages'];
    document.getElementById("upub").value = response['publisher'];
    document.getElementById("uauth").value = response['author'];

    window.alert("read");
}

function delet(){
    var title = document.getElementById("utitle").value;

    //search in storage object with the same title and delete it
    
    window.alert("delete");
}