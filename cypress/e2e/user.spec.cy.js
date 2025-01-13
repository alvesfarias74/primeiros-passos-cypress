import userData from '../fixtures/users/userData.json'
import LoginPage from '../pages/loginPage'
import DashboardPage from '../pages/dashboardPage'
import MenuPage from '../pages/menuPage'

const loginPage = new LoginPage()
const dashboardPage = new DashboardPage()
const menuPage = new MenuPage()

describe('Orange HRM Tests', () => {

  const selectorList = {    
    
    myInfoButton: "[href='/web/index.php/pim/viewMyDetails']",
    firstNameField: "[name='firstName']",
    middleNameField: "[name='middleName']",
    lastNameField: "[name='lastName']",
    genericField: ".oxd-input--active",
    dateField: "[placeholder='yyyy-mm-dd']",
    dateCloseButton: ".--close",
    submitButton: "[type='submit']",
    genericCombobox: ".oxd-select-text--arrow",
    secondItemCombobox: ".oxd-select-dropdown > :nth-Child(27)",
    thirdItemCombobox: ".oxd-select-dropdown > :nth-child(3)"
  }

  it.only('User Info Update - Success', () => {   
    loginPage.accessLoginPage()
    loginPage.loginWithAnyUser(userData.userSuccess.username, userData.userSuccess.password)
    
    dashboardPage.checkDashboardPage()
    menuPage.accessMyInfo()
    
   
    cy.get(selectorList.firstNameField).clear().type('Francisco')
    cy.get(selectorList.middleNameField).clear().type('Alves')
    cy.get(selectorList.lastNameField).clear().type('Farias')
    cy.get(selectorList.genericField).eq(3).clear().type('EmployId')
    cy.get(selectorList.genericField).eq(4).clear().type('OtherId')
    cy.get(selectorList.genericField).eq(5).clear().type('123456')    
    cy.get(selectorList.genericField).eq(6).clear().type('2025-03-10')
    cy.get(selectorList.dateCloseButton).click()
    cy.get(selectorList.submitButton).eq(0).click({force: true})
    cy.get('.oxd-toast-close')

    cy.get(selectorList.genericCombobox).eq(0).click()
    cy.get(selectorList.secondItemCombobox).click()
    cy.get(selectorList.genericCombobox).eq(1).click()
    cy.get(selectorList.thirdItemCombobox).click()
    
  })
  it('Login - Fail', () => {
    cy.visit('/auth/login')
    cy.get(selectorList.usernameField).type('Test')
    cy.get(selectorList.passwordField).type('Test')
    cy.get(selectorList.loginButton).click()
    cy.get(selectorList.wrongCredentialAlert)
  })
})