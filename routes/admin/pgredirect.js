var checksum = require('../../models/checksum');

module.exports = function (app) {

// 	app.get('/pgredirect', function(req,res){
//   console.log("in pgdirect");
// console.log("--------testtxnjs----");
// res.render('pgredirect.ejs');
//   });
};

// router.post('/testtxn',function(req, res) {
//     console.log("POST Order start");
//     var paramlist = req.body;
//     var paramarray = new Array();
//   //   console.log(paramlist);
//     for (name in paramlist)
//     {
//       if (name == 'PAYTM_MERCHANT_KEY') {
//           var PAYTM_MERCHANT_KEY = paramlist[name] ; 
//         }else
//         {
//         paramarray[name] = paramlist[name] ;
//         }
//     }
//      console.log(paramarray);
//     paramarray['CALLBACK_URL'] = 'https://web-dev-believepranay.c9users.io/response';  // in case if you want to send callback
//     console.log(PAYTM_MERCHANT_KEY);
//     checksum.genchecksum(paramarray, PAYTM_MERCHANT_KEY, function (err, result) 
//     {
//         //   console.log(result);
//       res.render('pgredirect.ejs',{ 'restdata' : result });
//     });

//     console.log("POST Order end");
// });