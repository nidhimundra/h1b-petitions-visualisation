/**
 * Created by nidhi on 20/04/17.
 */

function drawScatterPlot1(ndx) {

    var scatterplot = dc.scatterPlot('#scatter-plot-1'),
        scatterPlotXLabel = "STATE_CODE",
        scatterPlotYLabel = "PREVAILING_WAGE",
        scatterplotDimension = ndx.dimension(function (d) {
            return [stateIDs[d[scatterPlotXLabel]], d[scatterPlotYLabel], d["FULL_TIME_POSITION"],
                d["EMPLOYER_NAME"], d["WORKSITE"], d["SOC_NAME"]];
        }),
        scatterplotGroup = scatterplotDimension.group();

    var minX = 0;
    var maxX = 56;

    scatterplot.width(1200)
        .height(180)
        .margins({top: 10, right: 50, bottom: 40, left: 40})
        .x(d3.scale.linear().domain([minX, maxX]))
        .y(d3.scale.linear().domain([0, 350000]))
        .dimension(scatterplotDimension)
        .group(scatterplotGroup)
        .symbolSize(3)
        .elasticX(true)
        .colors(colorScale)
        .colorAccessor(function (d) {
            return d.key[2];
        })
        .brushOn(false)
        .xAxisPadding(1)
        .yAxisLabel("Salary")
        .renderTitle(true)
        .title(function (d) {
            return "Salary: " + intToString(+d.key[1]) + "\n" + d.key[5] + "\n" + d.key[4];
        })
        .xAxis().ticks(56);
    scatterplot.yAxis().ticks(3);

    scatterplot.xAxis().tickFormat(function (v) {
        return objectKeyByValue(stateIDs, v);
    });

    scatterplot.yAxis().tickFormat(function (d) {
        return intToString(d);
    });

    document.getElementById("scatter-plot-1-title").innerText = "Salary Range Across States In The US";
}
