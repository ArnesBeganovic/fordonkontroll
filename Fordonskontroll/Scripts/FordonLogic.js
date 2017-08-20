/**********************************************************************************************
 *******************************VARIABLES******************************************************
 *********************************************************************************************/

var DashboardTemplate = {
    view: "tabview",
    tabbar: { optionWidth: 200 },
    cells: [
        {
            header: "Current status",
            body: {
                view: "scrollview",
                id: "scrollviewLatest",
                scroll: "y",
                body: {
                    rows: [
                        {
                            view: "chart",
                            id: "KravPerYearBarChartLatest",
                            type: "stackedBar",
                            barWidth: 60,
                            padding: { bottom: 100 },
                            height:450,
                            xAxis: {
                                template: "<div class='rotated'>#krav#</div>"
                            },
                            yAxis: {
                            },
                            legend: {
                                values: [{ text: "Saknas", color: "#f8ddd8" }, { text: "EJ OK", color: "#da472c" }, { text: "OK", color: "#bfda2b" }],
                                valign: "middle",
                                align: "right",
                                width: 90,
                                layout: "y"
                            },
                            series: [
                                {
                                    value: "#ok#",
                                    color: "#bfda2b",
                                    label: "#ok#",
                                    tooltip: {
                                        template: "#ok#"
                                    }
                                },

                                {
                                    value: "#ejok#",
                                    color: "#da472c",
                                    label: "#ejok#",
                                    tooltip: {
                                        template: "#ejok#"
                                    }
                                },
                                {
                                    value: "#saknas#",
                                    label: "#saknas#",
                                    color: "#f8ddd8",
                                    tooltip: {
                                        template: "#saknas#"
                                    }
                                }

                            ],
                            data: []
                        },
                        { template: "", height: 100 }
                    ]
                }
            }
        },
        {
            header: "Latest Controll",
            body: {
                view: "scrollview",
                id: "scrollview",
                scroll: "y",
                body: {
                    rows: [
                        {
                            view: "chart",
                            id: "KravPerYearBarChart",
                            type: "bar",
                            barWidth: 20,
                            radius: 2,
                            height:400,
                            gradient: "rising",
                            padding: { bottom: 100 },
                            xAxis: {
                                template: "'#Krav#"
                            },
                            yAxis: {
                                start: 0,
                                step: 10,
                                end: 100
                            },
                            legend: {
                                values: [{ text: "Controll -2", color: "#58dccd" }, { text: "Controll - 1", color: "#a7ee70" }, { text: "Controll", color: "#36abee" }],
                                valign: "middle",
                                align: "right",
                                width: 90,
                                layout: "y"
                            },
                            series: [
                                {
                                    value: "#CMinusTwo#",
                                    color: "#58dccd",
                                    tooltip: {
                                        template: "#CMinusTwo#"
                                    }
                                },
                                {
                                    value: "#CMinusOne#",
                                    color: "#a7ee70",
                                    tooltip: {
                                        template: "#CMinusOne#"
                                    }
                                },
                                {
                                    value: "#CMinusZero#",
                                    color: "#36abee",
                                    tooltip: {
                                        template: "#CMinusZero#"
                                    }
                                }
                            ],
                            data: []
                        },
                        {
                            cols: [
                                { template:"<div style='width:100%;text-align:center'>Efterkontroll</div>", height:40},
                                { template: "<div style='width:100%;text-align:center'>Närvaro</div>", height: 40 }
                            ]
                        },
                        {
                            height: 300,
                            cols: [
                                {
                                    view: "chart",
                                    type: "pie3D",
                                    container: "chartDiv",
                                    value: "#andel#",
                                    color: "#color#",
                                    label: "#efterKontrolTyp#",
                                    pieInnerText: "#andel#",
                                    shadow: 0,
                                    id: "efterkontroll",
                                    data: []
                                },
                                {
                                    view: "chart",
                                    type: "pie3D",
                                    container: "chartDiv",
                                    value: "#andel#",
                                    color: "#color#",
                                    label: "#narvaroTyp#",
                                    pieInnerText: "#andel#",
                                    shadow: 0,
                                    id: "narvaro",
                                    data: []
                                }
                            ]
                        },
                        {template:"",height:100}
                    ]
                }
            }
            
        },
        {
            header: "Medlem",
            id: "medlemTab",
            rows: [
                {
                    height:40,
                    cols: [
                        {
                            view: "richselect",
                            id:"ControlSelector",
                            label: "Kontroll",
                            value: 1, options: [
                                { "id": 1, "value": "Select" },
                                { "id": 2, "value": "Papaya" },
                                { "id": 3, "value": "Apple" }
                            ]
                        },
                        { view: "text", placeholder: 'Medlem...', id: "MedlemSearch", width: 100 },
                        { view: "button", value: "Search", width: 100, click: "GetMedlemDashboard()" },
                        {},
                        { view: "button", value: "Export To PDF", width: 100, click: "PrintToPdf()" },
                    ]
                },
                {
                    body: {
                        view: "scrollview",
                        id: "scrollviewMedlem",
                        scroll: "y",
                        body: {
                            rows: [
                                {
                                    view: "datatable",
                                    id: "medlemDatatable",
                                    columns: [
                                        { id: "krav", header: "", width: 200 },
                                        { id: "empty", header: "", fillspace: true}
                                    ],
                                    data: [
                                        { krav: ""}
                                    ]
                                }
                            ]
                        }
                    }
                }
            ]

        }
    ]
}


