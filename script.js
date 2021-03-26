'use strict';
//This section is all about functions - higher order functions, bind method, closures, ect. Must understand before moving on!

//default parameters in certain functions are set to defaukt in functions so we dont have to pass them in manually if we dont want to change the default

//continue airline theme - now create basic booking fucntion

const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  //   numPassengers = numPassengers || 1;//ES5
  //   price = price || 199;//ES5 syntax

  const booking = {
    flightNum,
    numPassengers,
    price,
  };

  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
//We can override defaults
createBooking('LH123', 2, 800); //Now we get what was specified instead of default

//Default can contain any expression
createBooking('LH123', 2);
createBooking('LH123', 7); //Now price changes because you added the * price inside the function parameters

//This only works for parameters defined in the list BEFORE you try to call it --- order matters!

//To leave something as default
createBooking('LH123', undefined, 1000); //When we dont set a parameter it takes the value of undefined so we can set the parameter as undefined to keep the default value

//New section - How passing arguments works: value and reference

//primitive and reference type of functions - think the stack and heap and how addresses can change

//Example is below

const flight = 'LH234';
const jonas = {
  name: 'jonas guy',
  passport: 3573856873,
};

//Now make check in function for when passenger has bought flight and rdy to check in
const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 3573856873) {
    // alert('Check in');
  } else {
    // alert('Wrong passport');
  }
};

checkIn(flight, jonas); //the flight is a primitive value with its address set to LH234 and its address cannot be changed bc it is immutable so it stayed LH234 and not LH999. However jonas is an object using the heap which does get addresses changed when reassignments happen which is why the edits to the passenger name took place adding the Mr.
console.log(flight);
console.log(jonas);

//passing primitives to functions are the same as making copies outside the function but when objecxts are passed its like copying the object so whatever is changed in the copy will be changed in the original as well

//Objects behaving this way when passed into functions can have unforseen consquences in large code bases

//lets write another function to see hwat CAN happen for real life prep

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000);
};

newPassport(jonas); //Gives wrong passport. two functions are manipulating the same object which creates the problem. In the new function gets the object the function manipulates that onbject which then gets reflected into jonas which when passed into the chck in function is now no longer the same as the original
checkIn(flight, jonas);

//Two terms when dealing with functions are passing by value and passing by reference

//JS does not have passing by reference only passing by value even tho it may look otherwise. We can pass a reference to a function but we do not pass by reference

//For objects we do pass a reference which is the memory address but that reference is a value which contains an address

//New section - first class and higher order functions

//first class functions enables us to write higher order functions - functions are first citizens which are treated as values. Just another type of object.

//Why does JS work this way? Bc functions just objects and objects are values so functions are values too

//since functions are values there are many things we can do with them like storing them into like storing them in variables or object properties

//So we can STORE functions in variables or properties and we can also PASS functions as arguments into other functions

//We can also return a function from another function

//Bc functions are objects they have methods. So we have methods we can call on other functions. EX is the bind() method

//First class functions makes possible to use and write higher order functions which either recieves another function as an argument or it reutnrs a new function

//the function that gets passed into the parent function is aka the call back function. This function is called later by the higher order function when the higher order function is called. The callback function waits for the higher order function to operate

//first class functions and higher order functions are not the same thing

//Again, 1st class are values treated like a type of object which can be stored into variables or properties or passed into other functions or called on functions as methods

//Higher order fujctions are functions that receives another function as an argument or that returns a new function, or both

//1st class functions are a feature that a language has or doesnt have. It just means the functions are values - it is a concept

//higher order functions are possible only if the language supports first class functions

//New section - functions accepting callback functions
//We will create our own higher order functions to demo how they work. This function will accept other functions as an input. first we do two simple functions to edit strings

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
}; //These two functions will be alter passed into our higher order function

//Now we can create our higher order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  //taking in a function makes it higher order
  console.log(`Transofmred string ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`); //.name is a methods can be used on any function
};

