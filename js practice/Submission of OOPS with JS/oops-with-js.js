
 // Q1 – Student Result Processing (reduce + Classes)

class Student {
    constructor(name, marks) {
        this.name = name;
        this.marks = marks;
    }

    calculateAverage() {
        return this.marks.reduce((total, mark) => total + mark, 0) / this.marks.length;
    }

    getGrade() {
        let average = this.calculateAverage();

        if (average >= 80) return "A";
        if (average >= 60) return "B";
        if (average >= 40) return "C";
        return "F";
    }
}

let student1 = new Student("Rahul", [80, 90, 85]);
let student2 = new Student("Amit", [65, 70, 75]);
let student3 = new Student("Ravi", [30, 35, 40]);

console.log("Q1 Student Results");

[student1, student2, student3].forEach(student => {
    console.log(student.name, student.calculateAverage(), student.getGrade());
});


// Q2 – Online Food Ordering (map + Error Handling)

let menu = [
    { name: "Pizza", price: 200 },
    { name: "Burger", price: 100 },
    { name: "Pasta", price: 150 }
];

function calculateBill(orderItems) {
    let prices = orderItems.map(item => {
        let food = menu.find(menuItem => menuItem.name === item);

        if (!food) {
            throw new Error("Invalid food item: " + item);
        }

        return food.price;
    });

    return prices.reduce((total, price) => total + price, 0);
}

console.log("\nQ2 Food Bill");

try {
    console.log("Total Bill:", calculateBill(["Pizza", "Burger"]));
    console.log("Total Bill:", calculateBill(["Pizza", "Rice"]));
} catch (error) {
    console.log(error.message);
}


// Q3 – Product Discount System

function Product(name, price) {
    this.name = name;
    this.price = price;
}

// Prototype method
Product.prototype.applyDiscount = function(percent) {
    return this.price - (this.price * percent / 100);
};

let product1 = new Product("Laptop", 50000);
let product2 = new Product("Mobile", 20000);
let product3 = new Product("Headphones", 3000);

console.log("\nQ3 Product Discounts");

console.log(product1.name, product1.applyDiscount(10));
console.log(product2.name, product2.applyDiscount(20));
console.log(product3.name, product3.applyDiscount(15));

// Abstraction hides calculation details inside applyDiscount().


// Q4 – Employee Inheritance

class Employee {
    constructor(name, department) {
        this.name = name;
        this.department = department;
    }

    work() {
        return this.name + " is doing regular work";
    }
}

class Manager extends Employee {
    work() {
        return this.name + " is managing the team";
    }
}

let employee = new Employee("Rahul", "IT");
let manager = new Manager("Amit", "HR");

console.log("\nQ4 Employee Work");

console.log(employee.work());
console.log(manager.work());

// Same method name with different behavior is polymorphism.


// Q5 – Ride-Sharing Application

class User {
    constructor(name, rating) {
        this.name = name;
        this.rating = rating;
    }
}

class Driver extends User {
    constructor(name, rating, vehicle) {
        super(name, rating);
        this.vehicle = vehicle;
    }
}

class Trip {
    constructor(fromLocation, toLocation, distance) {
        this.fromLocation = fromLocation;
        this.toLocation = toLocation;
        this.distance = distance;
    }

    calculateFare() {
        if (this.distance == null || !Number.isFinite(this.distance) || this.distance < 0) {
            throw new Error("Invalid trip distance");
        }

        return this.distance * 10;
    }
}

console.log("\nQ5 Ride Sharing");

let driver = new Driver("Rohit", 4.8, "Car");
let trip = new Trip("Mathura", "Agra", 60);

console.log("Driver:", driver.name);
console.log("Vehicle:", driver.vehicle);

try {
    console.log("Trip Fare:", trip.calculateFare());
} catch (error) {
    console.log(error.message);
}


// Q6 – E-Commerce Inventory System