var SearchTemplate = {
    rows: [
        {
            cols: [
                {},
                { view: "button", value: "Save", id: "SaveControll", width: 100, disabled: true, click: "SaveControll()" }
            ]
        },
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
                                { id: "D", fillspace: true, header: "Tidigare Kontroller", template: "<a href='#' onClick='CallGetControl(#S#)'>#D#</a>", }
                            ],
                            select: "row",
                            data: [],
                        }
                    ],
                    gravity: 0.35
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
                            if (id.column == "status") {
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
                }
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
            {
                id: "efterkontroll", width: 200, header: "Efterkontroll", template: function (ulaz) {
                    if (ulaz.efterkontroll == 1) { return "Ingen" }
                    else if (ulaz.efterkontroll == 2) { return "Snarast" }
                    else if (ulaz.efterkontroll == 3) { return "Inom kort" }
                }
            },
            {
                id: "exkluderadeBilar", fillspace: true, header: "Exkluderade Bilar", template: function (ulaz) {
                    if (ulaz.exkluderadeBilar == 1) { return "Inga" }
                    else if (ulaz.exkluderadeBilar == 2) { return "Storbilar" }
                    else if (ulaz.exkluderadeBilar == 3) { return "Executive" }
                    else if (ulaz.exkluderadeBilar == 4) { return "Bilar utan centralen transponder" }
                    else if (ulaz.exkluderadeBilar == 5) { return "Bilar utan OTT-kategori" }
                } }
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
                {
                    id: "typ", fillspace: true, header: "Typ", template: function (ulaz) {
                        if (ulaz.typ == "1") {
                            return "Planerad fordonskontroll";
                        } else if (ulaz.typ == "2") {
                            return "Flygande fordonskontroll";
                        } else if (ulaz.typ == "3") {
                            return "Spontan fordonskontroll";
                        }
                    }
                },
                {
                    id: "from", width: 100, header: "From", template: function (ulaz) {
                        return ulaz.from.toString().substr(0, 10)
                    }
                },
                {
                    id: "to", width: 100, header: "To", template: function (ulaz) {
                        return ulaz.to.toString().substr(0, 10)
                    }
                }
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
    height:500,
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
        { template: "<div class='container'><img style='padding-left:21px' src=../img/taxigbglogo.png><div>", height: 100 },
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
                    { view: "text", type: "password", id: "pass", value: '', labelWidth: 150, label: "Password" },
                    {
                        cols: [
                          { template: "", width: 150 },
                          {},
                          { view: "button", value: "Log In", type: "form", click: "Login()" },
                          {}
                        ]
                    },
                    { view: "label", label: "<a target='_self' href='#' onClick='ForgetPassword()'>Forget Password</a>" },
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
        { template: "<div class='container'><img style='padding-left:21px' src=../img/taxigbglogo.png><div>", height: 100 },
            {
                view: "toolbar",
                css: "row",
                cols: [
                    {
                        view: "button", id: "DashboradView", width: 150, label: "Dashboard", click: "GetDashboard()",hidden:true,
                    },
                    {},
                    { view: "text", placeholder: 'Search TaxiNr...', id: "SearchBox", width: 200 },
                    { view: "button", value: "Search", width: 100, click: "GetFordonData()" },

                    {},
                    {
                        view: "menu", id: "ConfigButton", width: 100, hidden: true, height: 29,
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
                                    { id: "KonfigureraKrav", value: "Krav"},
                                    { id: "KonfigureraAnvandare", value: "Användare" },
                                    { id: "KonfigureraFordonskontroll", value: "Fordonskontroll" },
                                    { id: "ChangePassword", value: "Ändra lösenordet" },
                                    { id: "Logout", value: "Log Out" }
                                ]
                            }
                        ]
                    }
                ]
            },
            TemplateController

    ]
}

