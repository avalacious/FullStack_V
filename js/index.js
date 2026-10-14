/*var a= 5;
console.log(a);
 if we write console before defining a it will print not defined error because a is not defined yet. */


/*for(var i=0; i<5; i++){

}
console.log(i);
 technically i should not be accessed as it is out of the for loop but it will be bcz var is a global variable and it is not block scoped. */

/*const a = 5;
console.log(a);
temporal dead zone is the time between the start of the block and the variable declaration. if we try to access a variable before its declaration it will give reference error. 
let b=6;
 if we try to access both b and a we will not be able to access them it will give reference error as .... */


/* Data types- primitive and non primitive data types. Primitive data types are immutable and non primitive data types are mutable. 
Primitive Data types- number, string, boolem etc */

let a=5;
console.log(a, typeof a);
a= "Hello";
console.log(a, typeof a);
a= true;
console.log(a, typeof a);
a= null;
console.log(a, typeof a);
a= undefined;
console.log(a, typeof a);


let b = null;
if(b==null){
    console.log(true);
}

let c=5;
if(c=='5'){
    console.log(true);
}

/* Secondary data types- object, array, function etc. Non primitive data types are mutable. */
var myObj= {
    name: "Avani",
    show: showName
};
myObj.show();
function showName(){
    console.log(myObj.name);
}

const arr= [1,2,3,4,5];
arr.push(6);
console.log(arr);
arr.pop();
console.log(arr);

/* the reference would change thats the reason we can push and pop in the array but we cannot reassign the array to a new value. */
let arr1=[1, "GLA", 2.5, null, undefined, true, false];
console.log(arr1);

arr1.unshift(45);
arr1.shift(43);
console.log(arr1);
/* we can use unshift and push to make it behave like a queue. unshift will add the element at the start of the array and shift will remove the first element of the array. */
arr1.splice(1,3);
console.log(arr1);
/* splice will remove the elements from the array starting from the index mentioned in the first parameter and the number of elements to be removed is mentioned in the second parameter. */
arr1.entries();

