#!/bin/bash

# Usage: ./minio-upload my-bucket my-file.zip

bucket=$1
file=$2

host=localhost
s3_key=svc_example_user
s3_secret=svc_example_user_password

resource="/${bucket}/${file}"
content_type="application/octet-stream"
date=`date -R`
_signature="PUT\n\n${content_type}\n${date}\n${resource}"
signature=`echo -en ${_signature} | openssl sha1 -hmac ${s3_secret} -binary | base64`

curl -X PUT -T "${file}" \
          -H "Host: ${host}" \
          -H "Date: ${date}" \
          -H "Content-Type: ${content_type}" \
          -H "Authorization: AWS ${s3_key}:${signature}" \
          https://${host}${resource}
