import hashlib
from server import mysql
import datetime

# constant variable
BLOCKSIZE = 65536


class HashController:

    @staticmethod
    def hash_file(filename):
        hasher = hashlib.sha1()
        with open(filename, 'rb') as afile:
            buf = afile.read(BLOCKSIZE)
            while len(buf) > 0:
                hasher.update(buf)
                buf = afile.read(BLOCKSIZE)
        return hasher.hexdigest()

    @classmethod
    def get_users(cls):
        cur = mysql.connection.cursor()
        cur.execute('select user_name from sys.user')
        return cur.fetchall()

    @classmethod
    def get_files(cls):
        cur = mysql.connection.cursor()
        cur.execute('select file_name from sys.file')
        return cur.fetchall()

    @classmethod
    def insert_into_db(cls, file_name, file_hash):
        cur = mysql.connection.cursor()
        cur.execute("insert into file (file_name, file_hash, created_at) values ('{0}', '{1}', '{2}')"
                    .format(file_name, file_hash, datetime.datetime.now()))
        mysql.connection.commit()
        return 0

    # this function returns 1 if the file_hash is inside the db else 0
    @classmethod
    def compare_hash(cls, file_hash):
        hashes = cls.get_file_hash()
        hashes = [item[0] for item in hashes]
        return 1 if file_hash in hashes else 0

    @classmethod
    def get_file_hash(cls):
        cur = mysql.connection.cursor()
        cur.execute("select file_hash from sys.file")
        return cur.fetchall()

