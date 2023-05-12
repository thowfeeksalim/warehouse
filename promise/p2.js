const { message } = require("statuses")

const userleft = false
const watchingtv = false


function myPromise() {
    return new Promise((resolve,reject) =>{
        if(userleft){
            reject({
                name : 'error',
                messege : 'the user left'
            })
        }else if (watchingtv){
            reject ({
                name : 'error',
                messege: "user watching tv"
            })
        }else{
            resolve ({
                name : 'success',
                messege:"you are watching my tutorials"
            })
        }
    })
    
}

myPromise().then((message)=>{
    console.log('result:',message)
}).catch((message)=>{
    console.log('result:',message)
})