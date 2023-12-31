// ############################################################################
// #################################  CIRCLE  #################################
// ############################################################################
const width = 400;
const height = 400;
const radius = 100;

const svg = d3.select("#circle-container")
                .append("svg")
                .attr("viewBox", "0 0 400 400")
                .attr("preserveAspectRatio", "xMinYMin meet");


svg.append("circle")
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .attr("r", radius)
    .attr("stroke", "black")
    .attr("fill", "none")
    .attr("stroke-width", 2);

// Draw axes
svg.append("line")
    .attr("x1", width / 2)
    .attr("y1", 0)
    .attr("x2", width / 2)
    .attr("y2", height)
    .attr("stroke", "black")
    .attr("stroke-width", 2);

svg.append("line")
    .attr("x1", 0)
    .attr("y1", height / 2)
    .attr("x2", width)
    .attr("y2", height / 2)
    .attr("stroke", "black")
    .attr("stroke-width", 2);

let arm = svg.append("line")
                .attr("x1", width / 2)
                .attr("y1", height / 2)
                .attr("x2", width / 2 + radius)
                .attr("y2", height / 2)
                .attr("stroke", "black")
                .attr("stroke-width", 2);

let xProjection = svg.append("line")
                        .attr("stroke", "#a7cee3")
                        .attr("id", "cosineLine")
                        .attr("stroke-width", 2);

let yProjection = svg.append("line")
                        .attr("stroke", "blue")
                        .attr("id", "sineLine")
                        .attr("stroke-width", 2);

let secLine = svg.append("line")
                .attr("stroke", "#fb9a99")
                .attr("id", "secantLine")
                .attr("stroke-width", 2)
                .attr("display", "None");

let secLineConnector = svg.append("line")
                .attr("stroke", "black")
                .attr("id", "secantLineConnector")
                .attr("stroke-width", 2)
                .attr("display", "None");

let cscLine = svg.append("line")
                .attr("stroke", "#e31a1c")
                .attr("id", "cosecantLine")
                .attr("stroke-width", 2)
                .attr("display", "None");

let cscLineConnector = svg.append("line")
                .attr("stroke", "black")
                .attr("id", "cosecantLineConnector")
                .attr("stroke-width", 2)
                .attr("display", "None");

let tanLine = svg.append("line")
                    .attr("stroke", "#b2df8a")
                    .attr("id", "tangentLine")
                    .attr("stroke-width", 2)
                    .attr("display", "None");

let cotLine = svg.append("line")
                    .attr("stroke", "#33a02c")
                    .attr("id", "cotangentLine")
                    .attr("stroke-width", 2)
                    .attr("display", "None");

// Create a group to hold the arc for better styling and manipulation
let arcGroup = svg.append("g")
                .attr("transform", `translate(${width / 2},${height / 2})`);

// Initialize the arc
let arcPath = d3.arc()
                .innerRadius(radius-2)
                .outerRadius(radius+2)
                .startAngle(Math.PI/2)
                .endAngle(Math.PI/2);  // Angle in radians

let arc = arcGroup.append("path")
                .attr("d", arcPath())
                .attr("fill", "black");


// ############################################################################
// ##################################  PLOT  ##################################
// ############################################################################
const plotWidth = 400;
const plotHeight = 400;
const padding = 20;

const plotSvg = d3.select("#plot-container")
                .append("svg")
                .attr("viewBox", "0 0 400 400")
                .attr("preserveAspectRatio", "xMinYMin meet");

// Create scales for plotting sine and cosine curves
const xScale = d3.scaleLinear()
                .domain([-360, 360])
                .range([0, plotWidth]);

const yScale = d3.scaleLinear()
                .domain([-5, 5])
                .range([plotHeight, 0]);

// Create sine and cosine curves using d3.line
const line = d3.line()
            .defined(d => !isNaN(d) && Math.abs(d) < 10)  // Ignore NaN and very large values
            .x(function(d, i) { return xScale(i-360); })
            .y(function(d, i) { return yScale(d); });

// Data for sine and cosine curves
const sineData = Array.from({length: 721}, (_, i) => Math.sin((i-360) * Math.PI / 180));
const cosData = Array.from({length: 721}, (_, i) => Math.cos((i-360) * Math.PI / 180));
const tanData = Array.from({length: 721}, (_, i) => {
                            let val = Math.tan((i-360) * Math.PI / 180);
                                return Math.min(Math.max(val, -10), 10); // Clipping to the range [-10, 10]
                            });
