#Block_API.py

import requests

apikey = '5af66c9d292d370012e7f886'
chain_name = 'lwj2'
chaincode_name = 'zigledger-asset'

query_url = 'https://baas.ziggurat.cn/public-api/call/{}/{}/query?apikey={}'.format(chain_name,chaincode_name,apikey)

invoke_url = 'https://baas.ziggurat.cn/public-api/call/{}/{}/invoke?apikey={}'.format(chain_name,chaincode_name,apikey)
# print(invoke_url)
blocks_url = 'https://baas.ziggurat.cn/public-api/chain/{}/blocks?apikey={}'.format(chain_name,apikey)
import json

def query(func, params):
  print(params)
  try:
    data = {"func": func, "params": params}
    r = requests.post(query_url, data = data)
    r.raise_for_status()
    r.encoding = r.apparent_encoding
  except Exception as e:
    print("query error: {} !".format(e))
    # return False
  else:
    print(r.text)
    print("query success!")

def invoke(func, params,account):
  try:
    data = {"func": func, "params": params,"account":account}
    r = requests.post(invoke_url, data = data)
    r.raise_for_status()
    r.encoding = r.apparent_encoding
  except Exception as e:
    print("invoke error: {} !".format(e))
    # return False
  else:
    print( json.dumps(json.loads(r.text),indent = 2) )
    print("invoke success!")
# invoke("invoke", ["a", "b", "5"],'i2b581201ab4d9783035440b39a475900766c5dc3')

def blocks():
  try:
    r = requests.get(blocks_url)
    r.raise_for_status()
    r.encoding = r.apparent_encoding
  except Exception as e:
    print("blocks error: {} !".format(e))
    # return False
  else:
    print(r.text)
    print("blocks success!")

user1 = '911473d17cbf428efc5f43cf0ac82e1b83bdcc0e'

query('queryUser',["id2"])

invoke("addUser",['b2','2'],user1)

query('queryUser',["id2"])

# blocks()