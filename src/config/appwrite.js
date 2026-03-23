import { Client, Account } from "appwrite";

const endpoint = import.meta.env.VITE_LOGIN_APP_ENDPOINT;
const projectId = import.meta.env.VITE_LOGIN_APP_ID;

if (!endpoint || !projectId) {
    console.error("Missing Appwrite environment variables. Check your .env file.");
}

const client = new Client();

client
    .setEndpoint(endpoint || 'https://cloud.appwrite.io/v1')
    .setProject(projectId || '');

export const account = new Account(client)

export default client;