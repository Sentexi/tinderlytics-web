  window.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.querySelector('.drop-zone');
    const uploadedFilesDiv = document.querySelector('.uploaded-files');

    // Listeners for drag/drop events
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('active');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('active');
    });

      async function handleRedirect(identifier) {
        try {
        	window.location.href = `/analyze/${identifier}`;

          	// Handle additional logic after successful redirection

        } catch (error) {
            console.error(error);
        }
      }

    dropZone.addEventListener('drop', async (e) => {

      e.preventDefault();

      // Get the dropped file(s)
      const files = e.dataTransfer.files;

      // Loop through each dropped file and upload
      for(let i=0; i<files.length; i++){
        const formData = new FormData();
          formData.append("file", files[i]);

          try {
            const response = await fetch('/upload', { method: 'POST', body: formData });
            if (!response.ok) throw new Error(response.statusText);
            
              const data = await response.text();

              createUploadedFileElement(files[i].name);
    
              console.log(data);  // Check server response
    
              setTimeout(() => handleRedirect(data.trim()), 3000);  // Redirect to /analyze/[unique identifier]                    

        } catch (error){
          console.error(error);
        }
      }

      if(dropZone.classList.contains("active")){
        setTimeout(() =>{
          uploadDropzoneAnimationActive();
         },500);
       }    
          
       setTimeout(() =>{
         removeDropzoneAnimationActivate(); 
       },2000);
    });

    function createUploadedFileElement(filename){
      let uploadedFileHTML= `<div class="uploaded-file">${filename}</div>`;
      uploadedFilesDiv.innerHTML =uploadedFilesDiv.innerHTML + uploadedFileHTML;
    }

    function uploadDropzoneAnimationActive (){
        dropZone.style.border = "4px dashed purple";
        dropZone.style.backgroundColor = "pink";
      }

      function removeDropzoneAnimationActivate(){
          dropZone.style.border = "2px dashed #ccc";
          dropZone.style.backgroundColor="";
      } 

});