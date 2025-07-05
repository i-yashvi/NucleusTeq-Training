const BASE_URL = "http://localhost:9090";

// FUNCTION: Get User Details; user.userId, user.deptId, user.deptName, user.role
function getUser() {
    try {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error("Error retrieving user data:", error);
        return null; // Return null if parsing fails
    }
}

// FUNCTION: Logout User from his/her Account
function logout() {
    localStorage.removeItem("user");
    window.location.href = "/index.html"; // Redirect to login after logout
}

function toTitleCase(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

function getFirstName(fullName) {
    const nameParts = fullName.split(' ');
    return nameParts[0];
}

// FUNCTION: Redirect Based on User Role (Reusable)
function redirectToDashboard() {
    const user = getUser();
    console.log("User: ", user);

    const currentPage = window.location.pathname;
    if(!user) {
        window.location.href = "/index.html";
        return;
    }

    const role = user.role;
    if ((role === "EMPLOYEE" && currentPage === "/dashboards/employee.html") ||
        (role === "MANAGER" && currentPage === "/dashboards/manager.html") ||
        (role === "FINANCE_TEAM" && currentPage === "/dashboards/finance-team.html")) {
        return; // Don't redirect again
    }

    switch (role) {
        case "EMPLOYEE":
            window.location.href = "dashboards/employee.html";
            break;
        case "MANAGER":
            window.location.href = "dashboards/manager.html";
            break;
        case "FINANCE_TEAM":
            window.location.href = "dashboards/finance-team.html";
            break;
        default:
            alert("Unknown role! Contact admin.");
            logout(); // Clears storage and goes to login
    }

}

/* // Listen for Real-Time Expense Updates (SSE)
function listenForExpenseUpdates() {
    const eventSource = new EventSource(`${BASE_URL}/expenses/updates`);

    eventSource.onmessage = (event) => {
        const updatedExpenses = JSON.parse(event.data);
        updateExpenseTable(updatedExpenses);
        fetchCurrentBudget(JSON.parse(localStorage.getItem("user")).deptId);
    };

    eventSource.onerror = (error) => {
        console.error("SSE error:", error);
        eventSource.close();
    };
} */

//------------------------------------------------ API ---------------------------------------------------

// Edit Expense
async function apiEditExpense(expenseData) {
    const user = getUser();
    const formData = new FormData();
    formData.append("expenseName", expenseData.expenseName);
    formData.append("expenseAmount", expenseData.expenseAmount);
    formData.append("expenseType", expenseData.expenseType);
    formData.append("expenseDate", expenseData.expenseDate);

    if (expenseData.expenseReceipt) {
        formData.append("expenseReceipt", expenseData.expenseReceipt);
    }

    //console.log("expense", expenseData.expenseId);
    const response = await fetch(`${BASE_URL}/expenses/edit/${user.userId}/${user.deptId}/${expenseData.expenseId}`, {
        method: "PUT",
        body: formData
    });

    if (!response.ok) {
        throw new Error("Failed to edit expense");
    }

    return await response.text();
}

async function fetchReceipt(expenseId) {
    try {
        const response = await fetch(`${BASE_URL}/expenses/receipt/${expenseId}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch receipt: ${response.status}`);
        }

        const blob = await response.blob();
        return window.URL.createObjectURL(blob);
    } catch (error) {
        console.error("Error fetching receipt:", error);
        return null; // Return null if there's an issue
    }
}

// API to Add Budget to a Department
async function apiAddBudget(budgetData) {
    try {
        const response = await fetch(`${BASE_URL}/departments/assignBudget`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(budgetData)
        });

        if (!response.ok) {
            throw new Error("Failed to assign budget");
        }

        return await response.text(); 
    } catch (error) {
        console.error("Error in API request:", error);
        throw error;
    }
}

// API to Add Expense to User Data
async function apiAddExpense(expenseData) {
    const user = getUser();
    try {
        const formData = new FormData();
        formData.append("expenseName", expenseData.expenseName);
        formData.append("expenseAmount", expenseData.expenseAmount);
        formData.append("expenseDate", expenseData.expenseDate);
        formData.append("expenseType", expenseData.expenseType);
        if (expenseData.expenseReceipt) {
            formData.append("expenseReceipt", expenseData.expenseReceipt);
        }

        const response = await fetch(`${BASE_URL}/expenses/add/${user.userId}/${user.deptId}`, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Failed to add expense");
        }

        return await response.text(); 
    } catch (error) {
        console.error("Error in API request:", error);
        throw error;
    }
};

// API to Update Expense Status [PENDING -> APPROVED/REJECTED, APPROVED -> PAID]
async function apiUpdateExpenseStatus (expenseId, newStatus) {
    try {
        const response = await fetch(`${BASE_URL}/expenses/update-status/${expenseId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newStatus }) // Pass in the request body
        });

        if (!response.ok) {
            throw new Error("Failed to update status");
        }

        return await response.text(); // Return success message from backend
    } catch (error) {
        console.error("Error updating expense status:", error);
        throw error;
    }
};

// API to Signup User
async function signupApi(userData) { 
    try {
        const response = await fetch(`${BASE_URL}/users/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        // Read response only once
        let responseText;
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            responseText = await response.json(); // Parse as JSON
        } else {
            responseText = await response.text(); // Read as plain text
        }

        if (!response.ok) {
            throw new Error(responseText.message || responseText || "Signup failed!");
        }

        return responseText;
    } 
    catch (error) {
        console.error("Signup error:", error.message);
        alert(error.message); // Show error message in alert
        throw error;
    }
}

