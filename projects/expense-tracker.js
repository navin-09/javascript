// # Expense Tracker Project

// You have just finished the module 2. You have learned many important concepts till the session(day) 16. It is time to put everything together and do a project.

// ## Project Requirements

// Create a simple expense tracker where user can add, remove, edit, and categorize expenses.

// > Please Note: This will be a console-based project (no DOM), focusing only on JavaScript logic.

// ### Features to Implement

// Create a `createExpenseTracker()` function that takes a username and an initial budget to expose the following functioanlities:

// - Adding Expense
// - Removing Expense
// - Updating Expense
// - Getting total expenses done by the user
// - Getting expense by category
// - Get the Highest Expense
// - Get the Lowest Expense
// - Get the user info
// - Show all the expenses
// - Update User data

// Please make use of the factory function, closure to keep data private and return only the required features/methods.

// ## Sample User Data Structure

// ```js
//  user: {
//     name: "Tapas",
//     budget: 5000,
//   },
// ```

// ## Sample Expense Data Structure

// ```js
// expenses: [
//     { id: 1, amount: 200, category: "Food", description: "Lunch" },
//     { id: 2, amount: 500, category: "Shopping", description: "New Shoes" },
// ],
// ```

// ## Discussion and Follow up

// Once done, submit the GitHub link on [Discord](https://discord.com/invite/ux9BchWEW3). Please feel free to discuss about the tasks, if you need help. Also, help others to complete it.

function createExpenseTracker(username, initialBudget) {
  let user = {
    name: username,
    budget: initialBudget,
  };

  let expenses = [];
  let expenseId = 1;

  return {
    addExpense(amount, category, description) {
      expenses.push({ id: expenseId++, amount, category, description });
    },

    removeExpense(id) {
      expenses = expenses.filter(expense => expense.id !== id);
    },

    updateExpense(id, newAmount, newCategory, newDescription) {
      const expense = expenses.find(expense => expense.id === id);
      if (expense) {
        expense.amount = newAmount;
        expense.category = newCategory;
        expense.description = newDescription;
      }
    },

    getTotalExpenses() {
      return expenses.reduce((total, expense) => total + expense.amount, 0);
    },

    getExpensesByCategory(category) {
      return expenses.filter(expense => expense.category === category);
    },

    getHighestExpense() {
      return expenses.reduce((max, expense) => (expense.amount > max.amount ? expense : max), expenses[0]);
    },

    getLowestExpense() {
      return expenses.reduce((min, expense) => (expense.amount < min.amount ? expense : min), expenses[0]);
    },

    getUserInfo() {
      return { ...user };
    },

    showAllExpenses() {
      return [...expenses];
    },

    updateUserData(newName, newBudget) {
      user.name = newName;
      user.budget = newBudget;
    },
  };
}

// Example usage:
const tracker = createExpenseTracker("Tapas", 5000);
tracker.addExpense(200, "Food", "Lunch");
tracker.addExpense(500, "Shopping", "New Shoes");
console.log(tracker.getTotalExpenses()); // 700
console.log(tracker.getExpensesByCategory("Food")); // [{ id: 1, amount: 200, category: "Food", description: "Lunch" }]
console.log(tracker.getHighestExpense()); // { id: 2, amount: 500, category: "Shopping", description: "New Shoes" }
console.log(tracker.getLowestExpense()); // { id: 1, amount: 200, category: "Food", description: "Lunch" }
console.log(tracker.getUserInfo()); // { name: "Tapas", budget: 5000 }
tracker.updateUserData("New Tapas", 6000);
console.log(tracker.getUserInfo()); // { name: "New Tapas", budget: 6000 }   