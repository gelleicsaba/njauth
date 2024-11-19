export {}
const { MongoClient } = require('mongodb')

export const connect = async (): Promise<any> => {
    let client: any = null;
    try {
        const client = new MongoClient("mongodb://localhost:27017/")
        await client.connect()
        return client
    } catch (e: any) {
        console.log("Error when connecting.")
        return null;
    }
}

