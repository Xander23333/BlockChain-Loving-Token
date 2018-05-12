#execute.py

account = '3ddba2981c42cecdfee9e845e5615ffc721f1daa'

import curl_API as cl
import json 

begin = 1 # 截止块，截止后链为严格按照格式生成的可检索块

#initUSR=''' curl -X POST  -H'Content-Type: application/json'  -d '{"func": "addUser", "params": ["lover_test","20"],"account":"8d8beaeff23e1a25893a1f1a5d2d428afc183c52"}' 'https://baas.ziggurat.cn/public-api/call/mumhelpme/zig-ledger/query?apikey=5af63cd4292d370012e7f73c' '''
def init_acccount():
  resultjs = cl.invoke('addUser',
              '''["lover_test","20"]''',
              account)
  print( resultjs )

def add_relationship(user_id1, user_id2, info):
  resultjs = cl.invoke('addAsset',
              '''["{}&#@{}&#@{}","test","to record","ZIG","1","lover_test"]'''.format(user_id1,user_id2,info),
              account)
  print( resultjs )

# invoke('deleteAsset','''["{}-{}"]'''.format(From,To),'''97adf9eabe6b698a27371b64c9dc2c65ec275952''')
def del_relationship(user_id1, user_id2, info):
  resultjs = cl.invoke('deleteAsset',
              '''["{}&#@{}&#@{}"]'''.format(user_id1,user_id2,info),
              account)
  print( resultjs )

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
  
  print(json.dumps(d, ensure_ascii=False ,indent=2))

# search_relationship('t2238usr1')
# print(cl.query('queryUser','["lover_test"]'))
# del_relationship('hqy','yjn','fall in love')
# add_relationship('hqy00','hqy00','fall in love')
