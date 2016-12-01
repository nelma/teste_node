(function() {
    var sacola = new Sacola();
    sacola.removeProdutoCarrinho();
    sacola.eventoHoverListaProduto();
    sacola.totalCarrinho();
})();


function Sacola() {

    var $private = {};
    var $public = this;

    $public.removeProdutoCarrinho = function() {
        $(".remove").click(function(){
            $(this).parent().remove();
            var id = +$(this).parent().context.id;
            var listProdutos = JSON.parse(sessionStorage.getItem('lista-produto'));


            for(var i = 0; i < listProdutos.length; i++) {
                if(listProdutos[i] == id) {
                    listProdutos.splice(i, 1);

                    var valorUnitario = +$(this).parent().find('#preco').val();
                    var total = $('#sub-total #total').text();
                    var valorParcelado = parseFloat(total - valorUnitario).toFixed(2) / 10;

                    $('#sub-total #total').text(parseFloat(total - valorUnitario).toFixed(2));
                    $('#sub-total #valor-parcelado').text(parseFloat(valorParcelado).toFixed(2));
                }
            }
            sessionStorage.setItem('lista-produto', JSON.stringify(listProdutos));
        });
    };

    $public.totalCarrinho = function() {
        var preco = document.getElementsByName('preco');
        var resultado = 0;
        var valorParcelas;
        var valorParseado;

        for(var i =0; i < preco.length; i++) {
            valorParseado = +preco[i].value;
            resultado += valorParseado;
        }

        valorParcelas = resultado / 10;
        $('#total').text(parseFloat(resultado).toFixed(2));
        $('#valor-parcelado').text(parseFloat(valorParcelas).toFixed(2));
    };

    $public.eventoHoverListaProduto = function() {
        $('.produtos').hover($private.adicionaClasse, $private.removeClasse);
    };

    $private.adicionaClasse = function() {
        $(this).find('p.valor').addClass('hover-line-through');
        $(this).find('.remove').addClass('remove-hover');
    };

    $private.removeClasse = function() {
        $(this).find('p.valor').removeClass('hover-line-through');
        $(this).find('.remove').removeClass('remove-hover');
    };
}