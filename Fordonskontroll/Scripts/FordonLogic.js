/**********************************************************************************************
 *******************************VARIABLES******************************************************
 *********************************************************************************************/

var DashboardTemplate = {
    template: "Dashboard",
    height: 50
}

var SearchTemplate = {
    height: 700,
    rows: [
        {
            cols: [
                {
                    rows: [
                        {
                            view: "datatable",
                            minWidth: 300,
                            height: 187,
                            id: "FordonHeaderData",
                            header: false,
                            columns: [
                                { id: "HeadCol", width: 100 },
                                { id: "DataCol", fillspace: true }
                            ],
                            select: "row",
                            data: [],
                        },
                        {
                            view: "datatable",
                            minWidth: 300,
                            id: "FordonConstollsData",
                            header: true,
                            columns: [
                                { id: "D", fillspace: true, header: "Tidigare Kontroller", template: "<a href='#' onClick='GetControl(#S#)'>#D#</a>", }
                            ],
                            select: "row",
                            data: [],
                        }
                    ],
                    gravity: 0.2
                },
                {
                    view: "datatable",
                    id: "KravData",
                    columns: [
                        { id: "krav", fillspace: true, header: "Krav" },
                        {
                            id: "status", width: 100, header: "Status",
                            template: function (obj) {
                                if (obj.status == 1) {
                                    return "<label class='switch'><input type='checkbox' checked><div class='slider round'></div></label>";
                                }
                                else {
                                    return "<label class='switch'><input type='checkbox'><div class='slider round'></div></label>";
                                }
                            }
                        },
                    ],
                    data: [],
                    gravity: 0.8,
                    on: {
                        "onItemClick": function (id) {
                            //Update data
                            record = $$("KravData").getItem(id.row);
                            if (record.status == 1) {
                                record.status = "0";
                            } else {
                                record.status = "1"
                            }
                            $$("KravData").updateItem(id.row, record);

                        }
                    }
                }
            ]
        },
        {
            cols: [
                {},
                { view: "button", value: "Save", id: "SaveControll", width: 100, disabled: true, click: "SaveControll()" }
            ]
        }
    ]
}

var KonfKrav = {
    rows: [
                {
                    cols: [
                    {},
                    {
                        view: "button",
                        width: 150,
                        type: "icon",
                        icon: "plus",
                        label: "Add New",
                        click: "ShowKravWindow('NEW')",
                        id: "AddNewKrav"
                    }
                    ]

                },
    {
        view: "datatable",
        height: 500,
        id: "KravTableListConfig",
        columns: [
            { id: "krav", width: 300, header: "Krav" },
            {
                id: "status", width: 100, header: "Status", template: function (ulaz) {
                    if (ulaz.status == 1) {
                        return "Enabled";
                    } else {
                        return "Disabled";
                    }
                }
            },
            { id: "efterkontroll", width: 200, header: "Efterkontroll" },
            { id: "exkluderadeBilar", fillspace: true, header: "Exkluderade Bilar" }
        ],
        select: "row",
        data: [],
        on: {
            "onItemDblClick": function (id) {
                ShowKravWindow(id.row);
            }
        }
    }
    ]
}

var KonfAnv = {
    rows: [
        {
            cols: [
                {},
                {
                    view: "button",
                    width: 150,
                    type: "icon",
                    icon: "plus",
                    label: "Add New",
                    click: "ShowUserWindow('NEW')",
                    id: "AddNewUser"
                }
            ]
        },
        {
            view: "datatable",
            height: 500,
            id: "UserTableListConfig",
            columns: [
                { id: "user", width: 300, header: "Email" },
                { id: "level", fillspace: true, header: "Status" }
            ],
            select: "row",
            data: [],
            on: {
                "onItemDblClick": function (id) {
                    ShowUserWindow(id.row);
                }
            }
        }
    ]
}

