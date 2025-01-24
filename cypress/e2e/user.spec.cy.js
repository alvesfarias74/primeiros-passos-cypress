import userData from '../fixtures/users/userData.json'
import LoginPage from '../pages/loginPage'
import DashboardPage from '../pages/dashboardPage'
import MenuPage from '../pages/menuPage'
import MyInfoPage from '../pages/myInfoPage'

const Chance = require('chance')

const chance = new Chance()
const loginPage = new LoginPage()
const dashboardPage = new DashboardPage()
const menuPage = new MenuPage()
const myInfoPage = new MyInfoPage()

describe('Orange HRM Tests', () => {
  it('User Info Update - Success', () => {   
    loginPage.accessLoginPage()
    loginPage.loginWithAnyUser(userData.userSuccess.username, userData.userSuccess.password)
    
    dashboardPage.checkDashboardPage()

    menuPage.accessMyInfo()

    myInfoPage.fillPersonalDetails(chance.first(), chance.string(), chance.last())
    myInfoPage.fillEmployeeDetail(chance.natural({ min: 1, max: 999 }), chance.bb_pin(),  chance.natural({ min: 1, max: 999 }), '2025-12-24', '1974-03-24')
    myInfoPage.fillStatus()
    myInfoPage.saveForm()     
  })
  
})