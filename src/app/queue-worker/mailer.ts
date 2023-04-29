import Queue from "bull";
import { mailer } from "../../core/mail/nodemailer";
import { MailPayload } from "../../common/interfaces";

console.log('mailer started')
export const mailingQueue = new Queue<MailPayload>("MAILING-QUEUE", { redis: { port: 6379, host: '127.0.0.1' } })

export function sendEmail(mailPayload: MailPayload): void {
    console.log('added mail')
    mailingQueue.add(mailPayload, { attempts: 3, delay: 0 })
}

mailingQueue.process(async (job, done) => {
    try {
        await mailer.sendMail({ ...job.data });
        done();
    } catch(e: any) {
        done(e)
    }
});
