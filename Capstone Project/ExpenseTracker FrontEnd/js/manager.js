redirectToDashboard(); 

let expenses = [];
let assignedBudget = 0;
let currentBudget = 0;

fetchAndDisplayExpenses();
fetchAndDisplayBudget();

async function fetchAndDisplayExpenses() {
    expenses = await apiFetchExpenses(); 
    updateExpenseTable(expenses); 
}

async function fetchAndDisplayBudget() {
    const user = getUser();
    document.getElementById("username").textContent = getFirstName(user.userName);
    currentBudget = await apiFetchCurrentBudgetByName(user.deptName);
    currentBudget = await apiFetchCurrentBudgetByName(user.deptName);
    assignedBudget = await apiFetchAssignedBudgetByName(user.deptName);
    document.getElementById("current-budget").innerText = currentBudget;
    document.getElementById("assigned-budget").innerText = assignedBudget;
}

async function updateExpenseTable(expenseList) {
    const user1 = getUser();
    console.log(user1.userId);
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
        document.getElementById("manager-table").style.borderBottom='1.5px solid var(--theme)';
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
        console.log("usernew", expense.user.userId);

        const expenseType = toTitleCase(expense.expenseType);
        const expenseStatus = toTitleCase(expense.expenseStatus);
        row.innerHTML = `
            <td style="text-align: start;">${expense.expenseName}</td>
            <td>${expense.expenseAmount}</td>
            <td>${expenseType}</td>
            <td>${expense.expenseDate}</td>
            <td>${receiptHTML}</td>
            <td>${expense.user.fullName}</td>
            <td>${expenseStatus}</td>
        `;
        if(expense.expenseStatus == "PENDING" && expense.user.userId == user1.userId){
            row.innerHTML += `
                <div class="btn-group1">
                    <img src="../images/edit.svg" class="btn1" id="edit" alt="edit" onclick="editExpense(${expense.expenseId})">
                    <img src="../images/delete.svg" class="btn1" id="delete" alt="delete" onclick="deleteExpense(${expense.expenseId})">
                </div>
            `;
        }
        else if(expense.expenseStatus == "PENDING"){
            row.innerHTML += `
                <td><div class="btn-group2">
                    <button class="btn" onclick="updateStatus(${expense.expenseId}, 'APPROVED')" id="btnId1">Approve</button>
                    <button class="btn" onclick="updateStatus(${expense.expenseId}, 'REJECTED')" id="btnId2">Reject</button>
                </div></td>
            `;
        }
        else if((expense.expenseStatus == "PAID" && expense.user.userId == user1.userId) || (expense.expenseStatus == "REJECTED" && expense.user.userId == user1.userId)){
            row.innerHTML += `
                <div class="btn-group1">
                    <img src="../images/delete.svg" class="btn1" id="delete" alt="delete" onclick="deleteExpense(${expense.expenseId})">
                </div>
            `;
        }
        else { 
            row.innerHTML += `
                <td>-</td>
            `;
        }

        tableBody.appendChild(row);
    };
}

async function deleteExpense(expenseId) {
    const response = await apiDeleteExpense(expenseId);
    await fetchAndDisplayExpenses();
    alert(response);
}

async function updateStatus (expenseId, newStatus) {
    try {
        let confirmation = "";
        if (newStatus == 'APPROVED') {
            confirmation = confirm(`Are you sure you want to APPROVE this expense?`);
            if (!confirmation) return;
        }
        else if (newStatus == 'REJECTED') {
            confirmation = confirm(`Are you sure you want to REJECT this expense?`);
            if (!confirmation) return;
        }
        console.log(newStatus);
        const response = await apiUpdateExpenseStatus(expenseId, newStatus);
        await fetchAndDisplayExpenses();
        alert(response);
    } catch (error) {
        alert("Failed to update expense status. Please try again.");
    }
};

async function editExpense(expenseId) {
    try {
        const response = await fetch(`http://localhost:9090/expenses/${expenseId}`);
        if (!response.ok) throw new Error("Failed to fetch expense details");

        const expense = await response.json();
        
        document.getElementById("name").value = expense.expenseName;
        document.getElementById("amount").value = expense.expenseAmount;
        document.getElementById("select-type").value = expense.expenseType;
        document.getElementById("date").value = expense.expenseDate;
        
        document.getElementById("expenseId").value = expense.expenseId; // Hidden 

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