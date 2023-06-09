# BeefReal

## Table of Contents
* [Introduction](#introduction)
* [Motivation](#motivation)
* [Features](#features)
* [How to install and run](#how-to-install-and-run)
* [Code contributors](#code-contributors)
* [License](#license)

## Introduction
Welcome to Beefreal, a friendly-sarcastic place where we can beef our friends without being beaten.

## Motivation
Nowadays, people use BeReal to see real-time photos of their friends to get a realistic hang of what they are up to. 

Adding a slight twist to this idea of unaffected reality, we thought it would be a great idea where we can casually roast each other without making it too uncomfortable.

BeefReal creates a casual venue where people can post beefs about their friends and the users can vote on each beef. 


## Features
After the user creates his/her account, the profile page displays all the beef messages the person created to other people. If we go to the general beefreal page (second option), we can see the entire list of beefs created by different people listed in reverse chronological order. Here, we can vote on each beef.

To give more taste for the web applicaiton, we included three advanced Features:
1. Notifications
* We included notification features when the user logs in. Also, the user and the person whom he/she is beefing with are both notified when a beef between the two is posted. 

2. Add friend
* BeefReal is meant to be a playground among friends, so we also have add friend/remove friend functionality. Friends will be notified when we post a beef about them and vice versa. 

3. AI-generated Beef
* When we think about roasting a friend but cannot think of a good way to put it, we can use ChatGPT to generate a sarcastic beef for us. This is done by sending request to ChatGPT API to generate a beef for us.


## How to Install and Run

Please install JavaScript package manager [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/) before running the project. If you are a macOS user, it is recommended to install either of the package using [homebrew](https://brew.sh/)

Clone the project into your local machine by running

```bash
git clone https://github.com/markshinyounglee/CS35LSP2023.git
```

You need to install all dependencies to successfully run the web application. In the root directory, run the following commands:

```bash
npm install cors
npm install socket-io
npm install socket-io.client
npm install react-toastify
npm install dotenv
npm install openai
npm install stream-chat
npm install stream-chat-react
```

and then go to the client folder by running

```bash
cd client
```

and run

```bash
npm install path-browserify
```

After installing all dependencies, you first need to connect to the MongoDB server. Go into CS35LSP2023 and run 

```bash
npm start
```

to initiate the port connection.

Then, you need to run the client. Type

```bash
cd client
```

to go to the client folder. Then run

```bash
npm start
```

to run the web application.

## Code Contributors

This program is created by the collective effort of Arman Durrani, Abhinav Amanaganti, Taejus Yee, and Mark Shinyoung Lee. All members were fully engaged from the conception to the development of the project from beginning and the end, and they all contributed their fair share.

## License

MIT License

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

To see more, look [here](https://opensource.org/license/mit/)