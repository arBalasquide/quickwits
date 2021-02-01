#!/bin/bash

dropdb quickwits && createdb quickwits && rm -rf ./dist && rm -rf ./src/migrations* && yarn create:migration
