import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Hello from 'components/Hello'
import Index from 'components/Index'
import Personal from 'components/Personal'
import StudyCourse from 'components/StudyCourse'
import AlterPassword from 'components/AlterPassword'
import MyTrain from 'components/MyTrain'
import TrainApply from 'components/TrainApply'
import ApplyForLearn from 'components/ApplyForLearn'
import LearnSummarize from 'components/LearnSummarize'
import Summary from 'components/Summary'

const router = new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'Hello', component: Hello },
    { path: '/index',
      name: 'Index',
      component: Index,
      children: [
      { path: 'personal/message', component: Personal },
      { path: 'personal/studycourse', component: StudyCourse },
      { path: 'personal/alterpassword', component: AlterPassword },
      { path: 'train/mytrain', component: MyTrain },
      { path: 'train/trainapply', component: TrainApply },
      { path: 'study/applyforlearn', component: ApplyForLearn },
      { path: 'study/learnsummarize', component: LearnSummarize },
      { path: 'summary', component: Summary }
      ]
    }
  ]
})

export default router
