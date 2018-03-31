<%@ WebHandler Language="C#" Class="GenericHandler1" %>

using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Script.Serialization;
using System.Data.SqlClient;
using System.Data;

public class GenericHandler1 : IHttpHandler
{
    SqlConnection con = new SqlConnection("Data Source=MACOAS\\SQLEXPRESS;Initial Catalog=YourPEL;Integrated Security=True");

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "json";
        var x = context.Request;
        getListaTopicos(context);
    } //ProcessRequest


    /////////////////////////LISTA DE TOPICOS/////////////////////////
    public void getListaTopicos(HttpContext context)
    {
        //formato: "12 de Janeiro às 12:45"
        String json = "";
        var format = "DD de MMMM às HH:MM";
        var listaDeTopicos = new List<String>();
        var serializer = new JavaScriptSerializer();
        con.Open();
        SqlCommand cmd = new SqlCommand("SELECT [POST].[TEMA] , [POST].[TITULO], [POST].[DATA_HORA],[POST].[FECHADO], [POST].[ID_POST] " +
            "FROM [YourPEL].[dbo].[POST] WHERE [POST].[ATIVO] = 'true'" +
            "ORDER BY [POST].[DATA_HORA] DESC;", con);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        con.Close();
        DataTable dt = new DataTable();
        da.Fill(dt);
        foreach (DataRow dr in dt.Rows)
        {
            SqlCommand cmdd = new SqlCommand("SELECT COUNT([RESPOSTA].[ID_RESPOSTA]) AS nRespostas " +
                "FROM [YourPEL].[dbo].[RESPOSTA]" +
                "WHERE [RESPOSTA].[ID_POST] = " + dr["ID_POST"], con);
            SqlDataAdapter daa = new SqlDataAdapter(cmdd);
            con.Close();
            DataTable dtt = new DataTable();
            daa.Fill(dtt);
            foreach (DataRow drr in dtt.Rows)
            {
                DateTime date = (DateTime)dr["DATA_HORA"];
                listaDeTopicos.Add(
                    serializer.Serialize(
                        new
                        {
                            tema = dr["TEMA"],
                            numeroRespostas = drr["nRespostas"],
                            pergunta = dr["TITULO"],
                            data = date.Day + " de " + date.ToString("MMMM") + " de " + date.Year, //+ " às "+ date.Hour+":"+date.Minute,
                estado = dr["FECHADO"].ToString() == "True" ? "Ativo" : "Fechado",
                            id = dr["ID_POST"]
                        }
                ));
        }
    }

    json = serializer.Serialize(listaDeTopicos);
        context.Response.ContentType = "plain/text";
        context.Response.Write(json);
    } //getListaTopicos
public bool IsReusable
{
    get
    {
        return false;
    }
}
}