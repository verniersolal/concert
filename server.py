from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from flask_mysqldb import MySQL
from config.config import config
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
CORS(app)
mysql = MySQL(app)

# import of controller after mysql variable (circular dependence)
from controllers.HashController import HashController

# Mysql database config
app.config['MYSQL_HOST'] = config['host']
app.config['MYSQL_USER'] = config['user']
app.config['MYSQL_PASSWORD'] = config['pass']
app.config['MYSQL_DB'] = config['db']

# upload folder for files
UPLOAD_FOLDER = './files'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


# MVP: upload file to check the auth
@app.route('/', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            return 'not a file'
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            return 'not a name'
        if file:
            filename = secure_filename(file.filename)
            print(filename)
            return 'ok'


# insert file into database
@app.route('/insert', methods=['POST'])
def insert():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            return 'not a file'
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            return 'not a name'
        if file:
            filename = secure_filename(file.filename)
            print(filename)
            return 'ok'
    return 0


@app.route('/')
def home():
    return 'render'

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
