console.log("----------------PROMISE.ALLSETTLED----------------")
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

Promise.allSettled([promiseOne,promiseTwo])
    .then((message) => {
        console.log(message)
    })
    .catch((error)=>{
        console.log(error);
    })


/*OUTPUT:  [
  { status: 'fulfilled', value: 'OK' },
  { status: 'rejected', reason: 'SORRY' }
]
*/