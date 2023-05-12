function sum(number){
    console.log("the total is "+ number)
}
function calculator(num1,num2,callback){
    setTimeout(()=>{
        let total = (num1 +num2) * 10000;
        callback(total)
    },2000)
}
calculator(10,20,sum)