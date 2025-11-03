import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

class BudgetService {
  constructor() {
    this.tableName = "budget_c";
  }

  async getAll() {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords(this.tableName, {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "allocated_c"}},
          {"field": {"Name": "period_c"}},
          {"field": {"Name": "alerts_c"}},
          {"field": {"Name": "start_date_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching budgets:", error?.response?.data?.message || error);
      return [];
    }
  }

  async getById(id) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.getRecordById(this.tableName, id, {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "allocated_c"}},
          {"field": {"Name": "period_c"}},
          {"field": {"Name": "alerts_c"}},
          {"field": {"Name": "start_date_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching budget ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  }

  async create(budgetData) {
    try {
      const apperClient = getApperClient();
      
      // Only include updateable fields
      const cleanData = {
        category_c: budgetData.category_c || budgetData.category,
        allocated_c: parseFloat(budgetData.allocated_c || budgetData.allocated || 0),
        period_c: budgetData.period_c || budgetData.period || "monthly",
        alerts_c: Boolean(budgetData.alerts_c !== undefined ? budgetData.alerts_c : budgetData.alerts),
        start_date_c: budgetData.start_date_c || budgetData.startDate || new Date().toISOString()
      };

      const response = await apperClient.createRecord(this.tableName, {
        records: [cleanData]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} budgets:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        return successful[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error creating budget:", error?.response?.data?.message || error);
      return null;
    }
  }

  async update(id, budgetData) {
    try {
      const apperClient = getApperClient();
      
      // Only include updateable fields
      const cleanData = {
        Id: parseInt(id),
        category_c: budgetData.category_c || budgetData.category,
        allocated_c: parseFloat(budgetData.allocated_c || budgetData.allocated || 0),
        period_c: budgetData.period_c || budgetData.period,
        alerts_c: Boolean(budgetData.alerts_c !== undefined ? budgetData.alerts_c : budgetData.alerts),
        start_date_c: budgetData.start_date_c || budgetData.startDate
      };

      const response = await apperClient.updateRecord(this.tableName, {
        records: [cleanData]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} budgets:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        return successful[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error updating budget:", error?.response?.data?.message || error);
      return null;
    }
  }

  async delete(id) {
    try {
      const apperClient = getApperClient();
      
      const response = await apperClient.deleteRecord(this.tableName, {
        RecordIds: [parseInt(id)]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} budgets:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successful.length > 0;
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting budget:", error?.response?.data?.message || error);
      return false;
    }
  }
}

export const budgetService = new BudgetService();