var KonfFord = {
    rows: [
        {
            cols: [
                {},
                {
                    view: "button",
                    width: 150,
                    type: "icon",
                    icon: "plus",
                    label: "Add New",
                    click: "ShowFordonControllWindow('NEW')",
                    id: "AddNewFordonControll"
                }
            ]
        },
        {
            view: "datatable",
            height: 500,
            id: "FordonControllTableListConfig",
            columns: [
                { id: "FordonControllDateRange", width: 300, header: "Kontrolldatum" },
                { id: "FordonControllComment", fillspace: true, header: "Komentar" }
            ],
            select: "row",
            data: [],
            on: {
                "onItemDblClick": function (id) {
                    ShowFordonControllWindow(id.row);
                }
            }
        }
    ]
}

var ConfigurationTemplate = {
    id: "KonfScreen",
    visibleBatch: "Krav",
    rows: [
            { rows: [{ animate: false, cells: [KonfKrav] }], batch: "Krav" },
            { rows: [{ animate: false, cells: [KonfAnv] }], batch: "Anvandare" },
            { rows: [{ animate: false, cells: [KonfFord] }], batch: "Fordonskontroll" }
    ]
}

var TemplateController = {
    id: "MainScreen",
    visibleBatch: "search",
    rows: [
            { rows: [{ animate: false, cells: [DashboardTemplate] }], batch: "dash" },
            { rows: [{ animate: false, cells: [SearchTemplate] }], batch: "search" },
            { rows: [{ animate: false, cells: [ConfigurationTemplate] }], batch: "konfig" },
    ]
};

var LoginTemplate = {
    user: "",
    rows: [
        {},
        {
            cols: [
            {},
            {
                view: "form",
                id: "LoginForm",
                scroll: false,
                width: 500,
                elements: [
                    { view: "text", id: "un", value: '', labelWidth: 150, label: "User Name" },
                    { view: "text", id: "pass", value: '', labelWidth: 150, label: "Password" },
                    {
                        cols: [
                          { template: "", width: 150 },
                          {},
                          { view: "button", value: "Log In", type: "form", click: "Login()" },
                          {}
                        ]
                    },
                    { view: "label", label: "<a target='_self' href='#' onClick='ChangePassword()'>Forget Password</a>" },
                    { view: "label", label: "", id: "lbl_msg_gen" }
                ]
            },
            {}
            ]

        },
        {}
    ]
}

var LoggedTemplate = {
    /*
     * Button ConfigButton is hidden by default. It will be shown in Login() function if user is
     * with Admin rights
     */
    rows: [
            { template: "Logo and stuff", height: 100 },
            {
                view: "toolbar",
                css: "row",
                cols: [
                    {
                        view: "button", id: "DashboradView", width: 150, type: "icon", icon: "dashboard", label: "Dashboard", click: "GetDashboard()", css: "col-md-1",//hidden:true,
                    },
                    {},
                    { view: "text", placeholder: 'Search TaxiNr...', id: "SearchBox", width: 200 },
                    { view: "button", value: "Search", width: 100, click: "GetFordonData()" },

                    {},
                    {
                        view: "menu", id: "ConfigButton", width: 250, subMenuPos: "bottom", layout: "y",//hidden:true,
                        data: [
                            {
                                id: "KonfigureraMenu", value: "Konfigurera",
                                config: {
                                    width: 200,
                                    on: {
                                        onItemClick: function (id) {
                                            ShowConfig(id);
                                        }
                                    }
                                },
                                submenu: [
                                    { id: "KonfigureraKrav", value: "Krav", icon: "qrcode", width: 200 },
                                    { id: "KonfigureraAnvandare", value: "Användare", icon: "user", width: 200 },
                                    { id: "KonfigureraFordonskontroll", value: "Fordonskontroll", icon: "calendar", width: 200 }
                                ]
                            }
                        ]
                    },



                    /* TBD
                    ConfigButton se koristi u kodu. Nadji ga i vidi sta s njim. Vidljivost ovisi o SQL proceduri i podatku kojeg posalje
                    { view:"button", id:"ConfigButton", width:150,type:"icon", icon:"cog", label:"Konfigurera", click:"GetKrav()" }
                    /* TBD
                     * otvori ovaj red ispod a izbrisi red iznad
                        hidden:true
                    */
                ]
            },
            TemplateController

    ]
}

