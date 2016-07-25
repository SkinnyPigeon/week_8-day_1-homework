var Bank = require('./bank/bank.js');
var Account = require('./bank/account.js');
var sampleAccounts = require('./sample.json');
var BankView = require('./bank/view.js');


window.onload = function(){
  var bank = new Bank();
  var view = new BankView( bank )
  view.initialize( sampleAccounts )
};










