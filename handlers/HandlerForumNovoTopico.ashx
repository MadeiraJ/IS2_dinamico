<%@ WebHandler Language="C#" Class="GenericHandler1" %>

using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Script.Serialization;
using System.Data.SqlClient;

public class GenericHandler1 : IHttpHandler
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
                setNovoTopicos(context);
                break;
        }
    } //ProcessRequest


    /////////////////////////NOVO DE TOPICOS/////////////////////////
    public void setNovoTopicos(HttpContext context)
    {
        String json = "";
        //var listaDeTopicosPorTema = new List<String>();
        var serializer = new JavaScriptSerializer();
        //var format = "yyyyMMddHHmmss";
        var format = "yyyy-MM-dd HH:mm";
        var strDate = DateTime.Now.ToString(format);

        String pergunta = context.Request.Form["pergunta"].ToString();
        String tema = context.Request.Form["tema"].ToString();
        String descricao = context.Request.Form["descricao"].ToString();
        try
        {
            con.Open();
            SqlCommand cmd = new SqlCommand(
                   "INSERT INTO POST VALUES ('" +
                    pergunta + "','" +
                    descricao + "','" +
                    strDate + "','" +
                    tema + "','" +
                    "false','" +
                    "true')"
                , con);
            cmd.ExecuteNonQuery();
            con.Close();
            json = serializer.Serialize(true);
            context.Response.ContentType = "plain/text";
            context.Response.Write(json);
        }
        catch (Exception e)
        {

        }

    } //setNovoTopicos



    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
}