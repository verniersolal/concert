from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from controllers.HashController import HashController

app = Flask(__name__)
CORS(app)


# upload folder for files
UPLOAD_FOLDER = './files'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


# MVP: upload file to check the auth
@app.route('/check', methods=['POST'])
def check_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            return jsonify('not a file')
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            return jsonify('not a name')
        if file:
            # secure filename
            filename = secure_filename(file.filename)
            # add into folder for read it and hash it
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            # hash function
            file_hash = HashController.hash_file(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            # remove the file
            os.remove(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            is_checked = HashController.compare_hash(file_hash)
            result = 'ok' if is_checked == 1 else 'ko'
            return jsonify(result)


# insert file into database
@app.route('/insert', methods=['POST'])
def insert():
    if request.method == 'POST':
        # check if the post request has the file part
        print(request.files)
        if 'file' not in request.files:
            return 'not a file'
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            return 'not a name'
        if file:
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            file_hash = HashController.hash_file(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            HashController.insert_into_db(filename, file_hash)
            return jsonify('file inserted')


@app.route('/')
def home():
    return render_template('index.html')

# ADMIN routes


# get file names
@app.route('/files')
def get_files():
    files = HashController.get_files()
    return jsonify(files)


# get user names
@app.route('/users')
def get_users():
    users = HashController.get_users()
    return jsonify(users)


if __name__ == '__main__':
    app.run(debug=True)
