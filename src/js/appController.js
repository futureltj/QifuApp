/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource', 'ojs/ojdialog',
    'ojs/ojoffcanvas', 'ojs/ojrouter', 'ojs/ojlistview', 'ojs/ojarraydataprovider', 'ojs/ojjsontreedatasource'],
        function (oj, ko) {
            function ControllerViewModel() {
                var self = this;

                // Media queries for repsonsive layouts
                var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
                self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
                var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
                self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

                self.fontColor = ko.observable('"color":"red"');

                self.isLoggedIn = ko.observable(false);
                self.AlertTitle = ko.observable("通知列表");
                // Router setup
                self.router = oj.Router.rootInstance;
                self.router.configure({
                    'login': {label: 'Login', isDefault: true},
                    'vehicleAnalysis': {label: 'VehicleAnalysis'},
                    'personnelAnalysis': {label: 'PersonnelAnalysis'},
                    'incomeAndExpenditureAnalysis': {label: 'IncomeAndExpenditureAnalysis'},
                    'abnormalAnalysis': {label: 'AbnormalAnalysis'}
                });
                oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();



                // Navigation setup
                var navData = [
                    {name: '车辆分析', id: 'vehicleAnalysis',
                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24'},
                    {name: '人员分析', id: 'personnelAnalysis',
                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24'},
                    {name: '收入支出分析', id: 'incomeAndExpenditureAnalysis',
                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24'},
                    {name: '异常分析', id: 'abnormalAnalysis',
                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24'},
                ];
                self.navDataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});

                // Drawer
                // Close offcanvas on medium and larger screens
                self.mdScreen.subscribe(function () {
                    oj.OffcanvasUtils.close(self.drawerParams);
                });

                self.drawerParams = {
                    displayMode: 'push',
                    selector: '#navDrawer',
                    content: '#pageContent'
                };

                // Called by navigation drawer toggle button and after selection of nav drawer item
                self.toggleDrawer = function () {
                    return oj.OffcanvasUtils.toggle(self.drawerParams);
                }

//                self.dataSource = ko.observable();
                self.tempData = ko.observableArray([{
                        "name": "频繁出入",
                        "time": "14:20:10",
                        "info": "粤A***0Z",
                        "customer_number": "1543231231",
                        "sup_number": "1543231232"
                    }]);
                this.alertDataProvider = new oj.ArrayDataProvider(self.tempData, {'idAttribute': 'name'});
//                self.alertDataProvider = new oj.ArrayDataProvider(self.tempData(),
//                        {keys: self.tempData().map(function (value) {
//                                return value.name;
//                            })});

                self.priStyle = ko.computed(function (data) {
                    return {"color": data};
                });

                self.popAlertWindow = function () {
                    $.getJSON("js/data/dashAlertList/alertData.json",
                            function (data)
                            {


//                                self.dataSource(new oj.JsonTreeDataSource(data.arrayData));
                                self.tempData(data.arrayData);
//                                self.alertDataProvider = new oj.ArrayDataProvider(self.tempData(),
//                                        {keys: self.tempData().map(function (value) {
//                                                return value.name;
//                                            })});
                                document.querySelector('#popAlertChart').open();
                            }
                    );
                }
                // Add a close listener so we can move focus back to the toggle button when the drawer closes
                $("#navDrawer").on("ojclose", function () {
                    $('#drawerToggleButton').focus();
                });

                // Header
                // Application Name used in Branding Area

                // User Info used in Global Navigation area
                self.userLogin = ko.observable("李雷");
                self.menuItemAction = function (event) {
                    self.isLoggedIn(false);
                    oj.Router.rootInstance.go('login');
                };
                // Footer
                function footerLink(name, id, linkTarget) {
                    this.name = name;
                    this.linkId = id;
                    this.linkTarget = linkTarget;
                }
                self.footerLinks = ko.observableArray([
                    /*
                     new footerLink('About Oracle', 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about'),
                     new footerLink('Contact Us', 'contactUs', 'http://www.oracle.com/us/corporate/contact/index.html'),
                     new footerLink('Legal Notices', 'legalNotices', 'http://www.oracle.com/us/legal/index.html'),
                     new footerLink('Terms Of Use', 'termsOfUse', 'http://www.oracle.com/us/legal/terms/index.html'),
                     new footerLink('Your Privacy Rights', 'yourPrivacyRights', 'http://www.oracle.com/us/legal/privacy/index.html')
                     */
                ]);
            }

            return new ControllerViewModel();
        }
);
