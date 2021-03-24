import {Platform} from 'react-native';
import RNSmtpMailer from 'react-native-smtp-mailer';

// Your email and password
import {EMAIL, PASS} from './../../keyHost';

const isIOS = Platform.OS === 'ios';

const sendOTPCode = (code, emailSend) => {
  const ssl = isIOS ? false : true;
  return RNSmtpMailer.sendMail({
    mailhost: 'smtp.gmail.com',
    port: '465',
    ssl: ssl,
    username: EMAIL,
    password: PASS,
    fromName: 'OTP',
    subject: 'Xác thực tài khoản',
    recipients: emailSend,
    htmlBody: `<h2>Mã OTP: ${code}</h2>`,
  });
};

export {sendOTPCode};
