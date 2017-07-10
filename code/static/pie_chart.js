/**
 * Created by nidhi on 24/04/17.
 */

function drawPieChart1(ndx, all) {

    var positionsMap = {"Y": "Full Time", "N": "Part Time"};
    var pieChartKey = "FULL_TIME_POSITION";
    var typeDimension = ndx.dimension(function (d) {
            return d[pieChartKey];
        }),
        typeGroup = typeDimension.group();

    var pieChart = dc.pieChart("#pie-chart-1");

    pieChart
        .width(280)
        .height(200)
        .radius(60)
        .dimension(typeDimension)
        .group(typeGroup)
        .transitionDuration(500)
        .colors(colorScale)
        .label(function (d) {
            if (pieChart.hasFilter() && !pieChart.hasFilter(d.key)) {
                return '';
            }
            if (all.value()) {
                return Math.floor(d.value / all.value() * 100);
            }
        })
        .renderLabel(true)
        .minAngleForLabel(0)
        .renderTitle(true)
        .title(function (d) {
            if (pieChart.hasFilter() && !pieChart.hasFilter(d.key)) {
                return '';
            }
            if (all.value()) {
                return "Type:" + d.key + "\nShare: " + Math.floor(d.value / all.value() * 100) + "%"
            }
        });

    pieChart.legend(dc.legend().x(210).y(140 - (typeGroup.size() * 10) / 2)
        .itemHeight(10).legendText(function (d) {
            return positionsMap[d.name];
        }));
}

function drawPieChart2(ndx, all) {

    var pieChartKey = "CASE_STATUS";
    var typeDimension = ndx.dimension(function (d) {
            return d[pieChartKey];
        }),
        typeGroup = typeDimension.group();

    var pieChart = dc.pieChart("#pie-chart-2");

    pieChart
        .width(250)
        .height(250)
        .radius(80)
        .innerRadius(30)
        .colors(colorScale)
        .dimension(typeDimension)
        .group(typeGroup)
        .transitionDuration(500)
        .label(function (d) {
            if (pieChart.hasFilter() && !pieChart.hasFilter(d.key)) {
                return '';
            }
            if (all.value()) {
                return Math.floor(d.value / all.value() * 100);
            }
        })
        .renderLabel(true)
        .minAngleForLabel(0)
        .renderTitle(true)
        .legend(dc.legend().x(0).y(0).legendText(function (d) {
            return convertCase(d.name)
        }));

}

function drawPieChart3(ndx, all) {

    var pieChartKey = "POSITION_STATUS";
    var typeDimension = ndx.dimension(function (d) {
            return d[pieChartKey];
        }),
        typeGroup = typeDimension.group();

    var pieChart = dc.pieChart("#pie-chart-3");

   pieChart
        .width(250)
        .height(250)
        .radius(80)
        .innerRadius(30)
        .colors(colorScale)
        .dimension(typeDimension)
        .group(typeGroup)
        .transitionDuration(500)
        .label(function (d) {
            if (pieChart.hasFilter() && !pieChart.hasFilter(d.key)) {
                return '';
            }
            if (all.value()) {
                return Math.floor(d.value / all.value() * 100);
            }
        })
        .renderLabel(true)
        .minAngleForLabel(0)
        .renderTitle(true)
        .legend(dc.legend().x(0).y(10).legendText(function (d) {
            return "Job Positions " + convertCase(d.name) + " for Certified H1B"
        }));

}
