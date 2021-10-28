import { ExclamationCircleOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, Layout, Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { LogoutAdminRequest } from "../../actions/auth";
import SideBar from "./SidebarAdmin/Sidebar";
const { confirm } = Modal;
const { Header, Content, Sider } = Layout;

type Props = {
  title: string;
  authedData?: any;
  routes?: any;
};

const IndexPage: React.FC<Props> = ({
  title,
  children,
  authedData,
  routes,
}) => {
  const [collapsed, setcollapsed] = useState(false);
  const [widthScreen, setwidthScreen] = useState(0);
  const loc = useLocation();
  const dispatch = useDispatch();

  const onCollapse = (collapsed: any) => {
    setcollapsed(collapsed);
  };
  useEffect(() => {
    const width = window.innerWidth;
    setwidthScreen(width);
    if (width <= 416) {
      setcollapsed(true);
    }
  }, [widthScreen]);
  let isPath = true;
  if (routes) {
    for (let index = 0; index < routes.length; index++) {
      const element = routes[index];
      if (element.path === loc.pathname) {
        isPath = false;
        break;
      }
    }
    if (isPath || !loc.pathname.includes("/dashboard-admin")) {
      return <>{children}</>;
    }
  }
  const logout = () => {
    confirm({
      title: "Yakin keluar?",
      icon: <ExclamationCircleOutlined />,
      okText: "Ya",
      cancelText: "Batal",
      onOk() {
        const access_token = localStorage.getItem("admin_access_token");
        const data = {
          token: access_token,
        };
        dispatch(LogoutAdminRequest({ token: data }));
      },
      onCancel() {},
    });
  };
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <SideBar />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background peb-dflex-between"
            style={{
              paddingLeft: "24px",
              paddingRight: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ color: "white" }}>
              {widthScreen <= 416 && !collapsed ? "" : "Dasbor Admin"}
            </h3>
            <Button shape="round" icon={<LogoutOutlined />} onClick={logout}>
              Keluar
            </Button>
          </Header>
          <Content
            style={{
              display: widthScreen <= 416 && !collapsed ? "none" : "block",
            }}
          >
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default IndexPage;
