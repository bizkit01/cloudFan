/* GET Angular SPA page */
module.exports.angularAppController = function(req, res){
  res.render('angularApp', {
    title: 'cloudFan',
    links: [
      {
        linkTitle: 'Menu & Order',
        link: 'about',
        active: false
      },
      {
        linkTitle: 'Cashier',
        link: 'contact',
        active: false
      },
      {
        linkTitle: 'Inventory',
        link: 'dashbord',
        active: false
      },
      {
        linkTitle: 'Employees',
        link: 'dashbord',
        active: false
      },
      {
        linkTitle: 'Account',
        link: 'dashbord',
        active: false
      },
      {
        linkTitle: 'Statistical Charts',
        link: 'dashbord',
        active: false
      }
    ],
    copyright: 'CloudFan',
    developer: 'pinebrook',
    contact: 'kaizhang.udel@gmail.com',
    github: 'https://github.com/pinebrook'
  });
};