var ViewController = {
    id: "ViewScreen",
    visibleBatch: "logged",
    rows: [
            { rows: [{ animate: false, cells: [LoginTemplate] }], batch: "login" },
            { rows: [{ animate: false, cells: [LoggedTemplate] }], batch: "logged" }
    ]
};

/**********************************************************************************************
 *******************************RULES**********************************************************
 *********************************************************************************************/
var CheckKrav = function (value) {
    /*
     * Krav name should not be longer than 70 characters and it can not be empty
     */
    if (value.length >= 1 && value.length <= 70) { return true; } else { return false; }
}



/**********************************************************************************************
 *******************************FUNCTIONS******************************************************
 *********************************************************************************************/

function Main() {
    /*
    * Entry point that generates framework
    */
    new webix.ui({
        fullscreen: true,
        autoheight: true,
        rows: [ViewController]
    });
}

/***************************
 *********GET***************
 ***************************/
function GetDashboard() {
    /*
    * Opens Dashboard
    */
    $$("MainScreen").showBatch("dash");
}

function GetKrav() {
    /*
    * Opens Configuration
    */
    $$("MainScreen").showBatch("konfig");
    $$("loadtextwin").show();

    //Send request
    jQuery.ajax({
        url: 'api/config/getkravlist/',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        //If success update webix. Data is Krav ID from database that was updated or created
        success: function (data) {
            $$("KravTableListConfig").clearAll();
            $$("KravTableListConfig").parse(data);
            $$("loadtextwin").hide();
        }
    })
}

function GetUser() {
    $$("loadtextwin").show();

    //Send request
    jQuery.ajax({
        url: 'api/config/getuserlist/',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        //If success update webix. Data is Krav ID from database that was updated or created
        success: function (data) {
            console.log(data)
            $$("UserTableListConfig").clearAll();
            $$("UserTableListConfig").parse(data);
            $$("loadtextwin").hide();
        }
    })
}

function GetFordonData() {
    /*
     * Opens Search Mode and process searching functionality
     */

    //Show search batch and disable save button
    $$("MainScreen").showBatch("search");
    $$("SaveControll").disable();

    //Do not allow user to enter more than 10 characters
    if ($$("SearchBox").getValue().length >= 1 && $$("SearchBox").getValue().length <= 10) {
        //Clear data from all tables
        $$("FordonHeaderData").clearAll();
        $$("KravData").clearAll();
        $$("FordonConstollsData").clearAll();

        //Populate data in all tables
        GetFordonHeaderData(); //Vehicle data and previous controlls
        GetControl("New"); //Controll details. Latest by default.
    } else {
        //Inform user to enter TaxiNr
        webix.message({ type: "error", text: "Please enter correct TaxiNr!" })
    }
}

function GetFordonHeaderData() {
    /*
     * Get user input and retrieve vehicle data based on it
     */
    jQuery.ajax({
        url: 'api/search/fordonheader/',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        //Get data from webix
        data: JSON.stringify({
            id: $$("SearchBox").getValue()
        }),
        dataType: 'json',
        //If success update webix. Data is Krav ID from database that was updated or created
        success: function (data) {
            PopulateVehicleData(data[0]); //Populate table with returned data
            CallPopulateConstollsData(data[0].regNr, data[0].taxiNr, data[0].medlem);

        }
    })
}

function CallPopulateConstollsData(regNr, taxiNr, medlem) {
    jQuery.ajax({
        url: 'api/search/previouscontrolls/',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        //Get data from webix
        data: JSON.stringify({
            RegNr: regNr,
            TaxiNr: taxiNr,
            Medlem: medlem

        }),
        dataType: 'json',
        //If success update webix. Data is Krav ID from database that was updated or created
        success: function (data) {
            //Populate table with returned data
            PopulateConstollsData(data);

        }
    })



}

