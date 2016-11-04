(function() {
    'use strict'

    angular
        .module('exampleApp', [
            'btford.socket-io',
            'ngResource'
        ])
        .run(run)

    run.$inject = []

    function run() {}
})();
