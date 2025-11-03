import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

class BillService {
  constructor() {
    this.tableName = "bill_c";
  }

  async getAll() {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords(this.tableName, {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "amount_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "recurring_c"}},
          {"field": {"Name": "frequency_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "is_paid_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching bills:", error?.response?.data?.message || error);
      return [];
    }
  }

  async getById(id) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.getRecordById(this.tableName, id, {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "amount_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "recurring_c"}},
          {"field": {"Name": "frequency_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "is_paid_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching bill ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  }

  async create(billData) {
    try {
      const apperClient = getApperClient();
      
      // Only include updateable fields
      const cleanData = {
        name_c: billData.name_c || billData.name,
        amount_c: parseFloat(billData.amount_c || billData.amount || 0),
        due_date_c: billData.due_date_c || billData.dueDate,
        recurring_c: Boolean(billData.recurring_c !== undefined ? billData.recurring_c : billData.recurring),
        frequency_c: billData.frequency_c || billData.frequency,
        category_c: billData.category_c || billData.category,
        is_paid_c: Boolean(billData.is_paid_c !== undefined ? billData.is_paid_c : billData.isPaid)
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
          console.error(`Failed to create ${failed.length} bills:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        return successful[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error creating bill:", error?.response?.data?.message || error);
      return null;
    }
  }

  async update(id, billData) {
    try {
      const apperClient = getApperClient();
      
      // Only include updateable fields
      const cleanData = {
        Id: parseInt(id),
        name_c: billData.name_c || billData.name,
        amount_c: parseFloat(billData.amount_c || billData.amount || 0),
        due_date_c: billData.due_date_c || billData.dueDate,
        recurring_c: Boolean(billData.recurring_c !== undefined ? billData.recurring_c : billData.recurring),
        frequency_c: billData.frequency_c || billData.frequency,
        category_c: billData.category_c || billData.category,
        is_paid_c: Boolean(billData.is_paid_c !== undefined ? billData.is_paid_c : billData.isPaid)
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
          console.error(`Failed to update ${failed.length} bills:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        return successful[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error updating bill:", error?.response?.data?.message || error);
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
          console.error(`Failed to delete ${failed.length} bills:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successful.length > 0;
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting bill:", error?.response?.data?.message || error);
      return false;
    }
  }
}

export const billService = new BillService();

export const billService = new BillService();