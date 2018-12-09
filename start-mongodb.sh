#!/bin/bash

CWD=$(dirname $0)
[ "$CWD" = "." ] && CWD=$(pwd)

/opt/mongodb/bin/mongod \
	--dbpath $CWD/data \
	--bind_ip 192.168.1.70,localhost \
	--fork \
	--logpath  $CWD/logs/mongodb.log
