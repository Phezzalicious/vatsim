const request = require('request');
const apiOptions = {
  server: 'http://localhost:3000'
};

const Airports = [
    //BRAVO
    "KPHX", //KPHX - Phoenix Sky Harbor Intl
    //CHARLIE
    "KABQ", //KABQ - Albuquerque Intl Sunport
    "KAMA", //KAMA - Rick Husband Amarillo Intl
    "KDMA", //KDMA - Davis Monthan AFB
    "KELP", //KELP - El Paso Intl
    "KTUS", //KTUS - Tucson Intl & U90 TRACON
    //DELTA
    "KAEG", //KAEG - Double Eagle II
    "KBIF", //KBIF - Biggs AAF
    "KCHD", //KCHD - Chandler Municipal
    "KCVS", //KCVS - Cannon AFB
    "KDVT", //KDVT - Phoenix Deer Valley
    "KFFZ", //KFFZ - Falcon Field
    "KFHU", //KFHU - Sierra Vista / Libby AAF
    "KFLG", //KFLG - Flagstaff Pulliam
    "KGEU", //KGEU - Glendale Municipal
    "KGYR", //KGYR - Phoenix Goodyear
    "KHMN", //KHMN - Holloman AFB
    "KIWA", //KIWA - Phoenix-Mesa Gateway
    "KLUF", //KLUF - Luke AFB
    "KPRC", //KPRC - Ernest A Love Field
    "KROW", //KROW - Roswell Intl Air Center
    "KRYN", //KRYN - Ryan Field
    "KSAF", //KSAF - Santa Fe Municipal
    "KSDL"  //KSDL - Scottsdale
  ];

// Airports.forEach((airport) => {
//     console.log(airport);
// })

let selectedAirport = "KPHX";

const vatsimAirportSelection = (req, res) => {
    console.log(req.body);
    selectedAirport = req.body.selectedAirport;
    console.log(`Selected Airport: ${selectedAirport}`);
    vatsimArrivals(req, res);
}

const vatsimArrivals = (req, res) => {
    // /arrived/:airport/:howMany/:offset
    console.log(`Selected Airport: ${selectedAirport}`);
    const path = `/api/arrived/${selectedAirport}/15/0`;
    const requestOptions = {
      url: `${apiOptions.server}${path}`,
      method: 'GET',
      json: {},
    };
    request(
      requestOptions,
      (err, {statusCode}, body) => {
        let data = [];
        if (statusCode === 200 && body.length) {
            data = body;
        }
        renderArrivalsPage(req, res, data);
      }
    );
};
  
const renderArrivalsPage = (req, res, responseBody) => {
    let message = null;
    if (!(responseBody instanceof Array)) {
      message = 'API lookup error';
      responseBody = [];
    } else {
      if (!responseBody.length) {
        message = 'No results for this airport';
      }
    }
    res.render('arrivals', 
        {
            airports: Airports,
            clients: responseBody,
            message,
            selectedAirport
        }
    );
};

  module.exports = {
    vatsimArrivals,
    vatsimAirportSelection
  };