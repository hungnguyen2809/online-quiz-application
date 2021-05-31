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
  ChooseTopicScreen: {
    id: 'app.screen.ChooseTopicScreen',
    name: 'ChooseTopicScreen',
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
  ResultExamScreen: {
    id: 'app.screen.ResultExamScreen',
    name: 'ResultExamScreen',
  },
  PostDetailsScreen: {
    id: 'app.screen.PostDetailScreen',
    name: 'PostDetailsScreen',
  },
  PostCreatesScreen: {
    id: 'app.screen.PostCreatesScreen',
    name: 'PostCreatesScreen',
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
                  name: appScreens.ChooseTopicScreen.name,
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
