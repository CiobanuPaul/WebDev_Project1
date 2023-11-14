window.onload = function(){

    var par = document.getElementById('sec');
    var sec = 0;
    window.setInterval(function(){
        sec += 5;
        par.innerHTML = sec + 'sec';
    }, 5000);

    var sections = document.getElementsByTagName('section');    
    sections[0].onclick = function(){
        var par2 = document.createElement('p');
        sections[0].appendChild(par2);
        par2.innerHTML = 'De la incarcarea paginii au trecut aproximativ '+sec+ 'secunde.';
        window.setTimeout(function(){
            sections[0].removeChild(par2);
        }, 5000);
    
    }

    var articles = document.querySelectorAll('article');
    var culori = ["rgb(254, 229, 229)", "rgb(250, 240, 217)", "rgba(245, 245, 245, 0.912)",
        "rgb(213, 243, 248)", "rgb(245, 210, 244)", "rgb(210, 245, 229)"];
    for(let article of articles){
        article.addEventListener('click', function(event){
            article.style.backgroundColor = culori[Math.floor(Math.random()*culori.length)];
            event.stopPropagation();
        });
    }

    var request=fetch("/username");
    request.then(function(response){
        if(response.status=='200')
            return response.text();
        else console.log("eroare");
    }).then(function(text) {
        var username = text;
        var h2 = document.querySelectorAll("#container h2")[0];
        h2.innerHTML = "Bine ai venit, " + username+"!";
    }).catch(function(err){
        console.log(err);
    });
   
}