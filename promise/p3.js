// fetch('https://api.example.com/data')
//   .then(response => response.json())
//   .then(data => processData(data))
//   .then(result => console.log(result))
//   .catch(error => console.error(error));


fetch('https://api.example/data')
    .then(response => response.json())
    .then(data => processData())
    .then(result => console.log(result))
    .catch(error => console.log(error));













