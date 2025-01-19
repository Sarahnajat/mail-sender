import nodemailer from "nodemailer";
import inquirer from "inquirer";

(async () => {
  const transporterEmail = await inquirer.prompt([
    {
      name: "email",
      message: "Please enter your email:",
    },
  ]);
  const transporterPass = await inquirer.prompt([
    {
      type: "password",
      name: "emailPassword",
      message: "Please enter your password: ",
      mask: "*",
    },
  ]);
  const mailReciver = await inquirer.prompt([
    {
      name: "email",
      message: "Who would you like to send the email to?",
    },
  ]);

  const subject = await inquirer.prompt([
    {
      name: "subject",
      type: "input",
      message: "What is the subject?",
    },
  ]);
  const message = await inquirer.prompt([
    {
      name: "user_message",
      type: "input",
      message: "What message are you delivering?",
    },
  ]);

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: transporterEmail.email,
      pass: transporterPass.emailPassword,
    },
  });
  const mailOptions = {
    from: transporterEmail.email,
    to: mailReciver.email,
    subject: subject.subject,
    text: message.user_message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
})()
  .then((result) => {
    console.log(result);
  })
  .catch(console.error);
