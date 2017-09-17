using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Fordonskontroll;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace Fordonskontroll.Controllers
{
    [RoutePrefix("api/dashboard")]
    public class DashboardController : ApiController
    {
        //Tab 1 - stacked bar chart
        [Route("KravToday")]
        [System.Web.Http.HttpPost]
        public List<KravToday> KravTodayMethod([FromBody] UserControll uc)
        {
            List<KravToday> ktList = new List<KravToday>();
            //System.Threading.Thread.Sleep(5000);
            //Connect and retrieve data
            if (Login.CheckLogging(uc.user))
            {
                string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("Dashboard_KravToday", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        KravToday kt = new KravToday();
                        kt.saknas = Convert.ToInt32(rdr["saknas"]);
                        kt.ok = Convert.ToInt32(rdr["ok"]);
                        kt.ejok = Convert.ToInt32(rdr["ejok"]);
                        kt.krav = rdr["krav"].ToString();
                        ktList.Add(kt);
                    }
                }
            }

            return ktList;
        }

        [Route("efterkontrolltabone")]
        [System.Web.Http.HttpPost]
        public List<EftKontTabOneTable> Efterkontrolltabone([FromBody] UserControllEftNar uc)
        {
            List<EftKontTabOneTable> ktList = new List<EftKontTabOneTable>();
            //Connect and retrieve data
            if (Login.CheckLogging(uc.user))
            {
                string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("Dashboard_EfterkontrollTable", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        EftKontTabOneTable kt = new EftKontTabOneTable();
                        kt.taxinrAA = rdr["taxinr"].ToString();
                        kt.antalejuppfylldakrav = rdr["antalejuppfylldakrav"].ToString();
                        kt.antalejuppfylldakravinomkort = rdr["antalejuppfylldakravinomkort"].ToString();
                        ktList.Add(kt);
                    }
                }
            }

            return ktList;
        }




        //Tab 2 - bar chart
        [Route("KravPerYearBarChart")]
        [System.Web.Http.HttpPost]
        public List<KravPerYearBarChart> Post([FromBody] UserControllEftNar uc)
        {
            List<KravPerYearBarChart> kpybcList = new List<KravPerYearBarChart>();
            string izvor = "";
            if (uc.izvor == "1") { izvor = "Dashboard_KravPerYear"; }
            else if (uc.izvor == "2") { izvor = "Dashboard_KravPerYearFlygande"; }

            //Connect and retrieve data
            if (Login.CheckLogging(uc.user))
            {
                string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand(izvor, con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        KravPerYearBarChart kpybc = new KravPerYearBarChart();
                        kpybc.andel = Convert.ToInt32(rdr["andel"]);
                        kpybc.datum = rdr["datum"].ToString();
                        kpybc.krav = rdr["krav"].ToString();
                        kpybcList.Add(kpybc);
                    }
                }
            }

            return kpybcList;
        }

        //Tab 2 - Pie Chart Efterkontroll
        [Route("Efterkontroll")]
        [System.Web.Http.HttpPost]
        public List<Efterkontroll> EKFunc([FromBody] UserControllEftNar uc)
        {
            List<Efterkontroll> ekList = new List<Efterkontroll>();
            string izvor = "";
            if (uc.izvor == "1") { izvor = "Dashboard_Efterkontroll"; }
            else if (uc.izvor == "2") { izvor = "Dashboard_EfterkontrollFlygande"; }

            //Connect and retrieve data
            if (Login.CheckLogging(uc.user))
            {
                string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand(izvor, con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    SqlParameter paramA = new SqlParameter("@KontrollID", uc.idCall);
                    cmd.Parameters.Add(paramA);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        Efterkontroll ek = new Efterkontroll();
                        ek.ingen = Convert.ToInt32(rdr["Ingen"]);
                        ek.senare = Convert.ToInt32(rdr["Senare"]);
                        ek.snarast = Convert.ToInt32(rdr["Snarast"]);
                        ekList.Add(ek);
                    }
                }
            }

            return ekList;
        }

        //Tab 2 - Pie Chart Narvaro
        [Route("Narvaro")]
        [System.Web.Http.HttpPost]
        public List<Narvaro> NVFunc([FromBody] UserControllEftNar uc)
        {
            List<Narvaro> nvList = new List<Narvaro>();
            string izvor = "";
            if (uc.izvor == "1") { izvor = "Dashboard_Narvaro"; }
            else if (uc.izvor == "2") { izvor = "Dashboard_NarvaroFlygande"; }
            //Connect and retrieve data
            if (Login.CheckLogging(uc.user))
            {
                string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand(izvor, con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    SqlParameter paramA = new SqlParameter("@KontrollID", uc.idCall);
                    cmd.Parameters.Add(paramA);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        Narvaro nv = new Narvaro();
                        nv.andel = Convert.ToInt32(rdr["andel"]);
                        nv.narvaroTyp = rdr["narvaroTyp"].ToString();
                        nv.color = rdr["color"].ToString();
                        nvList.Add(nv);
                    }
                }
            }

            return nvList;
        }

        //Tab 2 and 3 - object list for Richselect
        [Route("kontrollistonrichselectatdashboard")]
        [System.Web.Http.HttpPost]
        public List<KTMeddlemar> KTMFunc([FromBody] UserControllEftNar uc)
        {
            List<KTMeddlemar> ktmList = new List<KTMeddlemar>();

            //Connect and retrieve data
            if (Login.CheckLogging(uc.user))
            {
                string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("Dashboard_getAllPlannedControlls", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    SqlParameter paramA = new SqlParameter("@id", uc.idCall);
                    cmd.Parameters.Add(paramA);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        KTMeddlemar ktm = new KTMeddlemar();
                        ktm.id = Convert.ToInt32(rdr["id"]);
                        ktm.value = rdr["value"].ToString();
                        ktmList.Add(ktm);
                    }
                }
            }

            return ktmList;
        }

        //Tab 3 - Medlemmar table result
        [Route("DashboardMedlemmarCall")]
        [System.Web.Http.HttpPost]
        public List<DashMedlemmar> DMFunc([FromBody] DMObj dmo)
        {
            List<DashMedlemmar> dmList = new List<DashMedlemmar>();

            //Connect and retrieve data
            if (Login.CheckLogging(dmo.user))
            {
                string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("Dashboard_Medlemmar", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    SqlParameter paramA = new SqlParameter("@medlem", dmo.medlem);
                    cmd.Parameters.Add(paramA);
                    SqlParameter paramB = new SqlParameter("@controll", dmo.controll);
                    cmd.Parameters.Add(paramB);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        DashMedlemmar dm = new DashMedlemmar();
                        dm.medlem = Convert.ToInt32(rdr["medlem"]);
                        dm.taxinr = Convert.ToInt32(rdr["taxinr"]);
                        dm.krav = rdr["krav"].ToString();
                        dm.status = rdr["status"].ToString();
                        dmList.Add(dm);
                    }
                }
            }

            return dmList;
        }

        //All tabs - prepare for flygande pick on richselect
        [Route("flygandekontrollcalc")]
        [System.Web.Http.HttpGet]
        public void FKC()
        {
            string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("Dashboard_Flygande_Antal_Uppdatera", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                con.Close();
            }
        }

        public class DashMedlemmar
        {
            public int medlem { get; set; }
            public int taxinr { get; set; }
            public string krav { get; set; }
            public string status { get; set; }

        }
        public class DMObj
        {
            public string user { get; set; }
            public string controll { get; set; }
            public string medlem { get; set; }
        }
        public class UserControll
        {
            public string user { get; set; }
        }
        public class KTMeddlemar
        {
            public int id { get; set; }
            public string value { get; set; }
        }
        public class KravPerYearBarChart
        {
            public int andel { get; set; }
            public string datum { get; set; }
            public string krav { get; set; }
        }
        public class KravToday
        {
            public int saknas { get; set; }
            public int ok { get; set; }
            public int ejok { get; set; }
            public string krav { get; set; }
        }
        public class Efterkontroll
        {
            public int ingen { get; set; }
            public int senare { get; set; }
            public int snarast { get; set; }
        }
        public class Narvaro
        {
            public int andel { get; set; }
            public string narvaroTyp { get; set; }
            public string color { get; set; }
        }
        public class UserControllEftNar
        {
            public string user { get; set; }
            public string idCall { get; set; }
            public string izvor { get; set; }
        }
        public class EftKontTabOneTable
        {
            public string taxinrAA { get; set; }
            public string antalejuppfylldakrav { get; set; }
            public string antalejuppfylldakravinomkort { get; set; }
        }
    }
}