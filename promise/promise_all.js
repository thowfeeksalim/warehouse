console.log("----------------PROMISE.ALL----------------")
const promiseOne = new Promise((resolved,rejected)=>{
    setTimeout(() => {
        resolved("OK") 
    }, 100)
})

const promiseTwo = new Promise((resolved,rejected)=>{
    setTimeout(() => {
        resolved("SORRY") 
    }, 100)
})

Promise.all([promiseOne,promiseTwo])
    .then((message) => {
        console.log(message)
    })
    .catch((error)=>{
        console.log(error);
    })


//OUTPUT:   SORRY


