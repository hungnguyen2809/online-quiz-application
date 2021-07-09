import NotificationService from './NotificationService';

class NotificationManager extends NotificationService {
  constructor() {
    super(
      (token) => this.#onRegister(token),
      (notification) => this.#onNotification(notification),
    );
  }

  #onRegister = (token) => {
    console.log('[onRegister]: ', token);
  };

  #onNotification = (notification) => {
    console.log('[onNotification]: ', notification);
  };
}

const NotifiManager = new NotificationManager();
export default NotifiManager;
