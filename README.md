# Platra

## Install 

```
$ cd platra_api
$ docker-compose up
$ sh cms.sh
```

## Run Platra

```
http://localhost:3000
```

## Run Tests

```
$ docker-compose run app rails test
```

## Run React Frontend

```
$ cd platra_web
$ npm start
http://localhost:3001
```

## Compile less files to css

```
$ cd platra_web/src/less
$ lessc platra.less platra.css
```

## Run phpMyAdmin

```
http://localhost:8181
Username: root
Password: root
```

## Error "A server is already running."

```
$ cd platra_api/tmp/pids && rm -rf server.pid 
```



