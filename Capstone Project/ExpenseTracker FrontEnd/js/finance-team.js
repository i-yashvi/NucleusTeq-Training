redirectToDashboard(); 

let expenses = [];
let assignedBudgetHR = 0;
let currentBudgetHR = 0;
let assignedBudgetIT = 0;
let currentBudgetIT = 0;
let assignedBudgetFIN = 0;
let currentBudgetFIN = 0;

fetchAndDisplayDepartments();
fetchAndDisplayExpenses();

async function fetchAndDisplayExpenses() {
    const user = getUser();
    document.getElementById("username").textContent = getFirstName(user.userName);
    currentBudget = await apiFetchCurrentBudgetByName(user.deptName);
    expenses = await apiFetchExpenses(); 
    updateExpenseTable(expenses); 
}

async function fetchAndDisplayDepartments() {

    const departments = await apiFetchDepartments();

    const container = document.querySelector(".my-row.fin-row");
    container.innerHTML = ""; 

    departments.forEach(dept => {
        const deptCard = document.createElement("div");
        deptCard.classList.add("my-card");
        const deptName = toTitleCase(dept.departmentName);
        const formattedDeptName = deptName.trim().toUpperCase();

        deptCard.innerHTML = `
            <h2 class="card-title">${deptName} Department</h2>
            <p><span class="budget-title">Current Budget: </span>₹<span class="budget" id="${formattedDeptName.toLowerCase()}DeptCurrBud">${dept.currentBudget || "0"}</span></p>
            <p><span class="budget-title">End Date: </span><span class="budget" id="${formattedDeptName.toLowerCase()}DeptBudEnd">${dept.endDate || "Not Set"}</span></p>
            <div class="btn btn-blue add-budget-btn" data-dept-name="${dept.departmentName}"><img src="../images/add_2.svg" style="margin-right: 0.5rem;"/>Add Budget</div>
        `;

        container.appendChild(deptCard);

        deptCard.querySelector(".add-budget-btn").addEventListener("click", function () {
            sessionStorage.setItem("selectedDeptName", formattedDeptName);
            console.log(formattedDeptName);
            openBudgetModal();
        });
    });
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
        document.getElementById("finance-table").style.borderBottom='1.5px solid var(--theme)';
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
        row.innerHTML = `
            <td style="text-align: start;">${expense.expenseName}</td>
            <td>${expense.expenseAmount}</td>
            <td>${expenseType}</td>
            <td>${expense.expenseDate}</td>
            <td>${receiptHTML}</td>
            <td>${expense.department.departmentName}</td>
        `;

        if(expense.expenseStatus == "APPROVED") {
            row.innerHTML += `
            <td style="width: 100%; display: flex; justify-content: center; align-items: center; border-left: 0; border-top: 0">
                <button class="btn" onclick="updateStatus(${expense.expenseId}, 'PAID')" style="width:40%;" id="btnId1">Pay</button>
            </td>
        `;
        }
        else if(expense.expenseStatus == "PENDING") {
            row.innerHTML += `
            <td><div class="btn-group2">
                <button class="btn" onclick="updateStatus(${expense.expenseId}, 'APPROVED')" id="btnId1">Approve</button>
                <button class="btn" onclick="updateStatus(${expense.expenseId}, 'REJECTED')" id="btnId2">Reject</button>
            </div></td>
        `;
        }
        else {
            const expenseStatus = toTitleCase(expense.expenseStatus);
            row.innerHTML += `<td>${expenseStatus}</td>`;
        }

        tableBody.appendChild(row);
    };
}

async function updateStatus(expenseId, newStatus) {
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
        else {
            (confirmation = confirm("Are you sure you want to PAY this expense?"));
            if (!confirmation) return;
        }
        const response = await apiUpdateExpenseStatus(expenseId, newStatus);
        
        await fetchAndDisplayExpenses();
        await fetchAndDisplayBudget();
        alert(response);

    } catch (error) {
        alert("Failed to update expense status. Please try again.");
    }
};

document.getElementById("addDept").addEventListener("click", async function () {
    const deptName = prompt("Enter new department name:");

    if (!deptName || deptName.trim() === "") {
        alert("Department name cannot be empty!");
        return;
    }
    const formattedDeptName = deptName.trim().toUpperCase();

    await apiCreateDepartment(formattedDeptName);
    await fetchAndDisplayDepartments();
});

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
    else if (["APPROVED", "PAID", "PENDING"].includes(selectedFilter)) {
        filteredExpenses = filterExpenses(expenses, "expenseStatus", selectedFilter);
    } 
    else {
        filteredExpenses = expenses; 
    }

    updateExpenseTable(filteredExpenses);
});

document.querySelectorAll('input[name="sort1"]').forEach(radio => {
    radio.addEventListener("change", () => handleSortSelection(expenses));
});

document.querySelectorAll(".add-budget-list").forEach(button => {
    button.addEventListener('click', function() {
        addBudget();
    });
}); 

document.getElementById("logout").addEventListener("click", logout);