import {io} from 'socket.io-client';
import {isProduct} from './../api/createApiService';
import Config from 'react-native-config';

class SocketIOManager {
  #SERVER_URL = null;

  constructor() {
    this.#SERVER_URL = isProduct
      ? 'https://server-online-quiz.herokuapp.com'
      : `http://${Config.IP_HOST_DEV}:${Config.IP_PORT_DEV}`;

    this.socket = io(this.#SERVER_URL);
  }

  emit = (key, data = {}) => {
    this.socket.emit(key, data);
  };

  on = (key, callback = () => {}) => {
    this.socket.on(key, callback);
  };
}

const SocketManager = new SocketIOManager();
export default SocketManager;
