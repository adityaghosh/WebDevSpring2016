(function(){
    var m = "Welcome! Page has been loaded.";
    alert(m);
})();


function fibonacci(){
    var n = document.getElementById("n").value;
    var res = 1;
    var num1 = 1;
    var num2 = 1;
    for(var i=3; i<n; i++)
    {
        res = num1 + num2;
        num1 = num2;
        num2 = res;
    }
    document.getElementById("fibonacciValue").innerHTML = res;
}
function  alertMessage(){
    var message = document.getElementById("message").value;
    alert(message);
}

function addLi(){
    var l = document.getElementById("mylist");
    var listLength = l.childElementCount;
    l.innerHTML = l.innerHTML + ("<li id='list-" + (listLength+1) +"'>New Item</li>");
}
