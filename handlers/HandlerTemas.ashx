<%@ WebHandler Language="C#" Class="TemasHandler" %>

using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

public class TemasHandler : IHttpHandler
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
                getDestaques(context);
                break;
            case "2":
                getArtigoEmDestaque(context);
                break;
            case "3":
                getVideos(context);
                break;
            case "4":
                getDocumentos(context);
                break;
            case "5":
                getLinks(context);
                break;
        }
    } //ProcessRequest



    /////////////////////////DESTAQUES/////////////////////////
    public void getDestaques(HttpContext context)
    {
        String json = "";
        var listaDeDestaques = new List<String>();
        var serializer = new JavaScriptSerializer();
        var jafoi = 0;

        String tema = context.Request.Form["classe"].ToString();
        var numeroArtigosRecebidos = Convert.ToInt32(context.Request.Form["numeroArtigosRecebidos"].ToString());
        var numeroDeArtigosPedidos = Convert.ToInt32(context.Request.Form["numeroDeArtigosPedidos"].ToString());

        try
        {
            switch (tema)
            {
                //fazer a query de acordo com o tema, de forma a ir buscar um certo número de artigos e sabias ordenados pela data (de forma decrescente) EXCEPTO o artigo mais recente
                case "ALIMENTACAO":
                    SqlCommand cmd = new SqlCommand("SELECT [idArtigo], [titulo], [descricao], [url], [tema]" +
                                                    " FROM [YourPEL].[dbo].[ARTIGO] WHERE ([tema] = 'Artigo' OR [tema] = 'SABIAS-QUE') AND [subTema] = 'Alimentação' AND [ativo] = 'True' ORDER BY [dataHora] DESC", con);
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    con.Close();
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    for (var i = numeroArtigosRecebidos; i < numeroArtigosRecebidos + numeroDeArtigosPedidos; i++)
                    {
                        if (dt.Rows.Count > i)
                        {
                            if (dt.Rows[i]["tema"].Equals("Artigo"))
                            {
                                jafoi++;
                            }
                            //NOTA: ver formato que vem da base de dados
                            //tipo frontend ARTIGO, SABIAS-QUE

                            if ((jafoi != 1 && dt.Rows[i]["tema"].Equals("Artigo")) || dt.Rows[i]["tema"].Equals("SABIAS-QUE"))
                            {
                                listaDeDestaques.Add(
                                    serializer.Serialize(
                                        new
                                        {
                                            tipo = dt.Rows[i]["tema"].ToString().ToUpper(),
                                            imagem = dt.Rows[i]["url"],
                                            titulo = dt.Rows[i]["titulo"],
                                            texto = dt.Rows[i]["descricao"],
                                            url = dt.Rows[i]["idArtigo"]
                                        }
                                ));
                            }

                        }
                        else
                        {
                            listaDeDestaques.Add(
                            serializer.Serialize(null));
                        }
                        //json = serializer.Serialize(listaDeDestaques);
                    }
                    break;
                case "SEXUALIDADE":
                    SqlCommand cmdS = new SqlCommand("SELECT [idArtigo], [titulo], [descricao], [url], [tema]" +
                                                    " FROM [YourPEL].[dbo].[ARTIGO] WHERE ([tema] = 'Artigo' OR [tema] = 'SABIAS-QUE') AND [subTema] = 'Sexualidade' AND [ativo] = 'True' ORDER BY [dataHora] DESC", con);
                    SqlDataAdapter daS = new SqlDataAdapter(cmdS);
                    con.Close();
                    DataTable dtS = new DataTable();
                    daS.Fill(dtS);
                    for (var i = numeroArtigosRecebidos; i < numeroArtigosRecebidos + numeroDeArtigosPedidos; i++)
                    {
                        if (dtS.Rows.Count > i)
                        {
                            if (dtS.Rows[i]["tema"].Equals("Artigo"))
                            {
                                jafoi++;
                            }
                            //NOTA: ver formato que vem da base de dados
                            //tipo frontend ARTIGO, SABIAS-QUE

                            if ((jafoi != 1 && dtS.Rows[i]["tema"].Equals("Artigo")) || dtS.Rows[i]["tema"].Equals("SABIAS-QUE"))
                            {
                                listaDeDestaques.Add(
                                    serializer.Serialize(
                                        new
                                        {
                                            tipo = dtS.Rows[i]["tema"].ToString().ToUpper(),
                                            imagem = dtS.Rows[i]["url"],
                                            titulo = dtS.Rows[i]["titulo"],
                                            texto = dtS.Rows[i]["descricao"],
                                            url = dtS.Rows[i]["idArtigo"]
                                        }
                                ));
                            }
                        }
                        else
                        {
                            listaDeDestaques.Add(
                                serializer.Serialize(null));
                        }
                    }
                    //json = serializer.Serialize(listaDeDestaques);
                    break;
                case "CONSUMOS":
                    SqlCommand cmdC = new SqlCommand("SELECT [idArtigo], [titulo], [descricao], [url], [tema]" +
                                                    " FROM [YourPEL].[dbo].[ARTIGO] WHERE ([tema] = 'Artigo' OR [tema] = 'SABIAS-QUE') AND [subTema] = 'Consumos Nocivos' AND [ativo] = 'True' ORDER BY [dataHora] DESC", con);
                    SqlDataAdapter daC = new SqlDataAdapter(cmdC);
                    con.Close();
                    DataTable dtC = new DataTable();
                    daC.Fill(dtC);
                    for (var i = numeroArtigosRecebidos; i < numeroArtigosRecebidos + numeroDeArtigosPedidos; i++)
                    {
                        if (dtC.Rows.Count > i)
                        {
                            if (dtC.Rows[i]["tema"].Equals("Artigo"))
                            {
                                jafoi++;
                            }
                            //NOTA: ver formato que vem da base de dados
                            //tipo frontend ARTIGO, SABIAS-QUE

                            if ((jafoi != 1 && dtC.Rows[i]["tema"].Equals("Artigo")) || dtC.Rows[i]["tema"].Equals("SABIAS-QUE"))
                            {
                                listaDeDestaques.Add(
                                    serializer.Serialize(
                                        new
                                        {
                                            tipo = dtC.Rows[i]["tema"].ToString().ToUpper(),
                                            imagem = dtC.Rows[i]["url"],
                                            titulo = dtC.Rows[i]["titulo"],
                                            texto = dtC.Rows[i]["descricao"],
                                            url = dtC.Rows[i]["idArtigo"]
                                        }
                                ));
                            }
                        }
                        else
                        {
                            listaDeDestaques.Add(
                                serializer.Serialize(null));
                        }
                    }
                    //json = serializer.Serialize(listaDeDestaques);
                    break;
            } //switch
            json = serializer.Serialize(listaDeDestaques);


            context.Response.ContentType = "plain/text";
            context.Response.Write(json);
        }
        catch (Exception ex)
        {

        }

        //Valores a serem apagados
    } //getDestaques

    /////////////////////////ARTIGO EM DESTAQUE/////////////////////////
    public void getArtigoEmDestaque(HttpContext context)
    {
        String json = "";
        var serializer = new JavaScriptSerializer();

        String tema = context.Request.Form["classe"].ToString();
        //fazer a query de acordo com o tema, de forma a ir buscar o artigo mais recente
        try
        {
            switch (tema)
            {
                case "ALIMENTACAO":
                    SqlCommand cmd = new SqlCommand("select TOP(1) [idArtigo],  [titulo], [descricao], [url]" +
                        "from [YourPEL].[dbo].[ARTIGO]" +
                        "WHERE [tema] = 'Artigo' AND [ativo] = 'True' AND [subTema] = 'Alimentação' ORDER BY [dataHora] DESC", con);
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    con.Close();
                    DataTable dt = new DataTable();
                    da.Fill(dt);

                    json =
                        serializer.Serialize(
                            new
                            {
                                tipo = "ARTIGO",
                                imagem = dt.Rows[0]["url"],
                                titulo = dt.Rows[0]["titulo"],
                                texto = dt.Rows[0]["descricao"],
                                url = dt.Rows[0]["idArtigo"]
                            }
                    );
                    break;
                case "SEXUALIDADE":
                    SqlCommand cmdS = new SqlCommand("select TOP(1) [idArtigo],  [titulo], [descricao], [url]" +
                        "from [YourPEL].[dbo].[ARTIGO]" +
                        " WHERE [tema] = 'Artigo' AND [subTema] = 'Sexualidade' AND [ativo] = 'True' ORDER BY [dataHora] DESC", con);
                    SqlDataAdapter daS = new SqlDataAdapter(cmdS);
                    con.Close();
                    DataTable dtS = new DataTable();
                    daS.Fill(dtS);

                    json =
                        serializer.Serialize(
                            new
                            {
                                tipo = "ARTIGO",
                                imagem = dtS.Rows[0]["url"],
                                titulo = dtS.Rows[0]["titulo"],
                                texto = dtS.Rows[0]["descricao"],
                                url = dtS.Rows[0]["idArtigo"]
                            }
                    );
                    break;
                case "CONSUMOS":
                    SqlCommand cmdC = new SqlCommand("select TOP(1) [idArtigo],  [titulo], [descricao], [url]" +
                        "from [YourPEL].[dbo].[ARTIGO]" +
                        "WHERE [tema] = 'Artigo' AND [subTema] = 'Consumos Nocivos' AND [ativo] = 'True' ORDER BY [dataHora] DESC", con);
                    SqlDataAdapter daC = new SqlDataAdapter(cmdC);
                    con.Close();
                    DataTable dtC = new DataTable();
                    daC.Fill(dtC);

                    json =
                        serializer.Serialize(
                            new
                            {
                                tipo = "ARTIGO",
                                imagem = dtC.Rows[0]["url"],
                                titulo = dtC.Rows[0]["titulo"],
                                texto = dtC.Rows[0]["descricao"],
                                url = dtC.Rows[0]["idArtigo"]
                            }
                    );
                    break;
            } //switch

            context.Response.ContentType = "plain/text";
            context.Response.Write(json);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message.ToString());
        }
    } //getArtigoEmDestaque

    /////////////////////////VIDEOS/////////////////////////
    public void getVideos(HttpContext context)
    {
        String json = "";
        var listaDeVideos = new List<String>();
        var serializer = new JavaScriptSerializer();

        String tema = context.Request.Form["classe"].ToString();
        var numeroVideosRecebidos = Convert.ToInt32(context.Request.Form["numeroVideosRecebidos"].ToString());
        var numeroDeVideosPedidos = Convert.ToInt32(context.Request.Form["numeroDeVideosPedidos"].ToString());

        //Fazer aqui a query à respetiva tabela, de forma a conseguir ter um certo numero de videos do tema
        try
        {
            switch (tema)
            {
                case "ALIMENTACAO":
                    SqlCommand cmd = new SqlCommand("select [urlYoutube], [titulo], [descricao]" +
                        "from [YourPEL].[dbo].[ARTIGO] " +
                        "WHERE [tema] = 'Video' AND [subTema] = 'Alimentação' AND [ativo] = 'True' ORDER BY [dataHora] DESC", con);
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    con.Close();
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    for (var i = numeroVideosRecebidos; i < numeroVideosRecebidos + numeroDeVideosPedidos; i++)
                    {
                        if (dt.Rows.Count > i)
                        {
                            listaDeVideos.Add(
                                serializer.Serialize(
                                    new
                                    {
                                        link = dt.Rows[i]["urlYoutube"],
                                        titulo = dt.Rows[i]["titulo"],
                                        texto = dt.Rows[i]["descricao"]
                                    }
                            ));
                        }
                        else
                        {
                            listaDeVideos.Add(
                                serializer.Serialize(null));
                        }
                    }
                    break;
                case "SEXUALIDADE":
                    SqlCommand cmdS = new SqlCommand("select [urlYoutube], [titulo], [descricao]" +
                        "from [YourPEL].[dbo].[ARTIGO] " +
                        "WHERE [tema] = 'Video' AND [subTema] = 'Sexualidade' AND [ativo] = 'True' ORDER BY [dataHora] DESC", con);
                    SqlDataAdapter daS = new SqlDataAdapter(cmdS);
                    con.Close();
                    DataTable dtS = new DataTable();
                    daS.Fill(dtS);
                    for (var i = numeroVideosRecebidos; i < numeroVideosRecebidos + numeroDeVideosPedidos; i++)
                    {
                        if (dtS.Rows.Count > i)
                        {
                            listaDeVideos.Add(
                                serializer.Serialize(
                                    new
                                    {
                                        link = dtS.Rows[i]["urlYoutube"],
                                        titulo = dtS.Rows[i]["titulo"],
                                        texto = dtS.Rows[i]["descricao"]
                                    }
                            ));
                        }
                        else
                        {
                            listaDeVideos.Add(
                                serializer.Serialize(null));
                        }
                    }
                    break;
                case "CONSUMOS":
                    SqlCommand cmdC = new SqlCommand("select [urlYoutube], [titulo], [descricao]" +
                        "from [YourPEL].[dbo].[ARTIGO] " +
                        "WHERE [tema] = 'Video' AND [subTema] = 'Consumos Nocivos' AND [ativo] = 'True' ORDER BY [dataHora] DESC", con);
                    SqlDataAdapter daC = new SqlDataAdapter(cmdC);
                    con.Close();
                    DataTable dtC = new DataTable();
                    daC.Fill(dtC);
                    for (var i = numeroVideosRecebidos; i < numeroVideosRecebidos + numeroDeVideosPedidos; i++)
                    {
                        if (dtC.Rows.Count > i)
                        {
                            listaDeVideos.Add(
                                serializer.Serialize(
                                    new
                                    {
                                        link = dtC.Rows[i]["urlYoutube"],
                                        titulo = dtC.Rows[i]["titulo"],
                                        texto = dtC.Rows[i]["descricao"]
                                    }
                            ));
                        }
                        else
                        {
                            listaDeVideos.Add(
                                serializer.Serialize(null));
                        }
                    }
                    break;
            } //switch

            //Valores a serem apagados
            json = serializer.Serialize(listaDeVideos);


            context.Response.ContentType = "plain/text";
            context.Response.Write(json);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message.ToString());
        }
    } //getVideos

    /////////////////////////DOCUMENTOS/////////////////////////
    public void getDocumentos(HttpContext context)
    {
        String json = "";
        var listaDeDocumentos = new List<String>();
        var serializer = new JavaScriptSerializer();

        String tema = context.Request.Form["classe"].ToString();
        //Fazer aqui a query à respetiva tabela, de forma a conseguir ter os documentos do tema
        switch (tema)
        {
            case "ALIMENTACAO":
                SqlCommand cmd = new SqlCommand("SELECT [DOCUMENTO].[nome] , [DOCUMENTO].[url]" +
                    "FROM [YourPEL].[dbo].[DOCUMENTO] WHERE [DOCUMENTO].[tema] = 'Alimentação'" +
                    "ORDER BY [DOCUMENTO].[idDocumento] DESC;", con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                con.Close();
                DataTable dt = new DataTable();
                da.Fill(dt);
                foreach (DataRow dr in dt.Rows)
                {
                    listaDeDocumentos.Add(
                        serializer.Serialize(
                            new
                            {
                                nome = dr["nome"],
                                url = dr["url"]
                            }
                        ));
                }
                break;
            case "SEXUALIDADE":
                SqlCommand cmdS = new SqlCommand("SELECT [DOCUMENTO].[nome] , [DOCUMENTO].[url]" +
                    "FROM [YourPEL].[dbo].[DOCUMENTO] WHERE [DOCUMENTO].[tema] = 'Sexualidade'" +
                    "ORDER BY [DOCUMENTO].[idDocumento] DESC;", con);
                SqlDataAdapter daS = new SqlDataAdapter(cmdS);
                con.Close();
                DataTable dtS = new DataTable();
                daS.Fill(dtS);
                foreach (DataRow drS in dtS.Rows)
                {
                    listaDeDocumentos.Add(
                        serializer.Serialize(
                            new
                            {
                                nome = drS["nome"],
                                url = drS["url"]
                            }
                        ));
                }
                break;
            case "CONSUMOS":
                SqlCommand cmdC = new SqlCommand("SELECT [DOCUMENTO].[nome] , [DOCUMENTO].[url]" +
                    "FROM [YourPEL].[dbo].[DOCUMENTO] WHERE [DOCUMENTO].[tema] = 'Consumos Nocivos'" +
                    "ORDER BY [DOCUMENTO].[idDocumento] DESC;", con);
                SqlDataAdapter daC = new SqlDataAdapter(cmdC);
                con.Close();
                DataTable dtC = new DataTable();
                daC.Fill(dtC);
                foreach (DataRow drC in dtC.Rows)
                {
                    listaDeDocumentos.Add(
                        serializer.Serialize(
                            new
                            {
                                nome = drC["nome"],
                                url = drC["url"]
                            }
                        ));
                }
                break;
        } //switch

        json = serializer.Serialize(listaDeDocumentos);


        context.Response.ContentType = "plain/text";
        context.Response.Write(json);
    } //getDocumentos

    /////////////////////////LINKS/////////////////////////
    public void getLinks(HttpContext context)
    {
        String json = "";
        var listaDeLinks = new List<String>();
        var serializer = new JavaScriptSerializer();

        String tema = context.Request.Form["classe"].ToString();
        //Fazer aqui a query à respetiva tabela, de forma a conseguir ter os links do tema
        switch (tema)
        {
            case "ALIMENTACAO":
                SqlCommand cmd = new SqlCommand("select [url], [titulo]" +
                    "from [YourPEL].[dbo].[ARTIGO] " +
                    "WHERE [tema] = 'Links' AND [subTema] = 'Alimentação' AND [ativo] = 'True' ORDER BY [dataHora] DESC", con);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                con.Close();
                DataTable dt = new DataTable();
                da.Fill(dt);
                foreach (DataRow dr in dt.Rows)
                {
                    listaDeLinks.Add(
                        serializer.Serialize(
                            new
                            {
                                url = dt.Rows[0]["url"],
                                nome = dt.Rows[0]["titulo"],
                            }
                        ));
                }
                break;
            case "SEXUALIDADE":
                SqlCommand cmdS = new SqlCommand("select [url], [titulo]" +
                    "from [YourPEL].[dbo].[ARTIGO] " +
                    "WHERE [tema] = 'Links' AND [subTema] = 'Sexualidade' AND [ativo] = 'True' ORDER BY [dataHora] DESC", con);
                SqlDataAdapter daS = new SqlDataAdapter(cmdS);
                con.Close();
                DataTable dtS = new DataTable();
                daS.Fill(dtS);
                foreach (DataRow drS in dtS.Rows)
                {
                    listaDeLinks.Add(
                        serializer.Serialize(
                            new
                            {
                                url = dtS.Rows[0]["url"],
                                nome = dtS.Rows[0]["titulo"],
                            }
                        ));
                }
                break;
            case "CONSUMOS":
                SqlCommand cmdC = new SqlCommand("select [url], [titulo]" +
                    "from [YourPEL].[dbo].[ARTIGO] " +
                    "WHERE [tema] = 'Links' AND [subTema] = 'Sexualidade' AND [ativo] = 'True' ORDER BY [dataHora] DESC", con);
                SqlDataAdapter daC = new SqlDataAdapter(cmdC);
                con.Close();
                DataTable dtC = new DataTable();
                daC.Fill(dtC);
                foreach (DataRow drC in dtC.Rows)
                {
                    listaDeLinks.Add(
                        serializer.Serialize(
                            new
                            {
                                url = dtC.Rows[0]["url"],
                                nome = dtC.Rows[0]["titulo"],
                            }
                        ));
                }
                break;
        } //switch

        json = serializer.Serialize(listaDeLinks);


        context.Response.ContentType = "plain/text";
        context.Response.Write(json);
    } //getDocumentos


    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
}