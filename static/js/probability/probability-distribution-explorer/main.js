import distributions from './distributions.js'

function updatePlots(selectedDistributionKey, params) {
    const distribution = distributions[selectedDistributionKey];
    // const params = distribution['params']; // You need to implement this based on your UI

    const n = 10
    const pdfData = Array.from({ length: n + 1 }, (_, i) => 
            distributions[selectedDistributionKey].func(i, params),
        ); 

    const cdfData = Array.from({ length: n + 1 }, (_, i) =>
            distributions[selectedDistributionKey + 'CDF'].func(i, params),
        ); 

    drawPlot('#pdf-container', pdfData, distribution.xLabel);
    drawPlot('#cdf-container', cdfData, distribution.xLabel);

    createSliders(distribution.params, selectedDistributionKey);
}

function createSliders(params, selectedDistributionKey) {
    const slidersContainer = document.getElementById('sliders-container');
    slidersContainer.innerHTML = ''; // Clear existing sliders

    params.forEach(param => {
        // Create the row
        const sliderRow = document.createElement('div');
        sliderRow.classList.add('row');

        // Create the column for label and output
        const labelCol = document.createElement('div');
        labelCol.classList.add('col');

        const label = document.createElement('label');
        label.innerText = `${param.label}: `;
        label.htmlFor = `slider-${param.name}`;

        const output = document.createElement('span');
        output.id = `output-${param.name}`;
        output.innerText = ' ' + param.default;

        // Append label and output to the column
        labelCol.appendChild(label);
        labelCol.appendChild(output);

        // Create the column for the slider
        const sliderCol = document.createElement('div');
        sliderCol.classList.add('col');

        const slider = document.createElement('input');
        slider.type = 'range';
        slider.className = 'form-range';
        slider.id = `slider-${param.name}`;
        slider.min = param.min;
        slider.max = param.max;
        slider.step = param.step;
        slider.value = param.default;

        // Set up the event listener for the slider
        slider.addEventListener('input', function() {
            output.innerText = ' ' + this.value;
            const newParams = getParamsFromSliders(distributions[selectedDistributionKey].params);
            redrawPlots(selectedDistributionKey, newParams);
        });

        // Append the slider to its column
        sliderCol.appendChild(slider);

        // Append both columns to the row
        sliderRow.appendChild(labelCol);
        sliderRow.appendChild(sliderCol);

        // Append the row to the sliders container
        slidersContainer.appendChild(sliderRow);
    });
}

function redrawPlots(selectedDistributionKey, params) {
    // Use the provided parameters to calculate the new data
    const distribution = distributions[selectedDistributionKey];
    const n = 10;

    const pdfData = Array.from({ length: n + 1 }, (_, i) => 
        distribution.func(i, params),
    ); 

    // console.log(selectedDistributionKey)
    // console.log()

    const cdfData = Array.from({ length: n + 1 }, (_, i) =>
        distributions[selectedDistributionKey + 'CDF'].func(i, params),
    ); 

    // Call the drawPlot function to update the plots with the new data
    drawPlot('#pdf-container', pdfData, distribution.xLabel);
    drawPlot('#cdf-container', cdfData, distribution.xLabel);
}

function getParamsFromSliders(params) {
    const values = {};
    params.forEach(param => {
        values[param.name] = parseFloat(document.getElementById(`slider-${param.name}`).value);
    });
    return values;
}


// function updateDistributionParameters(selectedDistributionKey) {
//     const distribution = distributions[selectedDistributionKey];
//     const params = {};
//     distribution.params.forEach(param => {
//         params[param.name] = document.getElementById(`slider-${param.name}`).value;
//     });

//     redrawPlots(selectedDistributionKey, params);
// }


