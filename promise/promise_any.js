console.log("----------------PROMISE.ANY----------------")
const promiseOne = new Promise((resolved,rejected)=>{
    setTimeout(() => {
        resolved("OK") 
    }, 100)
})

const promiseTwo = new Promise((resolved,rejected)=>{
    setTimeout(() => {
        rejected("SORRY") 
    }, 100)
})

Promise.any([promiseOne,promiseTwo])
    .then((message) => {
        console.log(message)
    })
    .catch((error)=>{
        console.log(error);
    })


/*OUTPUT:  
    OK
*/