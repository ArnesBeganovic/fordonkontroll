using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Source.Controllers
{
    /*
     * This controller is responsible for search functionality. It has three post services which controll header, previous controlls and one current controll data. 
     */

    [RoutePrefix("api/search")]
    public class SearchController : ApiController
    {
        [Route("previouscontrolls")]
        [System.Web.Http.HttpPost]
        public List<PreviousControll> Post([FromBody] FordonIdentification fi)
        {
            /*
             * List all saved controlls that will appear as a Datum list that is clickable 
             */
            List<PreviousControll> pcList = new List<PreviousControll>();

            //Connect and retrieve data
            string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("getFordonControllsData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlParameter paramA = new SqlParameter("@regNr", fi.regNr);
                cmd.Parameters.Add(paramA);
                SqlParameter paramB = new SqlParameter("@taxiNr", fi.taxiNr);
                cmd.Parameters.Add(paramB);
                SqlParameter paramC = new SqlParameter("@medlem", fi.medlem);
                cmd.Parameters.Add(paramC);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    PreviousControll pc = new PreviousControll();
                    pc.D = rdr["Datum"].ToString();
                    pc.S = rdr["SessionNr"].ToString();
                    pcList.Add(pc);
                }
            }
            return pcList;
        }

        [Route("getcontrol")]
        [System.Web.Http.HttpPost]
        public List<CurrentControllRow> Post([FromBody] TaxiNr tNr)
        {
            /*
             * Lists one controll in main table. It can be a list of all active requirements (krav list) or it can be historic requirement status.
             */
            List<CurrentControllRow> fd = new List<CurrentControllRow>();

            //Connect and retrieve data
            string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("getControll", con);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlParameter taxiNr = new SqlParameter("@taxiNr", tNr.idt);
                cmd.Parameters.Add(taxiNr);
                SqlParameter param = new SqlParameter("@ControlId", tNr.idc);
                cmd.Parameters.Add(param);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    CurrentControllRow fdOne = new CurrentControllRow();
                    fdOne.id = Convert.ToInt64(rdr["KravID"]);
                    fdOne.Krav = rdr["Krav"].ToString();
                    fdOne.Status = Convert.ToInt32(rdr["Status"]);
                    fdOne.Fabrikat = rdr["fabrikat"].ToString();
                    fdOne.RegNr = rdr["regnr"].ToString();
                    fdOne.Arsmodell = rdr["arsmodel"].ToString();
                    fdOne.TaxiNr = rdr["taxinr"].ToString();
                    fdOne.Medlem = Convert.ToInt32(rdr["medlemnr"]);
                    fd.Add(fdOne);
                }
            }
            return fd;
        }

        [Route("savecontrol")]
        [System.Web.Http.HttpPost]
        public int SaveControll([FromBody] KravSave ksr)
        {
            bool IsOK = true;
            //krs.id should be same array length as ksr.status and it all should be numbers
            if (ksr.id.Count(e => e == ';') != ksr.status.Count(e => e == ';'))
            {
                IsOK = false;
            }

            //Check if id contains only numbers as it should
            if (!IsDigitsOnly(ksr.id.Replace(';', '0')))
            {
                IsOK = false;
            }

            //check if status contains only numbers as it should
            if (!IsDigitsOnly(ksr.status.Replace(';', '0')))
            {
                IsOK = false;
            }

            if (IsOK)
            {
                //Save Controll in the Database
                //Connect and retrieve data
                string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("saveControll", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    SqlParameter param1 = new SqlParameter("@IDString", ksr.id);
                    cmd.Parameters.Add(param1);

                    SqlParameter param2 = new SqlParameter("@StatusString", ksr.status);
                    cmd.Parameters.Add(param2);

                    SqlParameter param3 = new SqlParameter("@RegNr", ksr.regNr);
                    cmd.Parameters.Add(param3);

                    SqlParameter param4 = new SqlParameter("@TaxiNr", ksr.taxiNr);
                    cmd.Parameters.Add(param4);

                    SqlParameter param5 = new SqlParameter("@Medlem", ksr.medlem);
                    cmd.Parameters.Add(param5);

                    con.Open();
                    cmd.ExecuteNonQuery();
                    return GetMaxSession();
                }
            }
            return 0;
        }

        /*
         * Methods
         */
        bool IsDigitsOnly(string str)
        {
            foreach (char c in str)
            {
                if (c < '0' || c > '9')
                    return false;
            }

            return true;
        }

        private int GetMaxSession()
        {
            /*
             * Returns latest ID from Krav table
             */
            int SessionNrIdToReturn = 0;
            string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                string selectQuarry = "select max(SessionNr) as SessionNr from KontrollTabell";
                SqlCommand cmd = new SqlCommand(selectQuarry, con);

                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {

                    SessionNrIdToReturn = Convert.ToInt32(rdr["SessionNr"]);

                }
            }

            return SessionNrIdToReturn;
        }

    }  

    /*
     * Classes needed for listing and data processing
     */

    public class TaxiNr
    {
        public string idt { get; set; }
        public string idc { get; set; }
    }
    public class FordonIdentification
    {
        public string regNr { get; set; }
        public string taxiNr { get; set; }
        public string medlem { get; set; }
    }
    public class PreviousControll
    {
        public string D { get; set; }
        public string S { get; set; }
    }
    public class CurrentControllRow
    {
        public long id { get; set; }
        public string Krav { get; set; }
        public int Status { get; set; }
        public string Fabrikat { get; set; }
        public string RegNr { get; set; }
        public string Arsmodell { get; set; }
        public string TaxiNr { get; set; }
        public int Medlem { get; set; }
    }
    public class KravSave
    {
        public string id { get; set; } //ID string array
        public string status { get; set; } //Status string array
        public string regNr { get; set; }
        public string taxiNr { get; set; }
        public string medlem { get; set; }
    }    
}