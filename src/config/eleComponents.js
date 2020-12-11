import Vue from 'vue'

/**
 * Create By GengHH On 2020/12/02
 */
import {
  Message,
  Tabs,
  TabPane,
  Row, 
  Col, 
  Input,
  Button,
  Select,
  Option,
  Carousel,
  CarouselItem,
  Breadcrumb,
  BreadcrumbItem,
  Divider,
  Table,
  TableColumn,
  Pagination,
  Link
} from 'element-ui';

Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Row);
Vue.use(Col);
Vue.use(Input);
Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Divider);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Link);
Vue.prototype.$message = Message;
