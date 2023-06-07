const http = require('node:http');
const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');
const { eventEmitter } = require('./backend/controllers/userController');
const beefRoutes = require('./routes/beef');
const userRoutes = require('./routes/user');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const port = 4000;

//middleware 
app.use(cors())
app.use(express.json())

app.use((req,res, next ) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/beef', beefRoutes)
app.use('/api/user', userRoutes)

//connect to DB
mongoose.connect(process.env.MONG_URI)
  .then(() => {
    const server = http.createServer(app);
    const io = socketIO(server);

    io.on('connection', (socket) => {
      console.log('A client connected');

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log('A client disconnected');
      });
    });

    eventEmitter.on('userUpdated', ({ userId }) => {
      io.emit('userUpdated', { userId }); // Emit to all connected sockets
      console.log(`user with ID ${userId} has updated their beef array`)
    });

    server.prependListener("request", (req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
   });

    //listen for requests once we connect to DB
    server.listen(port, () => {
      console.log(`connected to database and port ${port}`);
    })
  })
  .catch((error) => {
      console.log(error)
      process.exit(1);
  })
  
  
  // // make HTML server
  // const server = http.createServer((req, res) => {
  //   console.log(req.url, req.method); // req.url useful for rerouting
  
  //   // set header content type
  //   res.setHeader('Content-Type', 'text/html');
    
  //   // determine which page we should be displaying
  //   let path = './pages/';
  //   switch(req.url)
  //   {
  //     case '/': // homepage
  //       path += 'main.html'; 
  //       res.statusCode = 200;
  //       break;
  //     case '/my-profile':
  //       path += 'profile.html';
  //       res.statusCode = 200;
  //       break;
  //     case '/profile': // redirect to my-profile
  //       res.statusCode = 301; // redirection
  //       res.setHeader('Location', '/my-profile');
  //       res.end();
  //       break;
  //     default:
  //       path += '404.html'; // 404 error page
  //       res.statusCode = 404;
  //   }

  //   // send an html file
  //   fs.readFile(path, (err, data) => {
  //     if(err) {
  //       console.log(err);
  //       res.end();
  //     }
  //     else {
  //       res.write(data);
  //       res.end();
  //     }
  //   })
    
  // });

  // // connect to HTML server
  // server.listen(port, 'localhost', () => {
  //   console.log('listening to requests on PORT', port);
  // })


