const nodemailer = require("nodemailer");
export const mailer = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "gavetechahk@gmail.com", // generated ethereal user
      pass: "wgiledodthdshcga", // generated ethereal password
    },
  });

  
  