import { Client } from "@hubspot/api-client";

const client = new Client();
console.log("Methods on crm.objects.calls.basicApi:");
try {
    console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(client.crm.objects.calls.basicApi)));
} catch (e) { console.log("crm.objects.calls not found"); }

console.log("Methods on crm.objects.emails.basicApi:");
try {
    console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(client.crm.objects.emails.basicApi)));
} catch (e) { console.log("crm.objects.emails not found"); }

console.log("Methods on crm.objects.meetings.basicApi:");
try {
    console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(client.crm.objects.meetings.basicApi)));
} catch (e) { console.log("crm.objects.meetings not found"); }
