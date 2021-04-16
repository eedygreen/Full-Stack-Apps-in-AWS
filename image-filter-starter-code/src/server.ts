import express from 'express';
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';


(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user

  app.get( "/", async ( req: Request, res: Response ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );

  
  app.get( "/filteredimage", async ( req: Request, res: Response ) => {
    //passing the url
    const image_url: any  = req.query.image_url;

    //1. construct a regex to check if the url is public and its with image file
    const url_regex    = new RegExp(/([a-z]+\:\/+)([^\/\s]+)([a-z0-9\-@\^=%&;\/~\+]*)[\?]?([^ \#\r\n]*)#?([^ \#\r\n]*)\.(?:jpeg|jpg|gif|png|svg|bpm|tiff)/ig);
    const is_Valid_url  = url_regex.test(image_url);
    
    // testing the validation of the url with regex
    if (!is_Valid_url) {
      res.status(400).send(`${image_url}!, must be a valid image url`);
    }
    
    try {
      //2.  calling the filterImageFromUrl function to validate the image
      const filter_image_file: string = await filterImageFromURL(image_url);
      
      //3.  sending the resulting file from filterImageFromUrl function
      res.status(200).sendFile(filter_image_file);
      
      //4. Deleting the file from the local tmp/filtered directory
      res.on('finish', () => deleteLocalFiles([filter_image_file]));
    } 
    // Catch error from 2,3 & 4
    catch(error) {
      return res.status(422)
                .send(`${image_url} format not supported! See Supported formats: jpg, png, bmp, tiff, or gif`);
    }
  });

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();