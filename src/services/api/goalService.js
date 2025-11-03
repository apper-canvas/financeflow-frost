import goalsData from "@/services/mockData/goals.json";

class GoalService {
  constructor() {
    this.goals = [...goalsData];
  }

  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.goals];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const goal = this.goals.find(goal => goal.Id === parseInt(id));
    return goal ? { ...goal } : null;
  }

  async create(goalData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const maxId = Math.max(...this.goals.map(goal => goal.Id), 0);
    const newGoal = {
      Id: maxId + 1,
      ...goalData
    };
    this.goals.push(newGoal);
    return { ...newGoal };
  }

  async update(id, goalData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.goals.findIndex(goal => goal.Id === parseInt(id));
    if (index !== -1) {
      this.goals[index] = { 
        ...this.goals[index], 
        ...goalData, 
        Id: parseInt(id)
      };
      return { ...this.goals[index] };
    }
    return null;
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = this.goals.findIndex(goal => goal.Id === parseInt(id));
    if (index !== -1) {
      this.goals.splice(index, 1);
      return true;
    }
    return false;
  }
}

export const goalService = new GoalService();