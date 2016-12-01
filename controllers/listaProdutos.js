module.exports = function(app) {
    var ListaProdutos = {
        index: function(request, response) {
            var params = require('../public/data/products.json');
            response.render('produtos/index', params);
        },
        sacola: function(request, response) {
            var produtos = request.body.produtos;
            var listaIds = produtos;
            if(produtos.indexOf(',') != -1) {
                listaIds = produtos.split(',');
            }

            var ids = JSON.parse(listaIds);
            var params = require('../public/data/products.json');
            var listaProdutos = params.products;
            var listaProdutoSelecionado = [];

            for(var i = 0; i < listaProdutos.length; i++) {
                for(var x = 0; x < ids.length; x++) {
                    if(ids[x] === listaProdutos[i].id) {
                        var produtoSelecionado = {};

                        produtoSelecionado.id = listaProdutos[i].id;
                        produtoSelecionado.sku = listaProdutos[i].sku;
                        produtoSelecionado.title = listaProdutos[i].title;
                        produtoSelecionado.description = listaProdutos[i].description;
                        produtoSelecionado.availableSizes = listaProdutos[i].availableSizes;
                        produtoSelecionado.style = listaProdutos[i].style;
                        produtoSelecionado.price = listaProdutos[i].price;
                        produtoSelecionado.installments = listaProdutos[i].installments;
                        produtoSelecionado.currencyId = listaProdutos[i].currencyId;
                        produtoSelecionado.currencyFormat = listaProdutos[i].currencyFormat;
                        produtoSelecionado.isFreeShipping = listaProdutos[i].isFreeShipping;

                        listaProdutoSelecionado.push(produtoSelecionado);
                    }
                }
            }
            response.render('produtos/sacola', {"products":listaProdutoSelecionado});
        },
        remove: function(request, response) {
            response.render('produtos/remove');
        }
    };
    return ListaProdutos;
};