function GetControl(ControlId) {
    /*
     * Retrieves JSON object and populates KravData table.
     */
    jQuery.ajax({
        url: 'api/search/control',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        //Get data from webix
        data: JSON.stringify({
            id: ControlId

        }),
        dataType: 'json',
        //If success update webix. Data is Krav ID from database that was updated or created
        success: function (data) {
            $$("KravData").parse(data);
            $$("SaveControll").enable();

        }
    })
}

/***************************
 *********SAVE***************
 ***************************/
function SaveControll() {
    /*
     * Collect and send data to save new controll
     */

    $$("savetextwin").show();

    //Get data
    DataObject = $$("KravData").data.pull;
    IDString = "";
    StatusString = "";


    //Create string arrays
    ArnApp.each(DataObject, function (index, value) {
        IDString = IDString + value.id + ";"
        StatusString = StatusString + value.Status + ";"
    })

    //Populate rest of the data
    FHD = ReadFordonHeaderData();

    //Delete last ;
    IDString = IDString.substring(0, IDString.length - 1);
    StatusString = StatusString.substring(0, StatusString.length - 1);

    //Send data
    ArnApp.post({
        url: "saveControl.asp",
        type: "json",
        uspjeh: function (data) {
            try {
                GetFordonHeaderData(); //Recalculate header
                $$("savetextwin").hide();
            } catch (e) {
                webix.message({ type: "error", text: "Data not saved!!!" })
            }
        },
        neuspjeh: function () {
            console.log("Call SaveControll fails")
            webix.message({ type: "error", text: "Call failed! Data not saved!!!" })
        },
        parametri: [{
            "IDString": IDString,
            "StatusString": StatusString,
            "RegNr": FHD.RegNr,
            "TaxiNr": FHD.TaxiNr,
            "Medlem": FHD.Medlem
        }]
    })
}

function SaveKrav() {
    //Disable save button
    $$("saveKravbtn").disable();
    //Get ID from webix
    var valueInd = $$('NewKravForm').config.prenosniID;

    //Based on ID decide if it is POST or PUT request
    if (valueInd == 0) {
        sentType = "POST";
    } else if (valueInd * 1 > 0) {
        sentType = "PUT";
    }

    //Send request
    jQuery.ajax({
        url: 'api/config/savekrav/',
        type: sentType,
        contentType: 'application/json; charset=utf-8',
        //Get data from webix
        data: JSON.stringify({
            id: valueInd,
            Krav: $$("KravA").getValue(),
            Status: $$("KravB").getValue(),
            Efterkontroll: $$("KravC").getValue(),
            ExkluderadeBilar: $$("KravD").getValue(),
            Check: true
        }),
        dataType: 'json',
        //If success update webix. Data is Krav ID from database that was updated or created
        success: function (data) {
            //Id has to be > 0
            if (data * 1 > 0) {
                //Get new updated data
                GetKrav();
                $$("KravTableListConfig").sort("#Krav#", "asc", "string");
                $$("newKrav").hide();
                //In case send data is not OK it will return 0
            } else {
                webix.message({ type: "error", text: "Not Saved!" })
            }
        }
    })
}

function SaveUser() {
    $$("saveUserbtn").disable();
    var valueInd = $$('NewUserForm').config.prenosniID;

    //Based on ID decide if it is POST or PUT request
    if (valueInd == 0) {
        sentType = "POST";
    } else if (valueInd * 1 > 0) {
        sentType = "PUT";
    }


    //Send request
    jQuery.ajax({
        url: 'api/config/saveuser/',
        type: sentType,
        contentType: 'application/json; charset=utf-8',
        //Get data from webix
        data: JSON.stringify({
            ID: valueInd,
            User: $$("UserA").getValue(),
            Level: $$("UserB").getValue(),
            Check: true
        }),
        dataType: 'json',
        //If success update webix. Data is Krav ID from database that was updated or created
        success: function (data) {
            //Id has to be > 0
            if (data * 1 > 0) {
                //Get new updated data
                GetUser();
                $$("newUser").hide();
                //In case send data is not OK it will return 0
            } else {
                webix.message({ type: "error", text: "Not Saved!" })
            }
        }
    })
}

