var tema = "Alimentação";
var carregar = true;
$(document).ready(function () {

    $('input[type="checkbox"]')[0].checked = true;
    $('input[type="checkbox"]')[1].checked = false;
    $('input[type="checkbox"]')[2].checked = false;
});

$(document).on('change', 'input[type="checkbox"]', function () {
    var temaCheck = $('input[type="checkbox"]');
    for (var i = 0; i < temaCheck.length; i++) {
        if (temaCheck[i].checked) {
            temaCheck[i].checked = false;
            tema = temaCheck[i].parentElement.parentElement.firstElementChild.innerHTML;
        }
    }
    this.checked = true;
});

$(document).on('click', '.btn_postar', function () {
    var pergunta = $('.textoTituloNovoTopico').val();
    if(pergunta.trim() != ""){
        var descricao = $('.textoDescricao').val();
        if (tema == "Alimentação")
            tema = "ALIMENTACAO";
        else if (tema == "Consumos Nocivos")
            tema = "CONSUMOS";
        else
            tema = "SEXUALIDADE";

        $.ajax({
            url: /handlers/HandlerForumNovoTopico.ashx?type=1,
            type: "POST",
            data: { 
                pergunta: pergunta,
                tema: tema,
                descricao: descricao
            },
            dataType: "json",
            success: function (x) {
                window.location.href = "./forum_index.html";
            }
        });

    } else {
        //$('.textoTituloNovoTopico').attr('style', 'color: red;');
        $('.div_tituloNovoTopico').attr('style', 'border: red solid 3px;');
    }
})

$(document).on('click', '.cancelar', function () {
    window.location.href = "./forum_index.html";
});