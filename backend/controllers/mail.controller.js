const SibApiV3Sdk = require("sib-api-v3-sdk");
require("dotenv").config()

//Authenticate for sendin blue
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SENDINBLUE_APIKEY;

const api = new SibApiV3Sdk.TransactionalEmailsApi();
if (api) {
    console.log('Sendin Blue successfully authenticated.');
} else {
    console.log('Error authenticating to Sendin Blue.');
}
    
exports.submit = (req, res) => {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = req.body.subject;
    sendSmtpEmail.htmlContent=` \
        <html> \
            <body> \
                <h1>Website Feedback Form - ${req.body.name}</h1> \
                <p> ${req.body.content}</p> \
            </body> \
        </html>`;
    sendSmtpEmail.sender = {"name": "ICMOBI", "email": "icmobiproject@gmail.com"};
    sendSmtpEmail.to = [{"name": "ICMOBI Inobox", "email": "icmobiproject@gmail.com"}];
    sendSmtpEmail.textContent = req.body.content;
    sendSmtpEmail.replyTo = {"email": req.body.replyEmail, "name": req.body.name};

    api.sendTransacEmail(sendSmtpEmail).then( (data) => {
        res.send("Email successfully sent: ", data);
    }, (err) => {
        res.send(err);
    });
};