using Fordonskontroll;
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

namespace Source.Controllers
{
    //Handles request from Konfig button. There are KravConfig, UserCongig and FordonskontrollCofig
    [RoutePrefix("api/config")]
    public class ConfigController : ApiController
    {

        //KRAV CONFIG ROUTES
        [Route("getkravlist")]
        [System.Web.Http.HttpPost]
        public List<KravRow> GKL([FromBody] UserRowLog ur)
        {
            /*
             * Returns list of all requirement from Krav table 
             */

            List<KravRow> krList = new List<KravRow>();

            //Connect and retrieve data
            if (Login.CheckLogging(ur.User))
            {
                string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("select * from KravTabell", con);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        //Get row
                        KravRow kt = new KravRow();
                        kt.id = Convert.ToInt64(rdr["KravID"]);
                        kt.Krav = rdr["Krav"].ToString();
                        kt.Status = Convert.ToInt32(rdr["Status"]);
                        kt.Efterkontroll = Convert.ToInt32(rdr["Efterkontroll"]);
                        kt.ExkluderadeBilar = Convert.ToInt32(rdr["ExkluderadeBilar"]);

                        //Translate reserved words in column "Krav"
                        kt.Krav = kt.Krav.Replace("@s@", "select");
                        kt.Krav = kt.Krav.Replace("@d@", "drop");
                        kt.Krav = kt.Krav.Replace("@i@", "insert");
                        kt.Krav = kt.Krav.Replace("@n@", "'");

                        //Add row to the list
                        krList.Add(kt);
                    }
                }
            }
            
