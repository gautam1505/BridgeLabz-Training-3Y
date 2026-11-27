// ==========================================
// Q1. Scope Conflict Resolver
// ==========================================

console.log("\n========== Q1: Scope Conflict Resolver ==========");

var bonus = 5000; // Global variable

function calculateSalary(isPermanent) {
    let salary = 40000; // Local variable

    if (isPermanent === true) {
        salary = salary + bonus;
    }

    console.log("Permanent Employee:", isPermanent);
    console.log("Total Salary:", salary);
}

calculateSalary(true);
calculateSalary(false);

console.log("Global Bonus remains:", bonus);


// ==========================================
// Q2. String Manipulation Report
// ==========================================

console.log("\n========== Q2: String Manipulation Report ==========");

let productName = " wireless headphones PRO ";

let cleanedTitle = productName
    .trim()
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

cleanedTitle = cleanedTitle.replace("Pro", "Pro Edition");

console.log("Cleaned Title:", cleanedTitle);
console.log("Title Length:", cleanedTitle.length);


// ==========================================
// Q3. Math Utility Dashboard
// ==========================================

console.log("\n========== Q3: Math Utility Dashboard ==========");

let x = 16.75;

let roundedValue = Math.round(x);
let squareRoot = Math.sqrt(x);
let cube = Math.pow(x, 3);
let randomNumber = Math.floor(Math.random() * 41) + 10;

console.log(`
Number: ${x}
Rounded Value: ${roundedValue}
Square Root: ${squareRoot.toFixed(2)}
Cube: ${cube.toFixed(2)}
Random Number (10-50): ${randomNumber}
`);


// ==========================================
// Q4. Array Performance Analyzer
// ==========================================

console.log("\n========== Q4: Array Performance Analyzer ==========");

// Generate 8 random scores between 30 and 100
let scores = Array.from(
    { length: 8 },
    () => Math.floor(Math.random() * 71) + 30
);

let highestScore = Math.max(...scores);
let lowestScore = Math.min(...scores);

let totalScore = scores.reduce((sum, score) => sum + score, 0);
let averageScore = totalScore / scores.length;

let passedStudents = scores.filter(score => score >= 50).length;

// Use map() to display each score with its result
let scoreReport = scores.map((score, index) =>
    `Student ${index + 1}: ${score} - ${score >= 50 ? "Pass" : "Fail"}`
);

console.log("Scores:", scores);
console.log(scoreReport.join("\n"));
console.log("Highest Score:", highestScore);
console.log("Lowest Score:", lowestScore);
console.log("Average Score:", averageScore.toFixed(2));
console.log("Students Passed:", passedStudents);


// ==========================================
// Q5. Boolean Logic Access System
// ==========================================

console.log("\n========== Q5: Boolean Logic Access System ==========");

let isDoorLocked = true;
let isWindowClosed = true;
let isAlarmOn = true;
let isOwnerInside = true;

function checkSecurity() {
    if (isAlarmOn && isDoorLocked && isWindowClosed && isOwnerInside) {
        console.log("Secure");
    } else {
        console.log("Unsafe");
    }
}

checkSecurity();

// Test a different outcome
isDoorLocked = false;
checkSecurity();

// Test another outcome
isDoorLocked = true;
isAlarmOn = false;
checkSecurity();

// Demonstrate OR (||) and NOT (!)
console.log("Alarm or Owner Inside:", isAlarmOn || isOwnerInside);
console.log("Alarm is Off:", !isAlarmOn);


// ==========================================
// Q6. Event-Based Counter Simulation
// ==========================================

console.log("\n========== Q6: Event-Based Counter Simulation ==========");

let count = 0;

function increment() {
    count++;
    console.log("Count after increment:", count);
}

function decrement() {
    count--;
    console.log("Count after decrement:", count);
}

// Nested function demonstrating access to outer count
function counterManager() {
    function showCount() {
        console.log("Current Count from Nested Function:", count);
    }

    showCount();
}

// Simulate button clicks
increment();
increment();
increment();
decrement();
counterManager();


// ==========================================
// Q7. Customer Feedback Processor
// ==========================================

console.log("\n========== Q7: Customer Feedback Processor ==========");

let feedback = "Great product! Fast delivery and amazing sound quality!";

let wordCount = feedback.trim().split(/\s+/).length;

let hasNegativeWords =
    feedback.toLowerCase().includes("bad") ||
    feedback.toLowerCase().includes("poor");

console.log("Feedback:", feedback);
console.log("Word Count:", wordCount);

if (!hasNegativeWords) {
    console.log("Positive Feedback");
} else {
    console.log("Needs Improvement");
}


// ==========================================
// Q8. Dynamic Discount Evaluator
// ==========================================

console.log("\n========== Q8: Dynamic Discount Evaluator ==========");

const cart = [
    { item: "Laptop", category: "electronics", price: 45000 },
    { item: "Shoes", category: "fashion", price: 2500 },
    { item: "Book", category: "education", price: 600 }
];

let originalTotal = cart.reduce((sum, product) => sum + product.price, 0);
let discountedTotal = 0;

for (let product of cart) {
    let discountRate = 0;

    if (product.category === "electronics") {
        discountRate = 0.10;
    } else if (product.category === "fashion") {
        discountRate = 0.05;
    }

    let finalPrice = product.price - (product.price * discountRate);

    discountedTotal += finalPrice;

    console.log(
        `${product.item}: Original Price = ₹${product.price}, ` +
        `Discount = ${discountRate * 100}%, Final Price = ₹${finalPrice.toFixed(2)}`
    );
}

// Apply an extra 5% discount if the ORIGINAL cart value exceeds ₹50,000
if (originalTotal > 50000) {
    discountedTotal = discountedTotal * 0.95;
    console.log("Extra 5% overall discount applied.");
}

console.log("Original Cart Total: ₹" + originalTotal.toFixed(2));
console.log("Final Cart Total: ₹" + discountedTotal.toFixed(2));


// ==========================================
// Q9. Odd-Even Number Analyzer
// ==========================================

console.log("\n========== Q9: Odd-Even Number Analyzer ==========");

let numbers = [];
let numberResults = [];

for (let i = 1; i <= 30; i++) {
    numbers.push(i);

    if (i % 3 === 0 && i % 5 === 0) {
        numberResults.push(`${i}: FizzBuzz`);
    } else if (i % 2 === 0) {
        numberResults.push(`${i}: Even`);
    } else {
        numberResults.push(`${i}: Odd`);
    }
}

console.log("Numbers:", numbers);
console.log("Classification Results:");
console.log(numberResults.join("\n"));


// ==========================================
// Q10. Departmental Employee Evaluator
// ==========================================

console.log("\n========== Q10: Departmental Employee Evaluator ==========");

const departments = [
    ["HR", 72],
    ["Finance", 88],
    ["Tech", 95],
    ["Support", 63]
];

for (let department of departments) {
    let name = department[0];
    let score = department[1];
    let performance;

    if (score >= 90) {
        performance = "Excellent";
    } else if (score >= 75) {
        performance = "Good";
    } else if (score >= 60) {
        performance = "Average";
    } else {
        performance = "Needs Improvement";
    }

    console.log(`${name}: Score = ${score}, Performance = ${performance}`);
}


// ==========================================
// END OF ALL 10 QUESTIONS
// ==========================================

console.log("\n========== All 10 Questions Completed ==========");