const cotData = Array.from({length: 721}, (_, i) => {
                            let val = 1/Math.tan((i-360) * Math.PI / 180);
                                return Math.min(Math.max(val, -10), 10); // Clipping to the range [-10, 10]
                            });
const secData = Array.from({length: 721}, (_, i) => {
                            let val = 1/Math.cos((i-360) * Math.PI / 180);
                                return Math.min(Math.max(val, -10), 10); // Clipping to the range [-10, 10]
                            });
const cscData = Array.from({length: 721}, (_, i) => {
                            let val = 1/Math.sin((i-360) * Math.PI / 180);
                                return Math.min(Math.max(val, -10), 10); // Clipping to the range [-10, 10]
                            });

// Draw axes
plotSvg.append("line")
    .attr("x1", width / 2)
    .attr("y1", 0)
    .attr("x2", width / 2)
    .attr("y2", height)
    .attr("stroke", "black")
    .attr("stroke-width", 2);

plotSvg.append("line")
    .attr("x1", 0)
    .attr("y1", height / 2)
    .attr("x2", width)
    .attr("y2", height / 2)
    .attr("stroke", "black")
    .attr("stroke-width", 2);

let xAxisThick = plotSvg.append("line")
    .attr("x1", xScale(0))
    .attr("y1", yScale(0))
    .attr("x2", xScale(0))  // Start at 0, will be updated
    .attr("y2", yScale(0))
    .attr("stroke", "black")
    .attr("stroke-width", 4);


// Append curves to SVG
plotSvg.append("path")
        .datum(sineData)
        .attr("fill", "none")
        .attr("stroke", "#1f78b4")
        .attr("id", "sinePath")
        .attr("stroke-width", 2)
        .attr("d", line);

plotSvg.append("path")
        .datum(cosData)
        .attr("fill", "none")
        .attr("stroke", "#a7cee3")
        .attr("id", "cosinePath")
        .attr("stroke-width", 2)
        .attr("d", line);

plotSvg.append("path")
        .datum(tanData)
        .attr("fill", "none")
        .attr("stroke", "#b2df8a")
        .attr("id", "tangentPath")
        .attr("stroke-width", 2)
        .attr("d", line)
        .attr("display", "None");

plotSvg.append("path")
        .datum(cotData)
        .attr("fill", "none")
        .attr("stroke", "#33a02c")
        .attr("id", "cotangentPath")
        .attr("stroke-width", 2)
        .attr("d", line)
        .attr("display", "None");

plotSvg.append("path")
        .datum(secData)
        .attr("fill", "none")
        .attr("stroke", "#fb9a99")
        .attr("id", "secantPath")
        .attr("stroke-width", 2)
        .attr("d", line)
        .attr("display", "None");

plotSvg.append("path")
        .datum(cscData)
        .attr("fill", "none")
        .attr("stroke", "#e31a1c")
        .attr("id", "cosecantPath")
        .attr("stroke-width", 2)
        .attr("d", line)
        .attr("display", "None");

// Initialize circles for each function curve
let sineCircle = plotSvg.append("circle")
                        .attr("fill", "#1f78b4")
                        .attr("id", "sineDot")
                        .attr("r", 5)
                        .attr("cy", yScale(0))
                        .attr("cx", xScale(0));

let cosCircle = plotSvg.append("circle")
                        .attr("fill", "#a7cee3")
                        .attr("id", "cosineDot")
                        .attr("r", 5)
                        .attr("cy", yScale(1))
                        .attr("cx", xScale(0));

let tanCircle = plotSvg.append("circle")
                        .attr("fill", "#b2df8a")
                        .attr("id", "tangentDot")
                        .attr("r", 5)
                        .attr("cy", yScale(0))
                        .attr("cx", xScale(0))
                        .attr("display", "None");

let cotCircle = plotSvg.append("circle")
                        .attr("fill", "#33a02c")
                        .attr("id", "cotangentDot")
                        .attr("r", 5)
                        .attr("cy", yScale(0))
                        .attr("cx", xScale(0))
                        .attr("display", "None");

