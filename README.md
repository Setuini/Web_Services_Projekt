# Platra

## Start Backend 

```
$ cd platra_api
$ docker-compose up
$ sh cms.sh
```

## Start Backend Tests

```
$ docker-compose run app rails test
```

## Start Frontend

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

## Ports

```
http://localhost:3000 - Backend
http://localhost:3001 - Frontend
http://localhost:8181 - phpMyAdmin (Username: root Password: root)
```

## Fix "A server is already running."

```
$ cd platra_api/tmp/pids && rm -rf server.pid 
```



