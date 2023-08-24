// Create a constant of the json data URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//  Read the json data with d3.json library
d3.json(url).then(function(data){ // Read the data
    console.log("data:", data); // console log it
    // Get all IDs
    let metadata = Object.values(data.metadata); // Get the Array containing IDS
    let ids = metadata.map(x => x.id); // Get ids
    // Create the options for the dropdown menu with the value of the chosen sample id
    let dropdown = d3.select("#selDataset");
    for (let  i = 0 ; i< ids.length; i++) {
        let option = dropdown.append("option").text(ids[i]).attr("value", ids[i]).attr("id", "ids");
    };
    /***********************
     * Data gathering for bar Section
    ***********************/
    let samples = Object.values(data.samples); // Get the Samples array that has all the samples' data in it 
    let chosenId = "940"; // Select the standby ID
    let sampleValues = samples.filter(x=> x.id === chosenId).map(x => x.sample_values.slice(0,10))[0]; // Get the biggest 10 sample values for chosen id, the values array id sorted by descending order  
    console.log("sampleValue", sampleValues);
    let otuIds = samples.filter(x => x.id === chosenId).map(x => x.otu_ids.slice(0,10))[0].map(x => `OTU ${x}`); // Get otu ids for the biget 10 sample values for chosen vslue, consider the list have 1 on 1 corespondence
    console.log("otuIds", otuIds);
    let otuLabels = samples.filter(x => x.id === chosenId).map(x => x.otu_labels.slice(0,10))[0]; // Get otu labels for the biget 10 sample values for chosen vslue, consider the list have 1 on 1 corespondence
    console.log("outlabels", otuLabels);
    /***********************
     * Data gathering for bubble Section
    ***********************/
    let sampleValues2 = samples.filter(x=> x.id === chosenId).map(x => x.sample_values)[0]; // Get the sample values for chosen id 
    console.log("sampleValue2", sampleValues2);
    let otuIds2 = samples.filter(x => x.id === chosenId).map(x => x.otu_ids)[0]; // Get otu ids for  chosen id, consider the list have 1 on 1 corespondence
    console.log("otuIds2", otuIds2);
    let otuLabels2 = samples.filter(x => x.id === chosenId).map(x => x.otu_labels)[0]; // Get otu labels for chosen id, consider the list have 1 on 1 corespondence
    console.log("outlabels2", otuLabels2);
    /***********************
     * Standby plot Section
    ***********************/
    // Display the metadata of chosen Id
    function metaData(){
        let displayData = metadata.filter(x=>x.id===parseInt(chosenId))[0];
        let display = ""
        for ( const [key, value] of Object.entries(displayData)){
            display = `${display}<br/>${key}: ${value}`;
        };
        d3.select("#sample-metadata").html(display);
    }
    // Create a function to plot the standby bar plot
    function barplot (){  
        let Data = [{
            x : sampleValues,
            y : otuIds,
            text: otuLabels,
            orientation: 'h',
            type:"bar"
        }];
        let layout= {
            width: 600,
            height: 600,
            title: "Top 10 OTUs found in the Sample"
        };
        Plotly.newPlot("bar",Data, layout);
    };
    // Create a function to plot the standby bubble plot
    function bubblePlot(){ 
        let Data = [{
            x : otuIds2,
            y : sampleValues2,
            mode: 'markers',
            marker: {
                color: otuIds2,
                size: sampleValues2
            },
            type : "bubble",
            text : otuLabels2
        }];
        let layout2 = {
            legend : "false",
            title : "OTUs and their sample size",
            xaxis: {
                title: {
                  text: 'OTU ID'
        }}};
        Plotly.newPlot("bubble",Data, layout2);
       };
    /***********************
     * Intractive plot Section
    ***********************/
    d3.selectAll("#selDataset").on("change", function(){  // On change to the DOM, call updateBar() 
        // Bar plot 
        let chosenId = this.options[this.selectedIndex].value; // Get the choisen id
        console.log("chosenId", chosenId);
        let x = samples.filter(x=> x.id === chosenId).map(x => x.sample_values.slice(0,10))[0]; // Get the biggest 10 sample values for chosen id, the values array id sorted by descending order  
        console.log("sampleValue", sampleValues);
        let y = samples.filter(x => x.id === chosenId).map(x => x.otu_ids.slice(0,10))[0].map(x => `OTU ${x}`); // Get otu ids for the biget 10 sample values for chosen vslue, consider the list have 1 on 1 corespondence
        console.log("otuIds", otuIds);
        let text = samples.filter(x => x.id === chosenId).map(x => x.otu_labels.slice(0,10))[0]; // Get otu labels for the biget 10 sample values for chosen vslue, consider the list have 1 on 1 corespondence
        console.log("outlabels", otuLabels);
        let Data = [{ // Make the new Data for chosen id
            x : x,
            y : y,
            text: text,
            orientation: 'h',
            type:"bar"
        }];
        let layout2= {
            width: 600,
            height: 600,
            title: "Top 10 OTUs found in the Sample"
        };
        Plotly.restyle("bar", "x", [x]); // Restyle plot's x
        Plotly.restyle("bar", "y", [y]); // Restyle plot's y
        Plotly.restyle("bar", "text", [text]); // Restyle plot's text  
        // Bubble plot 
        let y2 = samples.filter(x=> x.id === chosenId).map(x => x.sample_values)[0]; // Get the sample values for chosen id 
        console.log("sampleValue", sampleValues);
        let x2 = samples.filter(x => x.id === chosenId).map(x => x.otu_ids)[0]; // Get otu ids for chosen id, consider the list have 1 on 1 corespondence
        console.log("otuIds", otuIds);
        let text2 = samples.filter(x => x.id === chosenId).map(x => x.otu_labels)[0]; // Get otu labels  for chosen id, consider the list have 1 on 1 corespondence
        console.log("outlabels", otuLabels);
        let Data2 = [{
            x : x2,
            y : y2,
            mode: 'markers',
            marker: {
                color: x2,
                size: y2
            },
            type : "bubble",
            text : text2
        }];
        let layout = {
            legend : "false",
            title : "OTUs and their sample size",
            xaxis: {
                title: {
                text: 'OTU ID'
        }}};
        Plotly.restyle("bubble", "x", [x2]); // Restyle plot's x
        Plotly.restyle("bubble", "y", [y2]); // Restyle plot's y
        Plotly.restyle("bubble", "text", [text2]); // Restyle plot's text 
        Plotly.restyle("bubble", "color", [x2]); // Restyle plot's text 
        Plotly.restyle("bubble", "size", [y2]); // Restyle plot's text
        // Display metadata 
        let displayData = metadata.filter(x=>x.id===parseInt(chosenId))[0];
        let display = ""
        for ( const [key, value] of Object.entries(displayData)){
            display = `${display}<br/>${key}: ${value}`;
        };
        d3.select("#sample-metadata").html(display);
    }); 
    metaData();
    bubblePlot();
   barplot();
});
