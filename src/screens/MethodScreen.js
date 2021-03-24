import {Navigation} from 'react-native-navigation';
import {screenAuth} from './config-screen';

export const switchScreen = async () => {
  await Navigation.setRoot(screenAuth);
};

export const setRootScreen = async (layout) => {
  await Navigation.setRoot(layout);
};

export const goToScreen = async (componentId, nameScreen, options = null) => {
  await Navigation.push(componentId, {
    component: {
      name: nameScreen,
      options: options,
    },
  });
};

export const goToScreenWithPassProps = async (
  componentId,
  nameScreen,
  passProps,
  options = null,
) => {
  await Navigation.push(componentId, {
    component: {
      name: nameScreen,
      passProps: passProps,
      options: options,
    },
  });
};

export const backToLastScreen = async (componentId, mergeOptions = null) => {
  await Navigation.pop(componentId, mergeOptions);
};

export const backScreenToRoot = async (componentId, mergeOptions = null) => {
  await Navigation.popToRoot(componentId, mergeOptions);
};

export const backToScreen = async (componentId, mergeOptions = null) => {
  await Navigation.popTo(componentId, mergeOptions);
};

export const showModalApp = async (modal) => {
  await Navigation.showModal({
    component: {
      name: modal.name,
    },
  });
};

export const showModalWithPassProps = async (modal, passProps) => {
  await Navigation.showModal({
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
