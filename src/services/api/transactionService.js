import transactionsData from "@/services/mockData/transactions.json";

class TransactionService {
  constructor() {
    this.transactions = [...transactionsData];
  }

  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const transaction = this.transactions.find(transaction => transaction.Id === parseInt(id));
    return transaction ? { ...transaction } : null;
  }

  async create(transactionData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const maxId = Math.max(...this.transactions.map(transaction => transaction.Id), 0);
    const newTransaction = {
      Id: maxId + 1,
      ...transactionData
    };
    this.transactions.push(newTransaction);
    return { ...newTransaction };
  }

  async update(id, transactionData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.transactions.findIndex(transaction => transaction.Id === parseInt(id));
    if (index !== -1) {
      this.transactions[index] = { 
        ...this.transactions[index], 
        ...transactionData, 
        Id: parseInt(id)
      };
      return { ...this.transactions[index] };
    }
    return null;
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = this.transactions.findIndex(transaction => transaction.Id === parseInt(id));
    if (index !== -1) {
      this.transactions.splice(index, 1);
      return true;
    }
    return false;
  }
}

export const transactionService = new TransactionService();