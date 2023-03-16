#!/usr/bin/python
# -*- coding: utf-8 -*-

import subprocess
from flask import Flask, request, redirect, url_for

app = Flask(__name__)

@app.route('/', methods=['GET'])
def homepage():
  return redirect(url_for('static', filename='index.html'))

@app.route('/submit', methods=['POST'])
def api_submit_form():
  data = request.json
  arguments = [
    r'C:\Documents and Settings\flow_model\flow.exe',
    data['Exe path'],
    data['Polynomial'],
    data['Constant'],
    data['Render Options'],
  ]
  print(arguments)
  subprocess.Popen(arguments)
  return 'success'

if __name__ == '__main__':
  app.run()