let secCircle = plotSvg.append("circle")
                        .attr("fill", "#fb9a99")
                        .attr("id", "secantDot")
                        .attr("r", 5)
                        .attr("cy", yScale(1))
                        .attr("cx", xScale(0))
                        .attr("display", "None");

let cscCircle = plotSvg.append("circle")
                        .attr("fill", "#e31a1c")
                        .attr("id", "cosecantDot")
                        .attr("r", 5)
                        .attr("cy", yScale(0))
                        .attr("cx", xScale(0))
                        .attr("display", "None");

let xAxisCircle = plotSvg.append("circle")
                        .attr("fill", "black")
                        .attr("r", 5)
                        .attr("cy", yScale(0))
                        .attr("cx", xScale(0));


// ############################################################################
// #################################  SLIDER  #################################
// ############################################################################
d3.select("#slider").on("input", function() {
    let angle = +this.value;
    const angleRad = angle * Math.PI / 180;

    let x = width / 2 + radius * Math.cos(angle * Math.PI / 180);
    let y = height / 2 - radius * Math.sin(angle * Math.PI / 180);

    arm.attr("x2", x)
        .attr("y2", y);

    xProjection.attr("x1", width / 2)
                .attr("y1", y)
                .attr("x2", x)
                .attr("y2", y);

    yProjection.attr("x1", x)
                .attr("y1", height / 2)
                .attr("x2", x)
                .attr("y2", y);

    if ((angle % 180 === 90) || (angle % 180 === -90)) {
        secLine.attr("x1", width / 2)
            .attr("y1", height / 2)
            .attr("x2", width / 2)
            .attr("y2", height / 2);

        secLineConnector.attr("x1", x)
            .attr("y1", y)
            .attr("x2", x)
            .attr("y2", y);

        tanLine.attr("x1", x)
            .attr("y1", y)
            .attr("x2", x)
            .attr("y2", y);
    } else {
        secLine.attr("x1", width / 2)
            .attr("y1", height / 2)
            .attr("x2", width / 2 + radius * 1/Math.cos(angle * Math.PI / 180))
            .attr("y2", height / 2);

        secLineConnector.attr("x1", x)
            .attr("y1", y)
            .attr("x2", width / 2 + radius * 1/Math.cos(angle * Math.PI / 180))
            .attr("y2", height / 2);

        tanLine.attr("x1", x)
            .attr("y1", y)
            .attr("x2", width / 2 + radius * 1/Math.cos(angle * Math.PI / 180))
            .attr("y2", height / 2);
    }
    
    if (angle % 180 === 0) {
        cscLine.attr("x1", width / 2)
            .attr("y1", height / 2)
            .attr("x2", width / 2)
            .attr("y2", height / 2);
        
        cscLineConnector.attr("x1", x)
            .attr("y1", y)
            .attr("x2", x)
            .attr("y2", y);

        cotLine.attr("x1", x)
            .attr("y1", y)
            .attr("x2", x)
            .attr("y2", y);
    } else {
        cscLine.attr("x1", width / 2)
            .attr("y1", height / 2)
            .attr("x2", width / 2)
            .attr("y2", height / 2 - radius * 1/Math.sin(angle * Math.PI / 180));

        cscLineConnector.attr("x1", x)
            .attr("y1", y)
            .attr("x2", width / 2)
            .attr("y2", height / 2 - radius * 1/Math.sin(angle * Math.PI / 180))

        cotLine.attr("x1", x)
            .attr("y1", y)
            .attr("x2", width / 2)
            .attr("y2", height / 2 - radius * 1/Math.sin(angle * Math.PI / 180))
    }

    arcPath.endAngle(Math.PI/2-angleRad);  // SVG coordinate system is flipped, so we negate the angle
    arc.attr("d", arcPath());

    const lineX = xScale(angle);

    // Update the positions of the circles
    sineCircle.attr("cx", lineX)
            .attr("cy", yScale(Math.sin(angle * Math.PI / 180)));

    cosCircle.attr("cx", lineX)
            .attr("cy", yScale(Math.cos(angle * Math.PI / 180)));

    tanCircle.attr("cx", lineX)
            .attr("cy", yScale(Math.min(Math.max(Math.tan(angle * Math.PI / 180), -10), 10)));

    cotCircle.attr("cx", lineX)
            .attr("cy", yScale(Math.min(Math.max(1 / Math.tan(angle * Math.PI / 180), -10), 10)));

    secCircle.attr("cx", lineX)
            .attr("cy", yScale(Math.min(Math.max(1 / Math.cos(angle * Math.PI / 180), -10), 10)));

    cscCircle.attr("cx", lineX)
            .attr("cy", yScale(Math.min(Math.max(1 / Math.sin(angle * Math.PI / 180), -10), 10)));

    xAxisCircle.attr("cx", lineX);

    xAxisThick.attr("x2", lineX);

    const sineValue = Math.sin(angleRad).toFixed(2)
    const cosineValue = Math.cos(angleRad).toFixed(2)
    let tangentValue = Math.abs(Math.sin(angleRad)/Math.cos(angleRad)) < 100 ? 
                                (Math.sin(angleRad)/Math.cos(angleRad)).toFixed(2) : "Undef"
    let cotangentValue = Math.abs(Math.cos(angleRad)/Math.sin(angleRad)) < 100 ? 
                                (Math.cos(angleRad)/Math.sin(angleRad)).toFixed(2) : "Undef"
    let secantValue = Math.abs(1/Math.cos(angleRad)) < 100 ? 
                                (1/Math.cos(angleRad)).toFixed(2) : "Undef"
    let cosecantValue = Math.abs(1/Math.sin(angleRad)) < 100 ? 
                                (1/Math.sin(angleRad)).toFixed(2) : "Undef"

    d3.select("#degreeValue").text(`${angle}`)
    d3.select("#radianValue").text(`${angleRad.toFixed(2)}`)
    d3.select("#sineValue").text(`${sineValue}`);
    d3.select("#cosineValue").text(`${cosineValue}`);
    d3.select("#tangentValue").text(`${tangentValue}`);
    d3.select("#cotangentValue").text(`${cotangentValue}`);
    d3.select("#secantValue").text(`${secantValue}`);
    d3.select("#cosecantValue").text(`${cosecantValue}`);


});