function drawPlot(containerId, data, xLabel) {
    d3.select(containerId).selectAll("svg").remove();

    const outerWidth = 400;
    const outerHeight = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const innerWidth = outerWidth - margin.left - margin.right;
    const innerHeight = outerHeight - margin.top - margin.bottom;

    // Create the SVG element and configure the viewBox
    // The viewBox is set to the outer dimensions of the SVG
    const svg = d3.select(containerId)
                    .append("svg")
                    .attr("width", outerWidth)
                    .attr("height", outerHeight)
                    .attr("viewBox", [0, 0, outerWidth, outerHeight]);

    // Add the group element that will contain our actual chart
    // This group is what we apply the margins to
    const g = svg.append("g")
                 .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create X scale
    const x = d3.scaleBand()
        .range([0, innerWidth])
        .domain(data.map((_, i) => i))
        .padding(0.1);

    // Create Y scale
    const y = d3.scaleLinear()
        .domain([0, 1])
        .range([innerHeight, 0]);

    // Draw bars
    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", (d,i) => x(i))
        .attr("y", d => y(d))
        .attr("width", x.bandwidth())
        .attr("height", d => innerHeight - y(d))
        .attr("fill", "steelblue");

    // Add X axis
    g.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x));

    // Add Y axis
    g.append("g")
        .call(d3.axisLeft(y));

    // Optionally add x-axis label
    g.append("text")
        .attr("text-anchor", "middle")
        .attr("x", innerWidth/2)
        .attr("y", innerHeight + margin.bottom - 5)
        .text(xLabel);

    // Optionally add y-axis label
    g.append("text")
        .attr("text-anchor", "middle")
        .attr("y", -margin.left + 20)
        .attr("x", -innerHeight/2)
        .attr("transform", "rotate(-90)")
        .text("Probability");
}


// function drawPlot(containerId, data, xLabel) {

//     d3.select(containerId).selectAll("svg").remove();

    
//     const margin = { top: 20, right: 30, bottom: 40, left: 50 };
//     const svgWidth = 400;  // Total width of the SVG
//     const svgHeight = 400; // Total height of the SVG

//     const width = svgWidth - margin.left - margin.right;
//     const height = svgHeight - margin.top - margin.bottom;

//     const svg = d3.select(containerId)
//                     .append("svg")
//                     .attr("width", svgWidth) // Use svgWidth and svgHeight here
//                     .attr("height", svgHeight)
//                     .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`) // Set viewBox to the size of the SVG
//                     // .attr("preserveAspectRatio", "xMinYMin meet")
//                     .attr("transform", `translate(${margin.left}, ${margin.top})`); // Apply margins here
// ;

//     // Create X scale
//     const x = d3.scaleBand()
//         .range([0, svgWidth])
//         .domain(data.map((d, i) => i))
//         .padding(0.1);

//     // Create Y scale
//     const y = d3.scaleLinear()
//         .domain([0, 1])
//         .range([height, 0]);

//     for (let i=0; i<11; i++) {
//         console.log(y(data[i]))
//     } 

//     // Draw bars
//     svg.selectAll(".bar")
//         .data(data)
//         .enter().append("rect")
//         .attr("class", "bar")
//         .attr("x", (d, i) => x(i))
//         .attr("y", d => y(d))
//         .attr("width", x.bandwidth())
//         .attr("height", d => height- y(d))
//         .attr("fill", "steelblue");

//     // Add X axis
//     svg.append("g")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(x))
//         .append("text")
//         .attr("y", margin.bottom - 10)
//         .attr("x", svgWidth / 2)
//         .attr("text-anchor", "end")
//         .attr("stroke", "black")
//         .text(xLabel);

//     // Add Y axis
//     svg.append("g")
//         .call(d3.axisLeft(y))
//         .append("text")
//         .attr("text-anchor", "end")
//         .attr("stroke", "black")
//         .text(xLabel);
// }                        

// Event listener for distribution selection
document.getElementById('distribution-select').addEventListener('change', function() {
    updatePlots(this.value);
});

// Initial plot
updatePlots('binomial'); // or any default distribution you prefer