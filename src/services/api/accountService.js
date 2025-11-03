import accountsData from "@/services/mockData/accounts.json";

class AccountService {
  constructor() {
    this.accounts = [...accountsData];
  }

  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.accounts];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const account = this.accounts.find(account => account.Id === parseInt(id));
    return account ? { ...account } : null;
  }

  async create(accountData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const maxId = Math.max(...this.accounts.map(account => account.Id), 0);
    const newAccount = {
      Id: maxId + 1,
      ...accountData,
      lastUpdated: new Date().toISOString()
    };
    this.accounts.push(newAccount);
    return { ...newAccount };
  }

  async update(id, accountData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.accounts.findIndex(account => account.Id === parseInt(id));
    if (index !== -1) {
      this.accounts[index] = { 
        ...this.accounts[index], 
        ...accountData, 
        Id: parseInt(id),
        lastUpdated: new Date().toISOString()
      };
      return { ...this.accounts[index] };
    }
    return null;
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = this.accounts.findIndex(account => account.Id === parseInt(id));
    if (index !== -1) {
      this.accounts.splice(index, 1);
      return true;
    }
    return false;
  }
}

export const accountService = new AccountService();