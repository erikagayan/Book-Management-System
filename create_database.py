import sqlite3

# connect to db
conn = sqlite3.connect('books.db')
cursor = conn.cursor()

# execute script
with open('create_books_table.sql', 'r') as sql_file:
    sql_script = sql_file.read()

cursor.executescript(sql_script)
conn.close()

print("The books table was successfully created in the books.db database")
