import execute as ex

import sys

args_h=sys.argv
#todelete
# print ('Number of arguments:', len(sys.argv))
# print ('They are:', str(sys.argv))
# print(type(sys.argv))
# print(args_h)
# print(type(args_h[1]))
# print(type(args_h[2]))

# ex.cl.blocks()
if(args_h[1]=="add"):
    userid1=args_h[2]
    userid2=args_h[3]
    infom=args_h[4]
    ex.add_relationship(userid1,userid2,infom)
    print("executed add function")
elif(args_h[1]=="del"):
    userid1=args_h[2]
    userid2=args_h[3]
    infom=args_h[4]
    ex.del_relationship(userid1,userid2,infom)
    print("executed delete function")
elif(args_h[1]=="sch"):
    usrid=args_h[2]
    ex.search_relationship(usrid)  
    print("executed search function")
elif(args_h[1]=="blk"):
    ex.cl.blocks()
else:
    print("wrong command type")

