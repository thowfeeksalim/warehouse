const myPromise = new Promise((resolve, reject) => {
    const randomNumber = Math.floor(Math.random() * 10);

    if (randomNumber % 2 === 0) {
      resolve(randomNumber);
    } else {
      reject('Odd number generated!');
    }
  });
  
  myPromise.then(
    (result) => console.log('Even number generated:', result),
    (error) => console.log('Error:', error)
  );
  
