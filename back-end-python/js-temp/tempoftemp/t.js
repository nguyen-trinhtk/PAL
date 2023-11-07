let first = 10;
let second = 20;
fetch('http://127.0.0.1/add?a='+first+'&b='+second)
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    console.log("When I add "+first+" and "+second+" I get: " + myJson.result);
  });