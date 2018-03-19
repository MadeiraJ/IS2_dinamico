<%@ WebHandler Language="C#" Class="HandlerForumTopicoAberto" %>

using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Script.Serialization;
using System.Data.SqlClient;
using System.Data;

public class HandlerForumTopicoAberto : IHttpHandler
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
                getRespostas(context, con);
                break;
            case "2":
                getPergunta(context, con);
                break;
            case "3":
                getNextPerguntaId(context, con);
                break;
        } //switch
    } //ProcessRequest


    /////////////////////////PERGUNTA/////////////////////////
    public void getPergunta(HttpContext context, SqlConnection con)
    {
        String json;
        var serializer = new JavaScriptSerializer();
        var id = Convert.ToInt32(context.Request["id"].ToString());
        try
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("SELECT [POST].[TITULO], [POST].[TEXTO], [POST].[DATA_HORA]" +
                "FROM [YourPEL].[dbo].[POST] WHERE [POST].[ID_POST] = "+ id, con);
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            con.Close();
            DataTable dt = new DataTable();
            da.Fill(dt);
            foreach (DataRow dr in dt.Rows)
            {
                DateTime date = (DateTime)dr["DATA_HORA"];
                json = serializer.Serialize(
                    new
                    {
                        pergunta = dr["TITULO"],
                        texto = dr["TEXTO"],
                        data = date.Day + " de " + date.ToString("MMMM") + " de " + date.Year
                    });

                context.Response.ContentType = "plain/text";
                context.Response.Write(json);
            }
        }
        catch (Exception e)
        {

        }
    } //getPergunta


    /////////////////////////RESPOSTAS/////////////////////////
    public void getRespostas(HttpContext context, SqlConnection con)
    {
        String json;
        var serializer = new JavaScriptSerializer();
        var id = Convert.ToInt32(context.Request["id"].ToString());
        try
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("SELECT [UTILIZADOR].[USERNAME], [RESPOSTA].[ID_RESPOSTA], [RESPOSTA].[TEXTO], [RESPOSTA].[DATA_HORA]" +
                "FROM [YourPEL].[dbo].[RESPOSTA], [YourPEL].[dbo].[UTILIZADOR], [YourPEL].[dbo].[POST] WHERE [UTILIZADOR].[ID_UTILIZADOR]=[RESPOSTA].[ID_UTILIZADOR] AND [RESPOSTA].[ID_POST] = [POST].[ID_POST] AND [POST].[ID_POST] = "+ id, con);
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            con.Close();
            DataTable dt = new DataTable();
            da.Fill(dt);
            foreach (DataRow dr in dt.Rows)
            {
                DateTime date = (DateTime)dr["DATA_HORA"];
                json = serializer.Serialize(
                    new
                    {
                        data = date.Day + " de " + date.ToString("MMMM") + " de " + date.Year,
                        texto = dr["TEXTO"],
                        quemRespondeu = dr["USERNAME"]
                    });
                context.Response.ContentType = "plain/text";
                context.Response.Write(json);
            }
        }
        catch (Exception e)
        {

        }
    } //getRespostas

    /////////////////////////NEXT PERGUNTA/////////////////////////
    public void getNextPerguntaId(HttpContext context, SqlConnection con)
    {
        String json;
        String retorno =  null;
        var serializer = new JavaScriptSerializer();
        var id = Convert.ToInt32(context.Request["id"].ToString());
        try
        {
            con.Open();
            SqlCommand cmd = new SqlCommand("SELECT [POST].[ID_POST] " +
            "FROM [YourPEL].[dbo].[POST] WHERE [POST].[ATIVO] = 'true'" +
            "ORDER BY [POST].[DATA_HORA] DESC;", con);
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            con.Close();
            DataTable dt = new DataTable();
            da.Fill(dt);
            for (var i = 0; i < dt.Rows.Count; i++)
            {
                if (Convert.ToInt32(dt.Rows[i]["ID_POST"]) == id)
                {
                    if(i + 1 < dt.Rows.Count)
                    {
                        retorno = dt.Rows[i + 1]["ID_POST"].ToString();
                        break;
                    }
                }

            }
            json = retorno;

            context.Response.ContentType = "plain/text";
            context.Response.Write(json);
        }
        catch(Exception e)
        {

        }
    } //getRespostas



    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}