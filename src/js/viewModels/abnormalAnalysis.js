/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'jet-composites/my-pie/loader', 'jet-composites/my-bar/loader', 'jet-composites/my-line/loader', 'ojs/ojcollectiontabledatasource', 'ojs/ojtable', 'ojs/ojarraydataprovider', 'ojs/ojlabel', 'jet-composites/my-funnel/loader', 'ojs/ojbutton', 'ojs/ojdialog', 'ojs/ojmoduleanimations'],
        function (oj, ko, $) {

            function VehicleAnalysisViewModel() {
                var self = this;
                self.dataurlarr = ko.observableArray();
                self.drillingTitle = ko.observable("表格");
                self.dataurlarr.push({dataurl: 'js/data/abnormal/vehicleAndPersonData.json', chartname: '长期不出村分析'});
                self.dataurlarr2 = ko.observableArray();
                self.dataurlarr2.push({dataurl: 'js/data/abnormal/arrearageData.json', chartname: '长期欠费分析'});
                //self.dataurlarr3 = ko.observableArray();
                //self.dataurlarr3.push({dataurl: 'js/data/vehicle/EntryTop10Data.json', chartname: '上一日出入TOP10'});
//                self.dataurlarr3 = ko.observableArray();
//                self.dataurlarr3.push({dataurl: 'js/data/abnormal/accessCardData.json', chartname: '门禁卡重号分析'});
                self.abnChartName = ko.observable('门禁卡重号分析');
                self.seriesValue = ko.observableArray();
                self.groupsValue = ko.observableArray();
                self.serToolValue = ko.observable();
                self.valToolValue = ko.observable();
                self.groupToolValue = ko.observable();
                self.datasource = ko.observable();

                $.ajax({
                    type: "GET",
                    url: 'js/data/abnormal/accessCardData.json',
                    dataType: "json",
                    success: function (resp) {
                        self.seriesValue(resp.series);
                        self.groupsValue(resp.groups);
                        self.serToolValue(resp.seriesTooltip);
                        self.valToolValue(resp.valueTooltip);
                        self.groupToolValue(resp.groupTooltip);
                    }
                });

                var deptArray = [
                    {"ICID": 11, "number": "203", "names": "Tom", "catagory": "F10211"}
                ];
                self.DataObservableArray = ko.observableArray(deptArray);
                self.dataprovider = new oj.ArrayDataProvider(self.DataObservableArray, {idAttribute: 'ICID'});

                self.abnormalKeyDrillDown = function (event) {
                    self.DataObservableArray.removeAll();
                    console.log(event.detail);
                    var jsonData;
                    switch (event.detail.group) {
                        case "FFFF":
                            jsonData = 'js/data/abnormal/drilling/FFFFData.json';
                            break;
                        case "未知卡号(Unknown)":
                            jsonData = 'js/data/abnormal/drilling/UnknownData.json';
                            break;
                        case "无卡号(NULL)":
                            jsonData = 'js/data/abnormal/drilling/NULLData.json';
                            break;
                        default:
                            jsonData = 'js/data/abnormal/drilling/FFFFData.json';
                            break;
                    }
                    self.drillingTitle("详细列表");

                    $.getJSON(jsonData,
                            function (resp) {
                                self.DataObservableArray(resp.arrayData);
                                document.querySelector('#popDrillingChart').open();
                            });
                };
                // Below are a subset of the ViewModel methods invoked by the ojModule binding
                // Please reference the ojModule jsDoc for additional available methods.

                /**
                 * Optional ViewModel method invoked when this ViewModel is about to be
                 * used for the View transition.  The application can put data fetch logic
                 * here that can return a Promise which will delay the handleAttached function
                 * call below until the Promise is resolved.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
                 * the promise is resolved
                 */
                self.handleActivated = function (info) {
                    // Implement if needed
                };
                /**
                 * Optional ViewModel method invoked after the View is inserted into the
                 * document DOM.  The application can put logic that requires the DOM being
                 * attached here.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
                 */
                self.handleAttached = function (info) {

                };
                /**
                 * Optional ViewModel method invoked after the bindings are applied on this View. 
                 * If the current View is retrieved from cache, the bindings will not be re-applied
                 * and this callback will not be invoked.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 */
                self.handleBindingsApplied = function (info) {
                    // Implement if needed
                };
                /*
                 * Optional ViewModel method invoked after the View is removed from the
                 * document DOM.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
                 */
                self.handleDetached = function (info) {
                    // Implement if needed
                };
            }

            /*
             * Returns a constructor for the ViewModel so that the ViewModel is constructed
             * each time the view is displayed.  Return an instance of the ViewModel if
             * only one instance of the ViewModel is needed.
             */
            return new VehicleAnalysisViewModel();
        }
);
