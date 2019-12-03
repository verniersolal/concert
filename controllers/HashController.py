import hashlib
from server import mysql


class HashController:

    def hash_pourri(self, acte_name):
        print("hello")
        BUF_SIZE = 65536

        md5 = hashlib.md5()
        sha1 = hashlib.sha1()

        with open(acte_name, 'rb') as f:
            while True:
                data = f.read(BUF_SIZE)
                if not data:
                    break
                md5.update(data)
                sha1.update(data)

        # print(format(md5.hexdigest()))
        # print(format(sha1.hexdigest()))

        # Comparing hashes to database

        i = 0
        while Hash_Database[i][0] != "END":
            if format(md5.hexdigest()) == Hash_Database[i][1]:
                return "L'acte", Hash_Database[i][0], "est authentique. Il à été téléversé le",Hash_Database[i][2]
            else:
                i += 1
            if Hash_Database[i][0] == "END":
                return "L'acte n'est pas présent dans les données"

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
    def insert_into_db(cls):
        cur = mysql.connection.cursor()
        cur.execute("insert into file (file_name, file_hash, created_at) values ('{0}', '{1}', '{2}')")
        mysql.connection.commit()
        return 0

