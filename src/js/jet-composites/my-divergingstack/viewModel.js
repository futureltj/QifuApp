/**
 Copyright (c) 2015, 2017, Oracle and/or its affiliates.
 The Universal Permissive License (UPL), Version 1.0
 */
define(
        ['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojchart', 'ojs/ojlegend', 'ojs/ojbutton'], function (oj, ko, $) {
    'use strict';

    function ExampleComponentModel(context) {
        var self = this;
        self.composite = context.element;
        //Example observable
        self.chartName = ko.observable('');
        self.dataUrl = ko.observable('dataUrl');
        self.seriesValue = ko.observableArray();
        self.groupsValue = ko.observableArray();

        self.stackValueChart = ko.observable('on');
        self.legendSections = [
            {title: "分类", items: [
                    {color: "#ed6647", text: "支出", id: "Cost"},
                    {color: "#267db3", text: "收入", id: "Revenue"}
                ]},
            {title: "月", items: [
                    {color: '#666666', text: "6月", id: "6"},
                    {color: '#808080', text: "7月", id: "7"},
                    {color: '#999999', text: "8月", id: "8"},
                    {color: '#99999f', text: "9月", id: "9"}
                ]}
        ];

        context.props.then(function (propertyMap) {
            //Store a reference to the properties for any later use
            self.properties = propertyMap;
            if (self.properties.chartName != undefined) {
                self.chartName(self.properties.chartName)
            }
            if (self.properties.dataUrl != undefined) {
                console.log('3333:' + self.properties.dataUrl);
                self.dataUrl(self.properties.dataUrl);
                $.getJSON(self.properties.dataUrl, function (data) {
                    self.seriesValue(data.series)
                    self.groupsValue(data.groups)

//                    self.legendSections = [
//                        {title: "分类", items: [
//                                {color: "#ed6647", text: "支出", id: "Cost"},
//                                {color: "#267db3", text: "收入", id: "Revenue"}
//                            ]},
//                        {title: "月", items: [
//                                {color: '#666666', text: "6月", id: "6"},
//                                {color: '#808080', text: "7月", id: "7"},
//                                {color: '#999999', text: "8月", id: "8"}
//                            ]}
//                    ];
                });
            }
            //Parse your component properties here 

        });


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