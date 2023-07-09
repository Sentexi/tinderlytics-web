from flask import Flask, render_template, request, redirect, url_for, send_file
import os
import random
import extract
import time

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return redirect(request.url)
    
    file = request.files['file']
    
    if file.filename == '':
        return redirect(request.url)
    
    if file:
        # generate unique identifier using random number with 9 digits
        unique_identifier = str(random.randint(100000000, 999999999))
        
        # create directory if it doesn't exist
        data_folder = 'Data'
        if not os.path.exists(data_folder):
            os.makedirs(data_folder)
        
        # create subdirectory using unique identifier (if desired)
        sub_directory = os.path.join(data_folder, f"{unique_identifier}")
        os.makedirs(sub_directory)
        
        # save the uploaded file inside subdirectory with filename "myData.zip"
        filepath = os.path.join(sub_directory, "myData.zip")
        file.save(filepath)
        
        #return redirect(f'/analyze/{unique_identifier}') 
        return unique_identifier
        pass

#This route does not return the analyze ID but instead directly redirects to the url    
@app.route('/upload2', methods=['POST'])
def upload2():
    if 'file' not in request.files:
        return redirect(request.url)
    
    file = request.files['file']
    
    if file.filename == '':
        return redirect(request.url)
    
    if file:
        # generate unique identifier using random number with 9 digits
        unique_identifier = str(random.randint(100000000, 999999999))
        
        # create directory if it doesn't exist
        data_folder = 'Data'
        if not os.path.exists(data_folder):
            os.makedirs(data_folder)
        
        # create subdirectory using unique identifier (if desired)
        sub_directory = os.path.join(data_folder, f"{unique_identifier}")
        os.makedirs(sub_directory)
        
        # save the uploaded file inside subdirectory with filename "myData.zip"
        filepath = os.path.join(sub_directory, "myData.zip")
        file.save(filepath)
        
        return redirect(f'/analyze/{unique_identifier}') 
        #return unique_identifier
        pass
        
@app.route('/analyze/<identifier>')
def analyze(identifier):
    # Extract the zip file if it exists
    zipfile_path = os.path.join('Data', identifier, 'myData.zip')
    if not os.path.isfile(zipfile_path):
        print("no zip in folder")
    else:
        extract.extract(identifier)
    
    # You can retrieve file details using the unique identifier if required
    data_folder = 'Data'
    filepath = os.path.join(data_folder, identifier)
    
    return render_template('analyze.html', filename=filepath)  # Pass any relevant information to the template
    
@app.route('/tinder7D/<identifier>')
def tinder7d(identifier):
    filepath = os.path.join('Data', identifier, "myData")
    
    # Check if Tinder7D.csv exists in /Data/<identifier>
    csv_filepath = os.path.join(filepath, 'Tinder7D.csv')
    if not os.path.isfile(csv_filepath):
        return "CSV file not found"
    
    # Set the appropriate filename for download
    csv_filename = f'{identifier}_Tinder7D.csv'

    # Send CSV file as a response
    return send_file(csv_filepath)

if __name__ == "__main__":
   app.run(debug=True)
