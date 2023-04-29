import { PublishCommand, PublishCommandOutput, SNSClient, SetSMSAttributesCommand } from '@aws-sdk/client-sns';

const smsClient = new SNSClient({ region: "ap-south-1" });

export async function publishSms(message: string, mobileNumber: string): Promise<PublishCommandOutput> {
    await smsClient.send(new SetSMSAttributesCommand({
        attributes: {
          DefaultSMSType: "Transactional"
        },
    }));

    const response = await smsClient.send(new PublishCommand({
        Message: message,
        PhoneNumber: `+91${mobileNumber}`
    }));

    console.log(response);

    return response;
}

