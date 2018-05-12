#execute.py

import curl_API as cl
import json 

def add_relationship(user_id1, user_id2, info):
  resultjs = cl.invoke('addAsset',
              '''["{},{},{}","test","to record","ZIG","1","lover_test"]'''.format(user_id1,user_id2,info),
              '''97adf9eabe6b698a27371b64c9dc2c65ec275952''')
  result = json.loads(resultjs)
  if result["success"] == False:
    print("add fail")
  else:
    print("add success")

def search_relationship(user_id):
  resultjs = cl.blocks()
  result = json.loads(resultjs)
  for block in result:
    if block["transactions"]["args"][0] == "addAsset":
      when,who,why = block[]



add_relationship('hqy','yjn','fall in love')