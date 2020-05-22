import Vue from 'vue';
import VueRouter from 'vue-router';
import homePage from '@/views/home.page';
import quizAppPage from '@/views/quiz-app.page';
import signUpPage from '@/views/signup.page';
import quizPage from '@/views/quiz.page';
import err404 from '@/views/err-404.page';

import quizList from '@/cmps/quiz-list.cmp';
import quizEdit from '@/cmps/quiz-edit.cmp';
import userEdit from '@/cmps/user-edit.cmp';
import userQuiz from '@/cmps/user-quiz.cmp';

Vue.use(VueRouter);

  const routes = [
    { path: '/', name: 'home', component: homePage },
    { path: '/quiz', component: quizAppPage, children: [
      { path: '', name: 'quiz-list', component: quizList },
      { path: 'edit/:id?', name: 'quiz-edit', component: quizEdit },
      { path: 'dashboard', component: () => import('@/cmps/user-dashboard.cmp'), children: [
        { path: '', name: 'user-quiz', component: userQuiz },
        { path: 'edit', name: 'user-edit', component: userEdit }
      ] }
    ] },
    { path: '/quiz/:id', name: 'quiz-page', component: quizPage },
    { path: '/signup', name: 'signup', component: signUpPage },
    { path: '*', name: 'error-404', component: err404 }
  ]

const router = new VueRouter({
  routes
});

export default router;