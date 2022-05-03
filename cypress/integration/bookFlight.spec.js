describe('example to-do app', () => {

  before(() => {
    cy.clearLocalStorage();
  })

  it('As a Customer I open the homepage', () => {
    cy.visit('/');
  })

  it('And search for a flight', {
    scrollBehavior: false
  }, () => {
    cy.gotIt();
    cy.goToFlights();
    cy.searchForFlight();
    cy.selectAirline();
    cy.selectStops();
    cy.bookNow();
  })

  it('And book a flight', {
    scrollBehavior: false
  }, () => {
    cy.selectAirline();
    cy.selectStops();
    cy.bookNow();
  })

  it('And Fill personal information', {
    scrollBehavior: 'center'
  }, () => {
    cy.checkFlightDetails();
    cy.checkBookingDetails()
    cy.fillYourPersonalInformation();
  })

  it('And fill extra traveller information', {
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