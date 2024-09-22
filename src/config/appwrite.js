import { Client, Account } from "appwrite";

const client = new Client();

client.setEndpoint(import.meta.env.VITE_LOGIN_APP_ENDPOINT).setProject(import.meta.env.VITE_LOGIN_APP_ID);

export const account = new Account(client)

export default client;