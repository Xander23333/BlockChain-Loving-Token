#curl_API.py

import requests

apikey = '5af66c9d292d370012e7f886'
chain_name = 'lwj3'
chaincode_name = 'zigledger-asset'

query_url = 'https://baas.ziggurat.cn/public-api/call/{}/{}/query?apikey={}'.format(chain_name,chaincode_name,apikey)

invoke_url = 'https://baas.ziggurat.cn/public-api/call/{}/{}/invoke?apikey={}'.format(chain_name,chaincode_name,apikey)

blocks_url = 'https://baas.ziggurat.cn/public-api/chain/{}/blocks?apikey={}'.format(chain_name,apikey)
import json

import os
def query(func, params):
  query_order = " curl -X POST  -H'Content-Type: application/json'  -d "+\
                  " \'{{\"func\": \"{}\", \"params\": {} }}\' ".format(func,params)+\
                  "\'{}\'".format(query_url)
  textlist = os.popen(query_order).readlines()[0]
  print( json.dumps(json.loads(textlist),indent = 2) )

def invoke(func, params,account):
  invoke_order = " curl -X POST  -H'Content-Type: application/json'  -d "+\
                  " \'{{\"func\": \"{}\", \"params\": {},\"account\":\"{}\"}}\' ".format(func,params,account)+\
                  "\'{}\'".format(invoke_url)
  textlist = os.popen(invoke_order).readlines()[0]
  print( json.dumps(json.loads(textlist),indent = 2) )

def blocks():
  blocks_order = ''' curl '{}' '''.format(blocks_url)
  print(blocks_order)
  textlist = os.popen(blocks_order).readlines()[0]
  # print(textlist)
  print( json.dumps(json.loads(textlist),indent = 2) )

# blocks()