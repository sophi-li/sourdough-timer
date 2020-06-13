// Save Twilio Keys
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = require("twilio")(accountSid, authToken);

module.exports = function (context, myTimer) {
  var timeStamp = new Date().toISOString();

  if (myTimer.isPastDue) {
    context.log("JavaScript is running late!");
  }
  context.log("JavaScript timer trigger function ran!", timeStamp);

  // Text message reminder set up
  client.messages
    .create({
      from: process.env.SENDER_NUMBER,
      body: "Don't forget to feed me!",
      to: process.env.RECIPIENT_NUMBER,
    })
    .then((message) => {
      context.log("Message sent");
      context.res = {
        // status: 200, /* Defaults to 200 */
        body: "Text successfully sent",
      };
      context.done();
    })
    .catch((err) => {
      context.log.error("Twilio Error: " + err.message + " -- " + err.code);
      context.res = {
        status: 500,
        body: `Twilio Error Message: ${err.message}\nTwilio Error code: ${err.code}`,
      };
      context.done();
    });
};
