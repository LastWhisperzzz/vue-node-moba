import Vue from 'vue'
import {
  Button,
  Input,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Table,
  TableColumn,
  Form,
  FormItem,
  Select,
  Option,
  Message,
  MessageBox,
  Upload,
  Rate,
  Tabs,
  TabPane,
  Row,
  Col,
  Card
} from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Upload)
Vue.use(Rate)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