var ViewController = {
    id: "ViewScreen",
    visibleBatch: "login",
    type:"space",
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
        rows: [ViewController]
    });

    //Default framework is login but if user is already logged it should change it to respective layout
    var x = document.cookie;
    if (x.length > 8 && x.length < 18) {
        iIndex = x.split("=")[0];
        iValue = x.split("=")[1];
        iValue = iValue.substring(5, iValue.length - 5);
        //Send request
        jQuery.ajax({
            url: 'api/login/checkLogStatusForUser/',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({
                lt: iValue
            }),
            //If success update webix. Data is Krav ID from database that was updated or created
            success: function (data) {
                if (data == 0) {
                    //Not logged
                    //webix.message({ type: "error", text: "Wrong user name or password!" })
                    window.activeUser = 0;
                } else if (data == 1) {
                    //Standard user - show only search tab
                    $$("ViewScreen").showBatch("logged");
                    window.activeUser = iValue;
                } else if (data == 2) {
                    //Special user - show search tab and dashboard
                    $$("ViewScreen").showBatch("logged");
                    $$("DashboradView").show();
                    window.activeUser = iValue;
                } else if (data == 3) {
                    //Administrator - show search tab, dashboard and config
                    $$("ViewScreen").showBatch("logged");
                    $$("DashboradView").show();
                    $$("ConfigButton").show();
                    window.activeUser = iValue;
                }
                $$("loadtextwin").hide();
            }
        })
    }

}

/***************************
 *********GET***************
 ***************************/
