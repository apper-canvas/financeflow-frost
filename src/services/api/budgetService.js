import budgetsData from "@/services/mockData/budgets.json";

class BudgetService {
  constructor() {
    this.budgets = [...budgetsData];
  }

  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.budgets];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const budget = this.budgets.find(budget => budget.Id === parseInt(id));
    return budget ? { ...budget } : null;
  }

  async create(budgetData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const maxId = Math.max(...this.budgets.map(budget => budget.Id), 0);
    const newBudget = {
      Id: maxId + 1,
      ...budgetData
    };
    this.budgets.push(newBudget);
    return { ...newBudget };
  }

  async update(id, budgetData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.budgets.findIndex(budget => budget.Id === parseInt(id));
    if (index !== -1) {
      this.budgets[index] = { 
        ...this.budgets[index], 
        ...budgetData, 
        Id: parseInt(id)
      };
      return { ...this.budgets[index] };
    }
    return null;
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = this.budgets.findIndex(budget => budget.Id === parseInt(id));
    if (index !== -1) {
      this.budgets.splice(index, 1);
      return true;
    }
    return false;
  }
}

export const budgetService = new BudgetService();