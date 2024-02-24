#! /bin/sh

# HTTPS is required for the barcode scanner to be allowed in browser environments
# Skip preflight check due to some testing framework library issues :(
HTTPS=true SKIP_PREFLIGHT_CHECK=true NODE_OPTIONS=--openssl-legacy-provider npm start