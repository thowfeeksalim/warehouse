function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data fetched!");
    }, 1000);
  });
}
async function main() {
  console.log(await fetchData());
}
main();
