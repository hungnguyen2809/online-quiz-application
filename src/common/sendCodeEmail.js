import {Platform} from 'react-native';
import RNSmtpMailer from 'react-native-smtp-mailer';
import Config from 'react-native-config';

const isIOS = Platform.OS === 'ios';

const sendOTPCode = (code, emailSend) => {
  const ssl = isIOS ? false : true;
  return RNSmtpMailer.sendMail({
    mailhost: 'smtp.gmail.com',
    port: '465',
    ssl: ssl,
    username: Config.EMAIL,
    password: Config.PASS,
    fromName: 'Online Quiz',
    subject: 'Xác thực tài khoản',
    recipients: emailSend,
    htmlBody: `
    <h3>Cám ơn bạn đã sử dụng ứng dụng. Mọi thắc mắc xin vui lòng liện hệ: cskh.onlinequiz@gmail.com</h3>
    <h3>Mã OTP: ${code}</h3>
    <p>Trân thành cám ơn !.</p>`,
  });
};

export {sendOTPCode};
