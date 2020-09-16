function checkUsername() {
    var uname = prompt("Please enter your username");
    var hasNumber = /\d/;

    if(hasNumber.test(uname))
        alert(camelString(uname));
    else
        alert(reverseString(uname));
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

function camelString(str) {
    var strArray = str.split("");
    
    for(var i = 0; i < strArray.length; i++) {
        if(i % 2 == 0)
            strArray[i] = strArray[i].toUpperCase();
        else
            strArray[i] = strArray[i].toLowerCase();
    }

    return strArray.join("");
}

function toGoogle() {
    window.open("http://www.google.com");
}

function clearContent() {
    document.getElementById('txt').innerHTML = "";
}