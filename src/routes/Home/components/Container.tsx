import { Affix } from "antd";
import React from "react";
import { useLocation } from "react-router";
import { Layout } from "../../../components";
import Chat from "../../../components/chat/Chat";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/Header";

type Props = {
  title: string;
  authedData?: any;
};

const Container: React.FC<Props> = ({ title, children, authedData }) => {
  const user = authedData;
  let loc = useLocation();
  let locArr = loc.pathname.split("/");
  const chat = () => {
    if (user) {
      switch (locArr[1]) {
        case "umkm":
          return null;
        case "info-wisata":
          return null;
        case "profile":
          return null;
        case "chat":
          return null;
        case "faq":
          return null;
        case "search":
          return null;
        default:
          return <Chat authedData={authedData} />;
      }
    }
  };
  return (
    <Layout title={title}>
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <Affix offsetTop={0}>
          <Header authedData={authedData} />
        </Affix>
        {children}
        <Footer authedData={authedData} />
      </div>
      {chat()}
    </Layout>
  );
};

export default Container;
