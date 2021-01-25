export const appScreens = {
  Login: {
    id: 'app.screen.Login',
    name: 'LoginScreen',
  },
  Register: {
    id: 'app.screen.Register',
    name: 'RegisterScreen',
  },
  ForgetPassword: {
    id: 'app.screen.ForgetPassword',
    name: 'ForgetPassword',
  },
  ModalCode: {
    id: 'app.modal.ModalCode',
    name: 'ModalCodeComponent',
  },
  MenuLeft: {
    id: 'app.screen.MenuLeft',
    name: 'MenuLeft',
  },
  Home: {
    id: 'app.screen.Home',
    name: 'HomeScreen',
  },
};

export const screenNavigate = {
  root: {
    stack: {
      children: [
        {
          component: {
            id: appScreens.Login.id,
            name: appScreens.Login.name,
          },
        },
      ],
      options: {
        topBar: {
          visible: false,
        },
      },
    },
  },
};

export const screenMain = {
  root: {
    sideMenu: {
      left: {
        component: {
          id: appScreens.MenuLeft.id,
          name: appScreens.MenuLeft.name,
        },
      },
      center: {
        stack: {
          children: [
            {
              component: {
                id: appScreens.Home.id,
                name: appScreens.Home.name,
              },
            },
          ],
          options: {
            topBar: {
              visible: false,
            },
          },
        },
      },
    },
  },
};
