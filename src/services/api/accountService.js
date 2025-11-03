import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

class AccountService {
  constructor() {
    this.tableName = "account_c";
  }

  async getAll() {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords(this.tableName, {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "institution_c"}},
          {"field": {"Name": "balance_c"}},
          {"field": {"Name": "currency_c"}},
          {"field": {"Name": "last_updated_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching accounts:", error?.response?.data?.message || error);
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
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "institution_c"}},
          {"field": {"Name": "balance_c"}},
          {"field": {"Name": "currency_c"}},
          {"field": {"Name": "last_updated_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching account ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  }

  async create(accountData) {
    try {
      const apperClient = getApperClient();
      
      // Only include updateable fields
      const cleanData = {
        name_c: accountData.name_c || accountData.name,
        type_c: accountData.type_c || accountData.type,
        institution_c: accountData.institution_c || accountData.institution,
        balance_c: parseFloat(accountData.balance_c || accountData.balance || 0),
        currency_c: accountData.currency_c || accountData.currency || "USD",
        last_updated_c: new Date().toISOString()
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
          console.error(`Failed to create ${failed.length} accounts:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        return successful[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error creating account:", error?.response?.data?.message || error);
      return null;
    }
  }

  async update(id, accountData) {
    try {
      const apperClient = getApperClient();
      
      // Only include updateable fields
      const cleanData = {
        Id: parseInt(id),
        name_c: accountData.name_c || accountData.name,
        type_c: accountData.type_c || accountData.type,
        institution_c: accountData.institution_c || accountData.institution,
        balance_c: parseFloat(accountData.balance_c || accountData.balance || 0),
        currency_c: accountData.currency_c || accountData.currency,
        last_updated_c: new Date().toISOString()
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
          console.error(`Failed to update ${failed.length} accounts:`, failed);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }
        
        return successful[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error updating account:", error?.response?.data?.message || error);
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
          console.error(`Failed to delete ${failed.length} accounts:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successful.length > 0;
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting account:", error?.response?.data?.message || error);
      return false;
    }
  }
}

export const accountService = new AccountService();

export const accountService = new AccountService();