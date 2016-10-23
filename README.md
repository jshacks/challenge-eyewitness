## How to install ##

### clone the project ###

### Install dependencies: ###
```
cd <%project-folder%>
$ npm install
$ bower install
```

### Install gulp globaly ###
```
$ sudo npm install gulp -g
```

### Install http-server or any other server ###
```
$ sudo npm install http-server -g
```

### Build the client side: ###
```
$ gulp fetchLibs
$ gulp inject
```

### Run the client side ###
```
$ http-server client
```

### Build the api side ###
```
$ cd <%project-folder%>/api
$ npm install
```

### Run the api side ###
```
$ node .
```
