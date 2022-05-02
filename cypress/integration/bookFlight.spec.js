describe('example to-do app', () => {

  before(() => {
    cy.clearLocalStorage();
  })

  it('Opens the homepage', () => {
    cy.visit('/');
  })

  it('Searches for a flight', {
    scrollBehavior: false
  }, () => {
    cy.gotIt();
    cy.goToFlights();
    cy.searchForFlight();
    cy.selectAirline();
    cy.selectStops();
    cy.bookNow();
  })

  it('Fills personal information', {
    scrollBehavior: 'center'
  }, () => {
    cy.checkFlightDetails();
    cy.checkBookingDetails()
    cy.fillYourPersonalInformation();
  })

  it('Fills extra traveller information', {
    scrollBehavior: 'center'
  }, () => {
    cy.fillExtraTravellerInformation();
    cy.selectPaymentMethod();
    cy.agreeToTermsAndConfirm();  
  })

  it('Checks the invoice page', {
    scrollBehavior: 'center'
  }, () => {
    cy.checkInvoice();
    cy.checkBookingDetails()
  })

  after(() => {
    cy.cancelBooking();
  })
});