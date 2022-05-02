declare namespace Cypress {
  interface Chainable < Subject > {
    fillYourPersonalInformation(): Chainable < any >
      fillTravellerInformation(): Chainable < any >
      searchForFlight(): Chainable < any >
      goToFlights(): Chainable < any >
      gotIt(): Chainable < any >
      agreeToTermsAndConfirm(): Chainable < any >
      cancelBooking(): Chainable < any >
      selectPaymentMethod(): Chainable < any >
      checkInvoice(): Chainable < any >
      selectStops(): Chainable < any >
      selectAirline(): Chainable < any >
      checkBookingDetails(): Chainable < any >
      checkFlightDetails(): Chainable < any >
  }
}