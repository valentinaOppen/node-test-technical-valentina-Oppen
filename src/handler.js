const axios = require('axios');

exports.top3MostLentBooksQ22021 = async (req, res, next) => {
  const resp = await axios.get('https://hiring.condorlabs.io/api/books/logs')
  let dates = resp.data.filter(x=> new Date(x.dateOfLent) >= new Date("2021-04-01") && new Date(x.dateOfLent) <= new Date("2021-06-30"));

  let nuevoArray = [];
  let first = {element: {}, count:0};
  let second = {element: {}, count:0};
  let third = {element: {}, count:0};

  dates.forEach(element => {
    if(nuevoArray[element.title]) nuevoArray[element.title].count++;
    else nuevoArray[element.title] = {element, count: 1}

    if(nuevoArray[element.title].count > first.count) {
      first = {element, count: nuevoArray[element.title].count}
      return;
    }

    if(nuevoArray[element.title].count > second.count) {
      second = {element, count: nuevoArray[element.title].count};
      return;
    }

    if(nuevoArray[element.title].count > third.count) {
      third = {element, count: nuevoArray[element.title].count};
      return
    }

  });

  return res.status(200).json([first.element.title, second.element.title, third.element.title ])
}

