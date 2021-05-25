#!/bin/bash
mkdir -p ~/adda_data/postgre
#docker-compose build
docker-compose -f ./config/docker-compose.yml up
