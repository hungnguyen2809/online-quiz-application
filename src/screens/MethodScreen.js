import {Navigation} from 'react-native-navigation';

export const goToScreen = (componentId, screen) => {
  Navigation.push(componentId, {
    component: {
      name: screen.name,
    },
  });
};

export const goToScreenWithPassProps = (componentId, screen, passProps) => {
  Navigation.push(componentId, {
    component: {
      name: screen.name,
      passProps: passProps,
    },
  });
};

export const showModalApp = (modal) => {
  Navigation.showModal({
    component: {
      name: modal.name,
    },
  });
};

export const showModalWithPassProps = (modal, passProps) => {
  Navigation.showModal({
    component: {
      name: modal.name,
      passProps: passProps,
    },
  });
};

export const openMenuLeft = (componentId) => {
  Navigation.mergeOptions(componentId, {
    sideMenu: {
      left: {
        visible: true,
      },
    },
  });
};

export const closeMenuLeft = (componentId) => {
  Navigation.mergeOptions(componentId, {
    sideMenu: {
      left: {
        visible: false,
      },
    },
  });
};
