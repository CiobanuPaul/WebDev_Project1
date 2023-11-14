window.onload = function(){
    var cont = document.getElementById("container");
    cont.onclick = function(event){
        var copil = event.target;
        if(copil.nodeName == "ARTICLE"){
            var bckcolor = window.getComputedStyle(cont).backgroundColor;
            cont.style.backgroundColor = window.getComputedStyle(copil).backgroundColor;
            copil.style.backgroundColor = bckcolor;
        }
    }
}