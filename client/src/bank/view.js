var Account = require('./account.js')

var BankView = function( bank ) {
  this.bank = bank;
}

BankView.prototype = {

  initialize: function( sampleAccounts ) {
    for(account of sampleAccounts){
      this.bank.addAccount(new Account(account));
      this.createItemForAccount( account )
    }
    var interestButton = document.getElementById( 'add-interest' )
    interestButton.onclick = function() {
      this.interest()
      this.displayBank()
    }.bind(this )
    console.log( this.bank )
    this.displayBank()
  },

  createItemForAccount: function(account){
    var accountListItem = document.createElement('li');
    accountListItem.innerText = account.owner + ": £" + account.amount.toFixed(2);
    return accountListItem;
  },

  populateAccountList: function(listElement, accounts){
    listElement.innerHTML = "";
    for(account of accounts){
      listElement.appendChild(this.createItemForAccount(account));
    }
  },

  displayBank: function() {

    var totalDisplay = document.getElementById('total');
    var businessTotalDisplay = document.getElementById('business-total');
    var personalTotalDisplay = document.getElementById('personal-total');

    totalDisplay.innerText = "Total: £" + this.bank.totalCash().toFixed(2);
    businessTotalDisplay.innerText = "Total Business: £" + this.bank.totalCash('business').toFixed(2);
    personalTotalDisplay.innerText = "Total Personal: £" + this.bank.totalCash('personal').toFixed(2);

    var businessAccountList = document.getElementById('business-accounts');
    var personalAccountList = document.getElementById('personal-accounts');

    this.populateAccountList(businessAccountList, this.bank.filteredAccounts('business'))
    this.populateAccountList(personalAccountList, this.bank.filteredAccounts('personal'))

  },

  interest: function() {
    var businessAccountList = document.getElementById('business-accounts');
    var personalAccountList = document.getElementById('personal-accounts');
    this.bank.addInterest( 5 )
    this.populateAccountList(businessAccountList, this.bank.filteredAccounts('business'))
    this.populateAccountList(personalAccountList, this.bank.filteredAccounts('personal'))
  }

}

module.exports = BankView;