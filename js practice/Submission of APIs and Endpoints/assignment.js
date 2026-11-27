// JSON Server Assignment Q1-Q6
// One JavaScript file handles all six questions.
// Each question still uses its own db.json file and its own JSON Server port.

const app = document.getElementById("app");
const questionSelect = document.getElementById("questionSelect");

const api = {
    q1: "http://localhost:3001",
    q2: "http://localhost:3002",
    q3: "http://localhost:3003",
    q4: "http://localhost:3004",
    q5: "http://localhost:3005",
    q6: "http://localhost:3006"
};

questionSelect.addEventListener("change", showQuestion);
showQuestion();

function showQuestion() {
    const question = questionSelect.value;

    if (question === "q1") showQ1();
    if (question === "q2") showQ2();
    if (question === "q3") showQ3();
    if (question === "q4") showQ4();
    if (question === "q5") showQ5();
    if (question === "q6") showQ6();
}

// Q1: Real-Time Live Search using jQuery AJAX
function showQ1() {
    app.innerHTML = `
        <h2>Q1. Real-Time Live Search</h2>
        <input type="text" id="productSearch" placeholder="Search products...">
        <p id="q1Loading" class="message"></p>
        <div id="productResults"></div>
    `;

    $("#productSearch").on("input", function () {
        const searchText = $(this).val().trim();
        $("#q1Loading").text("Loading...");
        $("#productResults").html("");

        $.ajax({
            url: api.q1 + "/products",
            method: "GET",
            data: { q: searchText },
            success: function (products) {
                $("#q1Loading").text("");

                if (products.length === 0) {
                    $("#productResults").html("<p>No products found.</p>");
                    return;
                }

                products.forEach(function (product) {
                    $("#productResults").append(`
                        <div class="item">
                            <img src="${product.image}" alt="${product.name}">
                            <div><b>${product.name}</b><p>Price: ₹${product.price}</p></div>
                        </div>
                    `);
                });
            },
            error: function () {
                $("#q1Loading").text("Could not load products. Start JSON Server on port 3001.");
            }
        });
    });

    $("#productSearch").trigger("input");
}

// Q2: Employee Status Dashboard using XMLHttpRequest GET and PATCH
function showQ2() {
    app.innerHTML = `
        <h2>Q2. Employee Status Dashboard</h2>
        <p class="muted">Use the button to change an employee's active/inactive status.</p>
        <div id="employeeList">Loading employees...</div>
    `;
    loadEmployees();
}

function loadEmployees() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", api.q2 + "/employees");
    xhr.onload = function () {
        if (xhr.status === 200) {
            const employees = JSON.parse(xhr.responseText);
            const list = document.getElementById("employeeList");
            list.innerHTML = "";

            employees.forEach(function (employee) {
                const row = document.createElement("div");
                row.className = "item";
                row.innerHTML = `
                    <div style="flex:1">
                        <b>${employee.name}</b> - ${employee.department}
                        <p class="status ${employee.status}">${employee.status}</p>
                    </div>
                    <button>Change Status</button>
                `;
                row.querySelector("button").addEventListener("click", function () {
                    changeEmployeeStatus(employee, row);
                });
                list.appendChild(row);
            });
        } else {
            document.getElementById("employeeList").textContent = "Could not load employees.";
        }
    };
    xhr.onerror = function () {
        document.getElementById("employeeList").textContent = "Server error. Start JSON Server on port 3002.";
    };
    xhr.send();
}

function changeEmployeeStatus(employee, row) {
    const oldStatus = employee.status;
    const newStatus = oldStatus === "active" ? "inactive" : "active";
    const statusText = row.querySelector(".status");

    // Optimistic update: change the screen before the server responds.
    statusText.textContent = newStatus;
    statusText.className = "status " + newStatus;

    const xhr = new XMLHttpRequest();
    xhr.open("PATCH", api.q2 + "/employees/" + employee.id);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.status < 200 || xhr.status >= 300) {
            statusText.textContent = oldStatus;
            statusText.className = "status " + oldStatus;
            alert("Update failed. Previous status restored.");
        }
    };
    xhr.onerror = function () {
        statusText.textContent = oldStatus;
        statusText.className = "status " + oldStatus;
        alert("Network error. Previous status restored.");
    };
    xhr.send(JSON.stringify({ status: newStatus }));
}

// Q3: Task Manager using jQuery AJAX and PATCH
function showQ3() {
    app.innerHTML = `
        <h2>Q3. Task Manager</h2>
        <label>Priority:</label>
        <select id="priorityFilter">
            <option value="">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
        </select>
        <label>Completion:</label>
        <select id="completedFilter">
            <option value="">All</option>
            <option value="false">Pending</option>
            <option value="true">Completed</option>
        </select>
        <div id="taskList">Loading tasks...</div>
    `;

    $("#priorityFilter, #completedFilter").on("change", loadTasks);
    loadTasks();
}

