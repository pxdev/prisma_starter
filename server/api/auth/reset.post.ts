import { useMailer } from '#mailer'
const mailService = useMailer()
const gmailTransporter = mailService.gmailTransporter()

export default defineEventHandler(async (event) => {
    return await mailService.sendMail({
        requestId: 'test-key',
        options: {
            to: 'drpxdev@gmail.com',
            subject:'request subject',
            text: 'request template text',
            html: 'request template html'
        },
        transporter: gmailTransporter
    })

 })
