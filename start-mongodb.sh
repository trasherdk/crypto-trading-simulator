#!/bin/bash

CWD=$(dirname $0)
[ "$CWD" = "." ] && CWD=$(pwd)


LOGFILE=$CWD/logs/mongodb.log
PIDFILE=$CWD/logs/mongodb.pid

pid=$(cat $PIDFILE)
echo "cat return $? with pid: ${pid}"

if [ "${pid}" != "" -a -L /proc/${pid}/exe ]; then
	echo -e "${RED}MongoDB is allready running.${RESTORE}\n"
	exit 1
fi

echo -e "${GREEN}Starting MongoDB.${RESTORE}\n"

/opt/mongodb/bin/mongod \
	--dbpath $CWD/data \
	--bind_ip 192.168.1.70,localhost \
	--fork \
	--pidfilepath $PIDFILE \
	--logpath  $LOGFILE
