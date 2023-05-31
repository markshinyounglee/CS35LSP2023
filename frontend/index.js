// dump code snippets that may potentially be useful in the future


console.log('hello');

global.setTimeout(() => {
    console.log('in the timeout');
    clearInterval(int);
}, 3000)

const int = setInterval(() => {
    console.log('in the interval');
}, 1000);

console.log(__dirname); // absolute path to parent directory
console.log(__filename); // abs. path to current file