/***************************
 *********POPULATE**********
 ***************************/
function PopulateVehicleData(data) {
    /*
     * Creates object and populates FordonHeaderData table based on provided data
     */
    DatatableData = [];
    DatatableData.push({ HeadCol: "Fabrikat", DataCol: data.fabrikat })
    DatatableData.push({ HeadCol: "RegNr", DataCol: data.regNr })
    DatatableData.push({ HeadCol: "Arsmodell", DataCol: data.arsmodell })
    DatatableData.push({ HeadCol: "TaxiNr", DataCol: data.taxiNr })
    DatatableData.push({ HeadCol: "Medlem", DataCol: data.medlem })
    $$("FordonHeaderData").parse(DatatableData);
}

function PopulateConstollsData(data) {
    /*
     * Creates object and populates FordonConstollsData table based on provided data
     */

    DatatableData = [];
    ArnApp.each(data, function (index, value) {
        //Format string to YYYY-MM-DD HH:MM:SS
        var Datum = value.d.substring(0, 4) + '-' + value.d.substring(4, 6) + '-' + value.d.substring(6, 8) + ' ' + value.d.substring(8, 10) + ':' + value.d.substring(10, 12) + ':' + value.d.substring(12, 14);
        DatatableData.push({
            D: Datum,
            S: value.s
        })
    })
    $$("FordonConstollsData").clearAll();
    $$("FordonConstollsData").parse(DatatableData);
}

/***************************
 *********SHOW***************
 ***************************/
function ShowKravWindow(id) {
    /*
     * Show New Krav Window and populate form if existing selected
     */
    $$("newKrav").show();
    $$("saveKravbtn").enable();

    //Set default values
    $$('NewKravForm').config.prenosniID = 0;
    $$("KravA").setValue("");
    $$("KravB").setValue(0);
    $$("KravC").setValue("Inom kort");
    $$("KravD").setValue("Inga");

    //Check if existing selected and set those values if is. It will populate form
    ArnApp.each($$("KravTableListConfig").data.pull, function (index, value) {
        if (value.id == id) {
            $$('NewKravForm').config.prenosniID = value.id;
            $$("KravA").setValue(value.krav);
            $$("KravB").setValue(value.status);
            $$("KravC").setValue(value.efterkontroll);
            $$("KravD").setValue(value.exkluderadeBilar);
        }
    })
}

function ShowUserWindow(id) {
    /*
     * Show New User Window and populate form if existing selected
     */
    $$("newUser").show();
    $$("saveUserbtn").enable();
    //Set default values
    $$('NewUserForm').config.prenosniID = 0;
    $$("UserA").setValue("");
    $$("UserB").setValue("Standard");

    //Check if existing selected and set those values if is. It will populate form
    ArnApp.each($$("UserTableListConfig").data.pull, function (index, value) {
        if (value.id == id) {
            $$('NewUserForm').config.prenosniID = value.id;
            $$("UserA").setValue(value.user);
            $$("UserB").setValue(value.level);
        }
    })
}

function ShowFordonControllWindow(id) {
    /*
     * Show New Controll Window and populate form if existing selected
     */
    $$("newFordonControll").show();
    $$("saveFordonControllbtn").enable();
    //Set default values
    $$('NewFordonControllForm').config.prenosniID = 0;
    //$$("UserA").setValue(""); POSTAVI DEFAULT KALENDAR VRIJEDNOSTI
    //$$("UserB").setValue("Standard");

    //Check if existing selected and set those values if is. It will populate form
    ArnApp.each($$("FordonControllTableListConfig").data.pull, function (index, value) {
        if (value.id == id) {
            $$('NewFordonControllForm').config.prenosniID = value.id;
            //$$("UserA").setValue(value.User); // POSTAVI CUSTOM KALENDAR VRIJEDNOSTI
            //$$("UserB").setValue(value.Status);
        }
    })
}

