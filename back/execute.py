#execute.py

import curl_API as cl
import json 

begin = 25

def del_relationship(user_id1, user_id2, info):
  resultjs = cl.invoke('addAsset',
              '''["{}&#@{}&#@{}","test","to record","ZIG","1","lover_test"]'''.format(user_id1,user_id2,info),
              '''97adf9eabe6b698a27371b64c9dc2c65ec275952''')
  with open("out.json","w") as fp:
    fp.write( resultjs )

# invoke('deleteAsset','''["{}-{}"]'''.format(From,To),'''97adf9eabe6b698a27371b64c9dc2c65ec275952''')
def add_relationship(user_id1, user_id2, info):
  resultjs = cl.invoke('deleteAsset',
              '''["{}&#@{}&#@{}"]'''.format(user_id1,user_id2,info),
              '''97adf9eabe6b698a27371b64c9dc2c65ec275952''')
  with open("out.json","w") as fp:
    fp.write( resultjs )

def search_relationship(user_id):
  d = {"haved":{},"lost":{}}
  global begin
  resultjs = cl.blocks()
  with open("log.json","w") as fp:
    fp.write(resultjs)
  result = json.loads(resultjs)
  for block in result:
    if block["id"]<begin:
      continue

    if block["transactions"][0]["args"][0] == "addAsset":
      when =  block["transactions"][0]["timestamp"]
      who1,who2,why = block["transactions"][0]["args"][1].split('&#@') 
      if who1 == user_id:
        who = who2
      else:
        if who2 == user_id:
          who = who1
        else:
          continue
      d["haved"][block["id"]] = {"when":when,"who":who,"why":why}

    if block["transactions"][0]["args"][0] == "deleteAsset":
      when = block["transactions"][0]["timestamp"]
      who1,who2,why = block["transactions"][0]["args"][1].split('&#@') 
      if who1 == user_id:
        who = who2
      else:
        if who2 == user_id:
          who = who1
        else:
          continue
      d["lost"][block["id"]] = {"when":when,"who":who,"why":why}
  
  with open("out.json","w") as fp:
    json.dump(d,fp, ensure_ascii=False ,indent=2)

add_relationship('hqy1','yjn1','fall in love')
# del_relationship('hqy','yjn','fall in love')
# search_relationship('hqy')