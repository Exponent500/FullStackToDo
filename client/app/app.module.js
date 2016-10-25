(function() {
    'use strict';

    angular
        .module('FullStackToDoApp', [
            'toastr',
            'ngMessages'
        ])
        .value('todoApiUrl', 'http://localhost:63966/api/Todoes/');
})();


