const {
    faker
  } = require('@faker-js/faker');

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  const birthdate = randomDate(new Date(1930, 0, 1), new Date((2004, 11, 28)));
  const passportIssuance = randomDate(new Date(birthdate.getFullYear(), 0, 1), new Date());
  const passportExpiry = randomDate(new Date(), new Date(2042, 11, 28));

class Person {
    constructor() {
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

  module.exports = Person