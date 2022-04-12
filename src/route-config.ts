import { RouteProps } from 'react-router';
import { Home } from './core/home/Home';
import { DocsDemo } from './demos/docs/DocsDemo';

export interface IAppRoute extends RouteProps {
  path: string;
  routes?: IAppRoute[];
  text?: string;
  icon?: string;
}

const routes: IAppRoute[] = [
  { path: '/', component: Home, exact: true, text: 'Home', icon: 'home' },
  { path: '/docs', component: DocsDemo, text: 'Docs example', icon: 'book_open_page_variant' }
];

export default routes;
