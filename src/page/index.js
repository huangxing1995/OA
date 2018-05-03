import React from 'react'
import {StackNavigator} from 'react-navigation';

import SomePage from './somePage'
import LoginPage from './loginPage'

import TabPage from './tabPage'
import UserListPage from './userListPage'
import UserInfoPage from './userInfoPage'
import DepartmentListPage from './departmentListPage'
import DepartmentInfoPage from './departmentInfoPage'
import PositionListPage from './positionListPage'
import PositionInfoPage from './positionInfoPage'
import AnnouncementListPage from './announcementListPage'
import AnnouncementListForUserPage from './announcementListForUserPage'
import AnnouncementInfoPage from './announcementInfoPage'

import ApprovePage from './approvePage'
import ApproveDetailPage from './approveDetailPage'
import BusinessTripPage from './businessTripPage'
import OverTimePage from './overTimePage'


import DemandInfoPage from './demandInfoPage'
import DemandListPage from './demandListPage'
import DailyReportPage from './dailyReportPage'
import DailyReportListPage from './dailyReportListPage'
import WeeklyReportPage from './weeklyReportPage'
import WeeklyReportListPage from './weeklyReportListPage'

import SignTabPage from './signInPage'

import SelectPage from './selectPage'


export default function configAppNavigator(isLoggedIn) {
	return StackNavigator({
		LoginPage:{
			screen: LoginPage
		},
		TabPage:{
			screen: TabPage
		},
		SomePage:{
			screen: SomePage
		},
		UserListPage:{
			screen: UserListPage
		},
		UserInfoPage: {
			screen: UserInfoPage
		},
		DepartmentListPage: {
			screen: DepartmentListPage
		},
		DepartmentInfoPage: {
			screen: DepartmentInfoPage
		},
		PositionListPage: {
			screen: PositionListPage
		},
		PositionInfoPage: {
			screen: PositionInfoPage
		},
		AnnouncementListPage: {
			screen: AnnouncementListPage
		},
		AnnouncementListForUserPage: {
			screen: AnnouncementListForUserPage
		},
		AnnouncementInfoPage: {
			screen: AnnouncementInfoPage
		},
		ApprovePage: {
			screen: ApprovePage
		},
		ApproveDetailPage:{
			screen: ApproveDetailPage
		},
		BusinessTripPage: {
			screen: BusinessTripPage
		},
		OverTimePage: {
			screen: OverTimePage
		},
		DemandInfoPage: {
			screen: DemandInfoPage
		},
		DemandListPage: {
			screen: DemandListPage
		},
		DailyReportPage: {
			screen: DailyReportPage
		},
		DailyReportListPage: {
			screen: DailyReportListPage
		},
		WeeklyReportPage: {
			screen: WeeklyReportPage
		},
		WeeklyReportListPage: {
			screen: WeeklyReportListPage
		},
		SignTabPage: {
			screen: SignTabPage
		},
		
		SelectPage: {
			screen: SelectPage
		}
	},{
		initialRouteName: isLoggedIn ? 'TabPage' : 'LoginPage'
	});
}



