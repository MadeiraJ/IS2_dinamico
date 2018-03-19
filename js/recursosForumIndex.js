var todosTopico = [];
var todosPesquisa = [];
var todosTema = [];
var temaAtual = "";
var tipoVista;
var paginaAtual;
var nPaginas;
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? false : sParameterName[1];
        } //if
    } //for
}; //getUrlParameter

$(document).ready(function () {
    paginaAtual = getUrlParameter('pagina');
    paginaAtual = paginaAtual ? parseInt(paginaAtual) : 1;
    tipoVista = "Tudo";
    $.ajax({
        url: `/handlers/HandlerForumIndex.ashx`,
        type: "POST",
        dataType: "json",
        success: function (listaTopicos) {
            for (var i = 0; i < listaTopicos.length; i++) {
                listaTopicos[i] = JSON.parse(listaTopicos[i]);
                todosTopico.push(listaTopicos[i]);                
            } //for
            mostrar(todosTopico);

            clickTag();
        } //success
    }); //ajax

   
    $('.search_bar').keyup(function () {
        tipoVista = "pesquisa";
        paginaAtual = 1;
        todosPesquisa = [];
        var elementos = [];
        if (temaAtual != "") 
            elementos = todosTema;
        else
            elementos = todosTopico;
        //ver se pesquisa tudo ou só de um determinado tema
        var texto = ($('.search_bar').val()).split(" ");
        $(".zona_topicos").empty();
        for (var i = 0; i < elementos.length; i++) {
            var e = true;
            for (var j = 0; j < texto.length; j++) {
                var pergunta = elementos[i].pergunta;
                pergunta = pergunta.toUpperCase();
                var palavraASerPesquisada = texto[j].toUpperCase();
                if (pergunta.indexOf(palavraASerPesquisada) == -1) {
                    e = false;
                    break;
                } //if
            } //for
            if (e) {
                todosPesquisa.push(elementos[i]);
            } //if
        } //for
        mostrar(todosPesquisa);

        clickTag();
    }); //pesquisa keyup

    $('.seguinte').click(function () {       
        if (paginaAtual != nPaginas) {
            paginaAtual += 1;
            queMostrar();
        }
    });//click seguinte

    $('.nSeguinte').click(function () {
        paginaAtual += 1;
        queMostrar();
    });//click nSeguinte

    $('.nAtual').click(function () {
        if (paginaAtual == nPaginas || paginaAtual == 1) {
            paginaAtual = parseInt($('.nAtual').text());
            queMostrar();
        }
    });//click nAtual

    $('.anterior').click(function () {
        if (paginaAtual != 1) {
            paginaAtual -= 1;
            queMostrar();
        }
    });//click anterior

    $('.nAnterior').click(function () {
        paginaAtual -= 1;
        queMostrar();
    });//click nAnterior
}); //document

function clickTag() {
    $('.filtroTema').click(function () {
        paginaAtual = 1;
        tipoVista = "tema";
        var classe = this.innerText;
        if (classe == "ALIMENTAÇÃO")
            classe = "ALIMENTACAO";
        else if (classe == "CONSUMOS NOCIVOS")
            classe = "CONSUMOS";

        temaAtual = classe;

        elementosTema(classe);

        mostrar(todosTema);        
    });
}//clickTag

function addBlocoTopicos(tema, numeroRespostas, pergunta, data, estado, id) {
    var bloco =
        `<div class="div_topico forum_${tema.toLowerCase()}">
            <div class ="tag">
                <img src="imagens/tag_forum.png">
                <span class="filtroTema">${verNomeTema(tema)}</span>
            </div>
            <div class ="zonaNrRespostas">
                <div class ="simboloResposta">
                    <img src="imagens/chat_icon.png">
                </div>
                <span class ="topicoNrRespostas">${numeroRespostas} respostas</span>
            </div>
            <a href="topico.html?post=${id}"><p class ="textoTopicos">${pergunta}</p></a>
            <div class ="zonaDiaHoraEstado">
                <span class ="textoDiaHora">${data}</span>
                <p class ="topico${estado}">&#9679; ${estado}</p>
                <div class ="clear"></div>
            </div>
        </div>`;
    $(".zona_topicos").append(bloco);
} //addBlocoTopicos

function addClear(classeCss) {
    $(classeCss).append('<div class="clear"></div>');
} //addClear

