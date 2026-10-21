let arr = [1,2,3,4,5];
console.log(arr);
let newArr = arr.map( (n) => { return n*n; } );
console.log(newArr);

newArr= arr.filter(n=> n>3);
console.log(newArr);

let elem= arr.find(n=> n>3);
console.log(elem);

elem= arr.reduce( (sum,n) => sum += n, 0 );
console.log(elem);


const add= (a,b)=> {let c=a+b; return c;};
console.log(add(5,6));