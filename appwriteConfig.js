import { Client, Databases } from 'appwrite';

const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
      .setProject('671ca484000a15af86a4');

const databases = new Databases(client);
export { client, databases };
