#!/bin/bash

CWD=$(realpath $(dirname $0))
[ "$CWD" = "." ] && CWD=$(pwd)

MONGO=$(which mongod)
LOGFILE=$CWD/logs/mongodb.log
PIDFILE=$CWD/logs/mongodb.pid
DBPATH=$CWD/data

[ -d $CWD/logs ] || mkdir $CWD/logs
[ -d $CWD/data ] || mkdir $CWD/data

pid=$(pgrep mongod)
echo "Check return $? with pid: ${pid}"

if [ "${pid}" != "" -a -f /proc/${pid}/exe ]; then
	echo -e "${RED}MongoDB is allready running.${RESTORE}\n"
	exit 1
fi

echo -e "${GREEN}Starting MongoDB.${RESTORE}\n"

${MONGO} \
	--dbpath ${DBPATH} \
	--bind_ip localhost \
	--fork \
	--pidfilepath $PIDFILE \
	--logpath $LOGFILE
