async function editExpense(expenseId) {
    return;
}

//----------------------------------------------------------------------------------------

redirectToDashboard(); 

let expenses = [];
let totalExpense = 0;
let currentBudget = 0;

fetchAndDisplayExpenses();
fetchAndDisplayBudget();

async function fetchAndDisplayExpenses() {
    expenses = await apiFetchExpenses(); // Store fetched expenses in global array
    //console.log(expenses);
    updateExpenseTable(expenses); // Dynamically update table with latest data  
    totalExpense = await apiTotalExpense();
    document.getElementById("total-expense").innerText = totalExpense;
}

async function fetchAndDisplayBudget() {
    const user = getUser();
    currentBudget = await apiFetchCurrentBudgetByName(user.deptName);
    document.getElementById("current-budget").innerText = currentBudget;
}

function updateExpenseTable(expenseList) {
    let tableBody = document.getElementById("table-body");
    tableBody.innerHTML = ""; // Clear existing rows
    if (expenseList.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; color: grey; font-weight: 300;">
                    <h3>No Transactions!</h3>
                </td>
            </tr>
        `; return; 
    }

    expenseList.forEach(expense => {
        document.getElementById("employee-table").style.borderBottom='1.5px solid var(--theme)';

        const row = document.createElement("tr");
        let receiptHTML = expense.expenseReceipt ? 
        `<a href="${expense.expenseReceipt}" target="_blank">View</a>` : "—";

        row.innerHTML = `
            <td>${expense.expenseName}</td>
            <td>${expense.expenseAmount}</td>
            <td>${expense.expenseType}</td>
            <td>${expense.expenseDate}</td>
            <td>${receiptHTML}</td>
        `;
        if(expense.expenseStatus == "PENDING"){
            row.innerHTML += `
                <td><div class="btn-group1">
                    <button class="btn" id="btnId1" onclick="editExpense(${expense.expenseId})">Edit</button>
                    <button class="btn" id="btnId2" onclick="deleteExpense(${expense.expenseId})">Delete</button>
                </div></td>
            `;
        }
        else row.innerHTML += `<td>${expense.expenseStatus}</td>`;
        tableBody.appendChild(row);
    });
}

async function deleteExpense(expenseId) {
    const response = await apiDeleteExpense(expenseId);
    await fetchAndDisplayExpenses();
    alert(response);
}

async function resetData() {
    const user = getUser();
    try {
        if (!user) {
            console.error("User not found. Redirecting to login...");
            window.location.href = "/index.html";
            return;
        }
        setTimeout(() => {
            fetchAndDisplayBudget();
            fetchAndDisplayExpenses();
        }, 500);
    } 
    catch (error) {
        console.error("Error refreshing dashboard:", error);
        alert("Failed to refresh data.");
    }
}

document.getElementById("searchInput").addEventListener("input", (event) => {
    const searchQuery = event.target.value;
    const filteredExpenses = searchExpenses(expenses, searchQuery);
    updateExpenseTable(filteredExpenses);
});

document.getElementById("filterSelect").addEventListener("change", () => {
    const selectedFilter = document.getElementById("filterSelect").value;

    let filteredExpenses;

    if (selectedFilter === "ESSENTIAL" || selectedFilter === "DISCRETIONARY" || selectedFilter === "HYBRID"){
        filteredExpenses = filterExpenses(expenses, "expenseType", selectedFilter);
    }
    else if (selectedFilter === "APPROVED" || selectedFilter === "REJECTED" || selectedFilter === "PENDING" || selectedFilter === "PAID") {
        filteredExpenses = filterExpenses(expenses, "expenseStatus", selectedFilter);
    }
    else
    filteredExpenses = filterExpenses(expenses, "All", selectedFilter);

    updateExpenseTable(filteredExpenses);
});

document.querySelectorAll('input[name="sort1"]').forEach(radio => {
    radio.addEventListener("change", () => handleSortSelection(expenses));
});


document.getElementById("add-expense-btn").addEventListener("click", openExpenseModal);

document.getElementById("add-expense").addEventListener('click', () => {
    addExpense();
    //closeModal();
});

document.getElementById("reset-data").addEventListener("click", resetData);

document.getElementById("logout-button").addEventListener("click", logout);