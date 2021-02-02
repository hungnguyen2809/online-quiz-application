export const appScreens = {
  Navigate: {
    id: 'app.navigate.main',
  },
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
    name: 'ForgetPasswordScreen',
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
  ChooseQiuz: {
    id: 'app.screen.ChooseQuiz',
    name: 'ChooseQuizScreen',
  },
  ExamQuestions: {
    id: 'app.screen.ExamQuestions',
    name: 'ExamQuestionsScreen',
  },
  Profile: {
    id: 'app.screen.Profile',
    name: 'ProfileScreen',
  },
};

export const screenNavigate = {
  root: {
    stack: {
      children: [
        {
          component: {
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
          id: appScreens.Navigate.id,
          children: [
            {
              component: {
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
