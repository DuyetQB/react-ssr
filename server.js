/* eslint no-console: "off" */

import ReactDomServer from 'react-dom/server';
import express from 'express';
import browserify from 'browserify';
import babelify from 'babelify';
import App from './src/components/App.jsx';
import Post from './src/components/Post.jsx';
import React from 'react';
import axios from "axios"
require('dotenv').config();

const app = express();
const port = 3000 || process.env.REACT_APP;

app.get('/client.js', (req, res) => {
  browserify('./build/client.js', { debug: true }).transform(babelify).bundle().pipe(res);
});

app.get('/', (req, res) => {

  const content = ReactDomServer.renderToString(<App />);

     let  temp = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>React SSR Example</title>
        <meta name="description" content="title"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body>
        <div id="app">${content}</div>
        <script src="client.js"></script>
      </body>
    </html>
  `

res.send(temp)

  // res.send(mt);
  console.info('react-grid-system example rendered server-side.');
});



app.get('/post/:id', async (req, res) => {
  console.log("req:",req.params.id);

  const response = await axios.get(`https://lenodevapi-vpvf.onrender.com/api/product/${req.params.id}`)
  const postcontent = ReactDomServer.renderToString(<Post data={response?.data.data}/>);
    let temp = ''
    if(response) {
       temp = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${JSON.stringify(response?.data?.data?.title)}</title>
        <meta name="description" content= ${JSON.stringify(response?.data?.data?.description)}/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body>
        <div id="app">${postcontent}</div>
        <script src="client.js"></script>
      </body>
    </html>
  `
  return  res.send(temp)
    }
  

  // res.send(mt);
  console.info('react-grid-system example rendered server-side.');
});

app.listen(port, () => {
  console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});
