function prime(num) {
  return new Promise((resolve, reject) => {
    if (num < 0) {
      reject("enter valid number");
    } else {
      if (num < 2) {
        reject("not prime");
      }
    }
    for (i = 2; i < num / 2; i++)
      if (num % i == 0) {
        reject("not prime");
      }
    resolve("prime");
  });
}
prime(6)
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
