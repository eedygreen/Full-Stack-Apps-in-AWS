# README.md

# IMAGE FILTERING MICROSERVICE with NODEJS

"Image Filtering Microservice" with NodeJs is a simple cloud application developed and hosted on AWS ElasticBeanstalk alongside the Udacity Cloud Engineering Nanodegree. It allows users to download images from a public accessible address. It validate the public accessibility of the URL with queries, post photos to the feed, and process photos using an image filtering microservice.

The Steps below is targeted towards readers with knowledge of Git, AWS ElasticBeanstalk, Typescript programming, NodeJs, Node Package Manager (npm), Linux, and DevOps principles.

### Image Filter Microservice App

The image-filter url app is built with express web framework on nodejs. 

See the code

### Engineering Process and Quality

Following good cloud practices, development and production environment created for this project. All code written, build processes and deployment were done on Dev environment. The Git & GitHub Dev environment served as the working, testing, staging and deployment env before merging the updated working code to main branch. The main branch contains the most recent working and tested solution. 

### Development Server

- Install the dependencies
`npm i`
![npm install](https://github.com/eedygreen/Full-Stack-Apps-in-AWS/blob/dev/Export-7f04e737-f879-4b4f-9743-f15df834b139/README%20md%20a7c97124b5464973a7e6001c60fa892c/npm_i.png)

Fig 1.0: Installing Dependencies

<br></br>

- Switched to dev branch to commit and test the node server for dev environment

`npm run dev` 

![npm run dev(https://github.com/eedygreen/Full-Stack-Apps-in-AWS/blob/dev/Export-7f04e737-f879-4b4f-9743-f15df834b139/README%20md%20a7c97124b5464973a7e6001c60fa892c/npm_run_dev.png)

Fig 2.0: Dev Server Running

<br></br>

- The API design and Implementation

> IMPLEMENT A RESTFUL ENDPOINT
GET /filteredimage?image_url={{URL}}
endpoint to filter an image from a public url.
IT SHOULD
1. validate the image_url query
2. call filterImageFromURL(image_url) to filter the image
3. send the resulting file in the response
4. deletes any files on the server on finish of the response
QUERY PARAMATERS
image_url: URL of a publicly accessible image
RETURNS
the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
/**************************************************************************** */

see the code [here](https://github.com/eedygreen/Full-Stack-Apps-in-AWS/blob/dev/image-filter-starter-code/src/server.ts)

**Image Url Validator**

```tsx
//Image Url validator code
const url_regex    = new RegExp(/([a-z]+\:\/+)([^\/\s]+)([a-z0-9\-@\^=%&;\/~\+]*)[\?]?([^ \#\r\n]*)#?([^ \#\r\n]*)\.(?:jpeg|jpg|gif|png|svg|bpm|tiff)/ig);
    const is_Valid_url  = url_regex.test(image_url);
```

### Testing The API with POSTMAN

- **Status Code 422** Testing the API with POSTMAN for graceful failure.

    ```tsx
    catch(error) {
          return res.status(422)
                    .send(`${image_url} format not supported! See Supported formats: jpg, png, bmp, tiff, or gif`);
        }
    ```

    It failed as expected. The url validator only checks for a valid url with condition; publicly accessible and image file type. While the image filter checks if this is a supported format. 

![README%20md%20a7c97124b5464973a7e6001c60fa892c/image_processed_status_422.png](README%20md%20a7c97124b5464973a7e6001c60fa892c/image_processed_status_422.png)

Fig 3.0: Status Code 422

<br></br>

- **Status Code 200**

```tsx
try {
      //2.  calling the filterImageFromUrl function to validate the image
      const filter_image_file: string = await filterImageFromURL(image_url);
      
      //3.  sending the resulting file from filterImageFromUrl function
      res.status(200).sendFile(filter_image_file);
      
      //4. Deleting the file from the local tmp/filtered directory
      res.on('finish', () => deleteLocalFiles([filter_image_file]));
    }
```

It passed the testing as expected

![README%20md%20a7c97124b5464973a7e6001c60fa892c/image_processd_status_200.png](README%20md%20a7c97124b5464973a7e6001c60fa892c/image_processd_status_200.png)

Fig 4.0: Status Code 200

<br></br>

### ElasticBeanStalk Deployment

- Build the Application

```bash
npm run build
```

![README%20md%20a7c97124b5464973a7e6001c60fa892c/npm_run_build.png](README%20md%20a7c97124b5464973a7e6001c60fa892c/npm_run_build.png)

Fig 5.0: Build the Application

<br></br>

- Initiate the ElasticBeanstalk Application

```bash
eb init --platform node.js --region us-east-1
```

![README%20md%20a7c97124b5464973a7e6001c60fa892c/eb_init.png](README%20md%20a7c97124b5464973a7e6001c60fa892c/eb_init.png)

Fig 6.0: Initialised  ElasticBeanstalk

<br></br>

- Create the ElasticBeanstalk Environment

```bash
eb create --sample full-stack
```

![README%20md%20a7c97124b5464973a7e6001c60fa892c/eb_create.png](README%20md%20a7c97124b5464973a7e6001c60fa892c/eb_create.png)

Fig 7.1: Create ElasticBeanstalk

<br></br>

- ElasticBeanstalk Dashboard

![README%20md%20a7c97124b5464973a7e6001c60fa892c/ElasticBeanstalk_created.png](README%20md%20a7c97124b5464973a7e6001c60fa892c/ElasticBeanstalk_created.png)

Fig 7.2: ElasticBeanstalk Dashboard

<br></br>

- Testing Full-Stack Endpoint

![README%20md%20a7c97124b5464973a7e6001c60fa892c/elasticbeanstalk_endpoint.png](README%20md%20a7c97124b5464973a7e6001c60fa892c/elasticbeanstalk_endpoint.png)

Fig 8.0: Full-Stack Endpoint

<br></br>

- Deployment

```bash
eb deploy
```

Fig 8.0: ElasticBaeanstalk Deployment

![README%20md%20a7c97124b5464973a7e6001c60fa892c/eb_deploy_app.png](README%20md%20a7c97124b5464973a7e6001c60fa892c/eb_deploy_app.png)

Fig 9.1: ElasticBeanstalk Deployment

![README%20md%20a7c97124b5464973a7e6001c60fa892c/app_deployed.png](README%20md%20a7c97124b5464973a7e6001c60fa892c/app_deployed.png)

Fig 9.2: ElasticBeanstalk Deployment - Dashboard

- Response to Public URL

![README%20md%20a7c97124b5464973a7e6001c60fa892c/endpoint_downloading_link.png](README%20md%20a7c97124b5464973a7e6001c60fa892c/endpoint_downloading_link.png)

Fig 10.1: Filteredimeage download the public image

<br></br>

- filteredimage Endpoint

![README%20md%20a7c97124b5464973a7e6001c60fa892c/endpoint_elasticbeanstalk_download_image.png](README%20md%20a7c97124b5464973a7e6001c60fa892c/endpoint_elasticbeanstalk_download_image.png)

Fig 10.2: filteredimage

[http://full-stack.eba-3tfrxr3e.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://bs-uploads.toptal.io/blackfish-uploads/blog/post/seo/og_image_file/og_image/15921/secure-rest-api-in-nodejs-18f43b3033c239da5d2525cfd9fdc98f.png](http://full-stack.eba-3tfrxr3e.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://bs-uploads.toptal.io/blackfish-uploads/blog/post/seo/og_image_file/og_image/15921/secure-rest-api-in-nodejs-18f43b3033c239da5d2525cfd9fdc98f.png)

![README%20md%20a7c97124b5464973a7e6001c60fa892c/cat.png](README%20md%20a7c97124b5464973a7e6001c60fa892c/cat.png)

Fig 11.1: Cat

[http://full-stack.eba-3tfrxr3e.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg](http://full-stack.eba-3tfrxr3e.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg)

### The ElasticBeanstalk Public URL

[http://full-stack.eba-3tfrxr3e.us-east-1.elasticbeanstalk.com](http://full-stack.eba-3tfrxr3e.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg)

### Problems Encounter and Solution

To be written later

### Summary

The ImageFilter App is an application developed with express framework hosted on elasticbeanstalk. Code written for this work were structured into directories. The API is written with Typescript in server.ts file which is located at the image-filter-starter-code/src directory.
