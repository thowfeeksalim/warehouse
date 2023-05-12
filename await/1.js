// let promise = new Promise(function (resolve, reject) {
//     setTimeout(function () {
//     resolve('Promise resolved')}, 4000); 
// });
// async function asyncFunc() {
//     try {
//         let result = await promise; 
//         console.log(result);
//     }   
//     catch(error) {
//         console.log(error);
//     }
// }
// asyncFunc();

const promise = new Promise ((resolve,reject) => {
    setTimeout(() => {
        resolve('Promise resolved')
    },1000)
})

async function asyncfunc(){
    try{
        let result = await promise
        console.log(result)
    }
    catch(error){
        console.log(error)
    }
}
asyncfunc()