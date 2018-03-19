$(document).ready(function () {
    var cookies = document.cookie;
    if (cookies.search("cookieSessao") == -1) {
        var id = "" + Math.floor((Math.random() * 9999999) + 1);
        switch (id.length) {
            case 1:
                id = "000000" + id;
                break;
            case 2:
                id = "00000" + id;
                break;
            case 3:
                id = "0000" + id;
                break;
            case 4:
                id = "000" + id;
                break;
            case 5:
                id = "00" + id;
                break;
            case 6:
                id = "0" + id;
                break;
            default:
                break;
        }
        document.cookie = "cookieSessao=" + id + "; expires=Tue, 31 Dec 2030 23:59:59 GMT path=/";
    }
    setTimeout(visita, 1000);
});
//Cookie visita -> deve correr em todas as páginas

//AVISO: Tanto o cookie de sessao como o de visita devem ser verificados em todas as paginas, mas deve haver um intervalo entre criar o cookie de sessao e
//criar o cookie de visita. Nao sei como vao estruturar o codigo, mas sugiro colocar a função de criar cookie de visita dentro de um timeout do género
//setTimeout(function (), 1000)

function visita() {
    cookies = document.cookie;
    if (cookies.search("cookieVisita") == -1) {
        //codigo para enviar visita para base de dados
        //para arranjar id cookie sessao, inicio = cookies.indexOf("cookieSessao=") + 13; cookies.substring(inicio, inicio + 7);
        inicio = cookies.indexOf("cookieSessao=") + 13;
        var idCookie = cookies.substring(inicio, inicio + 7);
        //data actual + 1 hora
        var tipoDispositivo = checkDevice($(document).width(), $(document).height());

        /*$.ajax({
            url: "/api/handler/Estatistica.ashx?type=1",
            type: "POST",
            data: { tipo: "visita", id: idCookie, dispositivo: tipoDispositivo }, //enviar valores smartphone, computador ou tablet
            dataType: "json",
            success: function (result) {
                alert("ok");
            }
        });*/

        var date = new Date();
        date.setTime(date.getTime() + (3600 * 1000));

        document.cookie = "cookieVisita= 1; expires=" + date.toUTCString() + ";path=/";
    }
}

function checkDevice(x, y) {
    if (x < 425 && y < 813 || x < 813 && y < 425)
        return "smartphone";
    else if (x >= 1024 && y >= 720)
        return "computador";
    return "tablet";
}