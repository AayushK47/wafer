import Queue from "bull";
import { publishSms } from "../../core/sms/client";
import { SMSPayload } from "../../common/interfaces";

console.log('SMS queue started')
export const smsQueue = new Queue<SMSPayload>("SMS-QUEUE", { redis: { port: 6379, host: '127.0.0.1' } })

export function sendSms(smsPayload: SMSPayload): void {
    console.log('added sms')
    smsQueue.add(smsPayload, { attempts: 3, delay: 0 })
}

smsQueue.process(async (job, done) => {
    try {
        const { message, mobileNumber } = job.data
        const response = await publishSms(message, mobileNumber);
        console.log(response)
    } catch(e: any) {
        done(e)
    }
});