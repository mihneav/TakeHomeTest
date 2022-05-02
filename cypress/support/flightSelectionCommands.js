const {
  passengers
} = require('../fixtures/passengers.json');

class Flight {
  constructor(departure, destination, date) {
    var flightDate = new Date();
    flightDate.setDate(flightDate.getDate() + 40)
    var dd = String(flightDate.getDate()).padStart(2, '0');
    var mm = String(flightDate.getMonth() + 1).padStart(2, '0');
    var yyyy = flightDate.getFullYear();
    flightDate = dd + '-' + mm + '-' + yyyy;

    this.departure = "MAD"
    this.destination = "BCN"
    this.date = flightDate
    this.airline = 'Iberia'
  }
}

let flight = new Flight();

Cypress.Commands.add('searchForFlight', () => {
  cy.get('#autocomplete').type(flight.departure);
  cy.get('[data-index="0"]').click();
  cy.get('#autocomplete2').type(flight.destination);
  cy.get('[data-index="0"]').click();
  cy.get('#departure').clear().type(flight.date);
  cy.get('.dropdown-toggle >.la').click();
  cy.addPassengers();
  cy.get('#flights-search').click();
  cy.get('.sec__title_list').should('contain', `${flight.departure}  ${flight.destination}`);
})

Cypress.Commands.add('selectStops', () => {
  cy.get('#direct ').click();
})

Cypress.Commands.add('selectAirline', () => {
  cy.contains(flight.airline).click();
})

Cypress.Commands.add('bookNow', () => {
  cy.get('[data-a].iberia .btn:first').scrollIntoView().click();
})

Cypress.Commands.add('checkBookingDetails', () => {
  cy.get('.ItineraryPartOverviewField._code:first')
    .should('contain', flight.departure);
  cy.get('.ItineraryPartOverviewField._code:last')
    .should('contain', flight.destination);
})

// Cypress.Commands.add('checkFlightDetails', () => {

//   cy.get('.ItineraryTrip-depart > span:first').should('contain', flight.departure);
//   cy.get('.ItineraryTrip-depart > span:last').should('contain', flight.destination);

//   cy.url().then(($url) => {
//     if ($url.includes('/invoice/')) {
//       cy.get('.ItineraryDate-date').invoke('text')
//         .should('contain', flight.flightDate)
//         .toLocaleString('en-us', {
//           day: 'numeric',
//           weekday: 'short',
//           month: 'short',
//           year: 'numeric'
//         })
//       } else {
//       cy.get('.ItineraryPartDetail-item:first').should('contain', flight.airline)
//       cy.get('.ItineraryPartDetail-item:last').invoke('text')
//         .should('match', /Flight no: \d{3,4}/)
//       cy.get('[style="font-size:22px"] > strong').invoke('text')
//         .should('match', /USD [1-9][0-9]{1,4}((\.)\d){0,1}/)
//     }
//   })
// })

Cypress.Commands.add('checkFlightDetails', () => {

  cy.get('[data-test="flight"]').should('contain', flight.departure)
                                .should('contain', flight.destination)
                                .should('contain', flight.airline)

  cy.url().then(($url) => {
    if ($url.includes('/invoice/')) {
      cy.get('.ItineraryDate-date').invoke('text')
        .should('contain', flight.flightDate)
        .toLocaleString('en-us', {
          day: 'numeric',
          weekday: 'short',
          month: 'short',
          year: 'numeric'
        })
        Object.entries(passengers).forEach(entry => {
          const [key, value] = entry;
          if (value>0){
            cy.get('.list-group > :nth-child(1)').should('contain', key.toUpperCase() + this.slice(1)+"s: "+value)           
          }
        })
      } else {      
      cy.get('.ItineraryPartDetail-item:last').invoke('text')
        .should('match', /Flight no: \d{3,4}/)
      cy.get('[style="font-size:22px"] > strong').invoke('text')
        .should('match', /USD [1-9][0-9]{1,4}((\.)\d){0,1}/)
    }
  })
})


Cypress.Commands.add('addPassengers', () => {
  Object.entries(passengers).forEach(entry => {
    const [key, value] = entry;
    Cypress._.times(value, () => {
      cy.get(`.${key}_qty > .qty-box > .qtyBtn > .qtyInc`).click();
    })
  })
})