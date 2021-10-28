import { Menu } from "antd";
import {
  TagsOutlined,
  RocketOutlined,
  ReadOutlined,
  NotificationOutlined,
  LockOutlined,
  AppstoreOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

import "./styles.scss";

const { SubMenu } = Menu;

type Props = {};

const SideBar: React.FC<Props> = () => {
  const loc = useLocation();
  const menus = [
    {
      key: "/dashboard-admin",
      icon: <AppstoreOutlined />,
      name: "Dasbor",
      subMenu: [],
    },
    {
      key: "/dashboard-admin/user",
      icon: <UserOutlined />,
      name: "Pengguna",
      subMenu: [],
    },
    {
      key: "/dashboard-admin/category",
      icon: <TagsOutlined />,
      name: "Klasifikasi",
      subMenu: [],
    },
    {
      key: "/dashboard-admin/product",
      icon: <TagsOutlined />,
      name: "Produk",
      subMenu: [],
    },
    {
      key: "/dashboard-admin/info-wisata",
      icon: <RocketOutlined />,
      name: "Info Wisata",
      subMenu: [],
    },
    {
      key: "/dashboard-admin/faq",
      icon: <ReadOutlined />,
      name: "FAQ",
      subMenu: [
        {
          key: "/dashboard-admin/faq/category",
          name: "Kategori FAQ",
        },
        {
          key: "/dashboard-admin/faq/list",
          name: "Daftar FAQ",
        },
      ],
    },
    {
      key: "/dashboard-admin/banner",
      icon: <NotificationOutlined />,
      name: "Banner Iklan",
      subMenu: [],
    },
    {
      key: "/dashboard-admin/admin",
      icon: <LockOutlined />,
      name: "Admin",
      subMenu: [],
    },
  ];
  const selectOpen = () => {
    const selectKey = [loc.pathname];
    const openKey = loc.pathname.includes("profile")
      ? ["/sub1"]
      : loc.pathname.includes("produk")
      ? ["/sub2"]
      : [""];
    return { selectKey, openKey };
  };
  return (
    <>
      <Menu
        style={{ height: "100%" }}
        defaultSelectedKeys={selectOpen().selectKey}
        defaultOpenKeys={selectOpen().openKey}
        mode="inline"
        theme="dark"
        inlineCollapsed={true}
      >
        {menus.map((value, key) =>
          value.subMenu.length > 0 ? (
            <SubMenu key={value.key} icon={value.icon} title={value.name}>
              {value?.subMenu?.map((sValue: any, sKey) => (
                <Menu.Item key={sValue.key}>
                  <Link to={sValue.key}>{sValue.name}</Link>
                </Menu.Item>
              ))}
            </SubMenu>
          ) : (
            <Menu.Item key={value.key} icon={value.icon}>
              <Link to={value.key}>{value.name}</Link>
            </Menu.Item>
          )
        )}
      </Menu>
    </>
  );
};

export default SideBar;