function GetDashboard() {
    /*
    * Opens Dashboard
    */
    $$("MainScreen").showBatch("dash");

    //Get barchart data latest big controlls
    jQuery.ajax({
        url: 'api/dashboard/KravPerYearBarChart/',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({
            User: window.activeUser
        }),
        //If success update webix. Data is Krav ID from database that was updated or created
        success: function (data) {
            var transformedData = KravPerYearBarChartData(data);

            $$("KravPerYearBarChart").clearAll();
            $$("KravPerYearBarChart").parse(transformedData);
            $$("KravPerYearBarChart").refresh();
        }
    })

    //Get barchart data latest status
    jQuery.ajax({
        url: 'api/dashboard/KravToday/',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({
            User: window.activeUser
        }),
        //If success update webix. Data is Krav ID from database that was updated or created
        success: function (data) {
            $$("KravPerYearBarChartLatest").clearAll();
            $$("KravPerYearBarChartLatest").parse(data);
            $$("KravPerYearBarChartLatest").refresh();
        }
    })

    //Get Piechart data for efterkontroll
    jQuery.ajax({
        url: 'api/dashboard/Efterkontroll/',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({
            User: window.activeUser
        }),
        //If success update webix. Data is Krav ID from database that was updated or created
        success: function (data) {
            var ekData = [
                { andel: data[0].ingen, efterKontrolTyp: "Ingen", color: "#ee3639" },
                { andel: data[0].senare, efterKontrolTyp: "Senare", color: "#ee9e36" },
                { andel: data[0].snarast, efterKontrolTyp: "Snarast", color: "#eeea36" }
            ];
            $$("efterkontroll").clearAll();
            $$("efterkontroll").parse(ekData);
            $$("efterkontroll").refresh();
        }
    })
   
    //Get Piechart data for Narvaro
    jQuery.ajax({
        url: 'api/dashboard/Narvaro/',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({
            User: window.activeUser
        }),
        //If success update webix. Data is Krav ID from database that was updated or created
        success: function (data) {
            /* RESULT
            var narvaroData = [
                { andel: "20", narvaroTyp: "EJ OK", color: "#ee9e36" },
                { andel: "80", narvaroTyp: "OK", color: "#86EF36" }
            ];
            */
            $$("narvaro").clearAll();
            $$("narvaro").parse(data);
            $$("narvaro").refresh();
            
        }
    })

    //Get Controll List for Medlemmar tab
    jQuery.ajax({
        url: 'api/dashboard/KontrollTillMedlemmar/',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({
            User: window.activeUser
        }),
        //If success update webix. Data is Krav ID from database that was updated or created
        success: function (data) {

            var trData = [{ id: "1555555", value: "Select" }]

            for (i = 0; i < data.length; i++) {
                trData.push({
                    id: data[i].id,
                    value:data[i].value
                })
            }
            $$("ControlSelector").getPopup().getList().clearAll();
            $$("ControlSelector").getPopup().getList().parse(trData);
            $$("ControlSelector").refresh();
            $$("ControlSelector").setValue(0);
            $$("ControlSelector").refresh();
        }
    })
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
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({
            User: window.activeUser
        }),
        //If success update webix. Data is Krav ID from database that was updated or created
        success: function (data) {
            $$("KravTableListConfig").clearAll();
            $$("KravTableListConfig").parse(data);
            $$("KravTableListConfig").refresh();
            $$("loadtextwin").hide();
        }
    })
}

function GetUser() {
    $$("loadtextwin").show();

    //Send request
    jQuery.ajax({
        url: 'api/config/getuserlist/',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({
            User: window.activeUser
        }),
        //If success update webix. Data is Krav ID from database that was updated or created
        success: function (data) {
            $$("UserTableListConfig").clearAll();
            $$("UserTableListConfig").parse(data);
            $$("loadtextwin").hide();
        }
    })
}

