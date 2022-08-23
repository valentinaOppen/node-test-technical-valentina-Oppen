
const axios = require('axios');

exports.getBooks = async (req, res, next) => {
  const orderBy = req.query.orderBy ? JSON.parse(req.query.orderBy) : '';
  const filterBy = req.query.filterBy;
  const term = req.query.term;

  // if(!orderBy.pages || (orderBy.pages != 'asc' && orderBy != 'desc')) res.status(400).json({message: 'Order by is required'});
  if(orderBy.pages && (orderBy.pages != 'asc' && orderBy.pages != 'desc')) return res.status(400).json({message: 'Order by is required'});

  const resp = await axios.get('https://hiring.condorlabs.io/api/books');
  let books = resp.data;

  if(filterBy && term) {
    books = books.filter(x=> x.status === term.toUpperCase());
  }

  if(orderBy.pages === 'desc') books = books.sort(function(a,b){return b.pages - a.pages})
  else books = books.sort(function(a,b){return a.pages - b.pages})
  return res.status(200).json(books)
}
