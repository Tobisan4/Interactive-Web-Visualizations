let samples = "../data/samples.json"

function initialize(data){
    d3.json(samples).then(function (data) {
        let selectElement = d3.select("#selDataset");
        data.names.forEach(name => {
            selectElement.append("option").text(name).property("value", name)
        });
        buildBarchart(data.samples[0].id);
        buildMetadata(data.samples[0].id);
        buildBubblechart(data.samples[0].id);
        buildGauge(data.samples[0].id);
    });
}
initialize()

function buildBarchart(Test_ID){
    d3.json(samples).then(function (data) {
        let filterData1 = data.samples.filter(row => row.id == Test_ID);
        let sortedData1 = filterData1[0].sample_values.sort((a, b) => b - a);
        let otu_IDs1 = filterData1[0].otu_ids.map(id => "OTU-" + id);
        let trace1 = {
            x: sortedData1.slice(0, 10).reverse(),
            y: otu_IDs1.slice(0, 10).reverse(),
            type: "bar",
            text: otu_IDs1.slice(0, 10).reverse(),
            orientation: "h"
        };
        let traceData1 = [trace1];
        let layout1 = {
            title: "<b>Top 10 OTUs per Individual</b>",
            width: 500,
            height: 415, 
            margin: {
                l: 90,
                r: 90,
                t: 40,
                b: 80
            },
            xaxis: {
                title: "Number of Samples"
            },
            yaxis: {
                title: "OTU IDs"
            }
        };
        Plotly.newPlot("bar", traceData1, layout1);
    });
}

function buildBubblechart(Test_ID){
    d3.json(samples).then(function (data) {
        let filterData2 = data.samples.filter(row => row.id == Test_ID);
        let otu_IDs2 = filterData2[0].otu_ids;
        let otu_labels2 = filterData2[0].otu_labels;
        let trace2 = {
            x: otu_IDs2,
            y: filterData2[0].sample_values,
            text: otu_labels2,
            mode: "markers",
            marker: {
                colorscale:"Jet",
                color: otu_IDs2,
                opacity: 0.45,
                size: filterData2[0].sample_values
            }
        };
        let traceData2 = [trace2];
        let layout2 = {
            title: "<b>OTU Samples per Individual</b>",
            width: 1200,
            height: 600, 
            margin: {
                l: 90,
                r: 90,
                t: 90,
                b: 40
            },
            xaxis: {
                title: "OTU IDs"
            },
            yaxis: {
                title: "Number of Samples"
            }
        };
        Plotly.newPlot("bubble", traceData2, layout2);
    });
}

function buildMetadata(Test_ID){
    d3.json(samples).then(function (data) {
        let filterData3 = data.metadata.filter(row => row.id == Test_ID);
        let addUL = d3.select("#sample-metadata").append("ul").style("list-style-type", "none").style("padding", 0);
        let li1 = addUL.append("li").attr("id","myli1").text(`ID: ${filterData3[0].id}`);
        let li2 = addUL.append("li").attr("id","myli2").text(`ethnicity: ${filterData3[0].ethnicity}`);
        let li3 = addUL.append("li").attr("id","myli3").text(`gender: ${filterData3[0].gender}`);
        let li4 = addUL.append("li").attr("id","myli4").text(`age: ${filterData3[0].age}`);
        let li5 = addUL.append("li").attr("id","myli5").text(`location: ${filterData3[0].location}`);
        let li6 = addUL.append("li").attr("id","myli6").text(`bbtype: ${filterData3[0].bbtype}`);
        let li7 = addUL.append("li").attr("id","myli7").text(`wfreq: ${filterData3[0].wfreq}`);
    });
}

function buildGauge(Test_ID){
    d3.json(samples).then(function (data) {
        let filterData4 = data.metadata.filter(row => row.id == Test_ID);
        let trace3 = {
            domain: {
                x: [0, 1], 
                y: [0, 1]
            },
            value: filterData4[0].wfreq,
            title: {
                text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
                font: {
                    size:17
                }
            },   
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {
                    range: [null, 9],
                    dtick: 1
                },
                bar: {
                    color: "#ff9912",
                    thickness: 0.70
                },
                steps: [
                    {range: [0, 1], color: "#f7fbff"},
                    {range: [1, 2], color: "#deebf7"},
                    {range: [2, 3], color: "#c6dbef"},
                    {range: [3, 4], color: "#9ecae1"},
                    {range: [4, 5], color: "#6baed6"},
                    {range: [5, 6], color: "#4292c6"},
                    {range: [6, 7], color: "#2171b5"},
                    {range: [7, 8], color: "#08519c"},
                    {range: [8, 9], color: "#08306b"}
                ]
            } 
        };
        let traceData3 = [trace3];
        let layout3 = { 
            width: 500,
            height: 310, 
            margin: {
                t: 0,
                b: 0
            }
        };
        Plotly.newPlot("gauge", traceData3, layout3);
    });
}

function updateMetadata(Test_ID){
    d3.json(samples).then(function (data) {
        let filterData5 = data.metadata.filter(row => row.id == Test_ID);
        let newli1 = document.getElementById("myli1").innerHTML = `ID: ${filterData5[0].id}`;
        let newli2 = document.getElementById("myli2").innerHTML = `ethnicity: ${filterData5[0].ethnicity}`;
        let newli3 = document.getElementById("myli3").innerHTML = `gender: ${filterData5[0].gender}`;
        let newli4 = document.getElementById("myli4").innerHTML = `age: ${filterData5[0].age}`;
        let newli5 = document.getElementById("myli5").innerHTML = `location: ${filterData5[0].location}`;
        let newli6 = document.getElementById("myli6").innerHTML = `bbtype: ${filterData5[0].bbtype}`;
        let newli7 = document.getElementById("myli7").innerHTML = `wfreq: ${filterData5[0].wfreq}`;
    });
}

function optionChanged(Test_ID){
    d3.json(samples).then(function (data) {
        buildBarchart(Test_ID);
        updateMetadata(Test_ID);
        buildBubblechart(Test_ID);
        buildGauge(Test_ID);
    });
}


