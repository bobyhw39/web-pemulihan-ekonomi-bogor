import {
  AppstoreOutlined,
  LogoutOutlined,
  MailFilled,
  MenuUnfoldOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Button, Col, Drawer, Dropdown, Menu, Row, Select } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AuthUser } from "../models/AuthUser";
import { RootState } from "../models/RootState";
import history from "../utils/history";

const { Option } = Select;
type Props = {
  authedData?: AuthUser;
  logout: any;
};

const HeaderDrawer: React.FC<Props> = ({ authedData, logout }) => {
  const categories = useSelector((state: RootState) => state.categories);

  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  function goTo(value: any) {
    history.push(value);
  }

  const searchKategori = (id: any) => {
    onClose();
    history.push({
      search: `category=${id}&per_page=${10}&sort=&product_name=&umkm=&page=${1}`,
      pathname: "search",
    });
  };
  const userMenu = (
    <Menu>
      <Menu.Item>
        <Button
          icon={<ProfileOutlined />}
          type="link"
          onClick={() => goTo("/profile/" + authedData?.user_id)}
        >
          Profil
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          icon={<AppstoreOutlined />}
          type="link"
          onClick={() => goTo("/dashboard")}
        >
          Dasbor
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button icon={<LogoutOutlined />} type="link" onClick={logout}>
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Button
        type="primary"
        shape="circle"
        onClick={showDrawer}
        icon={<MenuUnfoldOutlined />}
      />
      <Drawer placement="right" onClose={onClose} visible={visible}>
        <Link to="/">ADA UMKM</Link>
        <br />
        <br />
        <Row gutter={[16, 16]}>
          {authedData ? (
            <Col xs={24}>
              <Dropdown.Button
                style={{ width: "100%" }}
                overlay={userMenu}
              >
                {authedData?.username}
              </Dropdown.Button>
            </Col>
          ) : null}
          <Col xs={24}>
            <Select
              showSearch
              placeholder="Kategori"
              style={{ width: "100%" }}
              onSelect={searchKategori}
            >
              {categories?.data?.data?.data?.map((v: any, i: any) => (
                <Option value={v.id}>{v.nama_klasifikasi}</Option>
              ))}
            </Select>
          </Col>
          {authedData ? (
            <Col xs={24}>
              <Button
                type="primary"
                icon={<MailFilled />}
                style={{ width: "100%" }}
                size="small"
                onClick={() => goTo("/chat")}
              >
                Pesan
              </Button>
            </Col>
          ) : (
            <>
              <Col xs={24}>
                <Button
                  type="primary"
                  style={{ width: "100%" }}
                  size="small"
                  onClick={() => goTo("/login")}
                >
                  Login
                </Button>
              </Col>

              <Col xs={24}>
                <Button
                  type="ghost"
                  style={{ width: "100%" }}
                  size="small"
                  onClick={() => goTo("/register")}
                >
                  Daftar
                </Button>
              </Col>
            </>
          )}
        </Row>
      </Drawer>
      ,
    </>
  );
};
export default HeaderDrawer;
