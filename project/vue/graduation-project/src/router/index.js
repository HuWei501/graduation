import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Login from 'components/Login'
// 前端
import Index from 'components/front/Index'
import Personal from 'components/front/personalCenter/Personal'
import StudyCourse from 'components/front/autoLearn/StudyCourse'
import AlterPassword from 'components/front/personalCenter/AlterPassword'
import MyTrain from 'components/front/trainTogether/MyTrain'
import TrainApply from 'components/front/trainTogether/TrainApply'
import ApplyForLearn from 'components/front/autoLearn/ApplyForLearn'
import LearnSummarize from 'components/front/autoLearn/LearnSummarize'
import Summary from 'components/front/Summary'
// 后台
import Admin from 'components/backstage/Admin'
import NewStaff from 'components/backstage/staff/NewStaff'
import StaffList from 'components/backstage/staff/StaffList'
import NewTrain from 'components/backstage/train/NewTrain'
import TrainList from 'components/backstage/train/TrainList'
import DataList from 'components/backstage/autoLearn/DataList'
import NewData from 'components/backstage/autoLearn/NewData'
import Position from 'components/backstage/Position'

const router = new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'Login', component: Login },
    { path: '/pdf', name: 'MyTrain', component: StudyCourse },
    { path: '/index',
      name: 'Index',
      component: Index,
      children: [
      { path: 'personal/message', component: Personal },
      { path: 'personal/alterpassword', component: AlterPassword },
      { path: 'train/mytrain', component: MyTrain },
      { path: 'train/trainapply', component: TrainApply },
      { path: 'study/applyforlearn', component: ApplyForLearn },
      { path: 'study/learnsummarize', component: LearnSummarize },
      { path: 'summary', component: Summary }
      ]
    },
    { path: '/admin',
      name: 'Admin',
      component: Admin,
      children: [
      { path: 'newstaff', component: NewStaff },
      { path: 'stafflist', component: StaffList },
      { path: 'newtrain', component: NewTrain },
      { path: 'trainlist', component: TrainList },
      { path: 'datalist', component: DataList },
      { path: 'newdata', component: NewData },
      { path: 'position', component: Position }
      ]
    }
  ]
})

export default router