d3.select("#showSine").on("change", function() {
    let isChecked = d3.select(this).property("checked");
    d3.select("#sinePath").style("display", isChecked ? "block" : "none");
    d3.select("#sineDot").style("display", isChecked ? "block" : "none");
    d3.select("#sineLine").style("display", isChecked ? "block" : "none");
});

d3.select("#showCosine").on("change", function() {
    let isChecked = d3.select(this).property("checked");
    d3.select("#cosinePath").style("display", isChecked ? "block" : "none");
    d3.select("#cosineDot").style("display", isChecked ? "block" : "none");
    d3.select("#cosineLine").style("display", isChecked ? "block" : "none");
});

d3.select("#showTangent").on("change", function() {
    let isChecked = d3.select(this).property("checked");
    d3.select("#tangentPath").style("display", isChecked ? "block" : "none");
    d3.select("#tangentDot").style("display", isChecked ? "block" : "none");
    d3.select("#tangentLine").style("display", isChecked ? "block" : "none");
});

d3.select("#showCotangent").on("change", function() {
    let isChecked = d3.select(this).property("checked");
    d3.select("#cotangentPath").style("display", isChecked ? "block" : "none");
    d3.select("#cotangentDot").style("display", isChecked ? "block" : "none");
    d3.select("#cotangentLine").style("display", isChecked ? "block" : "none");
});

d3.select("#showSecant").on("change", function() {
    let isChecked = d3.select(this).property("checked");
    d3.select("#secantPath").style("display", isChecked ? "block" : "none");
    d3.select("#secantDot").style("display", isChecked ? "block" : "none");
    d3.select("#secantLine").style("display", isChecked ? "block" : "none");
    d3.select("#secantLineConnector").style("display", isChecked ? "block" : "none");
});

d3.select("#showCosecant").on("change", function() {
    let isChecked = d3.select(this).property("checked");
    d3.select("#cosecantPath").style("display", isChecked ? "block" : "none");
    d3.select("#cosecantDot").style("display", isChecked ? "block" : "none");
    d3.select("#cosecantLine").style("display", isChecked ? "block" : "none");
    d3.select("#cosecantLineConnector").style("display", isChecked ? "block" : "none");
});