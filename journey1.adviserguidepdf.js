/// <reference types="cypress" />

let domainUrl = 'https://www.investcentre.co.uk'

it('Adviser PDF guide display', () => {
  cy.viewport('macbook-13')

  cy.visit(domainUrl)

  cy.get('.form-actions.js-form-wrapper.form-wrapper')
    .children('.secondary.button.js-form-submit.form-submit')
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
    .should('contain','CHARGES – SIPP, ISA OR GIA')
    .click()
  
}),

context('Download Pdf and ensure file exists', () => {
  it('Download Pdf', () => {
    cy.request({ url: domainUrl+'/sites/default/files/AJBIC_charges_and_rates.pdf', gzip: false, encodeBodyToBase64: true }).then(
      (response) => {
        const fileName = 'test-'+Date.now();
        const filePath = 'cypress/downloads/' + fileName + '.pdf';

        cy.writeFile(filePath, response.body, {
          encoding: 'binary',
          decodeContentFromBase64: true, 
        });

      cy.readFile(filePath)
      }
    );
  });
});
