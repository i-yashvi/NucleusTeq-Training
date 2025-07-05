redirectToDashboard(); 

let expenses = [];
let totalExpense = 0;
let currentBudget = 0;

fetchAndDisplayExpenses();
fetchAndDisplayBudget();

async function fetchAndDisplayExpenses() {
    expenses = await apiFetchExpenses(); 
    //console.log(expenses);
    updateExpenseTable(expenses); 
    totalExpense = await apiTotalExpense();
    document.getElementById("total-expense").innerText = totalExpense;
}

async function fetchAndDisplayBudget() {
    const user = getUser();
    document.getElementById("username").textContent = getFirstName(user.userName);
    currentBudget = await apiFetchCurrentBudgetByName(user.deptName);
    document.getElementById("current-budget").innerText = currentBudget;
}

async function updateExpenseTable(expenseList) {
    let tableBody = document.getElementById("table-body");
    tableBody.innerHTML = ""; 
    if (expenseList.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; color: grey; font-weight: 300;">
                    <h3>No Transactions!</h3>
                </td>
            </tr>
        `; return; 
    }

    for (const expense of expenseList) {
        document.getElementById("employee-table").style.borderBottom='1.5px solid var(--theme)';
        const row = document.createElement("tr");
        
        let receiptHTML = "-"; 
        if (expense.expenseReceipt) {
            const receiptUrl = await fetchReceipt(expense.expenseId);
            if (receiptUrl) {
                receiptHTML = `
                    <a href="${receiptUrl}" target="_blank"><img class="file-image" src="../images/file_save.svg" width="25"/></a>
                `;
            }
        }

        const expenseType = toTitleCase(expense.expenseType);
        const expenseStatus = toTitleCase(expense.expenseStatus);
        row.innerHTML = `
            <td>${expense.expenseName}</td>
            <td>${expense.expenseAmount}</td>
            <td>${expenseType}</td>
            <td>${expense.expenseDate}</td>
            <td>${receiptHTML}</td>
            <td>${expenseStatus}</td>
        `;
        
        if(expense.expenseStatus == "PENDING"){ 
            row.innerHTML += `
                <div class="btn-group1">
                    <img src="../images/edit.svg" class="btn1" id="edit" alt="edit" onclick="editExpense(${expense.expenseId})">
                    <img src="../images/delete.svg" class="btn1" id="delete" alt="delete" onclick="deleteExpense(${expense.expenseId})">
                </div>
            `;
        }
        else if(expense.expenseStatus == "APPROVED"){ 
            row.innerHTML += `<td>-</td>`;
        }
        else { 
            row.innerHTML += `
                <div class="btn-group1">
                    <img src="../images/delete.svg" class="btn1" id="delete" alt="delete" onclick="deleteExpense(${expense.expenseId})">
                </div>
            `;
        }

        tableBody.appendChild(row);
    };
}

async function deleteExpense(expenseId) {
    if (!confirm("Are you sure you want to DELETE this expense?")) return;
    const response = await apiDeleteExpense(expenseId);
    await fetchAndDisplayExpenses();
    alert(response);
}

async function editExpense(expenseId) {
    try {
        const response = await fetch(`http://localhost:9090/expenses/${expenseId}`);
        if (!response.ok) throw new Error("Failed to fetch expense details");

        const expense = await response.json(); 

        // Fill the form with existing values
        document.getElementById("name").value = expense.expenseName;
        document.getElementById("amount").value = expense.expenseAmount;
        document.getElementById("select-type").value = expense.expenseType;
        document.getElementById("date").value = expense.expenseDate;
        
        // Expense ID for updating
        document.getElementById("expenseId").value = expense.expenseId; 

        openExpenseModal();
    } 
    catch (error) {
        console.error("Error fetching expense:", error);
        alert("Error loading expense details.");
    }
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
});

document.getElementById("reset-data").addEventListener("click", resetData);

document.getElementById("logout-button").addEventListener("click", logout);