            return krList;
        }

        [Route("savekrav")]
        [System.Web.Http.HttpPut]
        public long PUT([FromBody] KravRow kravB)
        {
            /*
             *  Update one krav based on posted data
             */

            //Check if entered data are OK
            KravRow kravT = ProtectDatabaseKrav(kravB);

            //If everything is OK proceed
            if (kravT.Check && Login.CheckLogging(kravB.User))
            {
                string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
                using (SqlConnection con = new SqlConnection(CS))
                {
                    string updateQuarry = "update KravTabell set Krav = @Krav, Status = @Status, Efterkontroll = @Efterkontroll,ExkluderadeBilar = @ExkluderadeBilar where KravID = @KravID";
                    SqlCommand cmd = new SqlCommand(updateQuarry, con);
                    SqlParameter paramOriginalKravId = new SqlParameter("@KravID", kravT.id);
                    cmd.Parameters.Add(paramOriginalKravId);
                    SqlParameter paramOriginalKrav = new SqlParameter("@Krav", kravT.Krav);
                    cmd.Parameters.Add(paramOriginalKrav);
                    SqlParameter paramOriginalStatus = new SqlParameter("@Status", kravT.Status);
                    cmd.Parameters.Add(paramOriginalStatus);
                    SqlParameter paramOriginalEfterkontroll = new SqlParameter("@Efterkontroll", kravT.Efterkontroll);
                    cmd.Parameters.Add(paramOriginalEfterkontroll);
                    SqlParameter paramOriginalExkluderadeBilar = new SqlParameter("@ExkluderadeBilar", kravT.ExkluderadeBilar);
                    cmd.Parameters.Add(paramOriginalExkluderadeBilar);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    return kravT.id;
                }
            }
            else
            {
                return 0;
            }
        }

        [Route("savekrav")]
        [System.Web.Http.HttpPost]
        public long POST([FromBody] KravRow kravB)
        {
            /*
             * Inserts new Krav based on posted data 
             */

            //Check if entered data are OK
            KravRow kravT = ProtectDatabaseKrav(kravB);

            //If everything is OK proceed
            if (kravT.Check && Login.CheckLogging(kravB.User))
            {
                string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
                using (SqlConnection con = new SqlConnection(CS))
                {
                    string insertQuarry = "INSERT into KravTabell (Krav,Status,Efterkontroll,ExkluderadeBilar) select @Krav, @Status, @Efterkontroll, @Exkluderadebilar";
                    SqlCommand cmd = new SqlCommand(insertQuarry, con);
                    SqlParameter paramOriginalKrav = new SqlParameter("@Krav", kravT.Krav);
                    cmd.Parameters.Add(paramOriginalKrav);
                    SqlParameter paramOriginalStatus = new SqlParameter("@Status", kravT.Status);
                    cmd.Parameters.Add(paramOriginalStatus);
                    SqlParameter paramOriginalEfterkontroll = new SqlParameter("@Efterkontroll", kravT.Efterkontroll);
                    cmd.Parameters.Add(paramOriginalEfterkontroll);
                    SqlParameter paramOriginalExkluderadeBilar = new SqlParameter("@ExkluderadeBilar", kravT.ExkluderadeBilar);
                    cmd.Parameters.Add(paramOriginalExkluderadeBilar);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    return GetMaximumKravID();
                }
            }
            else
            {
                return 0;
            }
        }


        //USER CONFIG ROUTES
        [Route("getuserlist")]
        [System.Web.Http.HttpPost]
        public List<UserRow> GUL([FromBody] UserRowLog urLog)
        {
            /*
             * Returns list of all users from user table 
             */

            List<UserRow> urList = new List<UserRow>();

            if (Login.CheckLogging(urLog.User))
            {
                string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("select * from del_Users", con);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        UserRow ur = new UserRow();
                        ur.ID = Convert.ToInt32(rdr["del_ID"]);
                        ur.User = rdr["del_User"].ToString();
                        ur.Level = rdr["del_Level"].ToString();

                        ur.User = ur.User.Replace("@s@", "select");
                        ur.User = ur.User.Replace("@d@", "drop");
                        ur.User = ur.User.Replace("@i@", "insert");
                        ur.User = ur.User.Replace("@n@", "'");

                        ur.Level = ur.Level.Replace("@s@", "select");
                        ur.Level = ur.Level.Replace("@d@", "drop");
                        ur.Level = ur.Level.Replace("@i@", "insert");
                        ur.Level = ur.Level.Replace("@n@", "'");
                        urList.Add(ur);
                    }
                }
            }
            return urList;
        }

        [Route("saveuser")]
        [System.Web.Http.HttpPut]
        public long PUT([FromBody] UserRow UserB)
        {
            /*
             *  Update one user based on posted data
             */

            //Check if entered data are OK
            UserRow userA = ProtectDatabaseUser(UserB);

            //DOes user already exists
            userA.Check = DoesUserExists(userA.User, userA.ID);

            //If everything is OK proceed
            if (userA.Check && Login.CheckLogging(UserB.activeUser))
            {
                string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
                using (SqlConnection con = new SqlConnection(CS))
                {
                    string updateQuarry = "update del_Users set del_User = @del_User, del_Level = @del_Level where del_ID = @del_ID";
                    SqlCommand cmd = new SqlCommand(updateQuarry, con);
                    SqlParameter paramOriginalKravId = new SqlParameter("@del_ID", userA.ID);
                    cmd.Parameters.Add(paramOriginalKravId);
                    SqlParameter paramOriginalKrav = new SqlParameter("@del_User", userA.User);
                    cmd.Parameters.Add(paramOriginalKrav);
                    SqlParameter paramOriginalStatus = new SqlParameter("@del_Level", userA.Level);
                    cmd.Parameters.Add(paramOriginalStatus);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    return userA.ID;
                }
            }
            else
            {
                return 0;
            }
        }

        [Route("saveuser")]
        [System.Web.Http.HttpPost]
        public long POST([FromBody] UserRow UserB)
        {
            /*
             * Inserts new user based on posted data 
             */

            //Check if entered data are OK
            UserRow UserT = ProtectDatabaseUser(UserB);

            //Check if user exists
            UserT.Check = DoesUserExists(UserT.User, UserT.ID);

            //If everything is OK proceed
            if (UserT.Check & Login.CheckLogging(UserB.activeUser))
            {
                //Generate password - MD5 from provided email and then take letters 1,2,4,12,16,18,22,28
                string hashUser = "testtesttesttesttesttesttesttesttesttesttesttestests";
                using (MD5 md5Hash = MD5.Create())
                {
                    hashUser = GetMd5Hash(md5Hash, UserT.User);
                }

                //Pick characters from predefined possitions and build string for user password
                StringBuilder gp = new StringBuilder();
                gp.Append(hashUser.Substring(0, 1));
                gp.Append(hashUser.Substring(1, 1));
                gp.Append(hashUser.Substring(3, 1));
                gp.Append(hashUser.Substring(11, 1));
                gp.Append(hashUser.Substring(15, 1));
                gp.Append(hashUser.Substring(17, 1));
                gp.Append(hashUser.Substring(21, 1));
                gp.Append(hashUser.Substring(27, 1));
                string GeneratedPass = gp.ToString(); //To be sent to user

                //Pasword is not stored as text. Real user password is MD5 from username + pass + pass string.
                StringBuilder gpReal = new StringBuilder();
                gpReal.Append(UserT.User);
                gpReal.Append(GeneratedPass);
                gpReal.Append(GeneratedPass);

                //Create pass that will be stored in the database
                string passForDB;
                using (MD5 md5HashReal = MD5.Create())
                {
                    passForDB = GetMd5Hash(md5HashReal, gpReal.ToString());
                }

                //Insert user in table
                string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
                using (SqlConnection con = new SqlConnection(CS))
                {
                    string insertQuarry = "INSERT into del_Users (del_User,del_Pass,del_ControlCode,del_Level) select @User, @Pass, @CC, @Level";
                    SqlCommand cmd = new SqlCommand(insertQuarry, con);
                    SqlParameter paramUser = new SqlParameter("@User", UserT.User);
                    cmd.Parameters.Add(paramUser);
                    SqlParameter paramPass = new SqlParameter("@Pass", passForDB);
                    cmd.Parameters.Add(paramPass);
                    SqlParameter paramCC = new SqlParameter("@CC", 200);
                    cmd.Parameters.Add(paramCC);
                    SqlParameter paramLevel = new SqlParameter("@Level", UserT.Level);
                    cmd.Parameters.Add(paramLevel);
                    con.Open();
                    cmd.ExecuteNonQuery();

                    //Sent email to the user with password information
                    SendEMailToNewUser(UserT.User, GeneratedPass);
                    return GetMaximumKUserID();
                }
            }
            else
            {
                return 0;
            }
        }

        [Route("logoutuser")]
        [System.Web.Http.HttpPost]
        public Boolean LGU([FromBody] UserRowLog urLog)
        {
            /*
             * Returns 0 or 1 based on if user is logged out 
             */
            if (Login.CheckLogging(urLog.User))
            {
                string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("UPDATE del_Users SET del_LastLogin = '2010-01-01 00:00:00.000' WHERE del_ID = " + urLog.User, con);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                }
            }
            return true;
        }

        [Route("deluser")]
        [System.Web.Http.HttpPost]
        public int DelUsr([FromBody] UserDel uDel)
        {

            //uDel je objekat koji nosi user email i sifru. Provjeri u proceduri jel dobro
            //i izbrisi ako jeste
            string userEmail = "empty";
            int UserCount = 0;
            //Connect and retrieve data
            string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("select * from del_Users where del_ID=" + uDel.User, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    userEmail = rdr["del_User"].ToString();
                }
                con.Close();
            }

            StringBuilder gpReal = new StringBuilder();
            gpReal.Append(userEmail);
            gpReal.Append(uDel.pass);
            gpReal.Append(uDel.pass);

            //Create pass that will be stored in the database
            string passForDB;
            using (MD5 md5HashReal = MD5.Create())
            {
                passForDB = GetMd5Hash(md5HashReal, gpReal.ToString());
            }


            using (SqlConnection conB = new SqlConnection(CS))
            {
                SqlCommand cmdB = new SqlCommand("select count(*) as UserCount from del_Users where del_ID=" + uDel.User + " and del_Pass = '" + passForDB + "'", conB);
                conB.Open();
                SqlDataReader rdr = cmdB.ExecuteReader();
                while (rdr.Read())
                {
                    UserCount = Convert.ToInt32(rdr["UserCount"]);
                }
                conB.Close();
            }


            if (UserCount == 1)
            {
                using (SqlConnection conA = new SqlConnection(CS))
                {
                    SqlCommand cmdA = new SqlCommand("delete from del_Users where del_User = @del_User", conA);
                    SqlParameter paramA = new SqlParameter("@del_User", uDel.idCall);
                    cmdA.Parameters.Add(paramA);
                    conA.Open();
                    SqlDataReader rdr = cmdA.ExecuteReader();
                }
            }
            return 0;
        }



        


        //FORDONSKONTROLL ROUTES
        [Route("getfc")]
        [System.Web.Http.HttpPost]
        public List<FCRow> GUFC([FromBody] UserRowLog urLog)
        {
            /*
             * Returns list of all fordon controlls from Kontrolldatum table 
             */

            List<FCRow> fcList = new List<FCRow>();

           if (Login.CheckLogging(urLog.User))
            {
                string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("select *,case when (select top 1 KontrollID from KontrollTabell where Kontrolldatum = Kontrolldatum.id) is null then 1 else 0 end as del from Kontrolldatum where Kontrolltyp <> 3", con);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        FCRow fc = new FCRow();
                        fc.ID = Convert.ToInt32(rdr["id"]);
                        fc.Typ = rdr["Kontrolltyp"].ToString();
                        fc.From = Convert.ToDateTime(rdr["FromDate"]);
                        fc.To = Convert.ToDateTime(rdr["ToDate"]);
                        fc.Del = Convert.ToInt32(rdr["del"]);
                        fcList.Add(fc);
                    }
                }
            }
            
            return fcList;
        }

        [Route("savefc")]
        [System.Web.Http.HttpPost]
        public long POST([FromBody] FCRow FCB)
        {
            /*
             * Inserts new fordon controll based on posted data 
             */

            //Check if entered data are OK
            FCRow FCT = ProtectDatabaseFC(FCB);

            //If everything is OK proceed
            if (FCT.Check && Login.CheckLogging(FCB.User))
            {
                //Insert FC in table
                string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
                using (SqlConnection con = new SqlConnection(CS))
                {
                    string insertQuarry = "INSERT into Kontrolldatum (Kontrolltyp,FromDate,ToDate) select @Kontrolltyp, @FromDate, @ToDate";
                    SqlCommand cmd = new SqlCommand(insertQuarry, con);
                    SqlParameter paramTyp = new SqlParameter("@Kontrolltyp", FCT.Typ);
                    cmd.Parameters.Add(paramTyp);
                    SqlParameter paramFrom = new SqlParameter("@FromDate", FCT.From);
                    cmd.Parameters.Add(paramFrom);
                    SqlParameter paramTo = new SqlParameter("@ToDate", FCT.To);
                    cmd.Parameters.Add(paramTo);
                    con.Open();
                    cmd.ExecuteNonQuery();

                    return GetMaximumKFCID();
                }
            }
            else
            {
                return 0;
            }
        }

        [Route("savefc")]
        [System.Web.Http.HttpPut]
        public long PUT([FromBody] FCRow FCB)
        {
            /*
             * Inserts new fordon controll based on posted data 
             */

            //Check if entered data are OK
            FCRow FCT = ProtectDatabaseFC(FCB);

            //If everything is OK proceed
            if (FCT.Check && Login.CheckLogging(FCB.User))
            {
                //Insert FC in table
                string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
                using (SqlConnection con = new SqlConnection(CS))
                {
                    string updateQuarry = "update Kontrolldatum set Kontrolltyp = @Kontrolltyp, FromDate = @FromDate, ToDate = @ToDate where id = @ID";
                    SqlCommand cmd = new SqlCommand(updateQuarry, con);
                    SqlParameter paramTyp = new SqlParameter("@Kontrolltyp", FCT.Typ);
                    cmd.Parameters.Add(paramTyp);
                    SqlParameter paramFrom = new SqlParameter("@FromDate", FCT.From);
                    cmd.Parameters.Add(paramFrom);
                    SqlParameter paramTo = new SqlParameter("@ToDate", FCT.To);
                    cmd.Parameters.Add(paramTo);
                    SqlParameter paramID = new SqlParameter("@ID", FCT.ID);
                    cmd.Parameters.Add(paramID);
                    con.Open();
                    cmd.ExecuteNonQuery();

                    return FCT.ID;
                }
            }
            else
            {
                return 0;
            }
        }


        [Route("DelCon")]
        [System.Web.Http.HttpPost]
        public int DelKon([FromBody] UserRowLogId urlID)
        {
            if (Login.CheckLogging(urlID.User))
            {
                string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
                using (SqlConnection con = new SqlConnection(CS))
                {
                    string selectQuarry = "DELETE FROM Kontrolldatum WHERE id = " + urlID.idCall;
                    SqlCommand cmd = new SqlCommand(selectQuarry, con);
                    con.Open();
                    SqlDataReader rdr = cmd.ExecuteReader();
                    con.Close();
                }
            }
            return 0;
        }
        
        /*
         * Classes needed for listing and data processing
         */

        public class KravRow
        {
            public long id { get; set; }
            public string Krav { get; set; }
            public int Status { get; set; }
            public int Efterkontroll { get; set; }
            public int ExkluderadeBilar { get; set; }
            public bool Check { get; set; }
            public string User { get; set; }
        }
        public class UserRow
        {
            public int ID { get; set; }
            public string User { get; set; }
            public string Level { get; set; }
            public bool Check { get; set; }
            public string activeUser { get; set; }

        }
        public class FCRow
        {
            public int ID { get; set; }
            public string Typ { get; set; }
            public DateTime From { get; set; }
            public DateTime To { get; set; }
            public bool Check { get; set; }
            public string User { get; set; }
            public int Del { get; set; }
        }
        public class UserRowLog
        {
            public string User { get; set; }
        }
        public class UserRowLogId
        {
            public string User { get; set; }
            public string idCall { get; set; }
        }

        public class UserDel
        {
            public string User { get; set; }
            public string idCall { get; set; }
            public string pass { get; set; }
        }
        /*
         * Methods
         */

        private KravRow ProtectDatabaseKrav(KravRow kt)
        {
            /*
             * Translates reserverd words in order to prevent sql injections. It should not happend because it is dropdown list but you never know...
             * select => @s@
             * drop => @d@
             * insert => @i@
             * ' =>@'@
             */


            //Column KRAV
            kt.Krav = kt.Krav.Replace("select", "@s@");
            kt.Krav = kt.Krav.Replace("drop", "@d@");
            kt.Krav = kt.Krav.Replace("insert", "@i@");
            kt.Krav = kt.Krav.Replace("'", "@n@");

            if (kt.Status != 1 && kt.Status != 0)
            {
                kt.Check = false;
            }

            return kt;
        }
        private UserRow ProtectDatabaseUser(UserRow ut)
        {
            /*
             * Translates reserverd words in order to prevent sql injections. It should not happend because it is dropdown list but you never know...
             * select => @s@
             * drop => @d@
             * insert => @i@
             * ' =>@'@
             */

            //Column USER
            ut.User = ut.User.Replace("select", "@s@");
            ut.User = ut.User.Replace("drop", "@d@");
            ut.User = ut.User.Replace("insert", "@i@");
            ut.User = ut.User.Replace("'", "@n@");

            //Column LEVEL
            ut.Level = ut.Level.Replace("select", "@s@");
            ut.Level = ut.Level.Replace("drop", "@d@");
            ut.Level = ut.Level.Replace("insert", "@i@");
            ut.Level = ut.Level.Replace("'", "@n@");


            //Check if all values are populated correctly
            if (ut.Level != "User" && ut.Level != "Superuser" && ut.Level != "Administrator")
            {
                ut.Check = false;
            }

            if (ut.User.IndexOf('@') == -1 || ut.User.IndexOf('.') == -1)
            {
                ut.Check = false;
            }


            return ut;
        }
        private FCRow ProtectDatabaseFC(FCRow fcr)
        {
            return fcr;
        }
        bool IsDigitsOnly(string str)
        {
            foreach (char c in str)
            {
                if (c < '0' || c > '9')
                    return false;
            }

            return true;
        }
        private long GetMaximumKravID()
        {
            /*
             * Returns latest ID from Krav table
             */
            long KravIdToReturn = 0;
            string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                string selectQuarry = "select max(KravID) as KravID from KravTabell";
                SqlCommand cmd = new SqlCommand(selectQuarry, con);

                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {

                    KravIdToReturn = Convert.ToInt64(rdr["KravID"]);

                }
            }

            return KravIdToReturn;
        }
        private long GetMaximumKUserID()
        {

            long UserIdToReturn = 0;
            string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                string selectQuarry = "select max(del_ID) as UserID from del_Users";
                SqlCommand cmd = new SqlCommand(selectQuarry, con);

                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {

                    UserIdToReturn = Convert.ToInt64(rdr["UserID"]);

                }
            }

            return UserIdToReturn;
        }
        private long GetMaximumKFCID()
        {
            long UserIdToReturn = 0;
            string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                string selectQuarry = "select max(id) as ID from Kontrolldatum";
                SqlCommand cmd = new SqlCommand(selectQuarry, con);

                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {

                    UserIdToReturn = Convert.ToInt64(rdr["ID"]);

                }
            }

            return UserIdToReturn;
        }
        private bool DoesUserExists(string user, int userID)
        {
            /*
             * Check if user email exist and return boolean value based on that. Webix sends userID. If it is 0 it is new user.
             */
            bool IsOK = true;
            string getQuery = "";


            string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd;
                if (userID == 0)
                {
                    //New User - check if user exists
                    getQuery = "select COUNT(del_User) as NrOfUsers from del_Users where del_User = @User";
                    cmd = new SqlCommand(getQuery, con);
                    SqlParameter paramUser = new SqlParameter("@User", user);
                    cmd.Parameters.Add(paramUser);
                }
                else
                {
                    //Existing user - check if user exists but ignore current
                    getQuery = "select COUNT(del_User) as NrOfUsers from del_Users where del_User = @User and del_ID<>@ID";
                    cmd = new SqlCommand(getQuery, con);
                    SqlParameter paramUser = new SqlParameter("@User", user);
                    cmd.Parameters.Add(paramUser);
                    SqlParameter paramID = new SqlParameter("@ID", userID);
                    cmd.Parameters.Add(paramID);
                }
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    if (Convert.ToInt32(rdr["NrOfUsers"]) != 0)
                    {
                        IsOK = false;
                    }
                }
            }

            return IsOK;
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
        private void SendEMailToNewUser(string user, string generatedPass)
        {
            /*
             * Inform user that it is registered and send password. 
             * TBD = stored procedure does not have meaningfull text right now. It should send password but it needs to be decorated with html litlle more.
             */

            string CS = ConfigurationManager.ConnectionStrings["Fordonskontroll"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("sendRegisteredPassword", con);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlParameter param = new SqlParameter("@user", user);
                cmd.Parameters.Add(param);
                SqlParameter paramA = new SqlParameter("@generatedPass", generatedPass);
                cmd.Parameters.Add(paramA);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                con.Close();
            }
        }
    }
}