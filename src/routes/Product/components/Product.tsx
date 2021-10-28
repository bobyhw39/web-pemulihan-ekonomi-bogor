/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { LinkOutlined, WechatOutlined } from "@ant-design/icons";
import { Button, List, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import IcShopee from "../../../assets/peb-shopee.svg";
import IcTokped from "../../../assets/peb-tokped.svg";
import IcLazada from "../../../assets/peb-lazada.svg";
import IcBukalapak from "../../../assets/peb-bukalapak.svg";
import { RootState } from "../../../models/RootState";
import { useSelector } from "react-redux";
import { capitalize, formatMoney } from "../../../utils/utils";
import { AuthUser } from "../../../models/AuthUser";

const { TabPane } = Tabs;

function callback(key: any) {
  console.log(key);
}
type Props = {
  authedData?: AuthUser;
};
const Product: React.FC<Props> = ({ authedData }) => {
  const { dataId } = useSelector((state: RootState) => state.product);
  const ecommerceUrl = dataId?.data?.url_ecommerce;
  const [copy, setcopy] = useState(false);
  const { data } = useSelector((state: RootState) => state.user);
  const detailUmkm = data?.data?.umkm_detail;
  const categories = useSelector((state: RootState) => state.categories);
  const category = categories?.data?.data?.data?.find(
    (v: any, i: any) => v.id === dataId?.data?.id_klasifikasi
  );

  useEffect(() => {
    if (copy) {
      setTimeout(() => {
        setcopy(false);
      }, 300);
    }
  }, [copy]);
  const onCopy = () => {
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute("value", document.URL);
    dummy.select();
    document.execCommand("copy");
    dummy.remove();
    setcopy(true);
  };
  return (
    <div className="peb-product-detail">
      <h3 className="peb-product-detail-name">
        {dataId?.data?.nama_produk.toUpperCase()}
      </h3>
      <div className="peb-product-price">
        <h3 className="peb-product-price-">
          Rp {formatMoney(dataId?.data?.harga_produk || "")}
        </h3>
        <div className="peb-">
          {authedData && authedData.user_id !== data?.data?.id ? (
            <Link
              to={{
                pathname: "/chat",
                state: {
                  email: data?.data?.email,
                  id: data?.data?.id,
                  namaUmkm: data?.data?.nama_umkm,
                },
              }}
            >
              <Button type="link" icon={<WechatOutlined />} size="middle">
                Chat
              </Button>
            </Link>
          ) : null}
          <Button
            onClick={onCopy}
            className={`peb-product-share ${copy ? "copied" : ""}`}
            type="link"
            icon={<LinkOutlined />}
            size="middle"
          >
            Bagikan
          </Button>
        </div>
      </div>
      <div>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="Detail" key="1">
            <List bordered>
              <List.Item>
                <label>Alamat :</label>
                <label>{capitalize(detailUmkm?.alamat_umkm ?? "-")}</label>
              </List.Item>
              <List.Item>
                <label>Kategori :</label>
                <label>{capitalize(category?.nama_klasifikasi ?? "-")}</label>
              </List.Item>
            </List>
            <br />
            <h3>Deskripsi Produk</h3>
            {dataId?.data?.deskripsi || "Tidak ada deskripsi"}
            <div className="peb-marketplace mt-2">
              {ecommerceUrl?.shopee_url != null ||
              ecommerceUrl?.shopee_url !== "" ? (
                <Tooltip placement="top" title={"shopee"}>
                  <a
                    href={ecommerceUrl?.shopee_url}
                    className="peb-link-social mr-1"
                  >
                    <img alt="" src={IcShopee} />
                  </a>
                </Tooltip>
              ) : null}

              {ecommerceUrl?.tokped_url != null ||
              ecommerceUrl?.tokped_url !== "" ? (
                <Tooltip placement="top" title={"tokopedia"}>
                  <a
                    href={ecommerceUrl?.tokped_url}
                    className="peb-link-social mr-1"
                  >
                    <img alt="" src={IcTokped} />
                  </a>
                </Tooltip>
              ) : null}

              {ecommerceUrl?.lazada_url != null ||
              ecommerceUrl?.lazada_url !== "" ? (
                <Tooltip placement="top" title={"lazada"}>
                  <a
                    href={ecommerceUrl?.lazada_url}
                    className="peb-link-social mr-1"
                  >
                    <img alt="" src={IcLazada} />
                  </a>
                </Tooltip>
              ) : null}

              {ecommerceUrl?.bukalapak_url != null ||
              ecommerceUrl?.bukalapak_url !== "" ? (
                <Tooltip placement="top" title={"bukalapak"}>
                  <a
                    href={ecommerceUrl?.bukalapak_url}
                    className="peb-link-social mr-1"
                  >
                    <img alt="" src={IcBukalapak} />
                  </a>
                </Tooltip>
              ) : null}
            </div>
          </TabPane>
          <TabPane tab="Info Penting" key="2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            modi assumenda maxime voluptatum ipsam blanditiis. Perspiciatis
            temporibus ratione adipisci numquam tempora officia a, laboriosam
            voluptatem quasi eligendi rem cum ipsum!
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
export default Product;