function verNomeTema(tema) {
    if (tema == "ALIMENTACAO") {
        return "ALIMENTAÇÃO";
    } else if (tema == "CONSUMOS") {
        return "CONSUMOS NOCIVOS";
    } else {
        return "SEXUALIDADE";
    }
} //verNomeTema

function queMostrar(){
    if(tipoVista == "tema")
        mostrar(todosTema);
    else if (tipoVista == "pesquisa")
        mostrar(todosPesquisa);
    else
        mostrar(todosTopico);
    clickTag();

    $("html, body").animate({ scrollTop: $('.aqui-podes-encontrar').offset().top + 100 }, 1000);
}//queMostrar

function elementosTema(tema) {
    for (var i = 0; i < todosTopico.length; i++) {
        if (todosTopico[i].tema == tema)
            todosTema.push(todosTopico[i]);
    }
}

function mostrar(elementos) {
    $(".zona_topicos").empty();
    var pAtual = paginaAtual - 1;
    nPaginas = Math.ceil(elementos.length / 10);
    if (nPaginas == 0) {
        $(".anterior, .nAnterior, .nAtual, .nSeguinte, .seguinte").removeClass("active");
        $(".anterior, .nAnterior, .nAtual, .nSeguinte, .seguinte").css('visibility', 'hidden');
    } else if (nPaginas == 1) {
        mudardisplay(1, elementos.length, elementos);
        $(".anterior, .nAnterior, .nSeguinte, .seguinte").removeClass("active");
        $(".nAtual").addClass("active");

        $(".anterior, .nAnterior, .nSeguinte, .seguinte").css('visibility', 'hidden');
        $(".nAtual").css('visibility', 'visible');
    } else {
        var priPagina;
        $(".anterior, .nAnterior, .nAtual, .nSeguinte, .seguinte").css('visibility', 'visible');
        if (pAtual == 0) {
            priPagina = pAtual + 1;
            var fim = priPagina + 10;
            mudardisplay(priPagina, fim, elementos);

            $(".anterior, .nAtual, .seguinte, .nSeguinte").css('visibility', 'visible');
            $(".nAnterior").css('visibility', 'hidden');

            displayNumPagina(".nSeguinte, .seguinte", ".nAtual, .anterior, .nAnterior", ".anterior, .nAnterior, .nSeguinte", ".nAtual, .seguinte");
        } else {
            priPagina = parseInt(pAtual + "0");
            var fim = elementos.length;            
            if (fim > priPagina && fim <= priPagina + 10) {
                mudardisplay(priPagina, fim, elementos);                
                            
                $(".anterior, .nAnterior, .nAtual, .seguinte").css('visibility', 'visible');
                $(".nSeguinte").css('visibility', 'hidden');
                
                displayNumPagina(".anterior, .nAnterior", ".nAtual, .nSeguinte, .seguinte", ".nAnterior, .nSeguinte, .seguinte", ".anterior, .nAtual");
            } else {
                fim = priPagina + 10;
                mudardisplay(priPagina, fim, elementos);

                $(".anterior, .nAnterior, .nAtual, .nSeguinte, .seguinte").css('visibility', 'visible');
                           
                displayNumPagina(".nSeguinte, .seguinte, .anterior, .nAnterior", ".nAtual", ".nAnterior, .nSeguinte", ".nAtual, .anterior, .seguinte");
            }//else
        }//else
    }//else
    $(".nAtual").text(paginaAtual + "");
    $(".nSeguinte").text((paginaAtual + 1) + "");
    $(".nAnterior").text((paginaAtual - 1) + "");
} //mostrar

function mudardisplay(priPagina, fim, elementos) {
    var i = priPagina;
    for (i; i < fim; i++) {
       addBlocoTopicos(
            elementos[i].tema,
            elementos[i].numeroRespostas,
            elementos[i].pergunta,
            elementos[i].data,
            elementos[i].estado,
            elementos[i].id
       );
    }//for
}//mudardisplay

function displayNumPagina(cursorPointer, cursorNormal, removerClasse, addClasse) {
    $(cursorPointer).css('cursor', 'pointer');
    $(cursorNormal).css('cursor', 'context-menu');

    $(removerClasse).removeClass("active");
    $(addClasse).addClass("active");
}//displayNumPagina