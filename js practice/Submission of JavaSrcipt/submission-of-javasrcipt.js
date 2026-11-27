// Q1. Personalized Login Greeting
let userName = "Gautam kumar";
let currentHour = new Date().getHours();

if (currentHour < 12) {
    console.log(`Good Morning ${userName}!`);
} else if (currentHour <= 17) {
    console.log(`Good Afternoon ${userName}!`);
} else {
    console.log(`Good Evening ${userName}!`);
}


// Q2. Multi-Type Data Summary
let name = "Gautam kumar";
let age = 20;
let isStudent = true;
let hobbies = ["Coding", "Gaming"];
let user = { city: "Mathura" };
let data = null;
let value;

console.table([
    { Label: "Name", Value: name, Type: typeof name },
    { Label: "Age", Value: age, Type: typeof age },
    { Label: "Student", Value: isStudent, Type: typeof isStudent },
    {
        Label: "Hobbies",
        Value: hobbies,
        Type: Array.isArray(hobbies) ? "array" : typeof hobbies
    },
    { Label: "User", Value: user, Type: typeof user },
    { Label: "Data", Value: data, Type: "null" },
    { Label: "Value", Value: value, Type: typeof value }
]);


// Q3. Monthly Expense Tracker
let expenses = [5000, 1500, 8000, 2000, 1000];
let total = 0;

for (let expense of expenses) {
    total += expense;
}

let average = total / expenses.length;
let tax = total * 0.10;
let finalAmount = total;
finalAmount += tax;

console.log(`Total Expenses: ₹${total.toFixed(2)}`);
console.log(`Average Expenses: ₹${average.toFixed(2)}`);
console.log(`Tax (10%): ₹${tax.toFixed(2)}`);
console.log(`Final Amount: ₹${finalAmount.toFixed(2)}`);


// Q4. Academic Performance Evaluator
let marks = [90, 85, 88, 78, 92];
let marksTotal = 0;

for (let mark of marks) {
    marksTotal += mark;
}

let marksAverage = marksTotal / marks.length;
let percentage = (marksTotal / (marks.length * 100)) * 100;

console.log(`Average: ${marksAverage.toFixed(2)}`);
console.log(`Percentage: ${percentage.toFixed(2)}%`);

if (marks.some(mark => mark < 35)) {
    console.log("Detained");
} else if (percentage >= 85) {
    console.log("Promoted with Distinction");
} else if (percentage >= 50) {
    console.log("Promoted");
} else {
    console.log("Detained");
}


// Q5. Weather Activity Planner
let temperature = 25;
let isRaining = false;
let windSpeed = 10;

if (isRaining) {
    console.log("Stay indoors with hot coffee.");
} else if (temperature > 35) {
    console.log("Go swimming.");
} else if (temperature < 15 && windSpeed > 20) {
    console.log("Too cold and windy — stay home.");
} else {
    console.log("Perfect day for a walk.");
}


// Q6. Progressive Discount System
let purchaseTotal = 7500;
let discount = 0;

if (purchaseTotal >= 10000) {
    discount = 25;
} else if (purchaseTotal >= 5000) {
    discount = 15;
} else if (purchaseTotal >= 2000) {
    discount = 5;
}

let discountAmount = purchaseTotal * discount / 100;
let finalPrice = Math.round(purchaseTotal - discountAmount);

console.log(`Original Total: ₹${purchaseTotal}`);
console.log(`Discount: ${discount}%`);
console.log(`Final Price: ₹${finalPrice}`);


// Q7. Smart Guessing Game
let secretNumber = Math.floor(Math.random() * 50) + 1;
let userGuess = 25;

console.log(`Secret Number: ${secretNumber}`);
console.log(`Your Guess: ${userGuess}`);

if (userGuess === secretNumber) {
    console.log("Correct guess!");
} else {
    if (Math.abs(userGuess - secretNumber) <= 3) {
        console.log("Very close!");
    } else if (userGuess > secretNumber) {
        console.log("Too high");
    } else {
        console.log("Too low");
    }
}


// Q8. Employee Salary Projection
let salary = 40000;
let incrementRate = 10;
let salaryProjection = [];

for (let year = 1; year <= 5; year++) {
    salary *= (1 + incrementRate / 100);
    salary = Math.round(salary);

    salaryProjection.push({
        Year: year,
        Salary: `₹${salary.toLocaleString("en-IN")}`
    });
}

console.table(salaryProjection);


// Q9. Random Math Quiz Generator
let num1 = Math.floor(Math.random() * 20) + 1;
let num2 = Math.floor(Math.random() * 20) + 1;

let operators = ["+", "-", "*", "/"];
let operator = operators[
    Math.floor(Math.random() * operators.length)
];

let answer;

switch (operator) {
    case "+":
        answer = num1 + num2;
        break;

    case "-":
        answer = num1 - num2;
        break;

    case "*":
        answer = num1 * num2;
        break;

    case "/":
        answer = num1 / num2;
        break;
}

console.log(`Question: ${num1} ${operator} ${num2} = ?`);

if (operator === "/") {
    console.log(`Correct Answer: ${answer.toFixed(2)}`);
} else {
    console.log(`Correct Answer: ${answer}`);
}


// Q10. Citizen Eligibility Validator
let citizenAge = 20;
let isCitizen = true;

if (isCitizen) {
    if (citizenAge >= 21) {
        console.log("Eligible for all services.");
    } else if (citizenAge >= 18 && citizenAge <= 20) {
        console.log("Eligible to vote only.");
    } else {
        console.log("Not eligible yet.");
    }
} else {
    if (citizenAge >= 18) {
        console.log("Only age criteria met.");
    } else {
        console.log("Not eligible yet.");
    }
}