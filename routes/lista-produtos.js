module.exports = function(app) {
  var listaProdutos = app.controllers.listaProdutos;
    app.get('/', listaProdutos.index);
    app.post('/sacola', listaProdutos.sacola);
    app.get('/remove/:id', listaProdutos.remove);
};