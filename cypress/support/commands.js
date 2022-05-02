Cypress.Commands.add('goToFlights', () => {
  cy.get('[data-position="2"]').click();
});

Cypress.Commands.add('gotIt', () => {
  cy.get('#cookie_stop').click();
});

Cypress.Commands.add('checkInvoice', () => {
  cy.checkCustomerDetails();
  cy.checkTravellerDetails();
  cy.checkBookingDetails();
})