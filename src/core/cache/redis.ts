import { createClient } from 'redis';

export async function getCacheClient() {
    const cacheClient = createClient();
    await cacheClient.connect()
    return cacheClient;
}