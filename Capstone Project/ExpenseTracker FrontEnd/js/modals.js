// Add a new expense or update an existing one
async function addExpense() {
    const user = getUser();

    if (!user.userId || !user.deptId) {
        alert("User or Department information is missing.");
        return;
    }

    const expenseId = document.getElementById("expenseId").value; // Get hidden ID
    const expenseName = document.getElementById("name")?.value;
    const expenseAmount = parseFloat(document.getElementById("amount")?.value);
    const expenseType = document.getElementById("select-type")?.value;
    const expenseDate = document.getElementById("date")?.value;
    const expenseReceipt = document.getElementById("receipt")?.files[0];

    if (!expenseName || isNaN(expenseAmount) || !expenseType || !expenseDate) {
        alert("All fields except receipt are mandatory!");
        return;
    }

    const currentBudget = await apiFetchCurrentBudgetByName(user.deptName);
    if (expenseAmount > currentBudget) {
        alert("Cannot add expense! Amount exceeds the department's current budget.");
        closeModal();
        return;
    }

    const expenseData = { expenseId, expenseName, expenseAmount, expenseType, expenseDate, expenseReceipt };

    try {
        let response;
        if (expenseId == 0) {
            // Adding new expense
            response = await apiAddExpense(expenseData);
            document.querySelector(".modal-form").reset();
        } else {
            // Editing existing expense
            response = await apiEditExpense(expenseData);
            closeModal();
        }
        await fetchAndDisplayExpenses();
        alert(response);
    } 
    catch (error) {
        console.error("Error saving expense:", error);
        alert("Error saving expense.");
    }
}


async function addBudget() {
    const deptName = sessionStorage.getItem("selectedDeptName");
    console.log(deptName);

    const assignedBudget = document.getElementById("assigned-budget").value;
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;

    if (!deptName) {
        alert("Error: Department information missing!");
        return;
    }

    const budgetData = {
        departmentName: deptName,
        assignedBudget: assignedBudget,
        startDate: startDate,
        endDate: endDate
    };

    try {
        const response = await apiAddBudget(budgetData);
        console.log(budgetData);
        await fetchAndDisplayDepartments();
        closeModal();
        console.log("Dept:", deptName);
        alert(response);
    } 
    catch (error) {
        alert("Failed to add budget. Please try again.");
    }
}


function openExpenseModal() {
    document.getElementById("modalOverlayExpense").style.display = 'flex';
    document.querySelector(".dashboard").classList.add("blur");
    document.getElementById("navbar").classList.add("blur");
    document.getElementById("footer").classList.add("blur");
}

function openBudgetModal() {
    document.getElementById("modalOverlayBudget").style.display = 'flex';
    document.querySelector(".dashboard").classList.add("blur");
    document.getElementById("navbar").classList.add("blur");
    document.getElementById("footer").classList.add("blur");
}

function closeModal() {
    document.querySelector(".modal-overlay").style.display = "none";
    document.querySelector(".dashboard").classList.remove("blur");
    document.getElementById("navbar").classList.remove("blur");
    document.getElementById("footer").classList.remove("blur");
    document.querySelector(".modal-form").reset();
}

const closeExpenseModals = document.querySelectorAll(".close-modal-btn");
closeExpenseModals.forEach(button => {
    button.addEventListener("click", closeModal);
});