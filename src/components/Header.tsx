import { Button, Dropdown, Menu, Tooltip } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AppstoreOutlined,
  LogoutOutlined,
  MailOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import "../styles/_navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { LogoutRequest } from "../actions/auth";
import SearchComp from "./Search";
import { AuthUser } from "../models/AuthUser";
import UserImage from "../assets/peb-user.svg";
import HeaderDrawer from "./HeaderDrawer";
import { getCategoriesRequest } from "../actions/categories";
import { RootState } from "../models/RootState";
import { capitalize } from "../utils/utils";

type Props = {
  authedData?: AuthUser;
};

const Header: React.FC<Props> = ({ authedData }) => {
  const dispatch = useDispatch();
  const user = authedData ?? false;
  const access_token = localStorage.getItem("access_token");
  const categories = useSelector((state: RootState) => state.categories);

  const logout = () => {
    const data = {
      token: access_token,
    };
    dispatch(LogoutRequest(data));
  };

  useEffect(() => {
    dispatch(getCategoriesRequest(10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const menu = (
    <Menu>
      {categories?.data?.data?.data?.map((v: any, i: any) => (
        <Menu.Item key={v}>
          <Link to="">{capitalize(v.nama_klasifikasi, true)}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
  const userMenu = (
    <Menu>
      <Menu.Item>
        <Button icon={<ProfileOutlined />} type="link">
          Profil
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button icon={<AppstoreOutlined />} type="link">
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
    <div className="peb-navbar">
      <div className="peb-navbar-top">
        <div className="peb-navbar-top-logo">
          <Link to="/">PEB</Link>
        </div>
        <div className="peb-navbar-top-wrap">
          <SearchComp />
          <ul className="peb-list peb-list-flex ml-2 mr-2">
            <li className="mr-2">
              <Dropdown overlay={menu} placement="bottomRight">
                <Button
                  type="link"
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  Kategori
                </Button>
              </Dropdown>
            </li>
            {user ? (
              <>
                <li>
                  <Tooltip placement="bottom" title="Chat">
                    <Button type="link">
                      <MailOutlined />{" "}
                    </Button>
                  </Tooltip>
                </li>
              </>
            ) : null}
          </ul>
          <div className="peb-navbar-top-btn-drawer ml-2 peb-dflex-center">
            <HeaderDrawer authedData={authedData} logout={logout} />
          </div>
        </div>
        {user ? (
          <Dropdown
            className="peb-navbar-user"
            overlay={userMenu}
            placement="bottomRight"
          >
            <div className="peb-navbar-top-auth-logged">
              <label>
                {authedData?.username?.slice(
                  0,
                  authedData?.username.length >= 20 ? 20 : 10
                )}
                ...
              </label>
              <div className="peb-navbar-top-auth-img">
                <img alt="" src={UserImage} />
              </div>
            </div>
          </Dropdown>
        ) : (
          <div className="peb-navbar-top-auth">
            <div className="peb-navbar-top-auth-not">
              <Link to="/login">MASUK</Link>
              <Link to="/register">DAFTAR</Link>
            </div>
          </div>
        )}
      </div>
      <div className="peb-navbar-bottom">
        <ul>
          <li>
            <Link className="peb-navbar-bottom-link" to="/info-wisata">
              Info Wisata
            </Link>
          </li>
          <li>
            <Link className="peb-navbar-bottom-link" to="/umkm">
              UMKM
            </Link>
          </li>
          <li>
            <Link className="peb-navbar-bottom-link" to="/about">
              Tentang Kami
            </Link>
          </li>
          <li>
            <Link className="peb-navbar-bottom-link" to="/about">
              FAQ
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
