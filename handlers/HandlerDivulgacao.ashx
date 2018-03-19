<%@ WebHandler Language="C#" Class="HandlerDivulgacao" %>

using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;


public class HandlerDivulgacao : IHttpHandler
{
    SqlConnection con = new SqlConnection("Data Source=MACOAS\\SQLEXPRESS;Initial Catalog=YourPEL;Integrated Security=True");

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "json";
        var x = context.Request;
        String tipo = context.Request["type"].ToString();
        switch (tipo)
        {
            case "1":
                getNoticias(context);
                break;
            case "2":
                getEventos(context);
                break;
            case "3":
                getPublicacoes(context);
                break;
        }
    } //ProcessRequest


    /////////////////////////NOTICIAS/////////////////////////
    public void getNoticias(HttpContext context)
    {
        String json = "";
        var listaDeNoticias = new List<String>();
        var serializer = new JavaScriptSerializer();

        //fazer a query de forma a ir buscar todas as noticias
        var numeroNoticiasRecebidos = Convert.ToInt32(context.Request.Form["numeroNoticiasRecebidos"].ToString());
        var numeroDeNoticiasPedidos = Convert.ToInt32(context.Request.Form["numeroDeNoticiasPedidos"].ToString());

        con.Open();

        SqlCommand cmdN = new SqlCommand("SELECT [idArtigo], [dataHora], [titulo], [descricao], [url]" +
            " FROM [YourPEL].[dbo].[ARTIGO] WHERE [tema] = 'Notícias' AND [ativo] = 'True' ORDER BY [dataHora] DESC", con);
        SqlDataAdapter daN = new SqlDataAdapter(cmdN);
        con.Close();
        DataTable dtN = new DataTable();
        daN.Fill(dtN);

        //Valores a serem apagados
        try
        {
            for (var i = numeroNoticiasRecebidos; i < numeroNoticiasRecebidos + numeroDeNoticiasPedidos; i++)
            {
                if(dtN.Rows.Count > i)
                {
                    DateTime date = (DateTime)dtN.Rows[i]["dataHora"];

                    listaDeNoticias.Add(
                        serializer.Serialize(
                            new
                            {
                                imagem = dtN.Rows[i]["url"],
                                data = date.Day + " de " + date.ToString("MMMM") + " de "+ date.Year,
                                titulo = dtN.Rows[i]["titulo"],
                                texto = dtN.Rows[i]["descricao"],
                                url = dtN.Rows[i]["idArtigo"]
                            }
                    ));
                }
                else
                {
                    listaDeNoticias.Add(
                        serializer.Serialize(null));
                }

            }
            json = serializer.Serialize(listaDeNoticias);

            context.Response.ContentType = "plain/text";
            context.Response.Write(json);

        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message.ToString());
        }


    } //getNoticias

    /////////////////////////EVENTOS/////////////////////////
    public void getEventos(HttpContext context)
    {
        String json = "";
        var listaDeEventos  = new List<String>();
        var serializer = new JavaScriptSerializer();


        //fazer a query de forma a ir buscar todos os eventos
        var numeroEventosRecebidos = Convert.ToInt32(context.Request.Form["numeroEventosRecebidos"].ToString());
        var numeroDeEventosPedidos = Convert.ToInt32(context.Request.Form["numeroDeEventosPedidos"].ToString());

        con.Open();

        SqlCommand cmd = new SqlCommand("SELECT [nome], [local], [descricao], [dataHora_Inicial], [dataHora_Final], [url]" +
            " FROM [YourPEL].[dbo].[EVENTO] WHERE [dataHora_Final] > CURRENT_TIMESTAMP ORDER BY [idEvento] DESC", con);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        con.Close();
        DataTable dt = new DataTable();
        da.Fill(dt);

        try
        {
            for (var i = numeroEventosRecebidos; i < numeroEventosRecebidos + numeroDeEventosPedidos; i++)
            {
                if(dt.Rows[i] != null)
                {
                    String datas = "";
                    DateTime date = (DateTime)dt.Rows[i]["dataHora_Inicial"];
                    DateTime horasfim = (DateTime)dt.Rows[i]["dataHora_Final"];
                    if (date.Day == horasfim.Day && date.Month == horasfim.Month)
                    {
                        datas = date.Day + " " + date.ToString("MMMM");
                        listaDeEventos.Add(
                        serializer.Serialize(
                            new
                            {
                                titulo = dt.Rows[i]["nome"],
                                local = dt.Rows[i]["local"],
                                descricao = dt.Rows[i]["descricao"],
                                data = datas,
                                horas = date.Hour + ":" + date.Minute + " - " + horasfim.Hour + ":" + horasfim.Minute,
                                imagem = dt.Rows[i]["url"]
                            }
                        ));
                    }

                    else
                    {
                        datas = date.Day + " " + date.ToString("MMMM") + " a " + horasfim.Day + " " + horasfim.ToString("MMMM");
                        listaDeEventos.Add(
                            serializer.Serialize(
                                new
                                {
                                    titulo = dt.Rows[i]["nome"],
                                    local = dt.Rows[i]["local"],
                                    descricao = dt.Rows[i]["descricao"],
                                    data = datas,
                                    horas = date.Hour + ":" + date.Minute + " - " + horasfim.Hour + ":" + horasfim.Minute,
                                    imagem = dt.Rows[i]["url"]
                                }
                            ));
                    }
                }
                else
                {
                    listaDeEventos.Add(
                        serializer.Serialize(null));
                }

            }

            json = serializer.Serialize(listaDeEventos);
            context.Response.ContentType = "plain/text";
            context.Response.Write(json);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message.ToString());
        }
    } //getEventos

    /////////////////////////PUBLICAÇÕES/////////////////////////
    public void getPublicacoes(HttpContext context)
    {
        String json = "";
        var listaDePublicacoes = new List<String>();
        var serializer = new JavaScriptSerializer();

        //fazer a query de forma a ir buscar todas as publicações

        SqlCommand cmd = new SqlCommand("SELECT [titulo], [conteudo] FROM [YourPEL].[dbo].[PUBLICACAO] ORDER BY [idPUBLICACAO] DESC", con);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        con.Close();
        DataTable dt = new DataTable();
        da.Fill(dt);

        //Valores a serem apagados
        try
        {
            foreach (DataRow dr in dt.Rows)
            {
                listaDePublicacoes.Add(
                serializer.Serialize(
                    new
                    {
                        titulo = dr["titulo"],
                        conteudo = dr["conteudo"]
                    }
                ));
            }

            json = serializer.Serialize(listaDePublicacoes);

            context.Response.ContentType = "plain/text";
            context.Response.Write(json);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message.ToString());
        }



    } //getPublicacoes

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}