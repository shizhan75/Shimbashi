#!/usr/bin/python
# -*- coding: utf-8 -*-

import subprocess

def run(cmd):
  with subprocess.Popen(cmd.split(' '), stdout=subprocess.PIPE, stderr=subprocess.STDOUT) as process:
    for line in process.stdout:
      print('[OUTPUT]')
      print(line.decode('utf8'))

run('python3 test.py')
