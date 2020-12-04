import Vue from 'vue'

/**
 * Create By GengHH On 2020/12/02
 */
import {
  Message,
  Row, 
  Col, 
  Input,
  Button,
  Select,
  Option,
  Carousel,
  CarouselItem,
  Breadcrumb,
  BreadcrumbItem
} from 'element-ui';

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
Vue.prototype.$message = Message;