let products = [
    { id: 1, name: "Laptop", category: "Electronics", price: 50000, stock: 5 },
    { id: 2, name: "Phone", category: "Electronics", price: 20000, stock: 3 },
    { id: 3, name: "Shirt", category: "Clothing", price: 1000, stock: 20 },
    { id: 4, name: "Shoes", category: "Clothing", price: 2500, stock: 4 },
    { id: 5, name: "Watch", category: "Accessories", price: 3000, stock: 10 }
];

function getLowStockProducts() {
    return products.filter(product => product.stock < 6);
}

function sortProductsByPrice() {
    return [...products].sort((a, b) => a.price - b.price);
}

function calculateTotalInventoryValue() {
    return products.reduce((total, product) => {
        return total + product.price * product.stock;
    }, 0);
}

function groupByCategory() {
    return products.reduce((group, product) => {
        if (!group[product.category]) {
            group[product.category] = [];
        }

        group[product.category].push(product);
        return group;
    }, {});
}

console.log("\nQ6 Inventory System");

console.log("Low Stock:", getLowStockProducts());
console.log("Sorted Products:", sortProductsByPrice());
console.log("Inventory Value:", calculateTotalInventoryValue());
console.log("Category Groups:", groupByCategory());


// Q7 – Banking Application

class BankAccount {
    #balance;

    constructor(balance) {
        this.#balance = balance;
    }

    deposit(amount) {
        if (amount <= 0) {
            throw new Error("Deposit must be positive");
        }

        this.#balance += amount;
    }

    withdraw(amount) {
        if (amount <= 0) {
            throw new Error("Withdrawal must be positive");
        }

        if (amount > this.#balance) {
            throw new Error("Insufficient balance");
        }

        this.#balance -= amount;
    }

    getBalance() {
        return this.#balance;
    }
}

console.log("\nQ7 Banking Application");

let account = new BankAccount(5000);

account.deposit(2000);
console.log("After Deposit:", account.getBalance());

try {
    account.withdraw(10000);
} catch (error) {
    console.log(error.message);
}

account.withdraw(1000);
console.log("Final Balance:", account.getBalance());


// Q8 – Movie Ticket Booking System

class MovieTicket {
    constructor(movieName, seatNo, price) {
        this.movieName = movieName;
        this.seatNo = seatNo;
        this.price = price;
    }
}

MovieTicket.prototype.printTicket = function() {
    console.log("Movie:", this.movieName);
    console.log("Seat:", this.seatNo);
    console.log("Price:", this.price);
};

class OnlineTicket extends MovieTicket {
    constructor(movieName, seatNo, price, convenienceFee) {
        super(movieName, seatNo, price);
        this.convenienceFee = convenienceFee;
    }

    getTotalAmount() {
        return this.price + this.convenienceFee;
    }
}

console.log("\nQ8 Movie Ticket");

let ticket = new OnlineTicket("Avengers", "A10", 200, 30);

ticket.printTicket();
console.log("Convenience Fee:", ticket.convenienceFee);
console.log("Total Amount:", ticket.getTotalAmount());

// OnlineTicket inherits printTicket() through the prototype chain.


// Q9 – Fitness App Analytics

let workoutData = [
    { user: "A", steps: 8000, calories: 300 },
    { user: "B", steps: 12000, calories: 500 },
    { user: "C", steps: 4000, calories: 200 }
];

class FitnessAnalytics {
    constructor(data) {
        if (!data || data.length === 0) {
            throw new Error("Workout dataset is empty");
        }

        this.data = data;
    }

    getActiveUsers() {
        return this.data.filter(user => user.steps > 7000);
    }

    getAverageCalories() {
        let total = this.data.reduce((sum, user) => {
            return sum + user.calories;
        }, 0);

        return total / this.data.length;
    }

    getUserSummary() {
        return this.data.map(user => {
            return user.user + " walked " + user.steps +
                " steps and burned " + user.calories + " calories";
        });
    }
}

console.log("\nQ9 Fitness App");

try {
    let fitness = new FitnessAnalytics(workoutData);

    console.log("Active Users:", fitness.getActiveUsers());
    console.log("Average Calories:", fitness.getAverageCalories());
    console.log("User Summary:", fitness.getUserSummary());

} catch (error) {
    console.log(error.message);
}