transformer('Java script is the best', upperFirstWord); //We are only passing in the function value. We are not calling the function () just passing it in.

transformer('java is the best', oneWord); //This used our first function

//Okay, explain - we call the transform function and pass in the call back function (upperFirstWord & oneWord) bc we do not call them ourselves. Java script tells them later. Calling them later happens on line 132 with fb(str).

//The transformer function calls the call back functions

//EX
const high5 = function () {
  console.log('🐱‍🐉');
};

document.body.addEventListener('click', high5); //We pass in a callback function (high5) and addeventlistener is the higher order function. So in the example above the higher order function is the transformer function because it is calling the other callback functions

['Jonas', 'Martha', 'Adam'].forEach(high5);

//Why does JS use callback functions so often? 1st advantage is makes easy to split up code into resuable and interconnected parts - lots of functionality split into seperate functions

//Second and better is fact callback functions allow us to create abstraction

//abstraction means to hide the details of code implementation bc we dont care about the code detail which allows us to think of problems at a higher more abstract level

//So with out example our transformer function does not care about how the string is transformed. It does not care about that level of detail. It wants to change the string but does not care how

//So we could have taken the code and wirrten it directly INTO transformer but instead we abstracted the code away into other functions creating a new layer of abstraction so that our main transformer function is only concenred with transforming the string but not how it works which it delegates to the other lower level functions

//thus higher-order functions bc they iperate at a higher level of abstraction leaving the lower level details to lower functions VERY IMPORTANT IDEAS HERE IN WHOLE COURSE -- callback functions are vital part of JS language! they allow us to create the higher order function logic

//Callback functions useful for telling higher order functions what to do ---- addeventlisterner would have no idea what to do when click event happens without a callback function to tell it what to do.

//New section - functions returning functions

//create function to return a new function

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('hey'); //Now greeterHey is a function (function(name){console.log(`${greeting} ${name});}) --- this means we can call the greeter function like anyother function we defined

greeterHey('jonas');
greeterHey('jejfskd');

//closures are a mechanism we will talk about later but our first function greet returned a new function that we stroed into greeterHey which we can then call

//Can also call in one go
greet('Hello')('Jonas'); //Since greet is a function we can immediately call it which we do with jonas which is the argument of the function

const greetArr = greeting => name => console.log(`${greeting} ${name}`);
greetArr('Hi')('Tom');

//New section - the call and apply methods
//How we can set the this keyword manually and why we would do that

//example airline

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  //book: function(){}
  book(flightNum, name) {
    console.log(
      `${name} booked a set on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}, ${name}` });
  },
};

lufthansa.book(239, 'Jonas Sched');
lufthansa.book(212, 'Jon bes');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
}; //If we want to have the same abilities of booking for the new airiline we could C&P over the book function but we will not. Instead we will make an external function that can be reused for all different airlines

const book = lufthansa.book; //Possible bc JS has 1st class functions. So we can take the book function value and store it in a new variable, book.

// book(23, 'sam'); //gives undeined bc this book function is just a regular function call and in a regular function call the this word points to undefined. So this book function that we called is not longer the method that is inside the lufthansa object. It is just a function and so the this keyword points to undefined.

//This keyword depends on how the function is called. So how do we fix this issue above? To create a new booking on the eurowings airline? Or lufthansa?

//Have to tell JS WHAT the keyword should be like. So if we want to book a LUF flight then this should poiont there but if we want to book a euro flight it should point to euro

//So how? How to tell JS what the this keyword should look like?

//3 function methods can do that - call, apply and bind.

book.call(eurowings, 24, 'sara williams'); //first argument is exactly what we want the this keyword to point to.
console.log(eurowings); //the call method calls the book function with the this keyword set to eurowings. all the arguments after the first one are arguments from the original function

book.call(lufthansa, 542, 'MAry robbins');
console.log(lufthansa); //This time this keyword set to luftansa so now this is set to that object while before this was set to the eurowings object

const swiss = {
  airline: 'Swiss Air',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 543, 'anchor man');
