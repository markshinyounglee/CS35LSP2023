// page routing, redirect, and 404 in Express
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const data = require('./pages/sample-data.js');
const app = express();
const port = 4000;
// ejs as view engine
app.set('view engine', 'ejs');
app.set('views', 'pages'); // find pages under pages folder

try {
    app.listen(port, () => {
        console.log('App Listening To Port', port)
    });
} catch (error) {
    console.error("Error while listening to port", port);   
}

// page routing
app.get('/', (req, res) => {
    res.render('index', {title: 'Home'});
    // HTML page // res.sendFile('./pages/main.html', {root: dirname});
}); 

app.get('/profile-page', (req, res) => {
    res.render('profile-page', {title: 'Profile'});
    // res.sendFile('./pages/profile.html', {root: dirname});
}); 


// page redirection
app.get('/my-profile', (req, res) => {
    res.redirect('profile-page');
    // res.redirect('/profile');
});

app.get('/login', (req, res) => {
    res.render('login', {title: 'Login'});
})

app.get('/forgot-password', (req, res) => {
    res.render('forgot-password', {title: 'Password Recovery'});
})

app.get('/search', (req, res) => {
    res.render('search', {title: 'Search', data: data });
})


// must be put at the bottom of the page
// 404 error (page not found)
app.use((req, res) => {
    res.status(404).render('404-page', {title : 'Error'});
    // res.sendFile('./pages/404.html', {root:__dirname});
});