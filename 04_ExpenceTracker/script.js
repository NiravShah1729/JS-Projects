document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseName = document.getElementById("expense-name");
  const expenseAmt = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmtDisplay = document.getElementById("total-amount");

  let expense = JSON.parse(localStorage.getItem("expenses")) || [];
  let totalAmt = calculateTotal();
    renderExpenses();
  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = expenseName.value.trim();
    const amt = parseFloat(expenseAmt.value.trim());

    if (name !== "" && !isNaN(amt) && amt > 0) {
      const newExpense = {
        id: Date.now(),
        name,
        amount: amt,
      };

      expense.push(newExpense);
      saveExpensesToLocal();
      renderExpenses();
      updateTotal();

      expenseName.value = "";
      expenseAmt.value = "";
    }
  });

  function calculateTotal() {
    return expense.reduce((sum, exp) => sum + exp.amount, 0);
  }

  function updateTotal() {
    totalAmt = calculateTotal();
    totalAmtDisplay.textContent = totalAmt.toFixed(2);
  }

  function saveExpensesToLocal() {
    localStorage.setItem("expenses", JSON.stringify(expense));
  }

  function renderExpenses() {
    expenseList.innerHTML = "";
    expense.forEach((exp) => {
      const li = document.createElement("li");
      li.innerHTML=`
      ${exp.name} - $${exp.amount}
      <button data-id="${exp.id}">Delete</button>`;
      expenseList.appendChild(li);
    });
  }

  // Load from localStorage on startup
  function loadExpensesFromLocal() {
    const saved = localStorage.getItem("expenses");
    if (saved) {
      expense = JSON.parse(saved);
      renderExpenses();
      updateTotal();
    }
  }

  expenseList.addEventListener("click",(e)=>{
    if(e.target.tagName === "BUTTON") {
        const expenseId = parseInt(e.target.getAttribute("data-id"))
        expense = expense.filter(expense => expense.id !== expenseId);
        saveExpensesToLocal();
        renderExpenses();
        updateTotal();
    }
  })
});
