/*
 * @Author: GegnHH
 * @Date: 2020-12-02 18:23:36
 * @LastEditTime: 2021-01-04 13:49:40
 * @LastEditors: GengHH
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\config\eleComponents.js
 */
//import V from 'V';

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
  Link,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Form,
  FormItem,
  RadioButton,
  RadioGroup,
  Tag,
  Dialog,
  Rate,
  DatePicker
} from 'element-ui';

//将需要使用的UI组件，绑定成一个vue插件，在每个入口js文件进行引入和安装
export default {
  install(V) {
    V.use(Tabs);
    V.use(TabPane);
    V.use(Row);
    V.use(Col);
    V.use(Input);
    V.use(Button);
    V.use(Select);
    V.use(Option);
    V.use(Carousel);
    V.use(CarouselItem);
    V.use(Breadcrumb);
    V.use(BreadcrumbItem);
    V.use(Divider);
    V.use(Table);
    V.use(TableColumn);
    V.use(Pagination);
    V.use(Link);
    V.use(Menu);
    V.use(MenuItem);
    V.use(MenuItemGroup);
    V.use(Submenu);
    V.use(Form);
    V.use(FormItem);
    V.use(RadioButton);
    V.use(RadioGroup);
    V.use(Tag);
    V.use(Dialog);
    V.use(Rate);
    V.use(DatePicker);
    V.prototype.$message = Message;
  }
};
