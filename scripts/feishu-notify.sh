curl -X POST -H \"Content-Type: application/json\" \
  -d \'{"msg_type":"text","content":{"text":"$1"}}\' \
  $2
