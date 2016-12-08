module.exports.indexController = function(req, res){
  res.render('index', {
    title: 'CloudFan',
    copyright: 'CloudFan',
    developer: 'pinebrook',
    contact: 'kaizhang.udel@gmail.com',
    github: 'aaaaaaaaaaa'
  });
};
