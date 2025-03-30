/* async function addExpense() {
    const user = getUser(); 

    const expenseName = document.getElementById("name").value;
    const expenseAmount = parseFloat(document.getElementById("amount").value);
    const expenseType = document.getElementById("select-type").value;
    const expenseDate = document.getElementById("date").value;
    const expenseReceipt = document.getElementById("receipt").files[0];

    if(!expenseName || !expenseAmount || !expenseType || !expenseDate) {
        console.log(expenseName, expenseAmount, expenseType, expenseDate);
        alert("All fields are mandatory!");
        return;
    }

    try {
        // Fetch current budget before adding expense
        const currentBudget = await apiFetchCurrentBudgetByName(user.deptName);
        if (currentBudget === null) {
            alert("Failed to fetch department budget. Try again.");
            return;
        }
        // Check if expenseAmount exceeds currentBudget
        if (expenseAmount > currentBudget) {
            alert("Cannot add expense! Amount exceeds the department's current budget.");
            return;
        }

        const newExpense = { expenseName, expenseAmount, expenseType, expenseDate, expenseReceipt };
        console.log("Expense data:", newExpense);

        // API to Add Expense
        const response = await apiAddExpense(newExpense);

        if (!response.ok) throw new Error("Failed to add expense.");

        alert("Expense added successfully!");
        document.getElementById("signup-form").reset();
    } catch (error) {
        console.error("Error adding expense:", error);
        alert("Failed to add expense. Try again.");
    }
}
 */
/* async function addExpense() {
    const user = getUser();
    try {
        // Fetch current budget before adding expense
        const currentBudget = await apiFetchCurrentBudgetByName(user.deptName);

        if (currentBudget === null) {
            alert("Failed to fetch department budget. Try again.");
            return;
        }

        const expenseName = document.getElementById("name").value;
        const expenseAmount = parseFloat(document.getElementById("amount").value);
        const expenseType = document.getElementById("select-type").value;
        const expenseDate = document.getElementById("date").value;
        const expenseReceipt = document.getElementById("receipt").files[0];

        // Check if expenseAmount exceeds currentBudget
        if (expenseAmount > currentBudget) {
            alert("Cannot add expense! Amount exceeds the department's current budget.");
            return;
        }

        // Proceed to add expense if within budget
        const formData = new FormData();
        formData.append("userId", user.userId);
        formData.append("deptId", user.deptId);
        formData.append("expenseName", expenseName);
        formData.append("expenseAmount", expenseAmount);
        formData.append("expenseDate", expenseDate);
        formData.append("expenseType", expenseType);
        if (expenseReceipt) formData.append("expenseReceipt", expenseReceipt);

        await apiAddExpense(formData);
        console.log(response);
        if (!response.ok) throw new Error("Failed to add expense.");

        alert("Expense added successfully!");
    } catch (error) {
        console.error("Error adding expense:", error);
        alert("Failed to add expense. Try again.");
    }
}  */

async function addExpense () {
    const user = getUser();
    /* const userId = localStorage.getItem("userId"); // Ensure you store user ID in localStorage after login
    const deptId = localStorage.getItem("deptId"); // Ensure department ID is stored properly */

    if (!user.userId || !user.deptId) {
        alert("User or Department information is missing.");
        return;
    }

    const expenseName = document.getElementById("name")?.value;
    const expenseAmount = parseFloat(document.getElementById("amount")?.value);
    const expenseType = document.getElementById("select-type")?.value;
    const expenseDate = document.getElementById("date")?.value;
    const expenseReceipt = document.getElementById("receipt")?.files[0];

    if (!expenseName || isNaN(expenseAmount) || !expenseType || !expenseDate) {
        alert("All fields except receipt are mandatory!");
        return;
    }
    // Check if expenseAmount exceeds currentBudget
    const currentBudget = await apiFetchCurrentBudgetByName(user.deptName);
    if (expenseAmount > currentBudget) {
        alert("Cannot add expense! Amount exceeds the department's current budget.");
        closeModal();
        return;
    }
    else {
        const expenseData = {
            expenseName,
            expenseAmount,
            expenseType,
            expenseDate,
            expenseReceipt
        };
    
        try {
            const response = await apiAddExpense(expenseData);
            console.log("Name: ", expenseData.expenseName, "Amount: ", expenseData.expenseAmount, "Type: ", expenseData.expenseType, "Date: ", expenseData.expenseDate);
            
            document.querySelector(".modal-form").reset();
            await fetchAndDisplayExpenses();
            alert(response); // Show success message from backend
        } catch (error) {
            alert("Failed to add expense. Please try again.");
        }
    }
};
    

async function addBudget() {
    // Fetch department name stored when button was clicked
    const deptName = sessionStorage.getItem("selectedDeptName");

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
        console.log("Department: ", budgetData.departmentName, "Assigned Budget: ", budgetData.amount, "Start-date: ", budgetData.startDate, "End-date: ", budgetData.endDate);
        
        await fetchAndDisplayBudget();
        closeModal();
        alert(response); // Show success message from backend
    } 
    catch (error) {
        alert("Failed to add budget. Please try again.");
    }
}

//------------------------------------------------------------------------------------------------

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