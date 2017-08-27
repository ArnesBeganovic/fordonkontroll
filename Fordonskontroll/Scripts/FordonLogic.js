/**********************************************************************************************
 *******************************VARIABLES******************************************************
 *********************************************************************************************/

var DashboardTemplate = {
    view: "tabview",
    tabbar: { optionWidth: 200 },
    cells: [
        {
            header: "Aktuell status",
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
                            height: 400,
                            barWidth: 60,
                            padding: { bottom: 100 },
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
                        {
                            view: "datatable",
                            id: "efterkontrollTabOneDatatable",
                            height:300,
                            columns: [
                                { id: "taxinrAA", header: "Taxi Nr", width: 200 },
                                { id: "antalejuppfylldakrav", width: 200 , header: "Antal ej uppfyllda krav" },
                                { id: "aa", header: "", fillspace: true}
                            ],
                            data: [],
                            on: {
                                "onItemDblClick": function (e, r) {
                                    //$$("ViewScreen").showBatch("search");
                                    $$("SearchBox").setValue($$("efterkontrollTabOneDatatable").data.pull[e.row].taxinrAA);
                                    GetFordonData();
                                }
                            }
                        },
                        { template: "", height: 100 }
                    ]
                }
            }
        },
        {
            header: "Tidigare kontroller",
            body: {
                view: "scrollview",
                id: "scrollview",
                scroll: "y",
                body: {
                    rows: [
                        {
                            height: 40,
                            cols: [
                                {},
                                {
                                    view: "richselect",
                                    id: "TidKontPicker",
                                    label: "Kontrolltyp",
                                    labelWidth: 150,
                                    value: 1, options: [
                                        { id: 1, value: "Planerad fordonskontrol" },
                                        { id: 2, value: "Flygande fordonskontroll" }
                                    ],
                                    width: 400,
                                    on: {
                                        "onChange": function (newValue, oldValue) {
                                            GetSecondDashboardTab(newValue);
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            view: "chart",
                            id: "KravPerYearBarChart",
                            type: "bar",
                            height: 400,
                            barWidth: 20,
                            radius: 2,
                            gradient: "rising",
                            padding: { bottom: 100 },
                            xAxis: {
                                template: "#Krav#"
                            },
                            yAxis: {
                                start: 0,
                                step: 10,
                                end: 100
                            },
                            legend: {
                                values: [{ text: "Två kontroller sedan", color: "#58dccd" }, { text: "Näst senaste", color: "#a7ee70" }, { text: "Senaste", color: "#36abee" }],
                                valign: "middle",
                                align: "right",
                                width: 155,
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
                                { template: "<div style='width:100%;text-align:center'>Efterkontroll (antal bilar)</div>", height: 40 },
                                {
                                    view: "richselect",
                                    id: "ControlSelectorEftNar",
                                    label: "Kontrolldatum",
                                    labelWidth: 150,
                                    value: 1, options: [],
                                    width: 400,
                                    on: {
                                        "onChange": function (newValue, oldValue) {
                                            if (newValue != 1555555) {
                                                UpdatePieChartNarvaro(newValue, $$("TidKontPicker").getValue());
                                                UpdatePieChartEfterkontroll(newValue, $$("TidKontPicker").getValue());
                                            }
                                        }
                                    }
                                },
                                { template: "<div style='width:100%;text-align:center'>Närvaro (antal bilar)</div>", height: 40 }
                            ]
                        },
                        {
                            cols: [
                                {
                                    view: "chart",
                                    type: "pie",
                                    height: 300,
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
                                    type: "pie",
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
                        { template: "", height: 100 }
                    ]
                }
            }

        },
        {
            header: "Medlemmar",
            id: "medlemTab",
            rows: [
                {
                    height: 40,
                    cols: [
                        {
                            view: "richselect",
                            id: "ControlSelector",
                            label: "Kontrolldatum",
                            labelWidth: 150,
                            value: 1, options: []
                        },
                        {
                            view: "text", placeholder: 'Ange medlemsnr', id: "MedlemSearch", width: 200,

                            on: {
                                "onKeyPress": function (code, e) {
                                    if (code == 13) {
                                        GetMedlemDashboard();
                                    }
                                }
                            }

                        },
                        { view: "button", value: "Sök", width: 100, click: "GetMedlemDashboard()" },
                        {},
                        { view: "button", value: "Till PDF", width: 100, click: "PrintToPdf()" },
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
                                        { id: "empty", header: "", fillspace: true }
                                    ],
                                    data: [
                                        { krav: "" }
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

//Da budem siguran da je klik dosao iz skripte. Posto kreiram delete button preko templejta funkcija je izlozena
//napadu pa cu to sprijeciti ovom varijablom.
var DelPlanCon = [];
var DelUsr = 0;
var fpObj = { user: "" }

var SearchTemplate = {
    rows: [
        {
            cols: [
                {},
                { view: "button", value: "Spara", id: "SaveControll", width: 100, disabled: true, click: "SaveControll()" },
                { width: 110 }
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
                                { id: "D", fillspace: true, header: "Tidigare kontroller", template: "<a href='#' onClick='CallGetControl(#S#)'>#D#</a>", }
                            ],
                            select: "row",
                            data: [],
                        }
                    ],
                    gravity: 0.3
                },
                {
                    view: "datatable",
                    id: "KravData",
                    columns: [
                        { id: "krav", fillspace: true, header: "Krav" },
                        {
                            id: "status", width: 193, header: "Status",
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
            height: 40,
            cols: [
                {},
                {
                    view: "button",
                    width: 150,
                    type: "icon",
                    icon: "plus",
                    label: "Lägg till",
                    click: "ShowKravWindow('NEW')",
                    id: "AddNewKrav"
                }
            ]

        },
        {
            view: "datatable",
            id: "KravTableListConfig",
            editable: true,
            editaction: "dblclick",
            columns: [
                { id: "krav", width: 300, header: "Krav" },
                {
                    id: "status", width: 100, header: "Status", editor: "richselect", options: [{ id: 1, value: "Aktivt" }, { id: 2, value: "Inaktivt" }], template: function (ulaz) {
                        if (ulaz.status == 1) {
                            return "Aktivt";
                        } else {
                            return "Inaktivt";
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
                    id: "exkluderadeBilar", fillspace: true, header: "Exkluderade bilar", template: function (ulaz) {
                        if (ulaz.exkluderadeBilar == 1) { return "Inga" }
                        else if (ulaz.exkluderadeBilar == 2) { return "Storbilar" }
                        else if (ulaz.exkluderadeBilar == 3) { return "Executive" }
                        else if (ulaz.exkluderadeBilar == 4) { return "Bilar utan centralen transponder" }
                        else if (ulaz.exkluderadeBilar == 5) { return "Bilar utan OTT-kategori" }
                    }
                }
            ],
            select: "row",
            data: [],
            on: {
                "onItemDblClick": function (id) {
                    if (id.column != "status") {
                        ShowKravWindow(id.row);
                    }
                },
                "onAfterEditStop": function (state, editor) {
                    UpdateKravDirect(state.value, $$("KravTableListConfig").data.pull[editor.row].id)
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
                    label: "Lägg till",
                    click: "ShowUserWindow('NEW')",
                    id: "AddNewUser"
                }
            ]
        },
        {
            view: "datatable",
            id: "UserTableListConfig",
            columns: [
                { id: "user", width: 300, header: "E-post" },
                { id: "level", fillspace: true, header: "Behörighet" },
                {
                    id: "delusrID", width: 50, header: "", template: function (ulaz) {
                        return "<span class='webix_icon fa-trash-o' onclick='DelUsrFun(" + ulaz.id + ")'></span>"
                    }
                }
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
                    label: "Lägg till",
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
                    id: "from", width: 100, header: "Från", template: function (ulaz) {
                        return ulaz.from.toString().substr(0, 10)
                    }
                },
                {
                    id: "to", width: 100, header: "Till", template: function (ulaz) {
                        return ulaz.to.toString().substr(0, 10)
                    }
                },
                {
                    id: "del", width: 40, header: "", template: function (ulaz) {
                        if (ulaz.del == 1) {
                            return "<span class='webix_icon fa-trash-o' onclick='DelPlanConFun(" + ulaz.id + ")' ></span>"
                        } else {
                            return ""
                        }
                    }
                }
            ],
            select: "row",
            data: [],
            on: {
                "onItemDblClick": function (id) {
                    if (id.column != "del") {
                        ShowFordonControllWindow(id.row);
                    }
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
        {
            template: "<img style='height: 95px;width:70px' src=../img/Taxi-Goteborg-Logo-2015.png>", height: 100

        },
        {
            cols: [
                {},

                {
                    view: "form",
                    id: "LoginForm",
                    scroll: false,
                    width: 500,
                    elements: [
                        { view: "text", id: "un", value: '', labelWidth: 150, label: "E-postadress" },
                        { view: "text", type: "password", id: "pass", value: '', labelWidth: 150, label: "Lösenord" },
                        {
                            cols: [
                                { template: "", width: 150 },
                                {},
                                { view: "button", value: "Logga in", type: "form", click: "Login()" },
                                {}
                            ]
                        },
                        { view: "label", label: "<a target='_self' href='#' onClick='ForgetPassword()'>Glömt lösenordet?</a>" },
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
        {
            template: "<img style='height: 95px;width:70px' src=../img/Taxi-Goteborg-Logo-2015.png>", height: 100
        },
        {
            view: "toolbar",
            css: "row",
            cols: [
                {
                    view: "button", id: "DashboradView", width: 100, label: "Dashboard", click: "GetDashboard()", hidden: true,
                },
                {},
                {
                    view: "text", placeholder: 'Ange taxinr (tex 123)', id: "SearchBox", width: 200,
                    on: {
                        "onKeyPress": function (code, e) {
                            if (code == 13) {
                                GetFordonData();
                            }
                        }
                    }
                },

                { view: "button", value: "Sök", width: 100, click: "GetFordonData()" },

                {},
                {
                    view: "menu", id: "ConfigButton", width: 100, hidden: true, height: 29,
                    data: [
                        {
                            id: "KonfigureraMenu", value: "Inställningar",
                            config: {
                                width: 200,

                                on: {
                                    onItemClick: function (id) {
                                        ShowConfig(id);
                                    }
                                }
                            },
                            submenu: [
                                { id: "KonfigureraKrav", value: "Krav" },
                                { id: "KonfigureraAnvandare", value: "Användare" },
                                { id: "KonfigureraFordonskontroll", value: "Fordonskontroll" },
                                { id: "ChangePassword", value: "Ändra lösenord" }
                            ]
                        }
                    ]
                },
                { view: "button", value: "Logga ut", width: 100, click: "Logout()" },
            ]
        },
        TemplateController

    ]
}

var CodeTemplate = {
    rows: [
        {
            template: "<img style='height: 95px;width:70px' src=../img/Taxi-Goteborg-Logo-2015.png>", height: 100
        },
        {
            template: "En säkerhetskod har skickats till din e-postadress.", height: 40
        },
        {
            cols: [
                {
                    width: 500,
                    rows: [
                        {
                            view: "text", placeholder: 'Ange din säkerhetskod', id: "CodeBox", width: 200,
                            on: {
                                "onKeyPress": function (code, e) {
                                    if (code == 13) {
                                        ChangeForgottenPass();
                                    }
                                }
                            }
                        },
                        { view: "button", value: "Bekräfta", width: 100, click: "ChangeForgottenPass()" }
                    ]
                },
                {}
            ]
        }

    ]
}

var NewPassTemplate = {
    rows: [
        {
            template: "<img style='height: 95px;width:70px' src=../img/Taxi-Goteborg-Logo-2015.png>", height: 100
        },
        {
            template: "Välj ett nytt lösenord", height: 35
        },
        {
            cols: [
                { view: "text", type: "password", placeholder: 'Nytt lösenord', id: "cnPassA", width: 200 },
                {}
            ]
        },
        {
            cols: [
                { view: "text", type: "password", placeholder: 'Upprepa nytt lösenord', id: "cnPassB", width: 200 },
                {}
            ]
        },
        {
            cols: [
                { view: "button", value: "Bekräfta", width: 200, click: "CPFinalStep()" },
                {}
            ]
        }
    ]
}

var ViewController = {
    id: "ViewScreen",
    visibleBatch: "login",
    type: "space",
    rows: [
        { rows: [{ animate: false, cells: [LoginTemplate] }], batch: "login" },
        { rows: [{ animate: false, cells: [LoggedTemplate] }], batch: "logged" },
        { rows: [{ animate: false, cells: [CodeTemplate] }], batch: "code" },
        { rows: [{ animate: false, cells: [NewPassTemplate] }], batch: "newpass" }
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
    GetFirstDashboardTab();
    GetSecondDashboardTab(1);
    GetThirdDashboardTab();
    $$("TidKontPicker").setValue(1);
    $$("TidKontPicker").refresh();
    CalculateForFlygandeKontroll();

}

function GetFirstDashboardTab() {
    KravTodayFirstTab();
    EfterkontrollTabOneDatatable();
}

function KravTodayFirstTab() {
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
}
function EfterkontrollTabOneDatatable() {
    //Get barchart data latest status
    jQuery.ajax({
        url: 'api/dashboard/efterkontrolltabone/',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({
            User: window.activeUser
        }),
        //If success update webix. Data is Krav ID from database that was updated or created
        success: function (data) {
            $$("efterkontrollTabOneDatatable").clearAll();
            $$("efterkontrollTabOneDatatable").parse(data);
            $$("efterkontrollTabOneDatatable").refresh();
        }
    })
}



function GetSecondDashboardTab(id) {
    $$("KravPerYearBarChart").clearAll();
    $$("narvaro").clearAll();
    $$("efterkontroll").clearAll();

    //Update chart
    UpdateBarChartPlanneradeKontrol(id);

    //Get Piechart data for efterkontroll
    UpdatePieChartEfterkontroll(0, id);

    //Get Piechart data for Narvaro
    UpdatePieChartNarvaro(0, id);
    //Get RichSelect data
    UpdateRichSelectWithControlls(id);
}
function UpdateRichSelectWithControlls(id) {
    //Get Controll List for Medlemmar tab
    jQuery.ajax({
        url: 'api/dashboard/kontrollistonrichselectatdashboard/',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({
            User: window.activeUser,
            idCall: id
        }),
        //If success update webix. Data is Krav ID from database that was updated or created
        success: function (data) {

            var trData = [{ id: "1555555", value: "Välj" }]

            for (i = 0; i < data.length; i++) {
                trData.push({
                    id: data[i].id,
                    value: data[i].value
                })
            }
            $$("ControlSelectorEftNar").getPopup().getList().clearAll();
            $$("ControlSelectorEftNar").getPopup().getList().parse(trData);
            $$("ControlSelectorEftNar").refresh();
            $$("ControlSelectorEftNar").setValue(1555555);
            $$("ControlSelectorEftNar").refresh();
        }
    })
}
function UpdateBarChartPlanneradeKontrol(id) {
    //Get barchart data latest big controlls
    jQuery.ajax({
        url: 'api/dashboard/KravPerYearBarChart/',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({
            User: window.activeUser,
            idCall: "",
            izvor: id
        }),
        //If success update webix. Data is Krav ID from database that was updated or created
        success: function (data) {
            var transformedData = KravPerYearBarChartData(data);

            $$("KravPerYearBarChart").clearAll();
            $$("KravPerYearBarChart").parse(transformedData);
            $$("KravPerYearBarChart").refresh();
        }
    })
}
function UpdatePieChartNarvaro(idNar, izvor) {

    jQuery.ajax({
        url: 'api/dashboard/Narvaro/',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({
            User: window.activeUser,
            idCall: idNar,
            izvor: izvor
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
}
function UpdatePieChartEfterkontroll(idEft, izvor) {
    jQuery.ajax({
        url: 'api/dashboard/Efterkontroll/',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({
            User: window.activeUser,
            idCall: idEft,
            izvor: izvor
        }),
        //If success update webix. Data is Krav ID from database that was updated or created
        success: function (data) {
            var ekData = [
                { andel: data[0].ingen, efterKontrolTyp: "Ingen", color: "#86EF36" },
                { andel: data[0].senare, efterKontrolTyp: "Inom kort", color: "#ee9e36" },
                { andel: data[0].snarast, efterKontrolTyp: "Snarast", color: "#ee3639" }
            ];
            $$("efterkontroll").clearAll();
            $$("efterkontroll").parse(ekData);
            $$("efterkontroll").refresh();
        }
    })
}

function GetThirdDashboardTab(id) {
    //Get Controll List for Medlemmar tab
    jQuery.ajax({
        url: 'api/dashboard/kontrollistonrichselectatdashboard/',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({
            User: window.activeUser,
            idCall: "3",
            izvor: ""
        }),
        //If success update webix. Data is Krav ID from database that was updated or created
        success: function (data) {

            var trData = [{ id: "1555555", value: "Välj" }]

            for (i = 0; i < data.length; i++) {
                trData.push({
                    id: data[i].id,
                    value: data[i].value
                })
            }
            $$("ControlSelector").getPopup().getList().clearAll();
            $$("ControlSelector").getPopup().getList().parse(trData);
            $$("ControlSelector").refresh();
            $$("ControlSelector").setValue(1555555);
            $$("ControlSelector").refresh();
        }
    })
}

function CalculateForFlygandeKontroll() {
    jQuery.ajax({
        url: 'api/dashboard/flygandekontrollcalc/',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        //If success update webix. Data is Krav ID from database that was updated or created
        success: function () {
            //nista ne vraca
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
            DelPlanCon = data;
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
        GetControl($$("SearchBox").getValue(), "New"); //Controll details. Latest by default.
    } else {
        //Inform user to enter TaxiNr
        $$("loadtextwin").hide();
        webix.message({ type: "error", text: "Ange ett giltigt taxinr!" })
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

function GetControl(taxiNr, ControlId) {
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
            user: window.activeUser
        }),
        dataType: 'json',
        //If success update webix. Data is Krav ID from database that was updated or created
        success: function (data) {
            if (data.length == 0) {
                data.push({
                    arsmodell: "",
                    fabrikat: "TaxiNr Saknas",
                    id: 1,
                    krav: "",
                    medlem: 0,
                    regNr: "",
                    status: 0,
                    taxiNr: ""
                })
            }
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

            if (data[0].fabrikat == "TaxiNr Saknas") {
                $$("SaveControll").disable();
            }
            $$("loadtextwin").hide();

        }
    })
}

function GetMedlemDashboard() {
    $$("loadtextwin").show();
    var plControll = $$("ControlSelector").getValue();
    var selMedlem = $$("MedlemSearch").getValue();

    if (plControll == 1555555 || plControll.length == 0 || selMedlem.length != 5) {
        webix.message({ type: "error", text: "Välj kontrolldatum och ange ett giltigt medlemsnr!" });
        $$("loadtextwin").hide();
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
            Medlem: selMedlem
        }),

        success: function (data) {

            var transformedData = MedlemTabellData(data);
            var transformedColumns = MedlemTabellColumns(transformedData[0], data[0].medlem);


            $$("medlemDatatable").config.columns = transformedColumns;
            $$("medlemDatatable").refreshColumns();
            $$("medlemDatatable").clearAll();
            $$("medlemDatatable").parse(transformedData);
            $$("medlemDatatable").refresh();
            $$("loadtextwin").hide();
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
                    webix.message({ type: "error", message: "Kontrolldata sparades inte!" })
                } else {
                    //jeste snimio. TBD obavjesti korisnika
                    webix.message("Kontrolldata sparad!")
                }
                CallGetControl(data); //Recalculate all TBD
                $$("savetextwin").hide();

            }
        })
    } else {
        webix.message({ type: "error", text: "Kontrolldata sparades inte. Kontrollera att taxinr existerar i fordonregistret!", expire: 5000 })
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
                webix.message({ type: "error", text: "Kravet sparades inte!" })
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

    if ($$("UserA").getValue().search("@taxigoteborg.se") > 0) {
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
                    webix.message({ type: "error", text: "Användaren sparades inte!" })
                }
            }
        })
    } else {
        webix.message({ type: "error", text: "Only taxigoteborg.se users allowed!" })
    }

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
                webix.message({ type: "error", text: "Kontrollen sparades inte!" })
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
    DatatableData.push({ HeadCol: "Regnr", DataCol: data.regNr })
    DatatableData.push({ HeadCol: "Årsmodell", DataCol: data.arsmodell })
    DatatableData.push({ HeadCol: "Taxinr", DataCol: data.taxiNr })
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
    $$("UserB").setValue("User");

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
            var dateFrom = value.from.substr(0, 10);
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
            case "Regnr":
                RegNr = value.DataCol;
                break;
            case "Taxinr":
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
        webix.message({ type: "error", text: "Ange användarnamn!" })
        return;
    } else if (pass.length == 0) {
        webix.message({ type: "error", text: "Ange lösenord!" })
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
                webix.message({ type: "error", text: "Fel användarnamn eller lösenord!" })
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

        for (var j = 0; j < uniqueTaxinr.length; j++) {
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
        { id: "Krav", header: fullMedlem, width: 200 }
    ]

    for (var i = 0; i < keys.length; i++) {
        if (keys[i] != "Krav") {
            returnColumns.push({
                id: keys[i],
                header: keys[i],
                width: 100
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

function DelPlanConFun(id) {
    var isThere = false;
    if (!confirm("Är du säker på att du vill radera?")) {
        return;
    }

    for (var i = 0; i < DelPlanCon.length; i++) {
        if (DelPlanCon[i].id == id && DelPlanCon[i].del == "1") {
            isThere = true;
        }
    }
    if (isThere) {
        jQuery.ajax({
            url: 'api/config/DelCon/',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({
                User: window.activeUser,
                idCall: id
            }),
            //If success update webix. Data is Krav ID from database that was updated or created
            success: function (data) {
                webix.message("Kontroll raderad!");
                GetFC();
            }
        })
    }

}

function DelUsrFun(id) {
    var isThere = false;
    $$("delUsrWind").show();

    var tempVarAA = $$("UserTableListConfig").data.pull;

    ArnApp.each($$("UserTableListConfig").data.pull, function (index, value) {
        if (value.id == id) {
            DelUsr = value.user;
        }
    })
}

function DelUsrFunCont() {
    if (DelUsr != 0) {
        jQuery.ajax({
            url: 'api/config/deluser/',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({
                User: window.activeUser,
                idCall: DelUsr,
                pass: $$("lsoDelUsr").getValue()
            }),
            //If success update webix. Data is Krav ID from database that was updated or created
            success: function (data) {
                GetUser();
            }
        })
    }
    $$("delUsrWind").hide();
    DelUsr = 0;
}

function SendMainChangePassword() {

    var chCurrent = $$("chCurrent").getValue();
    var chNewA = $$("chNewA").getValue();
    var chNewB = $$("chNewB").getValue();

    if (chCurrent.length <= 3) {
        webix.message({ type: "error", text: "Ange ditt nuvarande lösenord!" });
        return;
    }

    if (chNewA.length <= 3 || chNewB.length <= 3) {
        webix.message({ type: "error", text: "Ditt nya lösenord innehåller för få tecken!" });
        return;
    }

    if (chNewA != chNewB) {
        webix.message({ type: "error", text: "Lösenorden matchar inte!" });
        return;
    }

    if (chCurrent == chNewA) {
        webix.message({ type: "error", text: "Lösenord kan inte vara samma!" });
        return;
    }

    jQuery.ajax({
        url: 'api/config/chpass/',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({
            User: window.activeUser,
            pass: chCurrent,
            passA: chNewA,
            passB: chNewB
        }),
        //If success update webix. Data is Krav ID from database that was updated or created
        success: function (data) {
            if (data == 0) {
                //User not logged
                location.reload();
                return;
            } else if (data == 1) {
                //User not exists
                location.reload();
                return;
            } else if (data == 2) {
                //Password not matching
                webix.message({ type: "error", text: "Ange rätt lösenord!" });
                return;
            }
            webix.message("Lösenordet har ändrats!");
            $$("changePassWindow").hide();
            //Config button was pressed in order to change password. Show Krav view to the user
            ShowConfig("KonfigureraKrav");
        }
    })
    return;
}

function SendMainForgetPassword() {
    var frUN = $$("frUN").getValue();
    $$("btn_SendMainForgetPass").disable();
    if (frUN.search("@taxigoteborg.se") > 0) {
        //Check if user exists
        jQuery.ajax({
            url: 'api/config/frgpass/',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({
                User: window.activeUser,
                idCall: frUN
            }),
            //If success update webix. Data is Krav ID from database that was updated or created
            success: function (data) {
                if (data[0].user == "1") {
                    webix.message({ type: "error", text: "Användaren saknas!" })
                    $$("btn_SendMainForgetPass").enable();
                    return;
                } else {
                    fpObj.user = data[0].user;
                    $$("ViewScreen").showBatch("code");
                    $$("btn_SendMainForgetPass").enable();
                    $$('forgetPassWindow').hide();
                    console.log(fpObj)
                }
            }
        })
    } else {
        webix.message({ type: "error", text: "Kontrollera din e-postadress och försök igen!" });
        $$("btn_SendMainForgetPass").enable();
    }
}

function ChangeForgottenPass() {
    CodeBox = $$("CodeBox").getValue();
    if (CodeBox.length == 6) {
        jQuery.ajax({
            url: 'api/config/checkcode/',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({
                User: fpObj.user,
                idCall: CodeBox
            }),
            success: function (data) {
                if (data) {
                    $$("ViewScreen").showBatch("newpass");
                } else {
                    webix.message({ type: "error", text: "Fel kod!" });
                    location.reload();
                }
            }
        })
    }
}

function CPFinalStep() {
    cnPassA = $$("cnPassA").getValue();
    cnPassB = $$("cnPassB").getValue();

    if (cnPassA.length <= 3 || cnPassB.length <= 3) {
        webix.message({ type: "error", text: "Ditt nya lösenord innehåller för få tecken!" })
        return;
    }

    if (cnPassA != cnPassB) {
        webix.message({ type: "error", text: "Lösenorden matchar inte!" })
        return;
    }

    jQuery.ajax({
        url: 'api/config/savepassforg/',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({
            User: fpObj.user,
            idCall: cnPassA
        }),
        success: function (data) {
            webix.message("Lösenord ändrat!");
            $$("ViewScreen").showBatch("login");
        }
    })

}

function UpdateKravDirect(value, id) {
    if (value == 2) { value = 0 }
    jQuery.ajax({
        url: 'api/config/updatekravdirect/',
        type: 'PUT',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({
            id: id,
            Krav: "",
            Status: value,
            Efterkontroll: "",
            ExkluderadeBilar: "",
            Check: true,
            User: window.activeUser
        }),
        success: function (data) {
            webix.message("Uppdaterad!");
        }
    })

}