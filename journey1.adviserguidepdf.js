/// <reference types="cypress" />

it('Adviser PDF guide display', () => {
  cy.viewport('macbook-13')

  cy.visit('https://www.investcentre.co.uk')

  cy.get('input[name="adviser"]')
    .contains('I am a financial professional')
    .click()
  cy.screenshot()

  cy.get('a[href="/retirement-investment-account"]')
    .contains('FIND OUT MORE')
    .click()
  cy.screenshot()

  cy.get('a[href="/platform/charges"]')
    .contains('Charges')
    .click({ force: true })

  cy.screenshot()

  cy.get('a[href="/sites/default/files/AJBIC_charges_and_rates.pdf"]')
    .should('have.attr', 'target', 'blank')
    .click()

  //TODO: set "chromeWebSecurity": false in cypress.json file 
  //per profile in lower environments and assert below for pdf
  //cy.get('a[href="/sites/default/files/AJBIC_charges_and_rates.pdf"]')
  //.should('remove.attr', 'target', 'blank')
  //.click()
  
})

