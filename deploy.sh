docker build -t bblaise/currency-converter-client:latest -t bblaise/currency-converter-client:$SHA -f ./client/Dockerfile ./client
docker build -t bblaise/currency-converter-server:latest -t bblaise/currency-converter-server:$SHA -f ./server/Dockerfile ./server

docker push bblaise/currency-converter-client:latest
docker push bblaise/currency-converter-server:latest

docker push bblaise/currency-converter-client:$SHA
docker push bblaise/currency-converter-server:$SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=bblaise/currency-converter-server:$SHA
kubectl set image deployments/client-deployment client=bblaise/currency-converter-client:$SHA
