var request = require('request');

var apiOptions = {
  server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production'){
  apiOptions.server = 'cloudfan.herokuapp.com';
}

var _showError = function (req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Oh dear. Looks like we can't find this page. Sorry.";
  } else if (status === 500) {
    title = "500, internal server error";
    content = "How embarrassing. There's a problem with our server.";
  } else {
    title = status + ", something's gone wrong";
    content = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.status(status);
  res.render('generic-text', {
    title : title,
    content : content.replace(/\n/g, '<br/>')
  });
};

var renderIndexpage = function (req, res, responseBody) {
  var title_res;
  if (!(responseBody instanceof Array)) {
     title_res = 'cloudFan';
     responseBody = [];
     console.log('Get response failed(index->title)');
  } else if (!(responseBody.length)) {
      title_res = 'cloudFan';
      console.log('Get empty response(index->title)');
  } else {
      title_res = responseBody[0].title;
      console.log('Get response succeed(index->title)');
  }
  res.render('index', {
    title: title_res,
    links: [
      {
        linkTitle: 'About',
        link: 'about',
        active: false
      },
      {
        linkTitle: 'Contact',
        link: 'contact',
        active: false
      },
      {
        linkTitle: 'Dashbord',
        link: '/dashbord/',
        active: false
      }
    ],
    copyright: 'CloudFan',
    developer: 'pinebrook',
    contact: 'kaizhang.udel@gmail.com',
    github: 'https://github.com/pinebrook'
  });
};

module.exports.indexController = function(req, res){
  var requestOptions, path;
  path = '/api/';
  requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {},
    qs: {}
  };

  request(requestOptions, function (err, response, body) {
    if (response.statusCode === 200) {
      renderIndexpage(req, res, body);
    } else {
      _showError(req, res, response.statusCode);
    }
  });

};
