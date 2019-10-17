import {HeaderComponent} from './components/header.comp';
import {NavigationComponent} from './components/navigation.comp';
import {CreateComponent} from './components/create.comp';
import {FavoriteComponent} from './components/favorite.comp';
import {PostsComponent} from './components/posts.comp';
import { LoaderComponent } from './components/loader.comp';


const header = new HeaderComponent('header');
const navigation = new NavigationComponent('navigation');
const create = new CreateComponent('create');
const loader = new LoaderComponent('loader');
const posts = new PostsComponent('posts', {loader});
const favorite = new FavoriteComponent('favorite', {loader});


navigation.registerTabs([
    {name: 'create', component: create},
    {name: 'posts', component: posts},
    {name: 'favorite', component: favorite},
])

