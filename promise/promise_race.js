console.log("----------------PROMISE.RACE----------------")
const promiseOne = new Promise((resolved,rejected)=>{
    setTimeout(() => {
        resolved("OK") 
    }, 100)
})

const promiseTwo = new Promise((resolved,rejected)=>{
    setTimeout(() => {
        rejected("SORRY") 
    }, 99)
})

Promise.race([promiseOne,promiseTwo])
    .then((message) => {
        console.log(message)
    })
    .catch((error)=>{
        console.log(error);
    })


/*OUTPUT:  
    OK(bcz it is fastest executed one)
*/