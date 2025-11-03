import billsData from "@/services/mockData/bills.json";

class BillService {
  constructor() {
    this.bills = [...billsData];
  }

  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.bills];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const bill = this.bills.find(bill => bill.Id === parseInt(id));
    return bill ? { ...bill } : null;
  }

  async create(billData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const maxId = Math.max(...this.bills.map(bill => bill.Id), 0);
    const newBill = {
      Id: maxId + 1,
      ...billData
    };
    this.bills.push(newBill);
    return { ...newBill };
  }

  async update(id, billData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.bills.findIndex(bill => bill.Id === parseInt(id));
    if (index !== -1) {
      this.bills[index] = { 
        ...this.bills[index], 
        ...billData, 
        Id: parseInt(id)
      };
      return { ...this.bills[index] };
    }
    return null;
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = this.bills.findIndex(bill => bill.Id === parseInt(id));
    if (index !== -1) {
      this.bills.splice(index, 1);
      return true;
    }
    return false;
  }
}

export const billService = new BillService();