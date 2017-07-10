/**
 * Created by nidhi on 08/05/17.
 */

function drawDataTable(ndx) {
    var dataTableKey = "EMPLOYER_NAME";
    var dataTable = dc.dataTable('#data-table'),
        dimension = ndx.dimension(function (d) {
            return d[dataTableKey];
        });

    var group = dimension.group().reduce(
        function (p, v) {
            ++p.number;
            p.total += +v["PREVAILING_WAGE"];
            p.avg = Math.round(p.total / p.number);
            return p;
        },
        function (p, v) {
            --p.number;
            p.total -= +v["PREVAILING_WAGE"];
            p.avg = (p.number == 0) ? 0 : Math.round(p.total / p.number);
            return p;
        },
        function () {
            return {number: 0, total: 0, avg: 0}
        }),
        rank = function (p) {
            return "<div style=\"text-align: center;\"><b>Highest Paying Companies And Their Average Salaries</b></div>";
        };

    dataTable
        .dimension(group)
        .group(rank)
        .columns([function (d) {
            return d.key
        },
            function (d) {
                return d.value.avg
            }])
        .sortBy(function (d) {
            return d.value.avg
        })
        .order(d3.descending)
        .size(5);
}