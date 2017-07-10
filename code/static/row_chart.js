/**
 * Created by nidhi on 04/05/17.
 */

function drawRowChart(ndx) {
    var chart = dc.rowChart("#row-chart");
    dimension = ndx.dimension(function (d) {
        return d["STATE_CODE"];
    });
    var group = dimension.group().reduceCount();

    var max = group.top(1)[0].value + 10;


    chart
        .margins({top: 10, right: 100, bottom: 40, left: 40})
        .width(450)
        .height(630)
        .x(d3.scale.linear(0, max))
        .elasticX(true)
        .dimension(dimension)
        .labelOffsetX(-25)
        .renderTitle(true)
        .title(function (d) {
            return "State: " + d.key + "\nPetitions Count: " + d.value;
        })
        .group(group);

    document.getElementById("row-chart-title").innerText = "Count of Petitions Across States";
}
