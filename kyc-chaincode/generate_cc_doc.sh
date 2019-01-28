pwd="$PWD"
mkdir -p chaincode/documentation
for d in ./chaincode/*/ ; do (cd "$d" && result=${PWD##*/} && godoc . > "$pwd"/chaincode/documentation/"$result".txt); done