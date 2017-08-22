using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Http;

namespace Fordonskontroll.Controllers
{
    [RoutePrefix("api/login")]
    public class LoginController : ApiController
    {
        LoginType logType = LoginType.NotLogged;
        [Route("logUser")]
        [System.Web.Http.HttpPost]
        public ReturnLoggin Post([FromBody] LoginTable lt)
        {
            /*
             * Check if user exist, if password is correct and return user privilege 
             */
            //Calculate password
            //Pasword is not stored as text. Real user password is MD5 from username + pass + pass string.
            StringBuilder gpReal = new StringBuilder();
            gpReal.Append(lt.un);
            gpReal.Append(lt.pass);
            gpReal.Append(lt.pass);

            //Create pass that will be stored in the database
            string passForDB;
            int idUser = 0;
            using (MD5 md5HashReal = MD5.Create())
            {
                passForDB = GetMd5Hash(md5HashReal, gpReal.ToString());
            }

            //Connect and retrieve data
            string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("select top 1 del_ID, del_Level from del_Users where del_User = @del_User and del_Pass = @del_Pass", con);
                SqlParameter paramA = new SqlParameter("@del_User", lt.un);
                cmd.Parameters.Add(paramA);
                SqlParameter paramB = new SqlParameter("@del_Pass", passForDB);
                cmd.Parameters.Add(paramB);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    string Level = rdr["del_Level"].ToString();
                    if (Level == "User")
                    {
                        logType = LoginType.User;
                    } else if (Level == "Superuser")
                    {
                        logType = LoginType.Superuser;
                    } else if (Level == "Administrator")
                    {
                        logType = LoginType.Administrator;
                    }
                    LoggUser(rdr["del_ID"].ToString());
                    idUser = Convert.ToInt32(rdr["del_ID"]);
                }
            }
            ReturnLoggin rl = new ReturnLoggin();
            rl.logType = logType;
            rl.ajdi = idUser;

            return rl;
        }

        [Route("checkLogStatusForUser")]
        [System.Web.Http.HttpPost]
        public LoginType CheckUser([FromBody] CheckLog lt)
        {
            string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("select top 1 del_Level,del_LastLogin from del_Users where del_ID = @del_ID", con);
                SqlParameter paramA = new SqlParameter("@del_ID", lt.lt);
                cmd.Parameters.Add(paramA);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    string Level = rdr["del_Level"].ToString();
                    //Check if sesstion is OK
                    if(GetLogginType(lt.lt))
                    {
                        if (Level == "User")
                        {
                            logType = LoginType.User;
                        }
                        else if (Level == "Superuser")
                        {
                            logType = LoginType.Superuser;
                        }
                        else if (Level == "Administrator")
                        {
                            logType = LoginType.Administrator;
                        }
                    }
                }
                return logType;
            }
        }
        public void LoggUser(string userID)
        {
            string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("update del_Users set del_LastLogin = @CurrentDateTime where del_ID = @del_ID", con);
                SqlParameter paramA = new SqlParameter("@CurrentDateTime", DateTime.Now);
                cmd.Parameters.Add(paramA);
                SqlParameter paramB = new SqlParameter("@del_ID", userID);
                cmd.Parameters.Add(paramB);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
            }
        }
        public Boolean GetLogginType(string userID)
        { 
            
            Boolean IsLogged = false;
            string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("select case when del_LastLogin is null then 0 else del_LastLogin end as del_LastLogin from del_Users where del_ID = @del_ID", con);
                SqlParameter paramA = new SqlParameter("@del_ID", userID);
                cmd.Parameters.Add(paramA);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    DateTime dt = DateTime.Now.AddHours(-16);
                    if (dt <= Convert.ToDateTime(rdr["del_LastLogin"]))
                    {
                        IsLogged = true;
                    }
                }
                return IsLogged;
            }
        }
        static string GetMd5Hash(MD5 md5Hash, string input)
        {
            /*
             * Translates string into MD5 hash 
             */
            // Convert the input string to a byte array and compute the hash.
            byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

            // Create a new Stringbuilder to collect the bytes
            // and create a string.
            StringBuilder sBuilder = new StringBuilder();

            // Loop through each byte of the hashed data 
            // and format each one as a hexadecimal string.
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            // Return the hexadecimal string.
            return sBuilder.ToString();
        }
    }

    public class LoginTable
    {
        public string un { get; set; }
        public string pass { get; set; }
    }
    public enum LoginType
    {
        NotLogged,
        User,
        Superuser,
        Administrator
    }
    public class ReturnLoggin {
        public LoginType logType { get; set; }
        public int ajdi { get; set; }
    }
    public class CheckLog {
        public string lt { get; set; }
    }
}
