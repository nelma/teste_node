(function() {
    var principal = new Principal();
    principal.apendaEventoClique();
    principal.verSacola()
})();

function Principal() {

    var $private = {};
    var $public = this;

    $public.apendaEventoClique = function() {
        var listaProdutos = document.getElementsByClassName("thumbnail");

        for(var i = 0; i < listaProdutos.length; i++) {
            listaProdutos[i].addEventListener('click', $private.selecionaIDProduto, false);
        }
    };

    $public.verSacola = function() {
        $('#ver-sacola').on('click', function(e){
            e.preventDefault();
            e.stopPropagation();

            if($('#lista-produto-seleciona').find('.produtos').length == 0) {
                $private.chamaControllerSacola(sessionStorage.getItem('lista-produto'));
            }

            $("#sacola").show();
        });
    };

    $private.selecionaIDProduto = function(e) {
        $private.armazenaIDProdutoSessao(+e.currentTarget.children[0].value);
    };

    $private.armazenaIDProdutoSessao = function(produto) {
        var listProdutos = [];

        if(sessionStorage.getItem('lista-produto')) {
            listProdutos = JSON.parse(sessionStorage.getItem('lista-produto'));
            if(listProdutos.indexOf(produto) == -1) {
                listProdutos.push(produto);
                $private.criaArrayIds(produto);
            }
        } else {
            listProdutos.push(produto);
            $private.criaArrayIds(produto);
        }
        sessionStorage.setItem('lista-produto', JSON.stringify(listProdutos));
    };


    $private.criaArrayIds = function(produto) {
        var listProdutos = [];
        listProdutos.push(produto);
        $private.chamaControllerSacola(JSON.stringify(listProdutos));
    };

    $private.chamaControllerSacola = function(listaIds) {
        $.ajax({
            type: "POST",
            url: '/sacola',
            type: 'POST',
            data: {produtos: listaIds},
            success: function(data) {
                $("#lista-produto-seleciona").append(data);
            }
        });
    }
}