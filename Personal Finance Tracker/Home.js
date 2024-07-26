let checkingBalance = 0;
        let savingsBalance = 0;
        let creditCardBalance = 0;
        let transactionList = [];
        let monthlyIncome = 0;
        let monthlyExpenses = 0;
        let remainingBudget = 0;
        let expenseList = [];

        // Initialize Chart.js
        const ctx = document.getElementById('expensesChart').getContext('2d');
        const expensesChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#34495e'],
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: 'right',
                },
            },
        });

        function saveBalances() {
            checkingBalance = parseFloat(document.getElementById('checking').value) || 0;
            savingsBalance = parseFloat(document.getElementById('savings').value) || 0;
            creditCardBalance = parseFloat(document.getElementById('creditCard').value) || 0;
            displayBalances();
        }

        function displayBalances() {
            alert(`Checking Account: $${checkingBalance.toFixed(2)}\nSavings Account: $${savingsBalance.toFixed(2)}\nCredit Card: $${creditCardBalance.toFixed(2)}`);
        }

        function saveTransaction() {
            const date = prompt("Enter transaction date:");
            const details = prompt("Enter transaction details:");
            const amount = parseFloat(prompt("Enter transaction amount:") || 0);

            const transaction = `${date} - ${details}: $${amount.toFixed(2)}`;
            transactionList.push(transaction);

            displayTransactions();
        }

        function displayTransactions() {
            const transactionListElement = document.getElementById('transactionList');
            transactionListElement.innerHTML = '';
            
            for (const transaction of transactionList) {
                const listItem = document.createElement('li');
                listItem.textContent = transaction;
                transactionListElement.appendChild(listItem);
            }
        }

        function calculateRemainingBudget() {
            monthlyIncome = parseFloat(document.getElementById('monthlyIncome').value) || 0;
            monthlyExpenses = parseFloat(document.getElementById('monthlyExpenses').value) || 0;
            remainingBudget = monthlyIncome - monthlyExpenses;

            document.getElementById('remainingBudget').value = remainingBudget.toFixed(2);
        }

        function saveBudget() {
            alert(`Monthly Income: $${monthlyIncome.toFixed(2)}\nMonthly Expenses: $${monthlyExpenses.toFixed(2)}\nRemaining Budget: $${remainingBudget.toFixed(2)}`);
        }

        function openModal(title, content) {
            const modal = document.getElementById('reportModal');
            const modalTitle = document.getElementById('reportTitle');
            const modalContent = document.getElementById('reportContent');

            modalTitle.textContent = title;
            modalContent.innerHTML = content;
            modal.style.display = 'flex';
        }

        function closeModal() {
            const modal = document.getElementById('reportModal');
            modal.style.display = 'none';
        }

        function generateIncomeVsExpensesReport() {
            const income = parseFloat(document.getElementById('monthlyIncome').value) || 0;
            const expenses = parseFloat(document.getElementById('monthlyExpenses').value) || 0;
            const reportContent = `Monthly Income: $${income.toFixed(2)}<br>Monthly Expenses: $${expenses.toFixed(2)}<br>Net Income: $${(income - expenses).toFixed(2)}`;
            openModal('Income vs. Expenses Report', reportContent);
        }

        function generateBudgetAdherenceReport() {
            const remainingBudget = parseFloat(document.getElementById('remainingBudget').value) || 0;
            const reportContent = `Remaining Budget: $${remainingBudget.toFixed(2)}`;
            openModal('Budget Adherence Report', reportContent);
        }

        function generateFinancialSummary() {
            const checkingBalance = parseFloat(document.getElementById('checking').value) || 0;
            const savingsBalance = parseFloat(document.getElementById('savings').value) || 0;
            const creditCardBalance = parseFloat(document.getElementById('creditCard').value) || 0;
            const reportContent = `Checking Account: $${checkingBalance.toFixed(2)}<br>Savings Account: $${savingsBalance.toFixed(2)}<br>Credit Card: $${creditCardBalance.toFixed(2)}`;
            openModal('Financial Summary', reportContent);
        }


function saveExpense() {
    const date = document.getElementById('expenseDate').value;
    const expenseDetails = document.getElementById('expenseDetails').value;
    const expenseAmount = parseFloat(document.getElementById('expenseAmount').value) || 0;

    if (date && expenseDetails && expenseAmount) {
        const expense = {
            date: date,
            details: expenseDetails,
            amount: expenseAmount.toFixed(2)
        };

        expenseList.push(expense);

        displayExpenses();
    } else {
        alert('Please enter both expense date, details, and amount.');
    }
}
function deleteExpense(index) {
    expenseList.splice(index, 1);
    displayExpenses();
}
function displayExpenses() {
    const expenseListElement = document.getElementById('expenseList');
    const chartLabels = [];
    const chartData = [];

    expenseListElement.innerHTML = '';

    for (const expense of expenseList) {
        const listItem = document.createElement('li');
        listItem.textContent = `${expense.date} - ${expense.details}: $${expense.amount}`;
        expenseListElement.appendChild(listItem);

        // Extracting labels and amounts for the chart
        chartLabels.push(`${expense.date} - ${expense.details}`);
        chartData.push(parseFloat(expense.amount));
    }

    // Update the pie chart data
    expensesChart.data.labels = chartLabels;
    expensesChart.data.datasets[0].data = chartData;
    expensesChart.update();
}
function deleteAllExpenses() {
    expenseList = [];
    displayExpenses();
}