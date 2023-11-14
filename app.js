var express = require('express');
var app = express();
var session = require('express-session');
var fs = require('fs');
var crypto = require('crypto');


app.use(express.static("poze"));
app.use(express.static("html"));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: false
}));

app.set("view engine", "ejs");

app.get("/", function(req, res){
    if(req.session.username)
        res.redirect("acasa.html");
    else
        res.redirect("login.html");
})



app.get("/login", function(req, res){
    res.redirect('login.html');
});

app.post("/loginform",function(req, res){
    var useri = JSON.parse(fs.readFileSync('useri.json'));
    var cipher = crypto.Cipheriv('aes128', 'passwordpassword', 'vectorvector1234');
    var username;
    var parolacriptata = cipher.update(req.body.parola, 'utf8', 'hex')
                + cipher.final('hex');
    for(var user of useri){
        if(req.body.username == user.username
            && parolacriptata == user.parola)
                username = user.username;
    }
    if(username){
        req.session.username = username;
        console.log(req.session.username);
        res.redirect('/acasa.html');
}    
    else{
        res.send("Informatii gresite!");
    }
});

app.post('/autform', function(req, res){
    var useri = JSON.parse(fs.readFileSync("useri.json"));
    var cipher = crypto.Cipheriv('aes128', 'passwordpassword', 'vectorvector1234');
    var parolacriptata = cipher.update(req.body.parola, 'utf8', 'hex')
                            + cipher.final('hex');
    useri.push({username: req.body.username, 
            parola: parolacriptata});
    fs.writeFileSync('useri.json', JSON.stringify(useri));
    req.session.username = req.body.username;
    res.redirect("acasa.html");
});

app.get("/logout", function(req, res){
    req.session.destroy();
    res.redirect("/login");
})

app.get("/username", function(req, res){
    res.send(req.session.username);
});


app.get("/ConstantinB", function(req, res){
    res.render("Camin.ejs", {nume:"Constantin Brancoveanu", img:"ConstantinB.jpeg"});
})

app.get("/IoanS", function(req, res){
    res.render("Camin.ejs", {nume:"Ioan Slavici", img:"IoanS.jpeg"});
})

app.get("/IonC", function(req, res){
    res.render("Camin.ejs", {nume:"Ion Creanga", img:"IonC.jpeg"});
})

app.get("/Trandafiri", function(req, res){
    res.render("Camin.ejs", {nume:"Trandafiri", img:"Trandafiri.jpeg"});
})

app.use(function(req, res){
    res.redirect("error404.html");
});

app.listen(5000, function(){
    console.log("A pornit serverul!");
});