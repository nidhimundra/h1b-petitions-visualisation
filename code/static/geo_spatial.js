/**
 * Created by nidhi on 20/04/17.
 */
function drawGeoSpatialMap(ndx) {

    var geoSpatialDimension = ndx.dimension(function (d) {
        return d["STATE_CODE"];
    });

    var geoSpatialGroup = geoSpatialDimension.group().reduceCount(function (d) {
        return d["CASE_STATUS"];
    });
    var geoSpatialMap = dc.geoChoroplethChart("#geo-spatial");

    geoSpatialMap.width(990)
        .height(500)
        .dimension(geoSpatialDimension)
        .group(geoSpatialGroup)
        .colors(d3.scale.quantize().range(
            ["#E2F2FF", "#C4E4FF", "#9ED2FF", "#81C5FF", "#6BBAFF", "#51AEFF", "#36A2FF", "#1E96FF", "#0089FF", "#0061B5"]))
        .colorDomain([0, 200])
        .colorCalculator(function (d) {
            return d ? geoSpatialMap.colors()(d) : '#ccc';
        })
        .overlayGeoJson(statesJson.features, "state", function (d) {
            return d.properties.name;
        })
        .projection(d3.geo.albersUsa()
            .scale(900)
            .translate([500, 250]));
        // .on("renderlet", drawAdditionalStuffInMap);
    document.getElementById("geo-spatial-title").innerText = "H1B Visa Petitions Count of Various Case Statuses";
}

function drawAdditionalStuffInMap(_chart) {
    var svg = _chart.svg();
    svg.selectAll("g.additionalStuff").remove();

    var group = svg.selectAll("g.additionalStuff");

    if (group.empty()) {
        group = svg.append("g").classed("additionalStuff", true);
    }

    var projection = d3.geo.albersUsa()
        .scale(900)
        .translate([500, 250]);


    var additionalNodes = group.selectAll("circle").data(fullData, function (x) {
        return x["ID"];
    });

    _chart.dimension().top(Infinity).map(function (d) {
        d.location = projection([+d["LON"], +d["LAT"]]);
        return d;
    });

    additionalNodes.enter()
        .append("image")
        .attr("xlink:href", 'static/location-icon.png')
        .attr("x", "0px")
        .attr("y", "0px")
        .attr("width", "10px")
        .attr("height", "10px")
        .attr("transform", function (d) {
            return "translate(" + d.location[0] + "," + d.location[1] + ")";
        });

    additionalNodes.exit().remove();
}