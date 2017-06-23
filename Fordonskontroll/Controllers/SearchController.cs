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
        [Route("fordonheader")]
        [System.Web.Http.HttpPost]
        public List<FordonHeader> Post([FromBody] TaxiNr taxiNr)
        {
            /*
             * Lists fordon header data based on selected taxi number 
             */

            List<FordonHeader> fh = new List<FordonHeader>();

            //Connect and run stored procedure
            string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("getFordonData", con);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlParameter param = new SqlParameter("@TaxiNr", taxiNr.id);
                cmd.Parameters.Add(param);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    FordonHeader fhObj = new FordonHeader();
                    fhObj.Fabrikat = rdr["Fabrikat"].ToString();
                    fhObj.RegNr = rdr["RegNr"].ToString();
                    fhObj.Arsmodell = rdr["Arsmodell"].ToString();
                    fhObj.TaxiNr = rdr["TaxiNr"].ToString();
                    fhObj.Medlem = rdr["Medlem"].ToString();

                    fh.Add(fhObj);
                }
            }
            return fh;
        }

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

        [Route("control")]
        [System.Web.Http.HttpPost]
        public List<CurrentControllRow> Post([FromBody] ControlId cid)
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
                SqlParameter param = new SqlParameter("@ControlId", cid.id);
                cmd.Parameters.Add(param);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    CurrentControllRow fdOne = new CurrentControllRow();
                    fdOne.id = Convert.ToInt64(rdr["KravID"]);
                    fdOne.Krav = rdr["Krav"].ToString();
                    fdOne.Status = Convert.ToInt32(rdr["Status"]);
                    fd.Add(fdOne);
                }
            }
            return fd;
        }
    }

    /*
     * Classes needed for listing and data processing
     */

    public class TaxiNr
    {
        public string id { get; set; }
    }
    public class FordonHeader
    {
        public string Fabrikat { get; set; }
        public string RegNr { get; set; }
        public string Arsmodell { get; set; }
        public string TaxiNr { get; set; }
        public string Medlem { get; set; }
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
    }
    public class ControlId
    {
        public string id { get; set; }
    }


}