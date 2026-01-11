import { Client } from "@hubspot/api-client";

const client = new Client();
console.log("Methods on crm.companies.basicApi:");
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(client.crm.companies.basicApi)));