function GetFC() {
    $$("loadtextwin").show();

    //Send request
    jQuery.ajax({
        url: 'api/config/getfc/',
        type: 'POST',
        data: JSON.stringify({
            User: window.activeUser
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        //If success update webix. Data is Krav ID from database that was updated or created
        success: function (data) {
            $$("FordonControllTableListConfig").clearAll();
            $$("FordonControllTableListConfig").parse(data);
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
    $$("loadtextwin").show();

    //Do not allow user to enter more than 10 characters
    if ($$("SearchBox").getValue().length >= 1 && $$("SearchBox").getValue().length <= 10) {
        //Clear data from all tables
        $$("FordonHeaderData").clearAll();
        $$("KravData").clearAll();
        $$("FordonConstollsData").clearAll();

        //Populate data in all tables
        GetControl($$("SearchBox").getValue(),"New"); //Controll details. Latest by default.
    } else {
        //Inform user to enter TaxiNr
        $$("loadextwin").hide();
        webix.message({ type: "error", text: "Please enter correct TaxiNr!" })
    }
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
            Medlem: medlem,
            User: window.activeUser

        }),
        dataType: 'json',
        //If success update webix. Data is Krav ID from database that was updated or created
        success: function (data) {
            //Populate table with returned data
            PopulateConstollsData(data);

        }
    })



}

function CallGetControl(ControlId) {
    GetControl($$("SearchBox").getValue(), ControlId);
}

function GetControl(taxiNr,ControlId) {
    /*
     * Retrieves JSON object and populates KravData table.
     */
    jQuery.ajax({
        url: 'api/search/getcontrol',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        //Get data from webix
        data: JSON.stringify({
            idc: ControlId,
            idt: taxiNr,
            user:window.activeUser
        }),
        dataType: 'json',
        //If success update webix. Data is Krav ID from database that was updated or created
        success: function (data) {
            $$("KravData").clearAll();
            $$("KravData").parse(data);
            $$("SaveControll").enable();
            PopulateVehicleData(data[0]); //Populate table with returned data
            CallPopulateConstollsData(data[0].regNr, data[0].taxiNr, data[0].medlem);
            ArnApp.each($$("FordonHeaderData").data.pull, function (index, value) {
                if (value.DataCol == "Missing") {
                   $$("SaveControll").disable();
                }
            })
            $$("loadtextwin").hide();

        }
    })
}

function GetMedlemDashboard() {
    var plControll = $$("ControlSelector").getValue();
    var selMedlem = $$("MedlemSearch").getValue();

    if (plControll == 1555555 || plControll.length==0 || selMedlem.length != 5) {
        webix.message({ type: "error", text: "Select Controll and type correct Medlem nr!!!" });
        return;
    }
    //Get data for Medlem table
    jQuery.ajax({
        url: 'api/dashboard/DashboardMedlemmarCall/',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({
            User: window.activeUser,
            Controll: plControll,
            Medlem:selMedlem
        }),

        success: function (data) {

            var transformedData = MedlemTabellData(data);
            var transformedColumns = MedlemTabellColumns(transformedData[0],data[0].medlem);


            $$("medlemDatatable").config.columns = transformedColumns;
            $$("medlemDatatable").refreshColumns();
            $$("medlemDatatable").clearAll();
            $$("medlemDatatable").parse(transformedData);
            $$("medlemDatatable").refresh();
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
        StatusString = StatusString + value.status + ";"
    })

    //Populate rest of the data
    FHD = ReadFordonHeaderData();
    //Delete last ;
    IDString = IDString.substring(0, IDString.length - 1);
    StatusString = StatusString.substring(0, StatusString.length - 1);

    //CHeck if Vehicle exists one more time. Save Controll button should be closed and not allowed to enter here
    //but if it fails prevent it for further processing 

    var ShouldIContinue = true;
    ArnApp.each($$("FordonHeaderData").data.pull, function (index, value) {
        if (value.DataCol == "Missing") {
            ShouldIContinue = false;
        }
    })
    //Send data
    if (ShouldIContinue) {
        jQuery.ajax({
            url: 'api/search/savecontrol',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            //Get data from webix
            data: JSON.stringify({
                "id": IDString,
                "status": StatusString,
                "regNr": FHD.RegNr,
                "taxiNr": FHD.TaxiNr,
                "medlem": FHD.Medlem,
                "user": window.activeUser
            }),
            dataType: 'json',
            //If success update webix. Data is Krav ID from database that was updated or created
            success: function (data) {
                if (data == 0) {
                    //nije snimio
                    webix.message({ type: "error", message: "Controll not saved!!!" })
                } else {
                    //jeste snimio. TBD obavjesti korisnika
                    webix.message("Controll saved!!!")
                }
                CallGetControl(data); //Recalculate all TBD
                $$("savetextwin").hide();

            }
        })
    } else {
        webix.message({ type: "error", text: "Please check TaxiNr. It seams Vehicle does not exists in Fordonregister!!! Controll not saved", expire: 5000 })
        $$("savetextwin").hide();
    }
    
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
            Check: true,
            User: window.activeUser
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
            Check: true,
            activeUser: window.activeUser
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

function SaveFordonControll() {
    $$("saveFordonControllbtn").disable();
    var valueInd = $$('NewFordonControllForm').config.prenosniID;

    //Based on ID decide if it is POST or PUT request
    if (valueInd == 0) {
        sentType = "POST";
    } else if (valueInd * 1 > 0) {
        sentType = "PUT";
    }
    var dateFrom = $$("KontrollFran").getValue();
    var dateTo = $$("KontrollTill").getValue();

    var dateFromString = dateFrom.getFullYear().toString() + '-' + ("0" + (dateFrom.getMonth() + 1)).slice(-2) + '-' + ("0" + dateFrom.getDate()).slice(-2);
    var dateToString = dateTo.getFullYear().toString() + '-' + ("0" + (dateTo.getMonth() + 1)).slice(-2) + '-' + ("0" + dateTo.getDate()).slice(-2);

    //Send request
    jQuery.ajax({
        url: 'api/config/savefc/',
        type: sentType,
        contentType: 'application/json; charset=utf-8',
        //Get data from webix
        data: JSON.stringify({
            ID: valueInd,
            Typ: $$("KontrolGrupp").getValue(),
            From: dateFromString,
            To: dateToString,
            Check: true,
            User: window.activeUser
        }),
        dataType: 'json',
        //If success update webix. Data is Krav ID from database that was updated or created
        success: function (data) {
            //Id has to be > 0
            if (data * 1 > 0) {
                //Get new updated data
                GetFC();
                $$("newFordonControll").hide();
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
    $$("FordonHeaderData").clearAll();
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
        //var Datum = value.d.substring(0, 4) + '-' + value.d.substring(4, 6) + '-' + value.d.substring(6, 8) + ' ' + value.d.substring(8, 10) + ':' + value.d.substring(10, 12) + ':' + value.d.substring(12, 14);
        DatatableData.push({
            D: value.d,
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
    $$("KravC").setValue(1);
    $$("KravD").setValue(1);

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
     * Sow New User Window and populate form if existing selected
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
    //Check if existing selected and set those values if is. It will populate form
    ArnApp.each($$("FordonControllTableListConfig").data.pull, function (index, value) {
        if (value.id == id) {
            $$('NewFordonControllForm').config.prenosniID = value.id;
            $$("KontrolGrupp").setValue(value.typ);
            var dateFrom = value.from.substr(0,10);
            var dateTo = value.to.substr(0, 10);

            $$("KontrollFran").setValue(dateFrom); // POSTAVI CUSTOM KALENDAR VRIJEDNOSTI
            $$("KontrollTill").setValue(dateTo);
        } else {
            $$("KontrolGrupp").setValue(1);
            $$("KontrollFran").setValue(""); // POSTAVI CUSTOM KALENDAR VRIJEDNOSTI
            $$("KontrollTill").setValue("");
        }
    })
}

function ForgetPassword() {
    $$("forgetPassWindow").show();
}

function ChangePassword() {
    $$("changePassWindow").show();
}

function Logout() {
    //Logout user
    jQuery.ajax({
        url: 'api/config/logoutuser/',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        //Get data from webix
        data: JSON.stringify({
            User: window.activeUser
        }),
        dataType: 'json',
        //If success update webix. Data is Krav ID from database that was updated or created
        success: function (data) {
            location.reload();
        }
    })
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
            GetFC();
            break;
        case "ChangePassword":
            ChangePassword();
            break;
        case "Logout":
            Logout();
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
    var dodajA = Math.random().toString(36).substr(2, 5)
    var dodajB = Math.random().toString(36).substr(2, 5)
    //Check length. Un or pass should not be longer than 50 characters
    if (un.length >= 50 || pass.length >= 50) {
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

    //Send request
    jQuery.ajax({
        url: 'api/login/logUser/',
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        //Get data from webix
        data: JSON.stringify({
            un: un,
            pass: pass
        }),
        dataType: 'json',
        //If success update webix. Data is Krav ID from database that was updated or created
        success: function (data) {
            activeUser = data.ajdi;
            document.cookie = "au=" + dodajA + window.activeUser + dodajB;
            if (data.logType == 0) {
                //Not logged
                webix.message({ type: "error", text: "Wrong user name or password!" })
            } else if (data.logType == 1) {
                //Standard user - show only search tab
                $$("ViewScreen").showBatch("logged");
            } else if (data.logType == 2) {
                //Special user - show search tab and dashboard
                $$("ViewScreen").showBatch("logged");
                $$("DashboradView").show();
            } else if (data.logType == 3) {
                //Administrator - show search tab, dashboard and config
                $$("ViewScreen").showBatch("logged");
                $$("DashboradView").show();
                $$("ConfigButton").show();
            }
        }
    })
}


function CodeString(value) {
    return value.replace("'", "@_@")
}

function KravPerYearBarChartData(data) {
    //preuzmi jedinstvene varijable za krav i datum
    var lookup = {};
    var items = data;
    var uniqueKrav = [];
    var uniqueDatum = [];
    for (var item, i = 0; item = items[i++];) {
        var krav = item.krav;
        var datum = item.datum;

        if (!(krav in lookup)) {
            lookup[krav] = 1;
            uniqueKrav.push(krav);
        }

        if (!(datum in lookup)) {
            lookup[datum] = 1;
            uniqueDatum.push(datum);
        }
    }

    //Create final object
    var finalInput = [];
    for (var i = 0; i < uniqueKrav.length; i++) {
        finalInput.push({
            CMinusOne: "0",
            CMinusTwo: "0",
            CMinusZero: "0",
            Krav: uniqueKrav[i]
        })
    }

    var CMinusTwo = "missing";
    var CMinusOne = "missing";
    var CMinusZero = "missing";

    if (uniqueDatum[2] != undefined) { CMinusTwo = uniqueDatum[2] }
    if (uniqueDatum[1] != undefined) { CMinusOne = uniqueDatum[1] }
    if (uniqueDatum[0] != undefined) { CMinusZero = uniqueDatum[0] }


    // Update finalInput

    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < finalInput.length; j++) {

            if (finalInput[j].Krav == data[i].krav) {
                switch (data[i].datum) {
                    case CMinusTwo:
                        finalInput[j].CMinusTwo = data[i].andel.toString();
                        break;
                    case CMinusOne:
                        finalInput[j].CMinusOne = data[i].andel.toString();
                        break;
                    case CMinusZero:
                        finalInput[j].CMinusZero = data[i].andel.toString();
                        break;
                }
            }
        }
    }
    return finalInput;
}

function MedlemTabellData(data) {
    //preuzmi jedinstvene varijable za krav i datum
    var lookup = {};
    var items = data;
    var uniqueKrav = [];
    var uniqueTaxinr = [];
    for (var item, i = 0; item = items[i++];) {
        var krav = item.krav;
        var taxinr = item.taxinr;

        if (!(krav in lookup)) {
            lookup[krav] = 1;
            uniqueKrav.push(krav);
        }

        if (!(taxinr in lookup)) {
            lookup[taxinr] = 1;
            uniqueTaxinr.push(taxinr);
        }
    }

    //Create final object
    var finalInput = [];
    for (var i = 0; i < uniqueKrav.length; i++) {
        finalInput.push({
            Krav: uniqueKrav[i]
        })

        for (var j = 0; j < uniqueTaxinr.length; j++){
            finalInput[i][uniqueTaxinr[j]] = "";
        }
    }

    // Update finalInput
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < finalInput.length; j++) {
            //Check if Krav is matching
            if (finalInput[j].Krav == data[i].krav) {
                finalInput[j][data[i].taxinr] = data[i].status.toString();
            }
        }
    }
    return finalInput;
}

function MedlemTabellColumns(data, medlem) {
    var keys = [];
    for (var k in data) keys.push(k);
    
    var fullMedlem = "Medlem: " + medlem;

    console.log(medlem)
    var returnColumns = [
        { id: "Krav", header: fullMedlem , width: 200 }
    ]

    for (var i = 0; i < keys.length; i++) {
        if (keys[i] != "Krav") {
            returnColumns.push({
                id: keys[i],
                header: keys[i],
                width:100
            })
        }
    }

    returnColumns.push({
        id: "empty",
        header: "",
        fillspace: true
    })
    return returnColumns;
}

function PrintToPdf() {
    webix.toPDF($$('medlemDatatable'));
}

function SendMainForgetPassword() {
    webix.message("Doradi SendMainForgetPassword funkciju");
    return;
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

function SendMainChangePassword() {
    webix.message("Doradi SendMainChangePassword funkciju");
    return;
}