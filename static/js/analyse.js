// analyse.js

const currentURL = window.location.href;
const parts = currentURL.split('/');
const lastPart = parts[parts.length - 1];
const identifier = parseInt(lastPart);

fetch('../tinder7D/' + identifier)
  .then(response => response.text())
  .then(csvData => {
    const parsedData = parseCSV(csvData);
  
    const labels = parsedData.map(data => data.Datum);
    const appOpens = parsedData.map(data => parseInt(data.app_opens));
    const swipesLikes = parsedData.map(data => parseInt(data.swipes_likes));
    const swipesPasses = parsedData.map(data => parseInt(data.swipes_passes));
    const superlikes = parsedData.map(data => parseInt(data.superlikes));
	const matches = parsedData.map(data => parseFloat(data.matches));
	
	// Calculate and populate match rate values
      const matchrate = parsedData.map(
      	data =>
            parseFloat((parseInt(data.matches) / (parseInt(data.swipes_likes) || 1)) * 100)
        );

      var ctx = document.getElementById('TinderChart').getContext('2d');
    
      new Chart(ctx,{
      type: 'line',
      options: {
        responsive: true,
		maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {autoSkip:false},
          },
        
		  y1:{
          id:'y-axis-1',
          position:'left'
        },
          y2:{
          id:'y-axis-2',
          position:'right'
        },
		  y3:{
		  id:'y-axis-3',
		  position:'right'
		  }
		}
      },
	  
	  
	  
	  
 data:{
       labels : labels,
       datasets : [
           // App Opens and Swipes Likes sharing the same axis (y1)
           {
                label:'App Opens',
                borderColor:'#0a0a0a',
                fill:false,
                yAxisID:'y1', // Linking to left axis
				xAxisID:'x',
                data : appOpens,
				hidden : true,
           },
           {
                 label:'Swipes Likes',
                 borderColor:'#4286f4' ,
                 fill:false ,
                 yAxisID:'y1', // Linking to left axis
				 xAxisID:'x',
                 data : swipesLikes

          }, 
           
          // Swipes Passes using its own axis (y1)
          {
              label:'Swipes Passes',
              borderColor:'#f87979' ,
                  fill:false , 
              yAxisID:'y1', // Linking to left axis
			  xAxisID:'x',
                 data:swipesPasses,
				 hidden : true,
         },

        // Matches using a separate secondary axis (y2)
        {
             label:'Matches',
             borderColor:'#42f474' ,  
             fill:false,      
         yAxisID: 'y2', // Using right axis
		 xAxisID:'x',
             data:matches       
             
         },
		// Match Rate using a separate secondary axis (y-axis-2)
        {
               label:'Match Rate',
           yAxisID: 'y3', 	// Use right axis 
		   xAxisID:'x',
           borderColor:'#db1fe2',                           
             fill:false,
           data: matchrate,
		   hidden : true,
        }
		 
    ]
 }
     });
});


function parseCSV(csvString) {
   const lines = csvString.trim().split('\n');
   const headers = lines.shift().split(',');
   
   // Add "Match Rate" header to headers array
   headers.push('Match Rate');

   return lines.map(line => {
      const values = line.split(',').map(value => value.trim());
      let obj = {};
      
      for (let i = 0; i < headers.length; i++) {
         if (headers[i] === 'Match Rate') {
            // Calculate Match Rate: likes / matches * 100
            const likes = parseInt(values[headers.indexOf('swipes_likes')]);
            const matches = parseInt(values[headers.indexOf('matches')]);

        if (likes && matches) {  
           obj['Match Rate'] =
                  Math.round((likes / matches) * 100);
        } else {
           obj['Match Rate'] = null;
        }
     } else {
           obj[headers[i]] = values[i];
         }
       }
       
       return obj;
    });
}