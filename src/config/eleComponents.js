/*
 * @Author: GegnHH
 * @Date: 2020-12-02 18:23:36
 * @LastEditTime: 2021-05-24 13:44:06
 * @LastEditors: GengHH
 * @Description: In User Settings Edit
 * @FilePath: \jb2q-hrm-web\src\config\eleComponents.js
 */
import {
  Message,
  MessageBox,
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
  Radio,
  RadioButton,
  RadioGroup,
  Tag,
  Dialog,
  Rate,
  DatePicker,
  Notification,
  Card,
  Switch,
  Loading,
  Checkbox,
  Tooltip,
  Container,
  Aside,
  Header,
  Main,
  CheckboxButton,
  CheckboxGroup,
  //Radio,
  Upload,
  ButtonGroup,
  Calendar,
  TimeSelect,
  Badge,
  Popover,
  Popconfirm,
  Drawer,
  InputNumber,
  Tree,
  Backtop,
  Icon,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  TimePicker,
  Collapse,
  CollapseItem
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
    V.use(Radio);
    V.use(RadioButton);
    V.use(RadioGroup);
    V.use(Tag);
    V.use(Dialog);
    V.use(Rate);
    V.use(DatePicker);
    V.use(Card);
    V.use(Switch);
    V.use(Checkbox);
    V.use(Tooltip);
    V.use(Loading);
    V.use(Container);
    V.use(Aside);
    V.use(Header);
    V.use(Main);
    V.use(CheckboxButton);
    V.use(CheckboxGroup);
    //V.use(Radio);
    V.use(Upload);
    V.use(ButtonGroup);
    V.use(Calendar), V.use(TimeSelect), V.use(Badge);
    V.use(Popover);
    V.use(Popconfirm);
    V.use(Drawer);
    V.use(InputNumber);
    V.use(Tree);
    V.use(Backtop);
    V.use(Icon);
    V.use(Dropdown);
    V.use(DropdownMenu);
    V.use(DropdownItem);
    V.use(TimePicker);
    V.use(Collapse);
    V.use(CollapseItem);

    V.prototype.$notify = Notification;
    V.prototype.$message = Message;
    V.prototype.$msgbox = MessageBox;
    V.prototype.$alert = MessageBox.alert;
    V.prototype.$confirm = MessageBox.confirm;
  }
};
