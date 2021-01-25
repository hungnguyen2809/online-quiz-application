import {Platform} from 'react-native';
import RNSmtpMailer from 'react-native-smtp-mailer';
const isIOS = Platform.OS === 'ios';

const sendOTPCode = (code, emailSend) => {
  const ssl = isIOS ? false : true;
  return RNSmtpMailer.sendMail({
    mailhost: 'smtp.gmail.com',
    port: '465',
    ssl: ssl,
    username: 'hungnguyensatthu9x@gmail.com',
    password: 'hungnguyen99',
    fromName: 'OTP',
    subject: 'Xác thực tài khoản',
    recipients: emailSend,
    htmlBody: `<h2>Mã OTP: ${code}</h2>`,
  });
};

export {sendOTPCode};
