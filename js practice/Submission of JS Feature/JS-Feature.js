
"use strict";

/*
====================================================
Q1. CALLBACK FUNCTION
====================================================

A callback is a function passed as an argument
to another function and executed later.
*/

console.log("\n========== Q1: CALLBACK FUNCTION ==========");

function showEndMessage() {
    console.log("Welcome to the course!");
}

function greetUser(name, callback) {

    console.log("Hello " + name);

    // Execute the callback function.
    callback();
}

// Calling the function.
greetUser("Gautam", showEndMessage);


/*
====================================================
Q2. HIGHER ORDER FUNCTION
====================================================

A higher-order function accepts another function
as an argument or returns a function.
*/

console.log("\n========== Q2: APPLY OPERATION ==========");

function applyOperation(numbers, operation) {

    let result = [];

    for (let number of numbers) {
        result.push(operation(number));
    }

    return result;
}

const numbers = [1, 2, 3, 4];

// Double each number.
const doubledNumbers = applyOperation(numbers, function(num) {
    return num * 2;
});

// Square each number.
const squaredNumbers = applyOperation(numbers, function(num) {
    return num * num;
});

console.log("Original Array:", numbers);
console.log("Doubled Array:", doubledNumbers);
console.log("Squared Array:", squaredNumbers);


/*
====================================================
Q3. ARROW FUNCTION VS NORMAL FUNCTION
====================================================

Arrow functions do not have their own 'this'.
They use this from their surrounding scope.
*/

console.log("\n========== Q3: ARROW FUNCTION VS NORMAL FUNCTION ==========");

const user = {

    name: "Gautam",

    // Arrow function does not get this from user object.
    showName: () => {
        console.log("Arrow Function Name:", this.name);
    }

};

user.showName();

// Correct method using a normal function.
const user2 = {

    name: "Gautam",

    showName: function() {
        console.log("Normal Function Name:", this.name);
    }

};

user2.showName();


/*
====================================================
Q4. CONSTRUCTOR FUNCTION AND PROTOTYPE
====================================================

Prototype allows multiple objects to share
the same method instead of creating separate copies.
*/

console.log("\n========== Q4: CAR PROTOTYPE ==========");

function Car(brand, model) {

    this.brand = brand;
    this.model = model;

}

// Adding method to prototype.
Car.prototype.getDetails = function() {

    console.log(
        "Car Brand: " + this.brand +
        ", Model: " + this.model
    );

};

// Creating two objects.
const car1 = new Car("Toyota", "Fortuner");
const car2 = new Car("Mahindra", "Thar");

// Calling shared prototype method.
car1.getDetails();
car2.getDetails();

// Both objects share the same method.
console.log(
    "Method Shared:",
    car1.getDetails === car2.getDetails
);


/*
====================================================
Q5. PERSON AND STUDENT INHERITANCE
====================================================

Student inherits properties and methods from Person.
*/

console.log("\n========== Q5: PERSON AND STUDENT ==========");

function Person(name) {

    this.name = name;

}

// Person prototype method.
Person.prototype.showPerson = function() {

    console.log("Name:", this.name);

};


function Student(name, branch) {

    // Call Person constructor.
    Person.call(this, name);

    this.branch = branch;

}

// Establish prototype inheritance.
Student.prototype = Object.create(Person.prototype);

// Restore constructor reference.
Student.prototype.constructor = Student;

// Student prototype method.
Student.prototype.showStudent = function() {

    console.log("Branch:", this.branch);

};

// Create Student object.
const student1 = new Student("Gautam", "Computer Science");

// Access both methods.
student1.showPerson();
student1.showStudent();

// Check prototype chain.
console.log(
    "Student inherits Person:",
    student1 instanceof Person
);

console.log(
    "Student is a Student:",
    student1 instanceof Student
);


/*
====================================================
Q6. PERSON → FACULTY → PROFESSOR
====================================================

Multilevel inheritance using constructor functions.
*/

console.log("\n========== Q6: MULTILEVEL INHERITANCE ==========");

// Parent constructor.
function PersonDetails(name) {

    this.name = name;

}

PersonDetails.prototype.showPersonDetails = function() {

    console.log("Person Name:", this.name);

};


