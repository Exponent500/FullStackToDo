(function() {
    'use strict';

    angular
        .module('FullStackToDoApp')
        .controller('TodoController', TodoController);

    TodoController.$inject = ['TodoFactory', 'toastr'];

    function TodoController(TodoFactory, toastr) {
        var vm = this;

	    // set up an initial Priority value to be displayed within the Add Todo Item Panel
	    vm.priority = '1';

  	    // set the default todo list sorting such that any new item added goes to the bottom of the list
	    vm.sortByHighestPriorityNotSelected = true;
	    vm.sortByLowestPriorityNotSelected = true;
	    vm.sortAlphabeticallyNotSelected = true;
	    vm.sortSubType = '';
	    vm.sortType = '';
  		
  		// array holding the todolist items to be displayed in the view
  		vm.todoList = [];	   

	    // set up an initial Priority value to be displayed within the Update Todo Item Modal
	    vm.updatedPriority = '1';

	    // variable to store updated description when user updates a todolist item
		vm.updatedDescription;  		
 
 		// controller function list
  		vm.addTodo = addTodo;
		vm.orderAlphabetically = orderAlphabetically;
  		vm.orderByHighestPriority = orderByHighestPriority;
		vm.orderByLowestPriority = orderByLowestPriority;
		vm.removeTodo = removeTodo;
		vm.updateTodo = updateTodo;

		activate();

        ////////////////

        function activate() {
        
        	// retrieves and displays latest todo database snapshot at page load
        	TodoFactory.getTodoList().then(
        		
        		function(response) {
        		
        			// grab latest todo database snapshot so it can be displayed on the view 
        			vm.todoList = response;
        		
        		},

        		// error handler
        		function(error) {

        			toastr.error('There was an error');
        		
        		}
        	);
        }
 
	    // create a new todo list item that is sent to the todo database as a POST request. If request is sucessful, the new todo list item is added to the view.
	    function addTodo () {

	    	// create todoList object to push to the todolist database
			var todoListItem = {
				priority: parseInt(vm.priority, 10), // converts the priority string to an int because the database expects an int value for this. The "10" specifies the base of the int because parseint uses octal as a base if you don't specify anything else
				description: vm.description,
				createdDate: new Date().toISOString() // grabs current date and puts it into ISO 8601 format, which is exactly what the database is looking for.
			};

			// call factory function that issues the POST request to todo database
			TodoFactory.addTodoListItemToDatabase(todoListItem).then(
				
				function(response) {

				// store the toDoID received from the database, into the todoListItem array
				todoListItem.toDoID = response.toDoID;
				
				//push new todoListItem to todoList array
				vm.todoList.push(todoListItem);

				},

				// error handler
				function(error) {

					toastr.error('There was an error');

				}
			);
	    
	    };

	    // removes a todo list item from the todo database as well as the view
	    function removeTodo (todoID) {

	    	// call factory function that sends DELETE request to todo database
	    	TodoFactory.removeTodoListItemFromDatabase(todoID).then(

	    		function(response){

				// get the index of the todo list item to delete from the view
				var index = vm.todoList.map(function(el) {
				  return el.toDoID;
				}).indexOf(todoID);

	    		//remove the todo list item from the view
	    		vm.todoList.splice(index,1);

				// prevent background from staying in faded state once the "Update Todo List" modal is closed by way of clicking on the "Update" button
				$('.modal-backdrop').remove();
	    		
	    		},

	    		// error handler
	    		function(error) {

	    			toastr.error('There was an error');

	    		}
	    		
	    	);
	    };

	    // update a todoList item in the todo database as well as the view
	    function updateTodo (description, priority, id) {

	    	// grab the current date and time
	    	var currentDateAndTime = new Date().toISOString();

	    	// construct updated todo list item to be sent to the database
	    	var todoListItem = {
	    		description: description,
	    		priority: parseInt(priority, 10),
	    		createdDate : currentDateAndTime,
	    		toDoID: id
	    	};

	    	// call factory function that sends PUT request to todo database 
	    	TodoFactory.updateTodoListItemInDatabase(todoListItem).then(

	    		function(response) {

					// get the index of the todo list item to update on the view
					var index = vm.todoList.map(function(el) {
					  return el.toDoID;
					}).indexOf(id);

		    		// update the todo list item on the view 
		    		vm.todoList[index] = {
		    			description: description,
		    			priority: parseInt(priority, 10),
		    			createdDate: currentDateAndTime,
		    			toDoID: id
		    		};

		    		// prevent background from staying in faded state once the "Update Todo List" modal is closed by way of cliking on the "Update" button
      				$('.modal-backdrop').remove();

	    		},

	    		function(error) {

	    			toastr.error('There was an error');
	    		}
	    	);
	    };

	    // sorts todo list by highest priority, then alphabetically
	    function orderByHighestPriority () {
	      vm.sortType = "priority";
	      vm.sortSubType = "description";
	      vm.sortByLowestPriorityNotSelected = true;
	      vm.sortByHighestPriorityNotSelected = false;
	      vm.sortAlphabeticallyNotSelected = true;
	    };

	    // sorts todo list by lowest priority, then alphabetically
	    function orderByLowestPriority () {
	      vm.sortType = "-priority";
	      vm.sortSubType ="description";
	      vm.sortByLowestPriorityNotSelected = false;
	      vm.sortByHighestPriorityNotSelected = true;
	      vm.sortAlphabeticallyNotSelected = true;
	    };

	    // sorts todo list alphabetically, then by highestpriority
	    function orderAlphabetically () {
	      vm.sortType = "description";
	      vm.sortSubType = "priority";
	      vm.sortByLowestPriorityNotSelected = true;
	      vm.sortByHighestPriorityNotSelected = true;
	      vm.sortAlphabeticallyNotSelected = false;
	    };

      }
})();