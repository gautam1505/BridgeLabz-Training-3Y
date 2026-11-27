
/* ==========================================
   Q1. E-Commerce Product Manager
   ========================================== */

class Product {
    constructor(id, name, price, category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
    }

    applyDiscount(percent) {
        this.price = this.price - (this.price * percent / 100);
    }

    displayDetails() {
        return `ID: ${this.id}, Name: ${this.name},
        Price: ₹${this.price}, Category: ${this.category}`;
    }
}

let products = [
    new Product(1, "Laptop", 50000, "Electronics"),
    new Product(2, "Mouse", 500, "Accessories"),
    new Product(3, "Mobile", 20000, "Electronics"),
    new Product(4, "Keyboard", 1500, "Accessories")
];

products[0].applyDiscount(10);

console.log("Q1: Product Details");

products.forEach(product => {
    console.log(product.displayDetails());
});

let expensiveProducts = products.filter(product => product.price > 1000);

console.log("Products above ₹1000:");

expensiveProducts.forEach(product => {
    console.log(product.displayDetails());
});


/* ==========================================
   Q2. Student Form Validator
   ========================================== */

document.body.innerHTML = `
<h2>Q2. Student Registration Form</h2>

<form id="studentForm">
    <input id="sname" placeholder="Name"><br><br>
    <input id="email" placeholder="Email"><br><br>
    <input id="phone" placeholder="Phone"><br><br>
    <input id="password" type="password" placeholder="Password"><br><br>
    <button type="submit">Register</button>
</form>

<p id="studentMessage"></p>

<hr>

<h2>Q3. Library Management System</h2>

<div id="library"></div>

<input id="isbn" placeholder="Enter ISBN">
<button id="issueBtn">Issue Book</button>
<p id="libraryMessage"></p>

<hr>

<h2>Q4. Custom Form Builder</h2>

<div id="dynamicForm"></div>
<p id="formResult"></p>

<hr>

<h2>Q5. Movie Ticket Booking</h2>

<form id="movieForm">
    <input id="movieName" placeholder="Name"><br><br>
    <input id="movieEmail" placeholder="Email"><br><br>
    <input id="seats" type="number" placeholder="Seats (1-10)"><br><br>
    <button type="submit">Book Ticket</button>
</form>

<p id="ticketResult"></p>

<hr>

<h2>Q6. Employee Management System</h2>
<div id="employeeResult"></div>

<hr>

<h2>Q7. Login Form Validation</h2>

<form id="loginForm">
    <input id="username" placeholder="Username"><br><br>
    <input id="loginPassword" type="password" placeholder="Password"><br><br>
    <button type="submit">Login</button>
</form>

<p id="loginMessage"></p>

<hr>

<h2>Q8. Dynamic Object Updater</h2>

<form id="userForm">
    <input id="userName" placeholder="Name"><br><br>
    <input id="userEmail" placeholder="Email"><br><br>
    <input id="userAge" type="number" placeholder="Age"><br><br>
    <button type="submit">Update User</button>
</form>

<pre id="userResult"></pre>

<hr>

<h2>Q9. Shopping Cart Total</h2>

<div id="cartResult"></div>
<input id="coupon" placeholder="Enter Coupon (SAVE20)">
<button id="applyCoupon">Apply Coupon</button>
<p id="couponResult"></p>
`;


/* ==========================================
   Q2. Student Form Validation
   ========================================== */

document.getElementById("studentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("sname");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    let password = document.getElementById("password");

    let valid = true;

    let validations = [
        [name, /^[A-Za-z ]+$/],
        [email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/],
        [phone, /^\d{10}$/],
        [password, /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/]
    ];

    validations.forEach(([field, regex]) => {
        if (!regex.test(field.value)) {
            field.style.border = "2px solid red";
            valid = false;
        } else {
            field.style.border = "2px solid green";
        }
    });

    document.getElementById("studentMessage").textContent =
        valid ? "Registration Successful!" : "Please enter valid details.";
});


/* ==========================================
   Q3. Library Management System
   ========================================== */

class Book {
    constructor(title, author, ISBN, isIssued = false) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this.isIssued = isIssued;
    }

    issueBook() {
        if (!this.isIssued) {
            this.isIssued = true;
            return "Book issued successfully!";
        }

        return "Book is already issued.";
    }

    returnBook() {
        this.isIssued = false;
        return "Book returned successfully!";
    }
}

let books = [
    new Book("JavaScript", "John", "101"),
    new Book("Python", "David", "102"),
    new Book("Java", "James", "103")
];

function displayBooks() {
    let available = books.filter(book => !book.isIssued);

    document.getElementById("library").innerHTML =
        available.map(book =>
            `<p>${book.title} - ${book.author} - ISBN: ${book.ISBN}</p>`
        ).join("");
}

displayBooks();

document.getElementById("issueBtn").addEventListener("click", function() {
    let isbn = document.getElementById("isbn").value;

    let book = books.find(book => book.ISBN === isbn);

    let message = book
        ? book.issueBook()
        : "Book not found.";

    document.getElementById("libraryMessage").textContent = message;

    displayBooks();
});


/* ==========================================
   Q4. Custom Form Builder
   ========================================== */

class FormBuilder {
    constructor(fields) {
        this.fields = fields;
    }

