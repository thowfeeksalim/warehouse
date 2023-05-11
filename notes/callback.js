//!                         callback function

//A callback is a function passed as an argument to another function.

function a(callback){
    console.log("a");
    callback()
}
function b(){
    console.log("b");
}
a(b);



//EXAMPLE 2

function message(name, callback) {
    console.log("Hi" + " " + name);
    callback();
  }
  
  // Callback function
  function callMe() {
    console.log("I am callback function");
  }
  
  // Passing function as an argument
  message("Node.JS", callMe);