import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

class TransactionService {
  constructor() {
    this.tableName = "transaction_c";
  }

  async getAll() {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords(this.tableName, {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "amount_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "account_id_c"}}
        ],
        orderBy: [{"fieldName": "date_c", "sorttype": "DESC"}]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching transactions:", error?.response?.data?.message || error);
      return [];
    }
  }

  async getById(id) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.getRecordById(this.tableName, id, {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "amount_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "date_c"}},
          {"field": {"Name": "notes_c"}},
          {"field": {"Name": "account_id_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching transaction ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  }

  async create(transactionData) {
    try {
      const apperClient = getApperClient();
      
      // Only include updateable fields
      const cleanData = {
        description_c: transactionData.description_c || transactionData.description,
        amount_c: parseFloat(transactionData.amount_c || transactionData.amount || 0),
        category_c: transactionData.category_c || transactionData.category,
        type_c: transactionData.type_c || transactionData.type,
        date_c: transactionData.date_c || transactionData.date,
        notes_c: transactionData.notes_c || transactionData.notes || "",
        account_id_c: parseInt(transactionData.account_id_c || transactionData.accountId)
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
          console.error(`Failed to create ${failed.length} transactions:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        return successful[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error creating transaction:", error?.response?.data?.message || error);
      return null;
    }
  }

  async update(id, transactionData) {
    try {
      const apperClient = getApperClient();
      
      // Only include updateable fields
      const cleanData = {
        Id: parseInt(id),
        description_c: transactionData.description_c || transactionData.description,
        amount_c: parseFloat(transactionData.amount_c || transactionData.amount || 0),
        category_c: transactionData.category_c || transactionData.category,
        type_c: transactionData.type_c || transactionData.type,
        date_c: transactionData.date_c || transactionData.date,
        notes_c: transactionData.notes_c || transactionData.notes,
        account_id_c: parseInt(transactionData.account_id_c || transactionData.accountId)
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
          console.error(`Failed to update ${failed.length} transactions:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        return successful[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error updating transaction:", error?.response?.data?.message || error);
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
          console.error(`Failed to delete ${failed.length} transactions:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successful.length > 0;
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting transaction:", error?.response?.data?.message || error);
      return false;
    }
  }
}

export const transactionService = new TransactionService();
