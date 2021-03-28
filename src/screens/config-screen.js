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
  ProfileDetails: {
    id: 'app.screen.ProfileDetails',
    name: 'ProfileDetailsScreen',
  },
  ChooseQuestionScreen: {
    id: 'app.screen.ChooseQuestionScreen',
    name: 'ChooseQuestionScreen',
  },
  ForumScreen: {
    id: 'app.screen.ForumScreen',
    name: 'ForumScreen',
  },
};

export const screenAuth = {
  root: {
    stack: {
      children: [
        {
          component: {
            name: appScreens.Login.name,
          },
        },
      ],
    },
  },
};

export const screenMain = {
  root: {
    bottomTabs: {
      children: [
        {
          stack: {
            children: [
              {
                component: {
                  name: appScreens.Home.name,
                },
              },
            ],
          },
        },
        {
          stack: {
            children: [
              {
                component: {
                  name: appScreens.ChooseQiuz.name,
                },
              },
            ],
          },
        },
        {
          stack: {
            children: [
              {
                component: {
                  name: appScreens.ForumScreen.name,
                },
              },
            ],
          },
        },
        {
          stack: {
            children: [
              {
                component: {
                  name: appScreens.Profile.name,
                },
              },
            ],
          },
        },
      ],
    },
  },
};
