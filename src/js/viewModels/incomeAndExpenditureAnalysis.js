/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * incomeAndExpenditureAnalysis module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'jet-composites/my-pie/loader', 'jet-composites/my-bar/loader', 'jet-composites/my-line/loader', 'jet-composites/my-lineArea/loader','jet-composites/my-polarchart/loader'],
        function (oj, ko, $) {
            /**
             * The view model for the main content view template
             */
            function incomeAndExpenditureAnalysisContentViewModel() {
                var self = this;

                self.dataurlarr1 = ko.observableArray();
                self.dataurlarr1.push({dataurl: 'js/data/IncomeAndEx/totalIncome.json', chartname: '上月收入分析'});

                self.dataurlarr2 = ko.observableArray();
                self.dataurlarr2.push({dataurl: 'js/data/IncomeAndEx/totalExpend.json', chartname: '上月支出分析'});

                //self.dataurlarr5 = ko.observableArray();
                //self.dataurlarr5.push({dataurl: 'js/data/IncomeAndEx/IncomeAndExTrend.json', chartname: '上月收入与支出分析'});

                self.dataurlarr6 = ko.observableArray();
                self.dataurlarr6.push({dataurl: 'js/data/IncomeAndEx/DivergingIncomeAndExp.json', chartname: '收入和支出对比分析(按月)'});

                self.dataurlarr4 = ko.observableArray();
                self.dataurlarr4.push({dataurl: 'js/data/IncomeAndEx/monthylyBill.json', chartname: '水电损耗分析(按月)'});

                self.dataurlarr3 = ko.observableArray();
                self.dataurlarr3.push({dataurl: 'js/data/IncomeAndEx/cat_polar.json', chartname: '上月各小区收入和支出对比分析'});



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
                    // Implement if needed
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

            return new incomeAndExpenditureAnalysisContentViewModel;
        });