// API to Login User 
async function loginApi({email, password}) {
    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) 
            throw new Error("Invalid email or password");

        const userData = await response.json();
        localStorage.setItem("user", JSON.stringify(userData)); // Store user details

        return userData;
    } 
    catch (error) {
        console.error("Login failed:", error);
        throw error; // Display error message to the user
    }
}

// API to Fetch all User Related Data
async function apiFetchExpenses() {
    const user = getUser();
    if (!user) throw new Error("User not found");

    let url = `${BASE_URL}/expenses`;
    
    if (user.role === "EMPLOYEE" && user.userId) {
        url += `/employee/${user.userId}`;
    } else if (user.role === "MANAGER" && user.deptId) {
        url += `/manager/${user.deptId}`;
    } else if (user.role === "FINANCE_TEAM") {
        url += `/finance-team`;
    }

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json", },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch expenses.");
        }

        const expenses = await response.json();
        return await expenses;
    } catch (error) {
        console.error("Error fetching expenses:", error);
        alert(error.message); // Display error message if needed
    }
}

async function apiFetchDepartments() {
    try {
        const response = await fetch(`${BASE_URL}/departments`);
        if (!response.ok) throw new Error("Failed to load departments");
        return response.json();
    }
    catch (error) {
        console.error("Error fetching departments:", error);
    }
}

async function apiCreateDepartment(formattedDeptName) {
    try {
        const response = await fetch(`${BASE_URL}/departments/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ departmentName: formattedDeptName })
        });

        if (!response.ok) {
            const errorMsg = await response.text();
            alert(errorMsg || "Failed to add department!");
            return;
        }

        alert(`Department '${formattedDeptName}' added successfully!`);
    } catch (error) {
        console.error("Error adding department:", error);
        alert("Error adding department!");
    }
}

// API to Fetch Current Budget of Department
async function apiFetchCurrentBudgetByName(departmentName) {
    const user = getUser();
    if (!user) return;

    try {
        const response = await fetch(`${BASE_URL}/departments/currentBudget/name/${departmentName}`);
        if (!response.ok) {
            console.warn(`No assigned budget found for ${departmentName}`);
            return null; // Returns null when department is not found
        }
        const currentBudget = await response.json();
        console.log("Current Budget", departmentName, currentBudget);
        return currentBudget;
    } catch (error) {
        console.error("Error fetching assigned budget:", error);
        return null;
    }
}

// API to Fetch Assigned Budget of Department
async function apiFetchAssignedBudgetByName(departmentName) {
    const user = getUser();
    if (!user) return;

    try {
        const response = await fetch(`${BASE_URL}/departments/assignedBudget/name/${departmentName}`);
        if (!response.ok) {
            console.warn(`No assigned budget found for ${departmentName}`);
            return null; // Returns null when department is not found
        }
        const assignedBudget = await response.json();
        console.log("Assigned Budget", departmentName, assignedBudget);
        return assignedBudget;
    } catch (error) {
        console.error("Error fetching assigned budget:", error);
        return null;
    }
}

// API to get Total Unpaid Expenditure by User
async function apiTotalExpense() {
    const user = getUser();
    if (!user) return;

    try {
        const response = await fetch(`${BASE_URL}/expenses/sum/${user.userId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch total expense amount");
        }
        const totalExpense = await response.json(); // Return the total sum of expenses
        console.log("Total Expenses:", totalExpense);
        return totalExpense;
    } catch (error) {
        console.error("Error fetching total expense amount:", error);
        return 0; // Return 0 in case of an error
    }
}

// API to Delete Expense on Employee Dashboard
async function apiDeleteExpense(expenseId) {

    try {
        const response = await fetch(`${BASE_URL}/expenses/delete/${expenseId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete expense");
        }

        const message = await response.text();
        return message; // Display success message
    } 
    catch (error) {
        console.error("Error deleting expense:", error);
        alert("Error deleting expense!");
    }
}

//----------------------------------------- Sort, Filter, Search ----------------------------------------------

// Function to search expenses by Name
function searchExpenses(expenses, query) {
    if (!query.trim()) return expenses; // Return all if search is empty
    return expenses.filter(expense =>
        expense.expenseName.toLowerCase().includes(query.toLowerCase())
    );
}

// Function to filter expenses based on category or status
function filterExpenses(expenses, filterField, filterValue) {
    if (!filterValue || filterValue === "All") return expenses; // No filter applied

    return expenses.filter(expense => {
        const fieldPath = filterField.split('.'); // Handle nested properties
        let value = expense;

        // Traverse through object properties
        for (const key of fieldPath) {
            value = value?.[key]; // Use optional chaining to avoid errors
        }

        return value === filterValue;
    });
}

// Function to sort by Date and Amount
function sortExpenses(expenses, sortField, isAscending) {
    return [...expenses].sort((a, b) => {
        let valA = a[sortField], valB = b[sortField];

        // Convert date strings to Date objects before sorting
        if (sortField === "expenseDate") {
            valA = new Date(valA);
            valB = new Date(valB);
        }

        // If values are strings, use localeCompare for proper sorting
        if (typeof valA === "string" && typeof valB === "string") {
            return isAscending ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }

        // Numeric sorting (for amount, etc.)
        return isAscending ? valA - valB : valB - valA;
    });
}

function handleSortSelection(expenses) {
    const selectedSort = document.querySelector('input[name="sort1"]:checked').value;
    let sortField = "";
    let isAscending = true;

    if (selectedSort === "Date") {
        sortField = "expenseDate";
        isAscending = true; // Newest first
    } else if (selectedSort === "Amount") {
        sortField = "expenseAmount";
        isAscending = false; // Highest amount first
    } else {
        // No sorting
        updateExpenseTable(expenses);
        return;
    }

    const sortedExpenses = sortExpenses(expenses, sortField, isAscending);
    updateExpenseTable(sortedExpenses);
}