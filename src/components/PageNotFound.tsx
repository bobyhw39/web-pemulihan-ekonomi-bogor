import { Button, Result } from "antd";
import React from "react";
import { useLocation } from "react-router";
import { AuthUser } from "../models/AuthUser";
import history from "../utils/history";
type Props = {
  authedData?: AuthUser;
  authedDataAdmin?: AuthUser;
};

const PageNotFound: React.FC<Props> = ({ authedData, authedDataAdmin }) => {
  const loc = useLocation();

  if (authedDataAdmin !== undefined || authedData !== undefined) {
    if (loc.pathname.includes("/admin-login")) {
      history.push("/dashboard-admin");
    }
    if (loc.pathname.includes("/login") || loc.pathname.includes("/register")) {
      history.push("/");
    }
  }

  const onBack = () => {
    history.goBack();
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Maaf, halaman tidak ditemukan."
      extra={
        <Button type="primary" onClick={onBack}>
          Kembali
        </Button>
      }
    />
  );
};
export default PageNotFound;
