import React from "react";
import { Helmet } from "react-helmet-async";

type Props = {
  title: string;
  color?: string
};

export const Layout: React.FC<Props> = ({ title, children, color }) => {
  return (
    <>
      <Helmet>
        <title>ADA UMKM - {title}</title>
      </Helmet>
      <div
        id="peb-layout"
        style={{
          minHeight: "100vh",
          width: "100%",
          position: "relative",
          backgroundColor: color || "",
        }}
      >
        {children}
      </div>
    </>
  );
};
