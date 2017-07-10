/**
 * Created by nidhi on 25/04/17.
 */

function drawSelectOption(ndx) {
    var select = dc.selectMenu('#select-option-2'),
        dimension = ndx.dimension(function (d) {
            return d["SOC_NAME"];
        });

    select
        .width(150)
        .dimension(dimension)
        .promptText("Select Your Position")
        .group(dimension.group());
}
