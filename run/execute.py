#execute.py

account = '3ddba2981c42cecdfee9e845e5615ffc721f1daa'

import curl_API as cl
import json 

begin = 5 # 截止块，截止后的区块链都是严格按照格式生成的可检索的块
username = 'lover_test' # 公用区块链的私有用户

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

def del_relationship(user_id1, user_id2, info):
  resultjs = cl.invoke('deleteAsset',
              '''["{}&#@{}&#@{}"]'''.format(user_id1,user_id2,info),
              account)
  print( resultjs )

from datetime import datetime
from datetime import timedelta

def search_relationship(user_id):
  d = []
  global begin
  resultjs = cl.blocks()
  result = json.loads(resultjs)

  for block in result:

    if block["id"]<begin:
      continue
    
    transactions = block["transactions"][0]
    if transactions["args"][-1]!=username:
      continue
    elif transactions["args"][0] == "addAsset":
      branch = 'add'
    elif transactions["args"][0] == "deleteAsset":
      branch = 'del'
    else:
      continue

    when =  transactions["timestamp"]
    # "2018-05-12T15:37:14.000Z"
    when = ( datetime.strptime(when,"%Y-%m-%dT%H:%M:%S.000Z") + timedelta(hours = 8) ).strftime("%Y.%m.%d") 
    # "2018.5.12"
    try:
      who1,who2,why = transactions["args"][1].split('&#@') 
    except IndexError:
      print(block)
      raise(IndexError)
    if who1 == user_id:
      who = who2
    elif who2 == user_id:
      who = who1
    else:
      continue

    d.append( {"id":block["id"],"when":when,"who":who,"why":why,"type":branch} )

  d = sorted(d,key = lambda x:x["id"])
  answer = {"datas":d}
  print(json.dumps(answer, ensure_ascii=False ,indent=2))
