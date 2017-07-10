/**
 * Created by nidhi on 07/05/17.
 */

function drawBubbleChart(ndx) {

    var chart = dc.bubbleChart('#bubble-chart');

    var industries = ndx.dimension(function (d) {
        return d["JOB_TITLE"];
    });

    var statsByIndustries = industries.group().reduce(
        function (p, v) {
            p.count += 1;
            p.sum += parseInt(v["PREVAILING_WAGE"]);
            p.avg = parseInt(p.sum / p.count);
            p.max = parseInt(v["PREVAILING_WAGE"]) > p.max ? parseInt(v["PREVAILING_WAGE"]) : p.max;
            return p;
        },
        //remove
        function (p, v) {
            p.count--;
            p.sum -= parseInt(v["PREVAILING_WAGE"]);
            p.avg = parseInt(p.sum / p.count);
            p.max = parseInt(v["PREVAILING_WAGE"]) > p.max ? parseInt(v["PREVAILING_WAGE"]) : p.max;
            return p;
        },
        //init
        function () {
            return {count: 0, avg: 0, sum: 0, max: 0};
        });

    chart.width(400)
        .height(250)
        .margins({top: 10, right: 50, bottom: 30, left: 60})
        .dimension(industries)
        .group(statsByIndustries)
        .colors(d3.scale.category20())
        .keyAccessor(function (p) {
            return p.value.avg;
        })
        .valueAccessor(function (p) {
            return p.value.count;
        })
        .radiusValueAccessor(function (p) {
            return p.value.count * 0.02;
        })
        .x(d3.scale.linear())
        .minRadius(0)
        .minRadiusWithLabel(12)
        .elasticY(true)
        .yAxisPadding(40)
        .xAxisPadding(40000)
        .elasticX(true)
        .renderLabel(true)
        .renderTitle(true)
        .label(function (p) {
            return p.key.match(/\b(\w)/g).join('')
        })
        .title(function (p) {
            return p.key
                + "\n"
                + "Number of Applications: " + p.value.count;
        });

    chart.data(function (group) {
        return group.top(2000);
    });

    chart.xAxisMin = function () {
        return 0;
    };
    chart.yAxisMin = function () {
        return -10;
    };

    chart.xAxis().tickFormat(function (v) {
        if (v < 0)
            return "";
        return intToString(v);
    });

    chart.yAxis().tickFormat(function (d) {
        return intToString(d);
    });

    document.getElementById("bubble-chart-title").innerText = "Salary and Petition Count of Top Positions";

}