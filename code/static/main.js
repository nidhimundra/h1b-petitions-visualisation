/**
 * Created by nidhi on 17/04/17.
 */

// Data File Details
var filename = "important_small1";
// var filename = "final_output1";
// var filename = "final_output";
var extension = ".csv";

var fullData = [];
var ndx1 = {};
var all1 = {};

var ndx2 = {};
var all2 = {};

// Geo-Spatial Data
var geoSpatialKey = "TOTAL";

var colorScale = d3.scale.category10();

var typeDimension = null;

var salaryRangeDimension = null;

var caseStatusDimension = null;

function handleGeoSpatialButtonClick(geoSpatialRadioButton) {
    switch (geoSpatialRadioButton.id) {
        case "geo-spatial-total":
            caseStatusDimension.filter(null);
            break;
        case "geo-spatial-withdrawn":
            caseStatusDimension.filter(["CERTIFIED-WITHDRAWN", "WITHDRAWN"]);
            break;
        case "geo-spatial-certified":
            caseStatusDimension.filterExact("CERTIFIED");
            break;
        case "geo-spatial-denied":
            caseStatusDimension.filterExact("DENIED");
            break;
    }

    drawGeoSpatialMap(ndx1);
    dc.renderAll();
}

function filterPositionType(positionType) {
    switch (positionType.id) {
        case "full_time":
            typeDimension.filterExact('Y');
            break;
        case "non_full_time":
            typeDimension.filterExact('N');
            break;
    }

    dc.redrawAll();
}

$(document).ready(function () {

    $('#price-range').slider().on('slideStop', function (event) {
        salaryRangeDimension.filterRange(event.value);
        dc.redrawAll();

    });

    queue()
        .defer(d3.json, "/h1b_db/h1b_collection")
        .await(makeGraphs);

    function makeGraphs(error, data) {
        data.forEach(function (x) {
            for (var key in x) {
                if (key in ["ID", "PREVAILING_WAGE", "YEAR", "LON", "LAT"]) {
                    x[key] = +x[key];
                }
            }
        });

        // fullData = data;
        // //Create a Crossfilter instance
        // ndx = crossfilter(crimeRecords);
        //
        // d3.csv(filename + extension, function (error, data) {
        //     data.forEach(function (x) {
        //         for (var key in x) {
        //             if (key in ["ID", "PREVAILING_WAGE", "YEAR", "LON", "LAT"]) {
        //                 x[key] = +x[key];
        //             }
        //         }
        //     });

        fullData = data;
        ndx1 = crossfilter(fullData);
        all1 = ndx1.groupAll();
        ndx2 = crossfilter(fullData);
        all2 = ndx2.groupAll();

        dc.dataCount(".dc-data-count")
            .dimension(ndx1)
            .group(all1);

        typeDimension = ndx2.dimension(function (d) {
            return d["FULL_TIME_POSITION"];
        });

        salaryRangeDimension = ndx2.dimension(function (d) {
            return d["PREVAILING_WAGE"];
        });

        caseStatusDimension = ndx1.dimension(function (d) {
            return d["CASE_STATUS"];
        });

        drawGeoSpatialMap(ndx1);
        drawPieChart1(ndx1, all1);
        drawScatterPlot1(ndx1);
        drawPieChart2(ndx2, all2);
        drawPieChart3(ndx2, all2);
        drawSelectOption(ndx2);
        drawRowChart(ndx2);
        drawBubbleChart(ndx2);
        drawDataTable(ndx2);

        dc.renderAll();
    };
});