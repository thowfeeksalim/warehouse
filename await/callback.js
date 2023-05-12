// //!                         callback function

// //A callback is a function passed as an argument to another function.

// function a(callback){
//     console.log("a");
//     callback()
// }
// function b(){
//     console.log("b");
// }
// a(b);



// //EXAMPLE 2

// function message(name, callback) {
//     console.log("Hi" + " " + name);
//     callback();
//   }
  
//   // Callback function
//   function callMe() {
//     console.log("I am callback function");
//   }
  
//   // Passing function as an argument
//   message("Node.JS", callMe);


// // //EXAMPLE 3

// function sum(number) {
//   console.log('Total: ' + number);
// }

// function calculator(num1, num2, callback) {
//   let total = num1 + num2;
//   callback(total);
// }

// calculator(10, 20, sum);  




function sum(number){
    console.log("the total is "+ number)
}
function calculator(num1,num2,callback){
    let total = num1+num2;
    callback(total)
}
calculator(10,20,sum)


// function sum(number){
//     console.log("The total is "+ number);
//   }
//   function calculator(num1, num2, callback){
//     setTimeout(() => {
//       let total = num1 + num2;
//       callback(total);
//     }, 2000);
//   }
  
//   calculator(10, 20, sum);
  