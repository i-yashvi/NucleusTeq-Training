/* const addExpenseButtons = document.querySelectorAll(".add-expense");
addExpenseButtons.forEach(button => {
    button.addEventListener("click", openExpenseModal);
});

const addExpenseList = document.querySelectorAll(".add-expense-list");
addExpenseList.forEach(button => {
    button.addEventListener('click', function() {
        addExpenseData();
        clearObject();
    });
}); */

//-----------------------------------------------------------------------------

redirectToDashboard(); 

let expenses = [];
let assignedBudget = 0;
let currentBudget = 0;

fetchAndDisplayExpenses();
fetchAndDisplayBudget();

async function fetchAndDisplayExpenses() {
    expenses = await apiFetchExpenses(); // Store fetched expenses in global array
    updateExpenseTable(expenses); // Dynamically update table with latest data 
}

async function fetchAndDisplayBudget() {
    const user = getUser();
    currentBudget = await apiFetchCurrentBudgetByName(user.deptName);
    assignedBudget = await apiFetchAssignedBudgetByName(user.deptName);
    document.getElementById("current-budget").innerText = currentBudget;
    document.getElementById("assigned-budget").innerText = assignedBudget;
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
        document.getElementById("manager-table").style.borderBottom='1.5px solid var(--theme)';

        const row = document.createElement("tr");
        let receiptHTML = expense.expenseReceipt ? 
        `<a href="${expense.expenseReceipt}" target="_blank">View</a>` : "—";

        row.innerHTML = `
            <td>${expense.expenseName}</td>
            <td>${expense.expenseAmount}</td>
            <td>${expense.expenseType}</td>
            <td>${expense.expenseDate}</td>
            <td>${receiptHTML}</td>
            <td>${expense.user.fullName}</td>
        `;
        if(expense.expenseStatus == "PENDING"){
            row.innerHTML += `
                <td><div class="btn-group2">
                    <button class="btn" onclick="updateStatus(${expense.expenseId}, 'APPROVED')" id="btnId1">Approve</button>
                    <button class="btn" onclick="updateStatus(${expense.expenseId}, 'REJECTED')" id="btnId2">Reject</button>
                </div></td>`
        }
        else row.innerHTML += `<td>${expense.expenseStatus}</td>`

        tableBody.appendChild(row);
    });
}

/* async function updateStatus(expenseId, value) {
    const newStatus="";
    if(value == "APPROVED")
        newStatus = "APPROVED";
    else if(value == "REJECTED")
        newStatus = "REJECTED";
    console.log(expenseId, newStatus);
    await apiUpdateStatus(expenseId, newStatus);
}
async function updateStatus (expenseId, newStatus) {
    try {
        const confirmation = confirm(`Are you sure you want to ${newStatus.toLowerCase()} this expense?`);
        if (!confirmation) return;

        const response = await apiUpdateExpenseStatus(expenseId, newStatus);

        alert(response);
        window.location.reload();
    } catch (error) {
        alert("Failed to update expense status. Please try again.");
    }
}; */

async function updateStatus (expenseId, newStatus) {
    try {
        let confirmation = "";
        if (newStatus == 'APPROVED') {
            confirmation = confirm(`Are you sure you want to approve this expense?`);
            if (!confirmation) return;
        }
        else if (newStatus == 'REJECTED') {
            confirmation = confirm(`Are you sure you want to reject this expense?`);
            if (!confirmation) return;
        }
        console.log(newStatus);
        const response = await apiUpdateExpenseStatus(expenseId, newStatus);
        await fetchAndDisplayExpenses();
        alert(response);
        //window.location.reload();
    } catch (error) {
        alert("Failed to update expense status. Please try again.");
    }
};

{/* <div class="radio-group1">
    <div class="action-button btn1 btn">
        <input type="radio" id="approve${expense.expenseId}" name="expense${expense.expenseId}" value="APPROVED" class="radio-input1">
        <label for="approve${expense.expenseId}" class="radio-button1">Approve</label>
    </div>
    <div class="action-button btn2 btn">
        <input type="radio" id="reject${expense.expenseId}" name="expense${expense.expenseId}" value="REJECTED" class="radio-input1">
        <label for="reject${expense.expenseId}" class="radio-button1">Reject</label> 
    </div>
</div> */}

/* if(expense.expenseStatus == "PENDING"){
    row.innerHTML += `
        <td> <div id="status-action" class="btn-group">
            <button class="btnq action${expense.expenseStatus}" value="APPROVED" id="approve">Approve</button>
            <button class="btnq action${expense.expenseStatus}" value="REJECTED" id="reject">Reject</button>
        </div> </td>`;
    }
    else row.innerHTML += `<td>${expense.expenseStatus}</td>`

    document.querySelectorAll(".btnq").forEach(button => {
        button.addEventListener('click', function() {
            button.classList.add("selected");
            document.querySelectorAll(".btnq").forEach(b => {
                if (b !== button) {
                    b.disabled = true;
                    b.style.display = "none";
                }
            });
        });
    }); */


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