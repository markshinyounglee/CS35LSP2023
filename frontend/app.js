// page routing, redirect, and 404 in Express
const express = require('express');

const app = express();

// ejs as view engine
app.set('view engine', 'ejs');

app.listen(4000);

// page routing
app.get('/', (req, res) => {
    res.sendFile('./pages/main.html', {root: dirname});
}); 

app.get('/profile', (req, res) => {
    res.sendFile('./pages/profile.html', {root: dirname});
}); 


// page redirection
app.get('/my-profile', (req, res) => {
    res.redirect('/profile');
});


// must be put at the bottom of the page
// 404 error (page not found)
app.use((req, res) => {
    res.sendFile('./pages/404.html', {root:__dirname});
});