from flask import Flask, jsonify, render_template
from flask_cors import CORS
from controllers.HashController import HashController

app = Flask(__name__)

CORS(app)

Hash_Database = [["Activity.pdf-md5", "06e85af5cdbf921e4a1c5d1d2cd4bc04", "22/11/2019"], 
                ["Activity.pdr-sha1", "d07a58d750052fc575a57bbb7f0410a3b20990ca", "22/11/2019"],
                ["Charte-Epitech-2019-2020.pdf-md5", "120cbeccb827f17fb4078e9758e0b075", "21/11/2019"],
                ["Charte-Epitech-2019-2020.pdf-sha1", "16e469fbb708a9317d9a84db40244b78f77ff5a1", "21/12/2019"],
                ["CDD_a_terme_imprecis_a_temps_partiel.pdf", "837a3fe04c8ad89c038323c77eda571f", "21/10/2019"],
                ["END"]]


@app.route('/goPython/<acte_name>', methods=["GET"])
def compare_hash(acte_name):
    retour_pourri = HashController.hash_pourri(acte_name)

    return jsonify(retour_pourri)

@app.route('/', methods=["GET"])
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
