import { Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'todo',
    component: TodoComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
];
