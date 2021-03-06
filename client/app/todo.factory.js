(function() {
    'use strict';

    angular
        .module('FullStackToDoApp')
        .factory('TodoFactory', TodoFactory);

    TodoFactory.$inject = ['$http', '$q', 'todoApiUrl'];

    function TodoFactory($http, $q, todoApiUrl) {
        var service = {
            getTodoList: getTodoList,
            addTodoListItemToDatabase: addTodoListItemToDatabase,
            removeTodoListItemFromDatabase: removeTodoListItemFromDatabase,
            updateTodoListItemInDatabase: updateTodoListItemInDatabase
        };
        return service;



        // send GET request to todo database
        function getTodoList() {

        	var defer = $q.defer();

        	$http({
        		
        		method: 'GET',
        		url: todoApiUrl

        	})
        	.then(function(response) {

        		// check the GET Response to see if it returned an object or not
        		if (typeof response.data === 'object'){
        			
        			defer.resolve(response.data);
        		
        		} else {
        			
        			defer.reject(response);
        		}

        	},
        	// error handling of server generated error responses
        	function(error) {

        		defer.reject(error);

        	});

        	return defer.promise;
        }

        // send POST request to todo database
        function addTodoListItemToDatabase(todoListItem) {

        	var defer = $q.defer();

        	$http({
        		
        		method: 'POST',
        		url: todoApiUrl,
        		// ensures the content is formatted in a way that the C# WEB API expects
        		data: $.param({
        			description: todoListItem.description,
        			priority: todoListItem.priority,
        			createdDate: todoListItem.createdDate
        		}),
        		// ensure the content is formatted in a way that the C# WEB API expects 
        		headers: {
        			'Content-Type' : 'application/x-www-form-urlencoded'

    			}
        	
        	})
        	.then(function(response) {

        		// check the POST response to see if we got an object or not
        		if (typeof response.data === 'object') {

    				defer.resolve(response.data);

        		} else {

        			defer.reject(response);

        		}

        	},
        	// error handling of server generated error responses
        	function(error) {

        		defer.reject(error);

        	});

        	return defer.promise;
        }

        // send DELETE request to todo database
        function removeTodoListItemFromDatabase(todoID) {

        	var defer = $q.defer();

        	$http({

        		method: "DELETE",
        		url: todoApiUrl + todoID
        	})
        	.then(function(response) {

        		// check the DELETE response to see if we got an object or not
        		if (typeof response.data === 'object') {

    				defer.resolve(response.data);

        		} else {

        			defer.reject(response);

        		}

        	},
        	// error handling of server generated error responses
        	function(error) {

        		defer.reject(error);

        	});

        	return defer.promise;
        }

        // send a PUT request to todo database
        function updateTodoListItemInDatabase(todoListItem) {

        	var defer = $q.defer();

        	$http({

        		method: "PUT",
        		url: todoApiUrl + todoListItem.toDoID,
        		// ensures the content is formatted in a way that the C# WEB API expects
        		data: $.param({
        			toDoID: todoListItem.toDoID,
        			description: todoListItem.description,
        			priority: todoListItem.priority,
        			createdDate: todoListItem.createdDate
        		}),
        		// ensures the content is formatted in a way that the C# WEB API expects
        		headers: {
        			'Content-Type' : 'application/x-www-form-urlencoded'

    			}
        	
        	})
        	.then(function(response) {

        		// check the PUT response to see if it was successful or not
        		if (response.status === 204) {

    				defer.resolve(response.data);

        		} else {

        			defer.reject(response);

        		}

        	},
        	// error handling of server generated error responses
        	function(error) {

        		defer.reject(error);

        	});

        	return defer.promise;
        }

    }
})();