<%@ WebHandler Language="C#" Class="NoticiasHandler" %>

using System;
using System.Text;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Web;
using System.Web.Script.Serialization;

public class NoticiasHandler : IHttpHandler
{

    SqlConnection con = new SqlConnection("Data Source=MACOAS\\SQLEXPRESS;Initial Catalog=YourPEL;Integrated Security=True");

    public void ProcessRequest(HttpContext context)
    {
        var serializer = new JavaScriptSerializer();
        var listaDeRelacionados = new List<String>();

        var noticia = context.Request["noticia"];
        var id = Convert.ToInt32(noticia.ToString());

        try
        {
           
            SqlCommand cmd = new SqlCommand("SELECT [idArtigo], [titulo], [descricao], [url]" +
                " FROM [YourPEL].[dbo].[ARTIGO] WHERE [tema] LIKE 'Not_cias' AND " +
                "[ativo] = 'True' ORDER BY [dataHora] DESC", con);
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
                            new {
                                imagemCapa = dt.Rows[i]["url"],
                                titulo = dt.Rows[i]["titulo"],
                                resumo = dt.Rows[i]["descricao"],
                                numeroArtigo = dt.Rows[i]["idArtigo"]
                            }
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
            
            SqlCommand cmd = new SqlCommand("SELECT [autor], [dataHora], [url], [titulo], [texto]" +
                                                " FROM [YourPEL].[dbo].[ARTIGO] WHERE [idArtigo] = " + id +
                                                " AND [tema] LIKE 'Not_cias'", con);
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            con.Close();
            DataTable dt = new DataTable();
            da.Fill(dt);

            DateTime date = (DateTime)dt.Rows[0]["dataHora"];

            String texto = dt.Rows[0]["texto"].ToString();

            var json = serializer.Serialize(
                new
                {
                    autor = dt.Rows[0]["autor"],
                    data = date.Day + " de " + date.ToString("MMMM") + " de " + date.Year,
                    imagemCapa = dt.Rows[0]["url"],
                    titulo = dt.Rows[0]["titulo"],
                    texto = texto,
                    noticiasRelacionadas = serializer.Serialize(listaDeRelacionados)
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
