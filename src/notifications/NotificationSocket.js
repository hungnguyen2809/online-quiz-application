import SocketManager from '../socketIO';
import NotifiManager from './NotificationManager';
import {get} from 'lodash';
import {SOCKET_SERVER_SEND_MEMBER_COMMENT_POST} from '../socketIO/constant';
import {getAccountToStorage} from '../common/asyncStorage';

const RegisterEventNotiSocket = () => {
  SocketManager.on(SOCKET_SERVER_SEND_MEMBER_COMMENT_POST, async (data) => {
    const account = await getAccountToStorage();
    if (get(account, 'id', -1) !== get(data, 'user_id_cmt', 0)) {
      NotifiManager.showNotification(
        get(data, 'user_name_cmt', ''),
        'Đã trả lời bài viết của bạn',
        {...data, type: 'reply_cmt'},
      );
    }
  });
};

export default RegisterEventNotiSocket;
