const Item = require('../models/item');

module.exports = {
  index,
  new: newListing,
  create,
  delete: deleteListing,
  show,
  update,
};

function index(req, res) {
    Item.find({}, function (err, items) {
        // console.log(items);
        res.render('items/index', {items})
    })
}

function newListing(req, res) {
  res.render("items/new")
}

function create(req, res) {
    const item = new Item(req.body);
    item.save(function(err) {
        console.log(item);
        if(err) return res.render("items/new");
        // console.log(item);
      })
      res.redirect("/items");
}

function deleteListing(req, res) {
  Item.findByIdAndDelete(req.params.id, function(err) {
    if(err) console.log('Error');
    console.log('Successfully deleted');
    res.redirect('/items')
  });
}

function show(req, res) {
  Item.findById(req.params.id, function(err, item) {
    res.render('items/show', {title: 'Item Detail', item });
  });
}

function update(req, res){
  Item.findByIdAndUpdate(req.params.id, req.body, function(err, item) {
     res.redirect(`/items/${item._id}`);
  })
}