function ChangePassword() {
    $$("forgetPassWindow").show();
}

function ShowConfig(id) {
    $$("MainScreen").showBatch("konfig");
    switch (id) {
        case "KonfigureraKrav":
            $$("KonfScreen").showBatch("Krav");
            GetKrav();
            break;
        case "KonfigureraAnvandare":
            $$("KonfScreen").showBatch("Anvandare");
            GetUser();
            break;
        case "KonfigureraFordonskontroll":
            $$("KonfScreen").showBatch("Fordonskontroll");
            break;
    }
}

/***************************
 *********DO****************
 ***************************/
function ReadFordonHeaderData() {
    /*
     * Return object with key data
     */

    FordonHeaderData = $$("FordonHeaderData").data.pull;
    RegNr = "";
    TaxiNr = "";
    Medlem = "";

    //Loop table
    ArnApp.each(FordonHeaderData, function (index, value) {
        switch (value.HeadCol) {
            case "RegNr":
                RegNr = value.DataCol;
                break;
            case "TaxiNr":
                TaxiNr = value.DataCol;
                break;
            case "Medlem":
                Medlem = value.DataCol;
                break;
        }
    })

    return {
        RegNr: RegNr,
        TaxiNr: TaxiNr,
        Medlem: Medlem
    }
}

function Login() {
    var un = $$("un").getValue();
    var pass = $$("pass").getValue();

    //Check length. Un or pass should not be longer than 50 characters
    if (un.length >= 50 || pass.length >= 50) {
        alert("ne meere")
        return;
    }

    //Check if data is entered
    if (un.length == 0) {
        webix.message({ type: "error", text: "Enter user name!" })
        return;
    } else if (pass.length == 0) {
        webix.message({ type: "error", text: "Enter Password!" })
        return;
    }

    //Check if user exists
    ArnApp.post({
        url: "getUserData.asp",
        type: "json",
        uspjeh: function (data) {
            if (data[0].l != "0") {
                $$("ViewScreen").showBatch("logged");
                LoginTemplate.user = data[0].u;
                //Server returns object with property L which can be 0 which means user does not
                //exists, Alogged (admin) or
                //ULogged (user). Based on it show or hide Config button
                if (data[0].l == "Administrator") {
                    $$("ConfigButton").show();
                    $$("DashboradView").show();
                } else if (data[0].l == "Special") {
                    $$("DashboradView").show();
                }

            } else {
                webix.message({ type: "error", text: "Incorrect Login Data!" })
            }
        },
        neuspjeh: function () { console.log("Call Login failes") },
        parametri: [{
            "un": un,
            "pass": pass
        }]
    })

}

function SendMainForgetPassword() {
    var frUN = $$("frUN").getValue();
    $$("btn_SendMainForgetPass").disable();
    if (frUN.search("@gmail.com") > 0) {
        //Check if user exists
        ArnApp.post({
            url: "sendEmailForgetPass.asp",
            type: "json",
            uspjeh: function (data) {
                if (data[0].UserName != "0" && data[0].UserName != "NN") {
                    $$("lbl_msg_reg").setValue("Please check your inbox for Password Recovery details!");
                } else {
                    $$("lbl_msg_reg").setValue("Recovery email not sent! Please check your email address and try again!");
                }
                $$("btn_SendMainForgetPass").enable();
            },
            neuspjeh: function () { console.log("Call SendMainForgetPassword failes") },
            parametri: [{
                "frUN": frUN
            }]
        })
    } else {
        $$("lbl_msg_reg").setValue("Recovery email not sent! Please check your email address and try again!");




    }
}

function CodeString(value) {
    return value.replace("'", "@_@")
}