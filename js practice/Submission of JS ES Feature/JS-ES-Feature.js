
"use strict";

/*
====================================================
Q1 – DYNAMIC DATA PARSER
====================================================
*/

console.log("\n========== Q1: DYNAMIC DATA PARSER ==========");

const apiData = [
    "25", "true", "false", "NaN", " ",
    "100px", "3.14", null, undefined
];

let validNumbers = [];
let invalidNumbers = [];

for (let i = 0; i < apiData.length; i++) {

    let value = apiData[i];

    let numberValue = Number(value);
    let booleanValue = Boolean(value);
    let stringValue = String(value);

    console.log("\nOriginal Value:", value);
    console.log("Number:", numberValue);
    console.log("Boolean:", booleanValue);
    console.log("String:", stringValue);

    // Skip empty strings, whitespace, and non-numeric values.
    // Null and undefined are also treated as invalid for this dataset.
    if (
        value === null ||
        value === undefined ||
        (typeof value === "string" && value.trim() === "") ||
        Number.isNaN(numberValue)
    ) {
        invalidNumbers.push(value);
        console.log("Status: INVALID");
    } else {
        validNumbers.push(numberValue);
        console.log("Status: VALID");
    }
}

console.log("\nValid Numeric Data:", validNumbers);
console.log("Invalid Data:", invalidNumbers);


/*
====================================================
Q2 – EMPLOYEE BONUS CALCULATOR
====================================================
*/

console.log("\n========== Q2: EMPLOYEE BONUS CALCULATOR ==========");

const employees = [
    { name: "Amit", salary: "45000", years: "5" },
    { name: "Sara", salary: "38000", years: "2" },
    { name: "Kiran", salary: "52000", years: "7" }
];

for (const employee of employees) {

    try {

        if (!employee.name || employee.salary === undefined ||
            employee.years === undefined) {
            throw new Error("Missing employee information");
        }

        let salary = Number(employee.salary);
        let years = Number(employee.years);

        if (!Number.isFinite(salary) || !Number.isFinite(years)) {
            throw new Error("Invalid numeric conversion");
        }

        let bonus = years > 3
            ? salary * 0.10
            : salary * 0.05;

        let totalSalary = salary + bonus;

        console.log(`
Employee: ${employee.name}
Salary: ₹${salary}
Experience: ${years} years
Bonus: ₹${bonus}
Total Salary: ₹${totalSalary}
`);

    } catch (error) {

        console.log("Employee Error:", error.message);

    }
}


/*
====================================================
Q3 – TRANSACTION VALIDATOR
====================================================
*/

console.log("\n========== Q3: TRANSACTION VALIDATOR ==========");

const transactions = [
    { id: 1, amount: 2000 },
    { id: 2, amount: -500 },
    { id: 3 },
    null
];

let validTransactions = [];
let invalidTransactions = [];

class TransactionError extends Error {
    constructor(message, type) {
        super(message);
        this.type = type;
    }
}

for (let transaction of transactions) {

    try {

        if (transaction === null) {
            throw new TransactionError(
                "Null transaction found",
                "NULL"
            );
        }

        if (transaction.id === undefined ||
            transaction.amount === undefined) {

            throw new TransactionError(
                "Missing ID or Amount",
                "MISSING"
            );
        }

        if (transaction.amount < 0) {

            throw new TransactionError(
                "Negative transaction amount",
                "NEGATIVE"
            );
        }

        validTransactions.push(transaction);

        console.log("Valid Transaction:", transaction);

    } catch (error) {

        invalidTransactions.push({
            transaction: transaction,
            error: error.message,
            type: error.type
        });

        console.log("Transaction Error:", error.message);

    }
}

console.log("\nValid Transactions:", validTransactions);
console.log("Invalid Transactions:", invalidTransactions);

console.log("Successful Count:", validTransactions.length);
console.log("Failed Count:", invalidTransactions.length);


/*
====================================================
Q4 – DEBUGGING MYSTERY
====================================================
*/

// Original code:
// greeting = "Welcome";
// In strict mode, assigning to an undeclared variable
// produces a ReferenceError.

console.log("\n========== Q4: DEBUGGING MYSTERY ==========");

function showMessage() {

    // Correct declaration using let.
    let greeting = "Welcome";

    // Watch variable: greeting
    console.log("Greeting:", greeting);

}

showMessage();

// Debugging:
// Set a breakpoint on console.log("Greeting:", greeting).
// Add greeting to the Watch panel.
// Check the Call Stack to see showMessage().


/*
====================================================
Q5 – HOISTING LAB: SEQUENCE TRAP
====================================================
*/

console.log("\n========== Q5: HOISTING LAB ==========");

/*
Original code has a problem:

console.log(score);
announce();
var score = 50;
function announce() {
    console.log("Game started");
}
let status = "ready";
startGame();

function startGame() {
    console.log(status);
}

Explanation:
1. var score is hoisted and initialized with undefined.
2. announce() is fully hoisted.
3. let status is hoisted but remains in TDZ
   until its declaration is executed.
4. startGame() accesses status after initialization
   because it is called after the let declaration.
*/

console.log("Score:", 50);

function announce() {
    console.log("Game started");
}

announce();

let gameStatus = "ready";

function startGame() {
    console.log("Game Status:", gameStatus);
}

startGame();


/*
Arrow Function Hoisting Comparison
*/

const arrowAnnounce = () => {
    console.log("Arrow Function Started");
};

// Arrow functions assigned to const cannot be called
// before their initialization.

