import { Component } from 'angular2/core';
import { RouteConfig, Router, ROUTER_DIRECTIVES } from 'angular2/router';
import { TodoList } from './views/todo-list';

@Component({
	selector: `app`,
	directives: [ROUTER_DIRECTIVES],
	template: `
<div id="layout" class="pure-g">
    <div class="sidebar pure-u-1 pure-u-md-1-4">
        <div class="header">
            <h1 class="brand-title">Async Pipe</h1>
            <h2 class="brand-tagline">Exploring Angular 2 Async Pipe</h2>
            <nav class="nav">
                <ul class="nav-list">
                    <li class="nav-item">
                        <a class="pure-button" [routerLink]=" ['TodoList']">Todo Observable</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
    <div class="content pure-u-1 pure-u-md-3-4">
        <router-outlet></router-outlet>
    </div>
</div>
	`
})
@RouteConfig([
	{ path: '/todos', component: TodoList, name: 'TodoList', useAsDefault: true }
])
export class App {}