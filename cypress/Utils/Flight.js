class Flight {
  constructor() {
    var flightDate = new Date();
    flightDate.setDate(flightDate.getDate() + 40)
    var dd = String(flightDate.getDate()).padStart(2, '0');
    var mm = String(flightDate.getMonth() + 1).padStart(2, '0');
    var yyyy = flightDate.getFullYear();
    flightDate = dd + '-' + mm + '-' + yyyy;

    this.departure = "MAD"
    this.destination = "BCN"
    this.date = flightDate
    this.airline = 'Vueling'
  }
}

module.exports = Flight