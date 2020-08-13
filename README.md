# currency-converter

Currency Converter app is a simple app for exchanging currencies. It is built on top of Django, React, and Docker & Kubernetes.

## Link to the app

- [Currency Converter](http://34.72.133.196/)

## Technologies

`Docker, Kubernetes, Nginx, Docker Compose, Django, Django REST framework, React`

## Process to run this app

> To get started running the app:

#### With Docker & Kubernetes

1. Install [Docker](https://docs.docker.com/get-docker/)
2. If not installed Docker desktop, install [Kubernetes with Minikube](https://kubernetes.io/docs/setup/learning-environment/minikube/) or [MicroK8s](https://microk8s.io/docs) for linux
3. Clone the repository `https://github.com/blaisebakundukize/currency-converter.git`
4. Get terminal to the cloned repo
5. Run this command to create Secret for the database password -> `kubectl create secret generic pgpassword --from-literal PGPASSWORD=<your secret password>`
6. Configure [ingress-nginx](https://kubernetes.github.io/ingress-nginx/deploy/) based on your docker&&kubernetes installation
7. Run `kubectl apply -f k8s` to apply kubernetes files configuration
8. Run `kubectl get pods` to check if all objects have applied successfully
9. Run `kubectl get service --all-namespaces`
10. Select an IP address that ingress-nginx-controller is running on to use it.

- Use the IP address in your browser for the following Endpoints & for the front-end

#### With Docker & Docker-Compose (locally only)

1. Install [Docker](https://docs.docker.com/get-docker/)
2. If not installed Docker desktop, install [Compose](https://docs.docker.com/compose/install/) for linux
3. Clone the repository `https://github.com/blaisebakundukize/currency-converter.git`
4. Get terminal to the cloned repo
5. Run this command to build images `docker-compose build`
6. Run this command to start app `docker-compose up`
7. Open new tab in terminal, then run this command to get nginx container id `docker ps`
8. Use nginx container id to get an IPAddress it is running on `docker inspect <nginx container id>`
9. Look for the IPAddress from the above command, then use it for the following Endpoints & for the front-end

## Endpoints:

### Register:

- `POST /api/user/create`

### Login:

- `POST /api/user/token/`

### get user:

- `GET /api/user/me/`

### Currency Base:

- `POST /api/currency/base/`
- `GET /api/currency/base/`
- `GET /api/currency/base/{id}`
- `PUT /api/currency/base/{id}`
- `DEL /api/currency/base/{id}`

### Create Exchange Rates

- `POST /api/currency/exchange_rates/`
- `GET /api/currency/exchange_rates/`
- `GET /api/currency/exchange_rates/{id}`
- `PUT /api/currency/exchange_rates/{id}`
- `DEL /api/currency/exchange_rates/{id}`

## Deployment

This app was deployed on Google Kubernetes Engine (GKE).

- Docker images (client&server) are pushed on my docker hub as public

## Authors

- [Blaise Bakundukize](https://github.com/blaisebakundukize) - Initial work

## License

This project is licensed under the MIT License
