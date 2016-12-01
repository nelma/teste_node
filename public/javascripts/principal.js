(function() {
    apendaEventoClique();
    verSacola();
})();

function apendaEventoClique() {
    var listaProdutos = document.getElementsByClassName("thumbnail");

    for(var i = 0; i < listaProdutos.length; i++) {
        listaProdutos[i].addEventListener('click', selecionaIDProduto, false);
    }
}

function selecionaIDProduto(e) {
    armazenaIDProdutoSessao(+e.currentTarget.children[0].value);
}

function armazenaIDProdutoSessao(produto) {
    var listProdutos = [];

    if(sessionStorage.getItem('lista-produto')) {
        listProdutos = JSON.parse(sessionStorage.getItem('lista-produto'));
        if(listProdutos.indexOf(produto) == -1) {
            listProdutos.push(produto);
        }
    } else {
        listProdutos.push(produto);
    }
    sessionStorage.setItem('lista-produto', JSON.stringify(listProdutos));
    criaArrayIds(produto);
}

function criaArrayIds(produto) {
    var listProdutos = [];
    listProdutos.push(produto);
    chamaControllerSacola(JSON.stringify(listProdutos));
}

function verSacola() {
    $('#ver-sacola').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();

        if($('#lista-produto-seleciona').find('.produtos').length == 0) {
            chamaControllerSacola(sessionStorage.getItem('lista-produto'));
        }

        $("#sacola").show();
    });
}

function chamaControllerSacola(listaIds) {
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