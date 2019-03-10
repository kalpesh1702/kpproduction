let nodemailer = require('nodemailer');

module.exports  = class Sendemail{

  constructor(){

    this.mailOptions = {

      from: 'kalpeshprajapati3724@gmail.com',
      to: 'kalpeshprajapati353@gmail.com',
      subject: 'Important Notes and Links'
    };

    this.transporter = nodemailer.createTransport({

      service: 'gmail',
      auth: {
        user: 'kalpeshprajapati3724@gmail.com',
        pass: 'jabtakhejaan'
      }
    });

  }

  async sendemail(mailOptions = this.mailOptions){

    try{
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      let result = await this.transporter.sendMail(mailOptions);
      return(result);
    }
    catch(error){
        return(error);
    }


  }

}