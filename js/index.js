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

