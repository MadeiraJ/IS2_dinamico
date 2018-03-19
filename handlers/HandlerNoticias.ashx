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
        /*
        //fazer select na tabela de noticias com o id acima mencionado
        
        //Valores a serem apagados

        //Listar 3 ou menos noticias
        listaDeRelacionados.Add(
            serializer.Serialize(
                new { imagemCapa = "imagens/alimentacao_1.png", titulo = "Noticia", resumo = "Isto e texto noticiario", numeroNoticia = "1" }
        ));
        listaDeRelacionados.Add(
            serializer.Serialize(
                new { imagemCapa = "imagens/alimentacao_1.png", titulo = "Noticia", resumo = "Isto e texto noticiario", numeroNoticia = "1" }
        ));
        listaDeRelacionados.Add(
            serializer.Serialize(
                new { imagemCapa = "imagens/alimentacao_1.png", titulo = "Noticia", resumo = "Isto e texto noticiario", numeroNoticia = "1" }
        ));
        */
        /*String texto = @"<p>As mudanças ocorridas nos últimos anos na saúde da população portuguesa melhoraram significativamente, contudo, os jovens requerem particular atenção relativamente, aos determinantes da saúde relacionados com o estilo de vida. A evidência científica em promoção da saúde em meio escolar, a inovação e a necessidade de recentrar a ação nos resultados implica o desenvolvimento de intervenções mais adequadas à população jovem. Além de capacitar as pessoas e as comunidades para agir, implica reconhecer as suas competências e potencialidades e facilitar as suas escolhas.</p>
                    <br>
                    <blockquote>O projeto Your PEL - Promover e Empoderar para a Literacia em saúde na população jovem tem como finalidade ajudar esta geração a atingir a plenitude do seu potencial de saúde.</blockquote>
                    <br>
                    <p>As mudanças ocorridas nos últimos anos na saúde da população portuguesa melhoraram significativamente, contudo, os jovens requerem particular atenção relativamente, aos determinantes da saúde relacionados com o estilo de vida. A evidência científica em promoção da saúde em meio escolar, a inovação e a necessidade de recentrar a ação nos resultados implica o desenvolvimento de intervenções mais adequadas à população jovem. Além de capacitar as pessoas e as comunidades para agir, implica reconhecer as suas competências e potencialidades e facilitar as suas escolhas.
                    O projeto “Your PEL - Promover e Empoderar para a Literacia em saúde na população jovem” tem como finalidade ajudar esta geração a atingir a plenitude do seu potencial de saúde. Centra-se numa abordagem da saúde ao longo do ciclo de vida, especificamente uma juventude à procura de um futuro saudável e integra três áreas específicas: alimentação, consumos nocivos e sexualidade.
                    <br>
                    <img class=""wow pulse"" src=""imagens/photo.png"">
                    <br>
                    As mudanças ocorridas nos últimos anos na saúde da população portuguesa melhoraram significativamente, contudo, os jovens requerem particular atenção relativamente, aos determinantes da saúde relacionados com o estilo de vida. A evidência científica em promoção da saúde em meio escolar, a inovação e a necessidade de recentrar a ação nos resultados implica o desenvolvimento de intervenções mais adequadas à população jovem. Além de capacitar as pessoas e as comunidades para agir, implica reconhecer as suas competências e potencialidades e facilitar as suas escolhas.
                    O projeto “Your PEL - Promover e Empoderar para a Literacia em saúde na população jovem” tem como finalidade ajudar esta geração a atingir a plenitude do seu potencial de saúde. Centra-se numa abordagem da saúde ao longo do ciclo de vida, especificamente uma juventude à procura de um futuro saudável e integra três áreas específicas: alimentação, consumos nocivos e sexualidade.
                    As mudanças ocorridas nos últimos anos na saúde da população portuguesa melhoraram significativamente, contudo, os jovens requerem particular atenção relativamente, aos determinantes da saúde relacionados com o estilo de vida. A evidência científica em promoção da saúde em meio escolar, a inovação e a necessidade de recentrar a ação nos resultados implica o desenvolvimento de intervenções mais adequadas à população jovem. Além de capacitar as pessoas e as comunidades para agir, implica reconhecer as suas competências e potencialidades e facilitar as suas escolhas.
                    O projeto “Your PEL - Promover e Empoderar para a Literacia em saúde na população jovem” tem como finalidade ajudar esta geração a atingir a plenitude do seu potencial de saúde. Centra-se numa abordagem da saúde ao longo do ciclo de vida, especificamente uma juventude à procura de um futuro saudável e integra três áreas específicas: alimentação, consumos nocivos e sexualidade.</p>
            </div>";
        byte[] bytes = Encoding.Default.GetBytes(texto);
        texto = Encoding.UTF8.GetString(bytes);
        */
        /*var json = serializer.Serialize(
            new
            {
                autor = "AUTOR",
                data = "16 de Novembro de 2017",
                imagemCapa = "imagens/alimentacao_1.png",
                titulo = "Por favor funcemina",
                texto = texto,
                noticiasRelacionadas = serializer.Serialize(listaDeRelacionados)
            });

        context.Response.ContentType = "plain/text";
        context.Response.Write(json);*/
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
