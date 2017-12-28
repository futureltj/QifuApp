/**
 Copyright (c) 2015, 2017, Oracle and/or its affiliates.
 The Universal Permissive License (UPL), Version 1.0
 */
define(
        ['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojchart', 'ojs/ojlabel', 'ojs/ojcollectiontabledatasource', 'ojs/ojtable', 'ojs/ojarraydataprovider', 'ojs/ojbutton', 'ojs/ojdialog', 'ojs/ojmoduleanimations'], function (oj, ko, $) {
    'use strict';

    function ExampleComponentModel(context) {
        var self = this;
        self.composite = context.element;
        //Example observable
        self.chartName = ko.observable('');
        self.dataUrl = ko.observable('dataUrl');
        self.seriesValue = ko.observableArray();
        self.groupsValue = ko.observableArray();

        self.stackValue = ko.observable('off');
        self.orientationValue = ko.observable('vertical');

        self.serToolValue = ko.observable();
        self.valToolValue = ko.observable();
        self.groupToolValue = ko.observable();

        context.props.then(function (propertyMap) {
            //Store a reference to the properties for any later use
            self.properties = propertyMap;
            if (self.properties.chartName != undefined) {
                self.chartName(self.properties.chartName)
            }

            if (self.properties.stackValue != undefined) {
                self.stackValue(self.properties.stackValue)
            }
            if (self.properties.orientationValue != undefined) {
                self.orientationValue(self.properties.orientationValue)
            }

            if (self.properties.dataUrl != undefined) {
                console.log('3333:' + self.properties.dataUrl);
                self.dataUrl(self.properties.dataUrl);

                $.getJSON(self.properties.dataUrl, function (data) {
                    self.seriesValue(data.series);
                    self.serToolValue(data.seriesTooltip);
                    self.valToolValue(data.valueTooltip);
                    self.groupToolValue(data.groupTooltip);
                });
            }
            //Parse your component properties here 

        });
        self.drillingTitle = ko.observable("表格");
        var deptArray = [
            {"ICID": 11, "number": "203", "names": "Tom", "catagory": "F10211"}
        ];
        self.DataObservableArray = ko.observableArray(deptArray);
        self.dataprovider = new oj.ArrayDataProvider(self.DataObservableArray, {idAttribute: 'ICID'});

        self.abnormalKeyDrillDown = function (event) {
            self.DataObservableArray.removeAll();
            console.log(event.detail);
            var jsonData;
            switch (event.detail.series) {
                case "3（含）个月以上":
                    jsonData = 'js/data/abnormal/drilling2/m3.json';
                    break;
                case "6（含）个月以上":
                    jsonData = 'js/data/abnormal/drilling2/m6.json';
                    break;
                case "12（含）个月以上":
                    jsonData = 'js/data/abnormal/drilling2/m12.json';
                    break;
                default:
                    jsonData = 'js/data/abnormal/drilling2/m3.json';
                    break;
            }
            self.drillingTitle("详细列表");

            $.getJSON(jsonData,
                    function (resp) {
                        self.DataObservableArray(resp.arrayData);
                        document.querySelector('#popDrillingChart2').open();
                    });
        };

    }
    ;

    //Lifecycle methods - uncomment and implement if necessary 
    //ExampleComponentModel.prototype.activated = function(context){
    //};

    //ExampleComponentModel.prototype.attached = function(context){
    //};

    //ExampleComponentModel.prototype.bindingsApplied = function(context){
    //};

    //ExampleComponentModel.prototype.detached = function(context){
    //};

    return ExampleComponentModel;
});