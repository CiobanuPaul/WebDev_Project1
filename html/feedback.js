function getStare(i){
    switch(i){
        case 0:
            return "Foarte slaba";
            break;
        case 2:
            return "Slaba";
            break;
        case 4:
            return "Se putea mai bine";
            break;
        case 6:
            return "Neutru";
            break;
        case 8:
            return "Buna";
            break;
        case 10:
            return "Foarte buna";
            break;
        default:
            return "Eroare";
    }
};

window.onload = function(){
    var colectie = document.querySelectorAll("#myform input, #myform select");
    for(var inp of colectie){
        if(inp.type != "submit"){
            if(inp.name == "gen"){
                if(localStorage.getItem(inp.name) == inp.value)
                    inp.checked = true;
            }
            else
                inp.value = localStorage.getItem(inp.name);
        }
    }

    var range = document.getElementById('range');
    var input = document.getElementById('rangeinp');
    input.onchange = function(){
        var aux = parseInt(input.value);
        range.innerHTML = getStare(aux);
    }

    var buton = document.querySelectorAll("input[type='submit']")[0];
    var interval = document.getElementById("interval");
    var perr = document.getElementById("error");
    interval.onchange = function(){
        var ani = interval.value.split("-");
        if(parseInt(ani[0]) > parseInt(ani[1])){
            buton.disabled = true;
            perr.innerHTML = "Interval invalid!";
        }
        else
            buton.disabled = false;
    }

    var form = document.getElementById("myform");
    form.onsubmit = function(){
        for(var inp of colectie)
            if(inp.type != "submit"){
                if(inp.name=="gen" && inp.checked == false)
                    continue;
                // alert(inp.name +" "+inp.value + " " +inp.checked);
                // alert(inp.value);
                localStorage.setItem(inp.name, inp.value);
            }
    }
}