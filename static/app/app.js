import angular from "angular";

import  ngRoute from "angular-route";

import  ngStorage from "ngstorage";




var app = angular.module("app", ['ngRoute', 'ngStorage']);

//Роутинг по главной странице и
app.config(function($routeProvider){
    $routeProvider
        .when('/', {
        controller: "mainCtrl",
        templateUrl: "./static/app/templates/tasc.html",
            resolve: {
                store: function (todoStorage) {
                    // Get the correct module (API or localStorage).
                    return todoStorage.then(function (module) {
                        module.get();
                        return module;
                    });
                }
            }
        })
        .otherwise({
            redirectTo: '/'
        });

});
export {app};