// Child constructor.
function Faculty(name, department) {

    PersonDetails.call(this, name);

    this.department = department;

}

Faculty.prototype = Object.create(PersonDetails.prototype);
Faculty.prototype.constructor = Faculty;

Faculty.prototype.showFaculty = function() {

    console.log("Department:", this.department);

};


// Grandchild constructor.
function Professor(name, department, subject) {

    Faculty.call(this, name, department);

    this.subject = subject;

}

Professor.prototype = Object.create(Faculty.prototype);
Professor.prototype.constructor = Professor;

Professor.prototype.showProfessor = function() {

    console.log("Subject:", this.subject);

};


// Creating Professor object.
const professor1 = new Professor(
    "Rahul",
    "Computer Science",
    "JavaScript"
);

// Accessing all methods.
professor1.showPersonDetails();
professor1.showFaculty();
professor1.showProfessor();

// Checking inheritance.
console.log(
    "Person:", professor1 instanceof PersonDetails
);

console.log(
    "Faculty:", professor1 instanceof Faculty
);

console.log(
    "Professor:", professor1 instanceof Professor
);


/*
====================================================
Q7. CLOSURE AND MULTIPLIER
====================================================

A closure remembers variables from its outer function
even after the outer function has finished.
*/

console.log("\n========== Q7: CLOSURE ==========");

function makeMultiplier(multiplier) {

    // Inner function remembers multiplier.
    return function(number) {

        return number * multiplier;

    };

}

// Create multiplier functions.
const double = makeMultiplier(2);
const triple = makeMultiplier(3);
const quadruple = makeMultiplier(4);

// Calling returned functions.
console.log("Double of 5:", double(5));
console.log("Triple of 5:", triple(5));
console.log("Quadruple of 5:", quadruple(5));


/*
====================================================
Q8. CUSTOM ARRAY PROTOTYPE METHOD myMap()
====================================================

myMap() works similarly to the built-in map().
It creates and returns a new array.
*/

console.log("\n========== Q8: CUSTOM MYMAP ==========");

Array.prototype.myMap = function(callback) {

    let result = [];

    for (let i = 0; i < this.length; i++) {

        // Skip empty array positions like built-in map().
        if (i in this) {

            result[i] = callback(
                this[i],
                i,
                this
            );

        }

    }

    return result;

};

const originalArray = [1, 2, 3];

// Double each element.
const mappedArray = originalArray.myMap(function(num) {

    return num * 2;

});

console.log("Original Array:", originalArray);
console.log("MyMap Result:", mappedArray);

// Square each element.
const squareArray = originalArray.myMap(num => num * num);

console.log("Square Result:", squareArray);


/*
====================================================
Q9. ES6 CLASS INHERITANCE
====================================================

extends is used for inheritance.
super() calls the parent constructor.
*/

// Person class.
class PersonClass {

    constructor(name) {

        this.name = name;

    }

    showPerson() {

        console.log("Name:", this.name);

    }

}


// Student inherits PersonClass.
class StudentClass extends PersonClass {

    constructor(name, branch) {

        // Call parent constructor.
        super(name);

        this.branch = branch;

    }

    showStudent() {

        console.log("Branch:", this.branch);

    }

}


// Creating object.
const student2 = new StudentClass(
    "Gautam",
    "Computer Science"
);

// Calling inherited and own methods.
student2.showPerson();
student2.showStudent();

// Checking inheritance.
console.log(
    "Is Person:",
    student2 instanceof PersonClass
);

console.log(
    "Is Student:",
    student2 instanceof StudentClass
);


/*
====================================================
COMPARISON: PROTOTYPE VS ES6 CLASS
====================================================
*/

console.log("\n========== PROTOTYPE VS CLASS ==========");

// Prototype version.
const prototypeStudent = new Student(
    "Amit",
    "IT"
);

// Class version.
const classStudent = new StudentClass(
    "Amit",
    "IT"
);

console.log("\nPrototype Inheritance:");

prototypeStudent.showPerson();
prototypeStudent.showStudent();

console.log("\nES6 Class Inheritance:");

classStudent.showPerson();
classStudent.showStudent();


/*
====================================================
ASSIGNMENT COMPLETED
====================================================
*/

console.log("\n========== ALL Q1-Q9 COMPLETED ==========");
