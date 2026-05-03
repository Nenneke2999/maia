#!/bin/bash

if [[ "$1" == "" ]]; then
	nohup make run-int-py > int.log &
	nohup make run-ext-py > ext.log &
	nohup make run-go > go.log &
elif [[ "$1" == "k" ]]; then
	ps -ef | grep internal/server.py | grep -v grep | awk '{print $2}' | xargs kill 2> /dev/null
	ps -ef | grep external/server.py | grep -v grep | awk '{print $2}' | xargs kill 2> /dev/null
	ps -ef | grep run-go | grep -v grep | awk '{print $2}' | xargs kill 2> /dev/null
	ps -ef | grep cmd/main.go | grep -v grep | awk '{print $2}' | xargs kill 2> /dev/null
	sudo lsof -i -P -n | grep 4000 | awk '{print $2}' | xargs kill 2> /dev/null
elif [[ "$1" == "rg" ]]; then
	nohup make run-go > go.log &
fi