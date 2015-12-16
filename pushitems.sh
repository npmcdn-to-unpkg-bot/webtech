USER=$(grep db .couchapprc | sed -e 's/.*http:\/\/\(.*\)@.*/\1/' | awk -F: '{print $1}')
PASSWORD=$(grep db .couchapprc | sed -e 's/.*http:\/\/\(.*\)@.*/\1/' | awk -F: '{print $2}')

curl -u $USER:$PASSWORD -X PUT "http://localhost:15984/verleihfix"
for i in $(find _attachments/items/*);
do
  UUID=$(curl "http://localhost:15984/_uuids?count=1" | awk -F '"' '{print $4}')
  curl -u $USER:$PASSWORD -X PUT -d @$i "http://localhost:15984/verleihfix/$UUID"
done;

echo
echo
echo
echo "If the above did not work please edit USER and PASSWORD in pushitems.sh"
