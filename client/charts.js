/* this script contains all the functionality for the charts presented on the dashboard page and the trends page */
$(function () { 
	console.log('got into chart');
    $('#highchart_container').highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: '30-day Glucose Readings'
        },
        xAxis: {
        	type: 'datetime',
            title: {
            	text: 'Date and Time'
            }
        },
        yAxis: {
            title: {
                text: 'Glucose Level'
            }
        },
        series: [{
            name: 'all',
            data: [1, 0, 4]
        }]
    });
});