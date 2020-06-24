# Fibi-Assignment
For Post request:
Url: http://localhost:3000/upload-images
body :
{
 "url": "https://cdn.eso.org/images/screen/eso0202a.jpg",
 "name": "nebula",
 "type": "image"
}


For Get request:

To get all objects:

http://localhost:3000/get-images

To get object matching the nameString in a particular offset and limit:

http://localhost:3000/get-images?nameString=nebula&offset=2&limit=1