    createForm() {
        let html = `<form id="customForm">`;

        this.fields.forEach(field => {
            html += `
                <label>${field.label}</label><br>
                <input type="${field.type}" name="${field.name}"
                placeholder="${field.label}"><br><br>
            `;
        });

        html += `<button type="submit">Submit</button></form>`;

        document.getElementById("dynamicForm").innerHTML = html;

        document.getElementById("customForm").addEventListener("submit", event => {
            event.preventDefault();

            let data = this.getFormData();

            document.getElementById("formResult").textContent =
                JSON.stringify(data, null, 2);
        });
    }

    getFormData() {
        let form = document.getElementById("customForm");
        let data = {};

        this.fields.forEach(field => {
            data[field.name] = form.elements[field.name].value;
        });

        return data;
    }
}

let fields = [
    { type: "text", label: "Username", name: "username" },
    { type: "email", label: "Email", name: "email" },
    { type: "password", label: "Password", name: "password" }
];

let formBuilder = new FormBuilder(fields);
formBuilder.createForm();


/* ==========================================
   Q5. Movie Ticket Booking
   ========================================== */

document.getElementById("movieForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("movieName").value;
    let email = document.getElementById("movieEmail").value;
    let seats = Number(document.getElementById("seats").value);

    let nameRegex = /^[A-Za-z ]+$/;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(name)) {
        alert("Invalid Name!");
        return;
    }

    if (!emailRegex.test(email)) {
        alert("Invalid Email!");
        return;
    }

    if (!Number.isInteger(seats) || seats < 1 || seats > 10) {
        alert("Seats must be between 1 and 10!");
        return;
    }

    let booking = {
        name: name,
        email: email,
        seats: seats
    };

    document.getElementById("ticketResult").textContent =
        `Booking Successful!
        Name: ${booking.name}
        Email: ${booking.email}
        Seats: ${booking.seats}`;
});


/* ==========================================
   Q6. Employee Management System
   ========================================== */

class Employee {
    constructor(id, name, department, salary) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.salary = salary;
    }

    getAnnualSalary() {
        return this.salary * 12;
    }

    applyBonus(percent) {
        this.salary += this.salary * percent / 100;
    }
}

let employees = [
    new Employee(1, "Rahul", "IT", 30000),
    new Employee(2, "Aman", "HR", 25000),
    new Employee(3, "Rohit", "Sales", 35000),
    new Employee(4, "Priya", "IT", 40000),
    new Employee(5, "Neha", "Finance", 45000)
];

employees[0].applyBonus(10);

let totalPayout = employees.reduce((total, employee) => {
    return total + employee.getAnnualSalary();
}, 0);

let employeeHTML = employees.map(employee =>
    `<p>${employee.name} - ${employee.department}
    - Annual Salary: ₹${employee.getAnnualSalary()}</p>`
).join("");

document.getElementById("employeeResult").innerHTML =
    employeeHTML + `<h3>Total Annual Payout: ₹${totalPayout}</h3>`;


/* ==========================================
   Q7. Login Form Validation
   ========================================== */

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("loginPassword").value;

    let errors = [];

    if (username.length < 5) {
        errors.push("Username must contain at least 5 characters.");
    }

    if (password.length < 8) {
        errors.push("Password must contain at least 8 characters.");
    }

    if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain an uppercase letter.");
    }

    if (!/[a-z]/.test(password)) {
        errors.push("Password must contain a lowercase letter.");
    }

    if (!/[0-9]/.test(password)) {
        errors.push("Password must contain a number.");
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
        errors.push("Password must contain a special character.");
    }

    document.getElementById("loginMessage").textContent =
        errors.length === 0
            ? "Login Validation Successful!"
            : errors.join(" ");
});


/* ==========================================
   Q8. Dynamic Object Updater
   ========================================== */

let user = {
    name: "John",
    email: "john@mail.com",
    age: 21
};

function displayUser() {
    document.getElementById("userResult").textContent =
        JSON.stringify(user, null, 2);
}

displayUser();

document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault();

    user.name = document.getElementById("userName").value;
    user.email = document.getElementById("userEmail").value;
    user.age = Number(document.getElementById("userAge").value);

    displayUser();
});


/* ==========================================
   Q9. Shopping Cart Total
   ========================================== */

class Cart {
    constructor() {
        this.items = [];
    }

    addItem(name, price, quantity) {
        this.items.push({
            name: name,
            price: price,
            quantity: quantity
        });
    }

    getTotal() {
        return this.items.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    }

    applyCoupon(coupon) {
        let match = coupon.match(/^(SAVE|DISC)(\d{1,2})$/);

        if (!match) {
            return null;
        }

        let discount = Number(match[2]);

        if (discount < 1 || discount > 100) {
            return null;
        }

        return this.getTotal() * (1 - discount / 100);
    }
}

let cart = new Cart();

cart.addItem("Laptop", 50000, 1);
cart.addItem("Mouse", 500, 2);
cart.addItem("Keyboard", 1500, 1);

function displayCart() {
    document.getElementById("cartResult").innerHTML =
        cart.items.map(item =>
            `<p>${item.name} - ₹${item.price} x ${item.quantity}
            = ₹${item.price * item.quantity}</p>`
        ).join("") +
        `<h3>Total: ₹${cart.getTotal()}</h3>`;
}

displayCart();

document.getElementById("applyCoupon").addEventListener("click", function() {
    let coupon = document.getElementById("coupon").value;

    let finalTotal = cart.applyCoupon(coupon);

    document.getElementById("couponResult").textContent =
        finalTotal === null
            ? "Invalid Coupon Code!"
            : `Coupon Applied! Final Total: ₹${finalTotal.toFixed(2)}`;
});

console.log("All Q1-Q9 programs loaded successfully!");