function loadTasks() {
    const priority = $("#priorityFilter").val();
    const completed = $("#completedFilter").val();
    const filters = {};

    if (priority) filters.priority = priority;
    if (completed !== "") filters.completed = completed;

    $.ajax({
        url: api.q3 + "/tasks",
        method: "GET",
        data: filters,
        success: function (tasks) {
            $("#taskList").html("");

            if (tasks.length === 0) {
                $("#taskList").html("<p>No tasks found.</p>");
                return;
            }

            tasks.forEach(function (task) {
                $("#taskList").append(`
                    <div class="item">
                        <input type="checkbox" class="taskCheck" data-id="${task.id}" ${task.completed ? "checked" : ""}>
                        <div><b>${task.title}</b><p>Priority: ${task.priority} | ${task.completed ? "Completed" : "Pending"}</p></div>
                    </div>
                `);
            });

            $(".taskCheck").on("change", function () {
                updateTask(this);
            });
        },
        error: function () {
            $("#taskList").html("<p>Could not load tasks. Start JSON Server on port 3003.</p>");
        }
    });
}

function updateTask(checkbox) {
    const taskId = checkbox.dataset.id;
    const completed = checkbox.checked;

    $.ajax({
        url: api.q3 + "/tasks/" + taskId,
        method: "PATCH",
        contentType: "application/json",
        data: JSON.stringify({ completed: completed }),
        error: function () {
            checkbox.checked = !completed;
            alert("Could not update task.");
        }
    });
}

// Q4: Multi-API Dashboard using Fetch and Promise.all
function showQ4() {
    app.innerHTML = `
        <h2>Q4. Multi-API Dashboard</h2>
        <div id="dashboard">
            <div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div>
        </div>
    `;

    Promise.all([
        fetch(api.q4 + "/users").then(checkResponse).then(response => response.json()),
        fetch(api.q4 + "/orders").then(checkResponse).then(response => response.json()),
        fetch(api.q4 + "/products").then(checkResponse).then(response => response.json())
    ])
    .then(function (data) {
        const users = data[0];
        const orders = data[1];
        const products = data[2];

        document.getElementById("dashboard").innerHTML = `
            <div class="item"><div><b>Total users:</b> ${users.length}</div></div>
            <div class="item"><div><b>Total orders:</b> ${orders.length}</div></div>
            <div class="item"><div><b>Total products:</b> ${products.length}</div></div>
            <h3>Users</h3>${users.map(user => `<p>${user.name} - ${user.email}</p>`).join("")}
            <h3>Orders</h3>${orders.map(order => `<p>Order #${order.id}: ${order.customer} - ₹${order.total}</p>`).join("")}
            <h3>Products</h3>${products.map(product => `<p>${product.name} - ₹${product.price}</p>`).join("")}
        `;
    })
    .catch(function () {
        document.getElementById("dashboard").innerHTML =
            "<p class='message'>Warning: One or more API requests failed. Check JSON Server on port 3004.</p>";
    });
}

function checkResponse(response) {
    if (!response.ok) {
        throw new Error("API request failed");
    }
    return response;
}

// Q5: Timetable Viewer using Fetch
function showQ5() {
    app.innerHTML = `
        <h2>Q5. College Timetable Viewer</h2>
        <label for="daySelect">Select day:</label>
        <select id="daySelect">
            <option>Monday</option><option>Tuesday</option><option>Wednesday</option>
            <option>Thursday</option><option>Friday</option><option>Saturday</option>
        </select>
        <div id="timetable">Loading timetable...</div>
    `;

    document.getElementById("daySelect").addEventListener("change", loadTimetable);
    loadTimetable();
}

function loadTimetable() {
    const day = document.getElementById("daySelect").value;

    fetch(api.q5 + "/timetable?day=" + encodeURIComponent(day))
        .then(checkResponse)
        .then(response => response.json())
        .then(function (classes) {
            const timetable = document.getElementById("timetable");

            if (classes.length === 0) {
                timetable.innerHTML = "<p>No classes scheduled for this day.</p>";
                return;
            }

            timetable.innerHTML = `
                <table>
                    <tr><th>Subject</th><th>Faculty</th><th>Time</th></tr>
                    ${classes.map(item => `
                        <tr><td>${item.subject}</td><td>${item.faculty}</td><td>${item.time}</td></tr>
                    `).join("")}
                </table>
            `;
        })
        .catch(function () {
            document.getElementById("timetable").textContent =
                "Could not load timetable. Start JSON Server on port 3005.";
        });
}

// Q6: Registration using Axios GET and POST
function showQ6() {
    app.innerHTML = `
        <h2>Q6. User Registration</h2>
        <form id="registerForm">
            <input type="text" id="userName" placeholder="Enter name" required>
            <input type="email" id="userEmail" placeholder="Enter email" required>
            <button type="submit">Register</button>
        </form>
        <p id="registerMessage" class="message"></p>
    `;

    document.getElementById("registerForm").addEventListener("submit", registerUser);
}

async function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById("userName").value.trim();
    const email = document.getElementById("userEmail").value.trim();
    const message = document.getElementById("registerMessage");

    try {
        const check = await axios.get(api.q6 + "/users", {
            params: { email: email }
        });

        if (check.data.length > 0) {
            message.textContent = "This email is already registered.";
            message.style.color = "red";
            return;
        }

        await axios.post(api.q6 + "/users", { name: name, email: email });
        message.textContent = "Registration successful!";
        message.style.color = "green";
        document.getElementById("registerForm").reset();
    } catch (error) {
        message.textContent = "Registration failed. Start JSON Server on port 3006.";
        message.style.color = "red";
    }
}
