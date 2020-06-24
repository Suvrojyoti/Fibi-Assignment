# Fibi-Assignment
###Post request
Url: 
```sh
http://localhost:3000/upload-images
```

body :

```sh
{
 "url": "https://cdn.eso.org/images/screen/eso0202a.jpg",
 "name": "nebula",
 "type": "image"
}
```


###Get request


To get all objects:

```sh
http://localhost:3000/get-images
```

To get object matching the nameString in a particular offset and limit:

```sh
http://localhost:3000/get-images?nameString=nebula&offset=2&limit=1
```