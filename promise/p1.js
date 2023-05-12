const { message } = require("statuses");

const myPromise = new Promise ((resolve,reject) =>{
    let x = 1 + 2
    if (x==2){
        resolve("correct")
    }else{
        reject("wrong")
    }
});
myPromise.then((message) =>{
    console.log('the output is',message);
}).catch((message) => {
    console.log('the output is ',message);
});