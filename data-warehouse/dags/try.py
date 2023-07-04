import psycopg2
import pandas as pd

conn = psycopg2.connect(database="data_warehouse", user="postgres", password="postgres", host="postgres", port="5432")
cursor = conn.cursor()
cursor.execute("""SELECT * FROM staging_booking""")
booking_rows = cursor.fetchall()
cursor.execute("""SELECT * FROM staging_registered_partyroom""")
partyroom_rows = cursor.fetchall()
cursor.execute("""SELECT * FROM staging_registered_users""")
user_rows = cursor.fetchall()
conn.commit()
df = pd.concat([
    pd.DataFrame(booking_rows),
    pd.DataFrame(partyroom_rows),
    pd.DataFrame(user_rows)
], ignore_index=True)
df.to_csv(".\data_warehouse.csv", index=False)
print("CSV saved!")
cursor.close()
conn.close()