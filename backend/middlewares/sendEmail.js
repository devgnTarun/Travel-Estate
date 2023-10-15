const nodeMailer = require(`nodemailer`);

const sendEmail = async (option)  => {
    const trasporter = nodeMailer.createTransport({
        host : "smtp.gmail.com",
        port : 465,
        service: process.env.SMPT_SERVICE || 'gmail',
        auth: {
          user: process.env.SMPT_MAIL || 'tarundevgan29.9.2003@gmail.com',
          pass: process.env.SMPT_PASSWORD || 'nsredcayttjeyjaf',
        },
      }); 
      const mailOption = {
        from: process.env.SMPT_MAIL || 'tarundevgan29.9.2003@gmail.com',
        to: option.email,
        subject: "Complete your Registration", 
        text : `Your email verfication link is ${option.token} -- Note this is valid for 1 hour only!`,
      };
    
      await trasporter.sendMail(mailOption)
}

module.exports = sendEmail