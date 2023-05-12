// class Car {
//     constructor(name, year) {
//       this.name = name;
//       this.year = year;
//     }
//     age() {
//       const date = new Date();
//       return date.getFullYear() - this.year;
//     }
//   }
  
// const myCar = new Car("Ford", 2014);
// console.log("My car is " + myCar.age() + " years old.")


class Car {
    constructor(name,year){
    this.name = name
    this.year = year
    }
    age(){
        const date = new Date();
        return date.getFullYear - this.year
    }
}

const myCar = new Car('ford',2018)
console.log(myCar)