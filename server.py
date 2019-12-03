from flask import Flask, jsonify, render_template
from flask_cors import CORS
from flask_mysqldb import MySQL
from config.config import config
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
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


# MVP: upload file to check the auth
@app.route('/upload', methods=['POST'])
def upload():
    return 0


# insert file into database
@app.route('/insert', methods=['POST'])
def insert():
    HashController.insert_into_db()
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
