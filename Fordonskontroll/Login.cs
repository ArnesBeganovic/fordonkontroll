using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Fordonskontroll
{
    public class Login
    {
        public static Boolean CheckLogging(string userID)
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
                    DateTime dt2 = Convert.ToDateTime(rdr["del_LastLogin"]);
                    if (dt <= dt2)
                    {
                        IsLogged = true;
                    }
                }
                return IsLogged;
            }
        }
    }
}