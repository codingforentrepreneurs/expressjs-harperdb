import client from './client.js'

const APP_SCHEMA = process.env.APP_SCHEMA ? process.env.APP_SCHEMA : "harp"

export const configureAppSchema = async () => {
    const data = {
        "operation": "create_schema",
        "schema": APP_SCHEMA
    }
    return await client(data, "POST")
}


export class DogModel {
    constructor() {
      this.db = client // convenience for connecting to the database
      this.table = "dog" // our table name
      this.schema = APP_SCHEMA // same schema as before
    } 
  
    configure = async () => {
      // Configure the table
      // Should only need to be run 1 time just like the schema
      const tableData = {
          "operation": "create_table",
          "schema": APP_SCHEMA,
          "table": this.table,
          "hash_attribute": "id"
      }
      return await this.db(tableData, "POST");
    }
  
    entryAdd = async (records) => {
      // This is a nosql operation so we can add multiple records into your database at once will add/insert the data into the database _or_ it will update the current data that machines the hash_attribute (id in this case) as defined in the table configuration above
    //   const record= [{
    //         id: "1",
    //         name: "Fido",
    //         color: "Brown"
    //   }]
        const data = {
            "operation": "upsert",
            "schema": this.schema,
            "table": this.table,
            "records": records 
        }
          return await this.db(data, "POST");
      }
  
      entryCreateAttribute = async (attribute) => {
        // If you need to add additional fields/attributes to your data, this is what you'll use.
          const data = {
              "operation": "create_attribute",
              "schema": this.schema,
              "table": this.table,
              "attribute": attribute
          }
          return await this.db(data, "POST");
      }
  
  
  
      entryDetail = async (id) => {
        // Using a SQL operation, retrieve a single record in our database by it's id
          const sqlLookup = `SELECT * FROM ${this.schema}.${this.table} WHERE id = ${id}`
          const data = {
              "operation": "sql",
              "sql": sqlLookup
          }
          return await this.db(data, "POST");
      }
      entryList = async () => {
        // Using a SQL operation, list all records in our database
          const sqlLookup = `SELECT * FROM ${this.schema}.${this.table}`
          const data = {
              "operation": "sql",
              "sql": sqlLookup
          }
          return await this.db(data, "POST");
      }
      entryDelete = async (id) => {
        // Using a SQL operation, delete a record from our database
          // const sqlLookup = `DELETE FROM ${this.schema}.${this.table} WHERE id = ${id}`
          const data = {
               "operation": "delete",
                "table": "dog",
                "schema": "dev",
                "hash_values": [
                  id
                ]
          }
          return await this.db(data, "POST");
      }
  }
  
export default DogModel
