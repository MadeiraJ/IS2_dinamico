<%@ WebHandler Language="C#" Class="ArtigosHandler" %>

using System;
using System.Text;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Web;
using System.Web.Script.Serialization;

public class ArtigosHandler : IHttpHandler
{

    SqlConnection con = new SqlConnection("Data Source=MACOAS\\SQLEXPRESS;Initial Catalog=YourPEL;Integrated Security=True");

    public void ProcessRequest(HttpContext context)
    {
        var serializer = new JavaScriptSerializer();
        var listaDeRelacionados = new List<String>();

        var artigo = context.Request["artigo"];
        var id = Convert.ToInt32(artigo.ToString());
        //fazer select na tabela de artigos com o id acima mencionado

        //Valores a serem apagados
        try
        {
            SqlCommand cmd = new SqlCommand("SELECT [idArtigo], [titulo], [descricao], [url]" +
                " FROM [YourPEL].[dbo].[ARTIGO] WHERE [tema] = 'Artigo' AND [subTema] = (select [subTema] FROM [YourPEL].[dbo].[ARTIGO] WHERE [idArtigo] = "+id+") AND [ativo] = 'True' ORDER BY [dataHora] DESC", con);
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            con.Close();
            DataTable dt = new DataTable();
            da.Fill(dt);
            var n = 0;
            for (var i = 0; i < dt.Rows.Count; i++)
            {
                if (Convert.ToInt32(dt.Rows[i]["idArtigo"].ToString()) != id)
                {
                    listaDeRelacionados.Add(
                        serializer.Serialize(
                            new { imagemCapa = dt.Rows[i]["url"], titulo = dt.Rows[i]["titulo"], resumo = dt.Rows[i]["descricao"], numeroArtigo = dt.Rows[i]["idArtigo"] }
                    ));
                    n++;
                    if (n == 3)
                        break;
                }
            }
        }
        catch (Exception ex)
        {

        }

     
        try
        {
            SqlCommand cmd = new SqlCommand("SELECT [autor], [dataHora], [subTema], [url], [titulo], [texto]" +
                                                " FROM [YourPEL].[dbo].[ARTIGO] WHERE [idArtigo] = " + id + " AND tema = 'Artigo'", con);
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            con.Close();
            DataTable dt = new DataTable();
            da.Fill(dt);

            DateTime date = (DateTime)dt.Rows[0]["dataHora"];
            var temaArtigos = "";
            if (dt.Rows[0]["subTema"].ToString().Equals("Consumos Nocivos"))
                temaArtigos = "CONSUMOS";
            else if (dt.Rows[0]["subTema"].ToString() == "Sexualidade")
                temaArtigos = "SEXUALIDADE";
            else
                temaArtigos = "ALIMENTACAO";

            String texto = dt.Rows[0]["texto"].ToString();

            var json = serializer.Serialize(
                new
                {
                    autor = dt.Rows[0]["autor"],
                    data = date.Day + " de " + date.ToString("MMMM") + " de " + date.Year,
                    tipo = temaArtigos,
                    imagemCapa = dt.Rows[0]["url"],
                    titulo = dt.Rows[0]["titulo"],
                    texto = texto,
                    artigosRelacionados = serializer.Serialize(listaDeRelacionados)
                });

            context.Response.ContentType = "plain/text";
            context.Response.Write(json);
        }
        catch (Exception ex)
        {

        }


    } //ProcessRequest

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}
