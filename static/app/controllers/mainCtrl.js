import {app} from '../app.js';
import angular from "angular";
//import {Data} from '../model/model.js';             //Начальная модель наполнения TascManeger



app.controller("mainCtrl", ['$scope', 'store',
	function($scope, store){

        var todos = $scope.todos = store.todos;

        $scope.editedTodo = null;


        //Добавить запись в таск менеджер
        $scope.addTodo = function (_this) {
            var newTodo = {
                category: $scope.category.trim(),
                title: $scope.coment.trim(),
                color: $scope.color,
                completed: false
            };
            cleanForm();


            $scope.saving = true;
            store.insert(newTodo)
                .then(function success() {
                    $scope.newTodo = '';
                })
                .finally(function () {
                    $scope.saving = false;
                });
        };

        //Очитска формы
        function cleanForm(){
            $scope.category = '';
            $scope.coment = '';
            $scope.color = '';
        }

        //Правка коментариев
        $scope.editTodo = function (todo) {
            $scope.editedTodo = todo;
            $scope.originalTodo = angular.extend({}, todo);
        };

        //Сохранение после правки коментария
        $scope.saveEdits = function (todo, event) {
            if (event === 'blur' && $scope.saveEvent === 'submit') {
                $scope.saveEvent = null;
                return;
            }

            $scope.saveEvent = event;

            if ($scope.reverted) {
                $scope.reverted = null;
                return;
            }

            todo.title = todo.title.trim();

            if (todo.title === $scope.originalTodo.title) {
                $scope.editedTodo = null;
                return;
            }

            store[todo.title ? 'put' : 'delete'](todo)
                .then(function success() {}, function error() {
                    todo.title = $scope.originalTodo.title;
                })
                .finally(function () {
                    $scope.editedTodo = null;
                });
        };

        $scope.toggleCompleted = function (todo, completed) {
            if (angular.isDefined(completed)) {
                todo.completed = completed;
            }
            store.put(todo, todos.indexOf(todo))
                .then(function success() {}, function error() {
                    todo.completed = !todo.completed;
                });
        };

        //Удалить завершенные задачи
        $scope.clearCompletedTodos = function () {
            store.clearCompleted();
        };

        //Выделить все задачи
        $scope.markAll = function (completed) {
            todos.forEach(function (todo) {
                if (todo.completed !== completed) {
                    $scope.toggleCompleted(todo, completed);
                }
            });
        };

}]);