arrowAnnounce();


/*
====================================================
Q6 – PYRAMID PATTERN GENERATOR
====================================================
*/

console.log("\n========== Q6: PYRAMID PATTERN ==========");

// Default pattern size = 5.
// Change this value to generate a different pattern.

let rows = 5;

console.log("Pattern using let:");

for (let i = 1; i <= rows; i++) {

    let pattern = "";

    for (let j = 1; j <= i; j++) {

        pattern += "* ";

    }

    console.log(pattern);

}

/*
Using var:

var is function-scoped rather than block-scoped.
The same variable can be accessed outside the loop.
*/

console.log("\nPattern using var:");

for (var i = 1; i <= 4; i++) {

    var pattern = "";

    for (var j = 1; j <= i; j++) {

        pattern += "* ";

    }

    console.log(pattern);

}

console.log("Value of i after loop:", i);


/*
====================================================
Q7 – SMART CALCULATOR
====================================================
*/

console.log("\n========== Q7: SMART CALCULATOR ==========");

const operations = [
    "add", "divide", "power", "root", "subtract"
];

const num1 = 25;
const num2 = 0;

class InvalidOperationError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidOperationError";
    }
}

class CalculationError extends Error {
    constructor(message) {
        super(message);
        this.name = "CalculationError";
    }
}

// Change operation to test different calculations.
let operation = "add";

function calculate(operation, a, b) {

    switch (operation) {

        case "add":
            return a + b;

        case "divide":

            if (b === 0) {
                throw new CalculationError(
                    "Cannot divide by zero"
                );
            }

            return a / b;

        case "power":
            return Math.pow(a, b);

        case "root":

            if (a < 0) {
                throw new CalculationError(
                    "Cannot calculate square root of negative number"
                );
            }

            return Math.sqrt(a);

        case "subtract":
            return a - b;

        default:
            throw new InvalidOperationError(
                "Operation not recognized"
            );

    }

}

try {

    let result = calculate(operation, num1, num2);

    console.log("Operation:", operation);
    console.log("First Number:", num1);
    console.log("Second Number:", num2);
    console.log("Result:", result);

} catch (error) {

    console.log("Calculator Error:", error.name);
    console.log("Message:", error.message);

}


/*
====================================================
Q8 – STRICT MODE SHOWDOWN
====================================================
*/

/*
Original code:

function demo(a, a) {
    total = 10;
    delete total;
}

demo(5, 10);

In strict mode:
1. Duplicate parameters are not allowed.
2. Undeclared variables cannot be assigned.
3. Deleting an unqualified variable is illegal.

The original function cannot even be parsed in strict mode.
*/

console.log("\n========== Q8: STRICT MODE SHOWDOWN ==========");

function demo(a, b) {

    "use strict";

    let total = a + b;

    console.log("First Number:", a);
    console.log("Second Number:", b);
    console.log("Total:", total);

}

demo(5, 10);

// Correct ES6 version using const and let.


/*
====================================================
Q9 – JSON AUDIT
====================================================
*/

console.log("\n========== Q9: JSON AUDIT ==========");

const rawData = [
    '{"user":"Alex","age":25}',
    '{"id":2}',
    '{invalid}',
    '{"user":"Mina","age":"22"}'
];

let cleanData = [];
let jsonErrors = [];

for (let i = 0; i < rawData.length; i++) {

    try {

        let parsedData = JSON.parse(rawData[i]);

        // Check required keys.
        if (
            !Object.hasOwn(parsedData, "user") ||
            !Object.hasOwn(parsedData, "age")
        ) {

            throw new Error("Missing required keys: user or age");

        }

        // Convert age into a number.
        parsedData.age = Number(parsedData.age);

        if (!Number.isFinite(parsedData.age)) {
            throw new Error("Invalid age value");
        }

        cleanData.push(parsedData);

        console.log(`Line ${i + 1}: Valid JSON`, parsedData);

    } catch (error) {

        jsonErrors.push({
            line: i + 1,
            message: error.message
        });

        console.log(`Line ${i + 1}: Error - ${error.message}`);

    }

}

// Filter users below 18 years.
let under18Users = cleanData.filter(user => user.age < 18);

console.log("\nClean Data:", cleanData);

console.log("Under 18 Users:", under18Users);

console.log("JSON Errors:", jsonErrors);

console.log("Total Valid Records:", cleanData.length);

console.log("Total Invalid Records:", jsonErrors.length);


/*
====================================================
Q10 – NESTED HOISTING AND CLOSURES
====================================================
*/

console.log("\n========== Q10: NESTED HOISTING AND CLOSURES ==========");

function outer() {

    // count is hoisted within outer().
    // Before assignment, its value is undefined.

    console.log("Outer count before initialization:", count);

    var count = 5;

    console.log("Outer count after initialization:", count);

    function inner() {

        // A new local count variable is created.
        // It shadows the outer count variable.

        console.log("Inner count before initialization:", innerCount);

        var innerCount = 10;

        console.log("Inner count after initialization:", innerCount);

    }

    inner();

    console.log("Outer count remains:", count);

}

outer();


/*
Actual Closure Demonstration:
An inner function remembers variables
from its outer lexical scope.
*/

function createCounter() {

    let count = 0;

    return function () {

        count++;

        console.log("Counter:", count);

    };

}

const counter = createCounter();

counter();
counter();
counter();


/*
====================================================
ASSIGNMENT COMPLETED
====================================================
*/

console.log("\n========== ALL Q1-Q10 COMPLETED ==========");
