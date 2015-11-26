curl -u root:J6HoMqKo -X PUT "http://localhost:15984/item"
for i in $(find _attachments/items/*);
do
  UUID=$(curl "http://localhost:15984/_uuids?count=1" | awk -F '"' '{print $4}')
  curl -u root:J6HoMqKo -X PUT -d @$i "http://localhost:15984/item/$UUID"
done;

