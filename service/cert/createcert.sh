#!/bin/bash
openssl req -newkey rsa:4096  -x509  -sha512  -days 36500 -nodes -out certificate.pem -keyout privatekey.pem
