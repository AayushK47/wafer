import { createTransport } from 'nodemailer';
import * as aws from '@aws-sdk/client-ses';

const ses = new aws.SESClient({ region: 'ap-south-1' });

export const mailer = createTransport({
    SES: { ses, aws }
});