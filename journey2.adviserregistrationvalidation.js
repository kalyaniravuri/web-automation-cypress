/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

let enterFSRNumberUrl;

it('Register and verify adviser registration page displayed', () => {
  cy.viewport('macbook-13')

  cy.visit('https://www.investcentre.co.uk')

  cy.get('input[name="adviser"]')
    .contains('I am a financial professional')
    .click()
  cy.screenshot()

  cy.get('a[href="/AdviserRegistration/EnterFSRNumber"]')
    .contains('Register')
    .click({ force: true })
  cy.screenshot()

  cy.url()
    .should('eq', 'https://www.investcentre.co.uk/AdviserRegistration/EnterFSRNumber')
  
  cy.url().then(url => {
    enterFSRNumberUrl = url
  });

}),

  it('FCA firm reference blank validation', () => {
    cy.viewport('macbook-13')

    cy.visit(enterFSRNumberUrl)
    cy.screenshot()

    cy.get('button[type="submit"]')
      .should('be.visible')
      .click()

    cy.screenshot()
    cy.get('span[class="field-validation-error"').contains("FSR number field is mandatory. Please try again")
 
  }),

  it('FCA firm reference random validation', () => {
    cy.viewport('macbook-13')

    cy.visit(enterFSRNumberUrl)
    cy.screenshot()

    const random = Math.random() * 100

    cy.get('input[id="FSRNumber_TextBox"]')
      .should('be.visible')
      .type(random)
    
    cy.get('button[type="submit"]')
      .should('be.visible')
      .click()

    cy.get('span[class="field-validation-error"').contains("We could not locate your firm. Please check that you have entered your FSR number")
    cy.screenshot()

  })