/* eslint no-console: "off" */

var express = require('express');
var browserify = require('browserify');
var babelify = require('babelify');
var {App} = require('./src/components/App.jsx');
var { Post } = require('./src/components/Post.jsx');
var React = require('react');
var axios = require('axios');
var ReactDomServer = require('react-dom/server');
require('@babel/register');

// require('React');
// import express from 'express';
// import browserify from 'browserify';
// import babelify from 'babelify';
// import App from './src/components/App.jsx';
// import Post from './src/components/Post.jsx';
//  import React from 'react';
//  import axios from "axios";
//  import ReactDomServer from 'react-dom/server';

const app = express();
const port = 3000

app.get('/client.js', (req, res) => {
  browserify('./build/client.js', { debug: true }).transform(babelify).bundle().pipe(res);
});

app.get('/', (req, res) => {

  const content = ReactDomServer.renderToString(<App />);

     let  temp = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Lenodev</title>
        <meta name="description" content="description"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body>
        <div id="app">${content}</div>
        <script src="client.js"></script>
      </body>
    </html>
  `

res.send(temp)
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
