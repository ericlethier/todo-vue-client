// app.js


new Vue({

    // We want to target the div with an id of 'events'
    el: '#todos',

    // Here we can register any values or collections that hold data
    // for the application
    data: {
        todo: {
            _id: '',
            description: '',
            completed: false,
        },
        searchValue: '',
        todos: [],
    },

    // Anything within the ready function will run when the application loads
    ready() {
        // When the application loads, we want to call the method that initializes
        // some data
        this.fetchTodos();
    },

    // Methods we want to use in our application are registered here
    methods: {

        // We dedicate a method to retrieving and setting some data
        fetchTodos() {
            // GET /someUrl
            this.$http.get('http://localhost:3000/api/v1/todos').then((response) => {
                console.log(response.data);
                let todos = response.data;
                this.$set('todos', todos);
            }, (error) => {
                console.log(error);
                error = error;
            });
            // $set is a convenience method provided by Vue that is similar to pushing
            // data onto an array
        },

        // Adds an event to the existing events array
        addTodo() {
            var newTodo = {
                description: this.todo.description,
            };
            this.$http.post('http://localhost:3000/api/v1/todos', newTodo, {
                emulateJSON: true
            }).then((events) => {
                this.fetchTodos();
                this.todo.description = "";
            }, (error) => {
                console.log(error);
                error = error;
            });
        },
        setCompletedTodo(id, completed) {
            console.log(id);
            var newTodo = {
                completed: completed,
            };
            this.$http.put('http://localhost:3000/api/v1/todos/' + id, newTodo, {
                emulateJSON: true
            }).then((response) => {
                this.fetchTodos();
            }, (error) => {
                console.log(error);
                error = error;
            });
        },

        deleteTodo(id) {
            console.log(id);
            this.$http.delete('http://localhost:3000/api/v1/todos/' + id).then((response) => {
                this.fetchTodos();
            }, (error) => {
                console.log(error);
                error = error;
            });
        },
    },
});
