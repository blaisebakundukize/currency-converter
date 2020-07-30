docker build -t bblaise/currency-converter-client:$SHA -t bblaise/currency-converter-client:latest -f ./client/Dockerfile ./client
docker build -t bblaise/currency-converter-server:$SHA -t bblaise/currency-converter-server:latest -f ./server/Dockerfile ./server

docker push bblaise/currency-converter-client:$SHA
docker push bblaise/currency-converter-server:$SHA

docker push bblaise/currency-converter-client:latest
docker push bblaise/currency-converter-server:latest

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=bblaise/currency-converter-server:$SHA
kubectl set image deployments/client-deployment client=bblaise/currency-converter-client:$SHA