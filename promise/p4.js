
// const myPromise = new Promise ((resolve, reject)=>{
//   const randomnumber = Math.floor(Math.random() * 10 );

const { handlebars } = require("hbs");

// const { reject } = require("neo-async");

//   if (randomnumber % 2 == 0 ){
//     resolve(randomnumber)
//   } else {
//     reject ("the number is odd")
//   }
// });

// myPromise.then(
//   (result) => console.log("THE NUMBER IS EVEN :",result),
//   (error) => console.log("error :",error)
// );



// const myPromise = new Promise(function (resolve,reject) {
//   const x = 0;

//   if (x == 0){
//     resolve('OK')
//   }else{
//     reject('error')
//   }
// });

// myPromise.then(
//   (value) => console.log('successful',value),
//   (error) => console.log('error',error)
// );

const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 300);
});

myPromise




