console.log(swiss);

//Another method similar to call is the apply method which does preety much same excpet that apply DOES NOT recieve a list of arguments after this keyword. Instead it takes an array of the arguments. Takes the elements of the array and passes them into the function

//Apply method EX
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData); //first argument is the object second is the target array
console.log(swiss); //apply not used often bc we have better way of doing same thing

book.call(swiss, ...flightData); //This is the easier method. Arguments in the array get spread out

//THIS IS TO DEFINE THIS KEYWORD but still another method called bind coming up next

//new section - the bind method
//bind allows us to manually set the this keyword for any function call but bind doesnt immediately call the function it just returns a new function where the this keyword is bound so it is set to whatever value we pass into bind

//continuie airline example and now we need to use book function for eurowings all the time. We use to use book.call to use the book function with eurowings set to this keyword but now we will use the bind method to create a new function with the this ketyword also set to eurowings

const bookEW = book.bind(eurowings); //this returns a new function where this keyword is always set to eurowings
bookEW(23, 'Steven Williams'); //now we use the function and this function already has the this keyword set

//we could create one booking function for each airline
const bookLH = book.bind(lufthansa); //Now can call it
const bookLX = book.bind(swiss); //now can call it

//In call method we can pass multiple arguments besides this keyword. same with bind and all arguments will be defined and the functions always called with those same arguments - like a bind for one specific ariline and flight number

const bookEW23 = book.bind(eurowings, 23); //this lets us set in stone certain arguments - this one sets the book method inside of the lufthasa object flight number to 23 - it hard codes it in
bookEW23('Sam patts');
bookEW23('letty boo'); //just have to pass in name and all else happens auto - going further we could define the passenger name too but that would be impractical

//sopecifying parts of the arguments before hand is called PARTIAL APPLICATION which means part of the arguments of the original function are already applied/set which is what the vookEW23 is - essentially the book function but with 23 already predefined

//Other situations to use bind method ---1 example is using objects with event listeners - now the buttons come into play

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++; //this is to eventually add a new plane when we click the buy ne wplane button
  console.log(this.planes);
};
document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane); //this will run the above function to increase the planes by one upon button clicks
//this gives NaN because the this keyword is set to the button element because in an event handler function the this keyword always points to the element in which the handler is attached. This handler function is attached to the element(button) so inside this function the this keyword points to the button element which gives NaN

//in this handler function we still need the this keyword to point to the luftansa object and not the button so we need to manually define the this keyword ---how? we use bind because bind returns a new function which lets us set the this keyword to the object we want (luftansa)
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); //now the button click works!

//bind method important to understand.

//partial application and use case for bind method example --many times in partial application not interested in this key word -- it means we can preset parameters. Let us do examlpe of function that adds tax to some value

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200)); //general function for adding tax but one tax we use all the time so lets make fdunction for that specific tax like a VAT tax in portugal

//we can use bind method on that function to always set the rate to 23 so the function always caluclates the vat for that percantage

const addVAT = addTax.bind(null, 0.23); //first argument is this keyword in bind but this case we dont care about it so we use null - nothing will happen with it. Now the rate value is set in stone

console.log(addVAT(23)); //Now this works! remember order of arguments is important - for example to preset the rate has to be first argument in the function otherwise it wont work

//this created a brand new more specific function based on a more general function - using bind gives us a new function so it is as if we returned a new specific function from the add tax function

//challenge - rewrite the example above using the example of one function returning another function. Create a function that can return another function that can do what the one above did. -- Dont use BIND! use technique from the greet function from earlier

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTaxRate(0.23);

