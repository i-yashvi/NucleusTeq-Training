
/* const addBudgetButtons = document.querySelectorAll(".add-budget");
addBudgetButtons.forEach(button => {
    button.addEventListener("click", openBudgetModal);
});
const addBudgetList = document.querySelectorAll(".add-budget-list");
addBudgetList.forEach(button => {
    button.addEventListener('click', function() {
        alert("Budget added successfully!");
        addBudgetData();
        clearObject();
    });
}); */

//-------------------------------------------------------------------------

redirectToDashboard(); 

let expenses = [];
let assignedBudgetHR = 0;
let currentBudgetHR = 0;
let assignedBudgetIT = 0;
let currentBudgetIT = 0;
let assignedBudgetFIN = 0;
let currentBudgetFIN = 0;

fetchAndDisplayExpenses();
fetchAndDisplayBudget();

async function fetchAndDisplayExpenses() {
    expenses = await apiFetchExpenses(); // Store fetched expenses in global array
    updateExpenseTable(expenses); // Dynamically update table with latest data 
}

async function fetchAndDisplayBudget() {
    const deptHR ="HR";
    const deptIT ="IT";
    const deptFIN ="FINANCE";

    budgetEndDateHR = await apiFetchEndDateByName(deptHR);
    document.getElementById("hrDeptBudEnd").textContent = budgetEndDateHR;

    currentBudgetHR = await apiFetchCurrentBudgetByName(deptHR);
    document.getElementById("hrDeptCurrBud").textContent = currentBudgetHR;

    budgetEndDateIT = await apiFetchEndDateByName(deptIT);
    document.getElementById("itDeptBudEnd").textContent = budgetEndDateIT;

    currentBudgetIT = await apiFetchCurrentBudgetByName(deptIT);
    document.getElementById("itDeptCurrBud").textContent = currentBudgetIT;

    budgetEndDateIT = await apiFetchEndDateByName(deptFIN);
    document.getElementById("finDeptBudEnd").textContent = budgetEndDateIT;

    currentBudgetFIN = await apiFetchCurrentBudgetByName(deptFIN);
    document.getElementById("finDeptCurrBud").textContent = currentBudgetFIN;
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
        document.getElementById("finance-table").style.borderBottom='1.5px solid var(--theme)';

        const row = document.createElement("tr");
        let receiptHTML = expense.expenseReceipt ? 
        `<a href="${expense.expenseReceipt}" target="_blank">View</a>` : "—";

        row.innerHTML = `
            <td>${expense.expenseName}</td>
            <td>${expense.expenseAmount}</td>
            <td>${expense.expenseType}</td>
            <td>${expense.expenseDate}</td>
            <td>${receiptHTML}</td>
            <td>${expense.department.departmentName}</td>
        `;
        if(expense.expenseStatus === "APPROVED") {
            row.innerHTML += `
            <td style="width: 100%; display: flex; justify-content: center; align-items: center; border-left: 0; border-top: 0">
                <button class="btn pay-btn" onclick="updateStatus(${expense.expenseId}, 'PAID')" style="width:55%;" id="btnId1">Pay</button>
            </td>
        `;
        }
        else row.innerHTML += `<td>${expense.expenseStatus}</td>`;
        tableBody.appendChild(row);
    });
}

async function updateStatus(expenseId, newStatus) {
    try {
        if (!confirm("Are you sure you want to pay this expense?")) return;
        const response = await apiUpdateExpenseStatus(expenseId, newStatus);
        
        await fetchAndDisplayExpenses();
        await fetchAndDisplayBudget();
        alert(response);

    } catch (error) {
        alert("Failed to update expense status. Please try again.");
    }
};

/* async function resetData() {
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
} */

document.getElementById("searchInput").addEventListener("input", (event) => {
    const searchQuery = event.target.value;
    const filteredExpenses = searchExpenses(expenses, searchQuery);
    updateExpenseTable(filteredExpenses);
});

document.getElementById("filterSelect").addEventListener("change", () => {
    const selectedFilter = document.getElementById("filterSelect").value;
    let filteredExpenses;

    if (["ESSENTIAL", "DISCRETIONARY", "HYBRID"].includes(selectedFilter)) {
        filteredExpenses = filterExpenses(expenses, "expenseType", selectedFilter);
    } 
    else if (["HR", "IT", "FINANCE"].includes(selectedFilter)) {
        filteredExpenses = filterExpenses(expenses, "department.departmentName", selectedFilter);
    } 
    else if (["APPROVED", "PAID"].includes(selectedFilter)) {
        filteredExpenses = filterExpenses(expenses, "expenseStatus", selectedFilter);
    } 
    else {
        filteredExpenses = expenses; // Show all if no valid filter
    }

    updateExpenseTable(filteredExpenses);
});

document.querySelectorAll('input[name="sort1"]').forEach(radio => {
    radio.addEventListener("change", () => handleSortSelection(expenses));
});


document.querySelectorAll(".add-budget-btn").forEach(button => {
    const deptName = button.getAttribute("data-dept-name");
    //console.log(deptName);
    sessionStorage.setItem("selectedDeptName", deptName);
    button.addEventListener("click", openBudgetModal);
});

document.querySelectorAll(".add-budget-list").forEach(button => {
    button.addEventListener('click', function() {
        addBudget();
        //clearObject();
    });
}); 

document.getElementById("logout").addEventListener("click", logout);