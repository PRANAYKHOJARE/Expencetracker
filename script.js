document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  renderExpenses();
  updateTotal();

  // Add expense
  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());

    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = { id: Date.now(), name, amount };
      expenses.push(newExpense);
      saveExpensesToLocal();
      renderExpenses();
      updateTotal();
      expenseNameInput.value = "";
      expenseAmountInput.value = "";
    } else {
      alert("⚠️ Please enter a valid expense name and amount!");
    }
  });

  // Render expenses
  function renderExpenses() {
    expenseList.innerHTML = "";
    if (expenses.length === 0) {
      expenseList.innerHTML = `<li style="justify-content:center; color:#aaa;">No expenses yet. Add one!</li>`;
      return;
    }

    expenses.forEach((expense) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.textContent = `${expense.name} - ₹${expense.amount.toFixed(2)}`;

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "✖";
      deleteBtn.setAttribute("data-id", expense.id);

      li.appendChild(span);
      li.appendChild(deleteBtn);
      expenseList.appendChild(li);
    });
  }

  // Calculate total
  function calculateTotal() {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  // Save to local storage
  function saveExpensesToLocal() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  // Update total
  function updateTotal() {
    const total = calculateTotal();
    totalAmountDisplay.textContent = `₹${total.toFixed(2)}`;
  }

  // Delete expense
  expenseList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const expenseId = parseInt(e.target.getAttribute("data-id"));
      expenses = expenses.filter((exp) => exp.id !== expenseId);
      saveExpensesToLocal();
      renderExpenses();
      updateTotal();
    }
  });
});
