FROM python:3.7-alpine
LABEL maintainer="bblaise@example.com"

ENV PYTHONUNBUFFERED 1

# Install dependencies
COPY ./requirements.txt /requirements.txt
RUN apk add --update --no-cache postgresql-client
RUN apk add --update --no-cache --virtual .tmp-build-deps \
  gcc libc-dev linux-headers postgresql-dev
RUN pip install -r /requirements.txt
RUN apk del .tmp-build-deps

# Setup directory structure
RUN mkdir /app
WORKDIR /app
COPY ./app/ /app

RUN addgroup -S appgroup && adduser -S bblaise -G appgroup
RUN chown bblaise:appgroup -R /app
USER bblaise

# RUN adduser -D bblaise
# RUN chown bblaise:bblaise -R /app/

# ENTRYPOINT [ "/app/entrypoint.sh" ]


CMD ["python", "./manage.py", "runserver", "0.0.0.0:8000"]

# CMD [ "python", "./manage.py", "runserver", "0.0.0.0:8000", "--settings=mysite.settings.prod" ]