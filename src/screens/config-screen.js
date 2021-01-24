export const appScreens = {
  Login: {
    id: 'app.screen.Login',
    name: 'LoginScreen',
  },
  Register: {
    id: 'app.screen.Register',
    name: 'RegisterScreen',
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
