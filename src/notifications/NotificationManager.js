import {clone, get} from 'lodash';
import {Navigation} from 'react-native-navigation';
import {getAccountToStorage} from '../common/asyncStorage';
import {appScreens, screenMainName} from '../screens/config-screen';
import {goToScreenWithPassProps} from '../screens/MethodScreen';
import SocketManager from '../socketIO';
import {SOCKET_SERVER_SEND_MEMBER_COMMENT_POST} from '../socketIO/constant';
import NotificationService from './NotificationService';

const screenIgnoreName = [appScreens.ExamQuestions.name];

class NotificationManager extends NotificationService {
  #componentId = '';
  #componentName = '';
  #componentIdMain = '';
  #passProps = {};
  #paramsUpdProps = {};
  #commandName = '';

  constructor() {
    super(
      (token) => this.#onRegister(token),
      (notification) => this.#onNotification(notification),
    );
    Navigation.events().registerComponentDidAppearListener(
      ({componentId, componentName, passProps}) => {
        if (screenMainName.includes(componentName)) {
          this.#componentIdMain = componentId;
        }
        this.#componentId = componentId;
        this.#componentName = componentName;
        this.#passProps = clone(passProps);
      },
    );
    Navigation.events().registerCommandListener((name, param) => {
      this.#commandName = name;
      this.#paramsUpdProps = clone(param);
    });
  }

  #onRegister = (token) => {
    console.log('[onRegister]: ', token);
  };

  #onNotification = (notification) => {
    switch (get(notification.data, 'type')) {
      case 'reply_cmt':
        if (this.#componentIdMain) {
          if (
            get(this.#passProps.row, 'id_post') !==
              get(notification.data, 'id_post') &&
            this.#componentName === appScreens.PostDetailsScreen.name
          ) {
            Navigation.updateProps(this.#componentId, {
              row: {
                id_user: get(notification.data, 'id_user', ''),
                id_post: get(notification.data, 'id_post', ''),
              },
              parentComponentId: this.#componentIdMain,
            });
          } else {
            goToScreenWithPassProps(
              this.#componentIdMain,
              appScreens.PostDetailsScreen.name,
              {
                row: {
                  id_user: get(notification.data, 'id_user', ''),
                  id_post: get(notification.data, 'id_post', ''),
                },
                parentComponentId: this.#componentIdMain,
              },
            );
          }
        }
        break;
      default:
        break;
    }
  };

  RegisterEvent = () => {
    SocketManager.on(SOCKET_SERVER_SEND_MEMBER_COMMENT_POST, async (data) => {
      if (screenIgnoreName.includes(this.#componentName)) {
        return;
      }
      const account = await getAccountToStorage();
      if (
        get(account, 'id') !== get(data, 'user_id_cmt') &&
        get(this.#passProps.row, 'id_post') !== get(data, 'id_post') &&
        get(this.#paramsUpdProps, 'props.row.id_post') !== get(data, 'id_post')
      ) {
        NotifiManager.showNotification(
          get(data, 'user_name_cmt', ''),
          'Đã trả lời bài viết của bạn',
          {...data, type: 'reply_cmt'},
        );
      }
    });
  };
}

const NotifiManager = new NotificationManager();
export default NotifiManager;