//CODING CHALLENGE - Building a poll app

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  //start awnser now
  registerNewAnswer() {
    //Get the answer from the user
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(write option number)`
      )
    );
    console.log(answer);

    //register the answer and update and check if value is # and sensible
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;

    this.displayResults();
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`poll results are ${this.answers.join(',', ' ')}`);
    }
  },
};
// poll.registerNewAnswer();

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

//create display results method

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');

//New section - Immediately invoked function expressions (IIFE) - Sometimes we need functions that only get ran once and then disappear and do not run again - Async/Await  -- how could we do this? Create a function and only run it once

const runOnce = function () {
  console.log(`no run more`);
};

runOnce(); //this can be ran anytimr you call it but we dont want this we want to run a function immediately and not even have to save it anywhere

// function() {
//     console.log(`This will never run again`); //gives error bc JS expects a function statement bc we started the statement with a function keyword but we can trick JS by using ()
// }

(function () {
  console.log(`This will never run again!`); //This function did not execute but we can call it like this
});

(function () {
  console.log(`this works!`);
  //   const isPrivate = 23;
})(); //this one works~! this is an IIFE

// console.log(isPrivate); scope does not pick up

(() => console.log(`this works too~!`))(); //another IIFE using =>

//Why was this invented? Functions create scopes and one scope does not have access to scopes from inner scopes - cant reach down, only up.

//All data defined in  a scope is private data - it is encapsulated. data encapsulation and privacy are VERY IMORTANT for privacy ---- we need to protect our variables by being overwritten other parts of program or external scripts/libraries --- these concepts to come! Important to hide variables though and scope is a good tool for this

//THIS IS WHY IIFE (immediate invoked function expressions) WERE INVENTED

//What else creates a scope in Es6? Variables decalred with let or const

{
  const isPrivate = 23;
}
// console.log(isPrivate); cant access it because declared with const but var would work

//IIFE not used so much anymore now we just can create blocks so dont need to make a function to create a new scope

//New section -- Closures

//the hardest concept to understand arguably - closures bring a lot together. Lets see what they are about

const secureBooking = function () {
  //secure bc passenger count cant be accessed from outside
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
}; //This is the function that will create the closure. Closure is not a feature that we explicity use - manually - like we do arrays or functions. Closures happen auto in certain situations - we just need to know when. We will create one of those situations so we can look at closure

//We will return the results of the above function to a variable
const booker = secureBooking(); //So we call secure booking which calls a new function which returns a new function that gets stored inside booker. So booker is now a function as well

//secureBooking returns a new function which gets stored in booker

//What happens when const booker = secureBooking(); is exceuted?
//Before we run secure booking we are in global execution context and only secure booking is there - the global scope contains secure booking. When secure booking is executed a new execution context is placed on the stack. Each context contains a variable enviornment with all its local variables, this one just has passengerCount = 0;

//This variable enviornment is also the scope of the function so the scope chain is in effect. In the next line of secure booking function a new function is returned and it will be stored in the booker variable. So the global context now has the booker variable. When the secureBooking function returns its execution contect (EC) pops off the stack and disappears - it is finished the job and execution and is gone

//lets now use the function and see the closure in action
booker();
booker();
booker();
//the booker function was able to increment the passenger count. But how?

//How can booker function update passener count variable in secure booking function that has already finished executing? Its EC is no longer on the stack but still the inner function is able to access the passenger count variable inside the booker function that shouldnt exist

//Closure makes this possible.

//This booker function is afunction that exist in the global scope and the enviornment in which the function is created is no longer active - it is gone - but still the booker function still continues to have access to the variables that were present when the function was created (passenger count)

//A closure makes a function remember all the variables that existed at a functions birthplace --- so secureBooking was the birthplace of the booker function and the function remembers everything about its birthplace

//How does it actually work? when booker() is called a new EC gets put on the callstack but it is empty bc no variables to decalre. Since it is in the global context it is a child scope of the global scope - how would the booker function access passenger count when it is not inside its scope chain?

//Secret is that any function always has access to the variable enviornment of the excution context in whcich the function was created - in the case of booker booker was born in the EC of secure booking which popped off the stack previously but the booker function will still have access to that variable envirnment - this is how the function can read and manipulate the variable ---- this connection is what is known as closure

//Functions always have access to variable enviornment of the EC in which is was created even when it is gone. So passenger count is basically attached to booker even though we dont see it bc booker was born from the secure booking function

//The booker function has access to the passenger count variable bc it is defined in the scope in which the booker function was created so the scope is preserved even though it has been destryoed bc the EC is off the stack - so even though the EC has been destryoed the variable enviornment continues living somewhere in the engine

//Now the attached variable enviornment stays with the function forever. Closure never closes. Thanks to closure a function does not lose access to variables that existed at the functions birthplace

//Now what happens with execution of booking function? It attempts to increae passenger count even tho variable is not in the current scope so JS will look into the closure and see if it can find the variable there

//it does this before looking at scope chain.

//EX - if global passenger count variable set to 10, it would still use the one in the closure meaning clusure has priority in the scope chain so after running the function the passenger count becomesd 1 and the EC pops off the stack and then execution moves to the next line and we get a new EC and the closure is still there, still attached to the function and the value is still 1

//Now the function executes and increases the count to 2 - that is what closures are and how they work behind the scenes

//Some more definitions - A closure is the closed-over variable enivornment of the execution context in which a function was created even after that EC is gone - the closure gives the function access to all the variables of the parent function - even when the outer scope is gone - so the scope chain is preserved throughout time

//Closoure makes sure a function never looses connection to variables that existed at the functions birthplace

//we dont make closures manually - it is automatic - we cant access closed over variables bc closures are not tangibles - we cant reach in and take out variables - impossible - we can observe a closure happens bc the function magically has access to variables that shouldnt exist but we cannot access the variables

//We can look into the closure
console.dir(booker); //gives us anoynymous where we can see the closures in scopes

//New section -- more closure examples
//two more situations where closures appear - both examples demo that we dont have to return a function from another function in order to create a closure

let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g(); //the result of this function is a = 23 and that f becomes that function so after g we can call f
f();
//we get 46 which is 23*2 which proves the f value really does close over any variables of the EC in which it was defined even when the variable itself was not even defined inside the variable enviornment. f was defined in the global scope but as we assigned it inside the g function it still closed over the variable enviormnment of the g function and that includes the a variable which it can access even after the g function has finished execution.

//So at the point we run f() the variable enviornment of g() is no longer there but f() closed over that variable eniornment so it is able to access the a variable.

//next level create a new function h and see what happens when we assigned th f value a 2nd function

//So calling g assignes to our empty variable the f function

//if we cann h after f then the f vaariable will be assigned again
h();
f(); //gives us 1554 which proves the f function resassigned also closed over the variable assignment of h. So it gets access to last variable enivornment in which it existed. So when we reassign the function to a new value the old clusure disappears.

//Closure can change as variable is reassigned so closure makes sure function does not lose connection to variables present at birth  place - in this case the function was born in g first and then REBORN in h so it first contained the a variable of its first birthplace but then after being reborn it remember the b variable and forgot a

//Example 2 for closures -
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

boardPassengers(180, 3); //So, when we call this function the variable perGroup will be created. Then set timeout will be called and it will register the call back function which is called after 3 seconds. also Clog is called and will not wait 3 seconds -- what happens to n and pergroup variable? -- the call back function was run indendent of the board passengers function but still the call back function was able to use all the variables in the variable enviornment in which it was created which is n and pergroup - this is a clear sign of closure

//The only way the call back function can have access to the board passenger function which has already executed is if created a closure. The closure also includes the arguments as well from the EC it was born in

//EX to show that closure has priority in scope chain
const perGroup = 1000;
boardPassengers(180, 3); //If scope chain had priority over the closure then the callback function would use 1000 which is a global variable.

//CODING CHALLENGE
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})(); //Why did this work? how does the call back function get access to the header function? Due to closure. By the time the 2nd call back is executed the IFFE is gone already and with it the header variable. Still though the 2nd function is attached to the body element and so it is waiting for events to happen there and when it does the function executres and even though the environemnt in which this function is gone it still has access to the variables that were created in that variable by the time that function was born.
