const {
  faker
} = require('@faker-js/faker');

const {
  passengers
} = require('../fixtures/passengers.json');

class Person {
  constructor(firstName, lastName, email, phoneNumber, address, country, passport, day, month, birthYear, passportIssuanceYear) {
    function randomDate(start, end) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    let birthdate = new randomDate(new Date(1930, 0, 1), new Date((2004, 11, 28)));
    let passportIssuance = new randomDate(new Date(birthdate.getFullYear(), 0, 1), new Date());
    let passportExpiry = new randomDate(new Date(), new Date(2042, 11, 28));

    this.firstName = faker.name.firstName();
    this.lastName = faker.name.lastName();
    this.email = faker.internet.email();
    this.phoneNumber = faker.phone.phoneNumber();
    this.address = faker.address.streetAddress();
    this.country = 'United Kingdom'; //Some countries missing on phptravels.net. E.G.: Dominican Republic
    this.birthday = Math.floor(Math.random() * 29) + 1;
    this.birthmonth = String(birthdate.getMonth() + 1).padStart(2, '0');
    this.birthYear = birthdate.getFullYear();
    this.passportIssuanceDay = Math.floor(Math.random() * 29) + 1;
    this.passportIssuanceMonth = String(passportIssuance.getMonth() + 1).padStart(2, '0');
    this.passportIssuanceYear = passportIssuance.getFullYear();
    this.passportExpiryDay = Math.floor(Math.random() * 29) + 1;
    this.passportExpiryMonth = String(passportExpiry.getMonth() + 1).padStart(2, '0');
    this.passportExpiryYear = passportExpiry.getFullYear();
    this.passportId = faker.random.alphaNumeric(10);
    this.birthdate = birthdate;
    this.passportIssuance = passportIssuance;
    this.passportExpiry = passportExpiry;
  }
}

let people = [];

Cypress.Commands.add('fillYourPersonalInformation', (person) => {
  var person = new Person();
  people.push(person);
  cy.get('[name="firstname"]').type(person.firstName);
  cy.get('[name="lastname"]').type(person.lastName);
  cy.get('[name="email"]').type(person.email);
  cy.get('[name="phone"]').type(person.phoneNumber);
  cy.get('[name="address"]').type(person.address);
  cy.get('.select2-selection:first()').click();
  cy.get('.select2-search__field').type(person.country);
  cy.get('.select2-results').contains(person.country).click();
  cy.get('.select2-selection:nth(1)').click();
  cy.get('.select2-search__field').type(person.country);
  cy.get('.select2-results').contains(person.country).click();
  cy.fillTravellerInformation(person);
})

Cypress.Commands.add('fillTravellerInformation', (person, position = 1) => {
  cy.get(`[name="firstname_${position}"]`).type(person.firstName);
  cy.get(`[name="lastname_${position}"]`).type(person.lastName);
  cy.get(`[name="nationality_${position}"]`).select(person.country);
  cy.get(`[name="dob_month_${position}"]`).select(person.birthmonth);
  cy.get(`[name="dob_day_${position}"]`).select(person.birthday);
  cy.get(`[name="dob_year_${position}"]`).select(`${person.birthYear}`);
  cy.get(`[name="passport_${position}"]`).type(person.passportId);
  cy.get(`[name="passport_issuance_month_${position}"]`).select(person.passportIssuanceMonth);
  cy.get(`[name="passport_issuance_day_${position}"]`).select(person.passportIssuanceDay);
  cy.get(`[name="passport_issuance_year_${position}"]`).select(`${person.birthYear}`);
  cy.get(`[name="passport_month_${position}"]`).select(person.passportExpiryMonth);
  cy.get(`[name="passport_day_${position}"]`).select(person.passportExpiryDay);
  cy.get(`[name="passport_year_${position}"]`).select(`${person.passportExpiryYear}`);
})

Cypress.Commands.add('fillExtraTravellerInformation', () => {
  cy.get('.card-body').then(($table) => {
    let total = passengers.adult + passengers.child + passengers.infant + 1;
    for (let i = 2; i <= total; i++) {
      let person = new Person();
      people.push(person);
      cy.fillTravellerInformation(person, i);
    }
  })
})

Cypress.Commands.add('agreeToTermsAndConfirm', () => {
  cy.get('#agreechb').click({
    force: true
  });
  cy.get('#booking').click();
});

Cypress.Commands.add('cancelBooking', () => {
  cy.url().should('include', '/invoice');
  cy.get('form > .btn').click();
  cy.get('.alert').contains(`\
Your cancellation request has been sent successlly. \
please wait for our response`);
});

Cypress.Commands.add('selectPaymentMethod', () => {
  cy.get('[for="gateway_bank-transfer"]').click();
});

Cypress.Commands.add('checkInvoice', () => {
  cy.get
  cy.checkCustomerDetails()
  cy.checkTravellerDetails();

})

Cypress.Commands.add('checkTravellerDetails', () => {
  cy.get('.card-body').then(($row) => {
    for (let i = 0; i < $row.length; i++) {
      console.log(i);
      console.log(people[i])
      console.log(people[i].firstName)
      cy.get(`.card-body> .row:nth(${i+1})`)
        .should('contain', people[i].firstName)
        .and('contain', people[i].lastName)
        .and('contain', 'GB')
        .and('contain', `\
${(people[i].birthday +1 )||(String(people[i].birthday +1 )).padStart(2, '0')}-\
${people[i].birthmonth}-\
${people[i].birthYear}`)
        .and('contain', people[i].passportId)
    }
  })
})

Cypress.Commands.add('checkCustomerDetails', () => {
  cy.get('.col-md-6:first()')
    .should('contain', people[0].firstName)
    .and('contain', people[0].lastName)
    .and('contain', people[0].email)
    .and('contain', people[0].phoneNumber)
    .and('contain', people[0].address)
})