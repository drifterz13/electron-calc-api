## electron-calc-api

**first time http request take some time.** 

### Register

```
POST - https://i0iedy2914.execute-api.us-east-1.amazonaws.com/dev/register
```
Parameters:
* **username**: String,
* **password**: String

```  
ex. axios.post(url, { username: 'test', password: 'test' })
``` 
 
 
### Login 

Use the same parameter as Register

```
POST - https://i0iedy2914.execute-api.us-east-1.amazonaws.com/dev/login
```


### Save data

```
POST - https://i0iedy2914.execute-api.us-east-1.amazonaws.com/dev/data
```

Parameters:
* **firstVariable**: Number,
* **secondVariable**: Number,
* **operation**: String,
* **result**: Number
* **username** (String) // If you not provide username data will save to anonymous user database

### Get all save data (of user)

```
GET - https://i0iedy2914.execute-api.us-east-1.amazonaws.com/dev/datas/{user}
```

* **user**: String (Use current username of user)

```
ex. axios.get('https://i0iedy2914.execute-api.us-east-1.amazonaws.com/dev/datas/anonymous')
```


### Get select save data

```
GET - https://i0iedy2914.execute-api.us-east-1.amazonaws.com/dev/data/{id}
```

* **id**: database id

```
ex. axios.get('https://i0iedy2914.execute-api.us-east-1.amazonaws.com/dev/data/5b782e3aff2f5bc09c53b4a4')
```
