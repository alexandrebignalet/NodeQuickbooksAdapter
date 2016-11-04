'use strict';

var quickBooksControllersPath = './quickbooks-client/controllers';

var route = [{ name: '', require: './middleware' }, { name: 'quickbooks/available', require: './middleware' }, { name: 'quickbooks/auth', require: quickBooksControllersPath + '/auth.controller' }, { name: 'quickbooks/controllers', require: quickBooksControllersPath + '/entity.controller' }, { name: 'quickbooks/controllers', require: quickBooksControllersPath + '/document.entity.controller' }];

module.exports = route;