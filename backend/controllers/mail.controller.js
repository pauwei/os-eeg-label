const SibApiV3Sdk = require("sib-api-v3-sdk");

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
                <h1>Website Feedback Form</h1> \
                <p> ${req.body.content}</p>\
            </body> \
        </html>`;
};