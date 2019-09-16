#!/bin/bash

CWD=$(realpath $(dirname $0))
[ "$CWD" = "." ] && CWD=$(pwd)


LOGFILE=$CWD/logs/mongodb.log
PIDFILE=$CWD/logs/mongodb.pid
DBPATH=/home/crypto/local/trading/crypto-trading-simulator/data

pid=$(pgrep mongod)
echo "cat return $? with pid: ${pid}"

if [ "${pid}" != "" -a -f /proc/${pid}/exe ]; then
	echo -e "${RED}MongoDB is allready running.${RESTORE}\n"
	exit 1
fi

echo -e "${GREEN}Starting MongoDB.${RESTORE}\n"

/opt/mongodb/bin/mongod \
	--dbpath ${DBPATH} \
	--bind_ip 192.168.1.70,localhost \
	--fork \
	--pidfilepath $PIDFILE \
	--logpath  $LOGFILE
