Currently hosted on: https://tinderlytics.com/
# Tinderlytics

A Flask app that analyzes and transforms a .zip file into an analyzable view from a web interface. It is implemented using Python and Flask.

## Features

- Upload and process a .zip file.
- Display the analyzed data in an interactive web interface.

## Development

1. Clone the repository:
   ```
   git clone https://github.com/Sentexi/tinderlytics-web.git
   ```

2. Navigate to the project directory:
   ```
   cd tinderlytics-web/
   ```

3. Create and activate a virtual environment (optional but recommended):
   ```
    python -m venv venv
    source venv/bin/activate       # activate virtual environment (Linux)
    ```
4. Install requirements
   ```
   pip install -r requirements.txt
   ```
   
5. Start the application server:
  ```bash 
      flask run
  ```
      
6. Open your browser, navigate to [http://localhost:5000](http://localhost:5000), and start using your app!

## Usage

1. Modify the start.sh to your liking

2. Launch the Flask server:

  ```bash 
      ./start.sh
  ```

3. In your browser, go to [http://localhost:7997](http://localhost:7997) to access the web interface.

4. Upload a .zip file containing data for analysis.

5. Once uploaded, analyze and transform the data as desired.

6. Continue exploring other features of the web interface based on your specific implementation details.


## Contributing

Pull requests are welcome! For major changes or significant enhancements, it would be best first to open an issue to discuss what you would like to change or add.


## License

[MIT](https://choosealicense.com/licenses/mit/) © Andrey Belkin


``` 
