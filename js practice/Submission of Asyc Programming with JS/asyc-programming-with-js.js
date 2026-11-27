
// Q1 – Async Coffee Maker

function waitRandomTime() {
    return new Promise(resolve => {
        setTimeout(resolve, Math.random() * 1000 + 1000);
    });
}

function boilWater() {
    return waitRandomTime().then(() => {
        if (Math.random() < 0.15) throw new Error("Boiling failed");
        console.log("Water boiled");
    });
}

function brewCoffee() {
    return waitRandomTime().then(() => {
        if (Math.random() < 0.15) throw new Error("Brewing failed");
        console.log("Coffee brewed");
    });
}

function pourCoffee() {
    return waitRandomTime().then(() => {
        if (Math.random() < 0.15) throw new Error("Pouring failed");
        console.log("Coffee poured");
    });
}

boilWater()
    .then(() => brewCoffee())
    .then(() => pourCoffee())
    .then(() => console.log("Coffee ready for the team!"))
    .catch(error => console.log(error.message));


// Q2 – Event Loop

console.log("Start");

setTimeout(() => {
    console.log("Macrotask");
}, 0);

Promise.resolve().then(() => {
    console.log("Microtask");
});

console.log("Synchronous log");
console.log("End");

// Microtasks execute before macrotasks because JavaScript
// processes the microtask queue before the next macrotask.


// Q3 – Bug Tracker Using Promise

function getBugs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let failed = Math.random() < 0.3;

            if (failed) {
                reject("API request failed");
            } else {
                resolve(["UI glitch", "API timeout", "Login failure"]);
            }
        }, 1000);
    });
}

getBugs()
    .then(bugs => console.table(bugs))
    .catch(error => console.log(error));


// Q4 – Promise.all() and Promise.race()

function deployServer(name, time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.2) {
                reject(name + " failed");
            } else {
                resolve(name + " completed");
            }
        }, time);
    });
}

let serverA = deployServer("Server A", 2000);
let serverB = deployServer("Server B", 3000);

Promise.all([serverA, serverB])
    .then(() => console.log("Deployment completed for all servers"))
    .catch(error => console.log(error));

Promise.race([serverA, serverB])
    .then(result => console.log("Fastest response:", result))
    .catch(error => console.log(error));


// Q5 – Callback Hell and Async/Await

function runStage(name, callback) {
    setTimeout(() => {
        console.log(name);
        callback();
    }, 1000);
}

function callbackPipeline() {
    console.log("Callback Pipeline Started");

    runStage("Design", () => {
        runStage("Build", () => {
            runStage("Test", () => {
                runStage("Deploy", () => {
                    runStage("Celebrate", () => {
                        console.log("Pipeline Completed");
                    });
                });
            });
        });
    });
}

function asyncStage(name) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(name);
            resolve();
        }, 1000);
    });
}

async function asyncPipeline() {
    console.log("Async Pipeline Started");

    await asyncStage("Design");
    await asyncStage("Build");
    await asyncStage("Test");
    await asyncStage("Deploy");
    await asyncStage("Celebrate");

    console.log("Pipeline Completed");
}

// Async/await makes code easier to read and avoids nested callbacks.

callbackPipeline();

// Run asyncPipeline() separately to test the second version.


// Q6 – Fake Store API

async function fetchProducts() {
    try {
        let response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
            throw new Error("API request failed");
        }

        let products = await response.json();

        products.forEach(product => {
            console.log("Product:", product.title);
            console.log("Price: $" + product.price);
            console.log("Image:", product.image);
            console.log("--------------------");
        });

    } catch (error) {
        console.log("Failed to load products. Please try again.");
    }
}

fetchProducts();


// Q7 – Promise.allSettled()

function loadProfile() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() < 0.3
                ? reject("Profile failed")
                : resolve("Profile Loaded");
        }, 2000);
    });
}

function loadPosts() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() < 0.3
                ? reject("Posts failed")
                : resolve("Posts Loaded");
        }, 1500);
    });
}

function loadMessages() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() < 0.3
                ? reject("Messages failed")
                : resolve("Messages Loaded");
        }, 1000);
    });
}

async function loadDashboard() {
    let start = Date.now();

    let results = await Promise.allSettled([
        loadProfile(),
        loadPosts(),
        loadMessages()
    ]);

    results.forEach((result, index) => {
        let names = ["Profile", "Posts", "Messages"];

        if (result.status === "fulfilled") {
            console.log(names[index], "Success:", result.value);
        } else {
            console.log(names[index], "Failed:", result.reason);
        }
    });

    console.log("Total time:", Date.now() - start, "ms");
}

loadDashboard();


// Q8 – Order Processing Retry Mechanism

function submitOrder() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.5) {
                reject("Order submission failed");
            } else {
                resolve("Order submitted successfully");
            }
        }, 1000);
    });
}

async function processOrder() {
    let maxAttempts = 3;

    for (let i = 1; i <= maxAttempts; i++) {
        try {
            console.log("Attempt:", i);

            let result = await submitOrder();
            console.log(result);
            return;

        } catch (error) {
            console.log(error);

            if (i === maxAttempts) {
                console.log("Order failed after 3 attempts");
            } else {
                console.log("Retrying...");
            }
        }
    }
}

processOrder();
