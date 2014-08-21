#!/bin/bash

# A script that generates a signing key (if needed) and then makes 
# a tizen xpk file from a crosswalk html5 app.

export MAKE_XPK_SCRIPT=make_xpk.sh

if [[ $# -ne 1 || ! -d $1 ]]
 then
	echo "Usage: make_and_sign_xpk.sh DIRECTORY"
   echo "       DIRECTORY should contain the crosswalk app to be packaged"
   exit -1
fi

# remove any trailing slashes from the directory name to get a package name
export package=${1%/}

# make a signing key if there isn't already one in the directory
if [ -f $package.pem ]
 then
	echo "$package.pem file exists.  Not regenerating."
else
	echo "Generating private key file $package.pem..."
	openssl genrsa -out $package.pem 1024
fi

# use the crosswalk-provided make_xpk.sh to actually generate the package
echo "Making $package.xpk..."
$MAKE_XPK_SCRIPT $package $package.pem
