# Platra

## Install 

```
$ docker-compose up
$ docker-compose run app rake db:create
$ docker-compose run app rake db:migrate
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



