USER=$(grep db .couchapprc | sed -e 's/.*http:\/\/\(.*\)@.*/\1/' | awk -F: '{print $1}')
PASSWORD=$(grep db .couchapprc | sed -e 's/.*http:\/\/\(.*\)@.*/\1/' | awk -F: '{print $2}')
SERVER="http://michael.virtuos.uni-osnabrueck.de:15984"

curl -u $USER:$PASSWORD -X PUT "$SERVER/verleihfix"
for i in $(find _attachments/users/*);
do
  UUID=$(curl "$SERVER/_uuids?count=1" | awk -F '"' '{print $4}')
  curl -u $USER:$PASSWORD -X PUT -d @$i "$SERVER/verleihfix/$UUID"
done;

echo
echo
echo
echo "If the above did not work please edit USER and PASSWORD in pushusers.sh"
