/* eslint-disable react/jsx-no-target-blank */
import { WechatOutlined } from "@ant-design/icons";
import {
  Card,
  List,
  Pagination,
  Select,
  Spin,
  Modal,
  Button,
  Tooltip,
  Divider,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserRequest } from "../../../actions/user";
import { RootState } from "../../../models/RootState";
import Container from "../components/Container";
import "./styles/styles.scss";
import IcWhatsapp from "../../../assets/peb-whatsapp.svg";
import IcFb from "../../../assets/peb-fb.svg";
import IcIg from "../../../assets/peb-ig.svg";
import IcShopee from "../../../assets/peb-shopee.svg";
import IcTokped from "../../../assets/peb-tokped.svg";
import IcLazada from "../../../assets/peb-lazada.svg";
import IcBukalapak from "../../../assets/peb-bukalapak.svg";
import history from "../../../utils/history";

const { Option } = Select;
type Props = {
  authedData?: any;
};
const Umkm: React.FC<Props> = ({ authedData }) => {
  const { datas, isLoading } = useSelector((state: RootState) => state.user);
  const [perPage, setperPage] = useState(10);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUserRequest(perPage, "active", page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const filterPerPage = (v: any) => {
    setperPage(v);
    dispatch(getAllUserRequest(v, "active", page));
  };
  const onChangePage = (pagination: any, filters?: any, sorter?: any) => {
    setPage(pagination);
    dispatch(getAllUserRequest(perPage, "active", pagination));
  };
  const openWhatsapp = (no_hp: any) => {
    window.open(`https://wa.me/${no_hp}`, "_blank");
  };

  const goTo = (item: any) => {
    history.push({
      pathname: "/chat",
      state: {
        email: item?.email,
        id: item?.id,
        namaUmkm: item?.nama_umkm,
      },
    });
  };
  const onClickUmkm = (item: any) => {
    Modal.info({
      title: item?.umkm_detail?.no_regis_umkm || "",
      icon: false,
      content: (
        <>
          <div className="peb-umkm-modal-header-one">
            <h3>{item?.nama_umkm}</h3>
            <div className="peb-umkm-modal-header-one-chat">
              {item?.no_hp ? (
                <Tooltip placement="left" title={item?.no_hp}>
                  <Button
                    type="link"
                    icon={<img alt="" src={IcWhatsapp} />}
                    size="middle"
                    onClick={() => openWhatsapp(item?.no_hp)}
                  ></Button>
                </Tooltip>
              ) : null}
            </div>
          </div>
          <div className="peb-umkm-modal-detail">
            <Tag color="cyan">{item?.umkm_detail?.klasifikasi_umkm}</Tag>
            <p>{item?.umkm_detail?.alamat_umkm}</p>
          </div>
          <Divider plain>Sosial Media</Divider>
          {item?.umkm_detail ? (
            <div className="peb-umkm-modal-social">
              {item?.umkm_detail?.instagram !== "" ? (
                <Tooltip placement="top" title={"instagrem"}>
                  <a
                    href={`${item?.umkm_detail?.instagram}`}
                    target="_blank"
                    className="peb-link-social mr-1"
                  >
                    {" "}
                    <img alt="" src={IcIg} />
                  </a>
                </Tooltip>
              ) : null}
              {item?.umkm_detail?.facebook !== "" ? (
                <Tooltip placement="top" title={"facebook"}>
                  <a
                    href={`${item?.umkm_detail?.facebook}`}
                    target="_blank"
                    className="peb-link-social mr-1"
                  >
                    {" "}
                    <img alt="" src={IcFb} />
                  </a>
                </Tooltip>
              ) : null}
            </div>
          ) : (
            "-"
          )}
          <Divider plain>E-commerce</Divider>
          {item?.umkm_detail ? (
            <div className="peb-umkm-modal-social">
              {item?.umkm_detail?.shopee_url !== "" ? (
                <Tooltip placement="top" title={"shopee"}>
                  <a
                    href={item?.umkm_detail?.shopee_url}
                    className="peb-link-social mr-1"
                  >
                    <img alt="" src={IcShopee} />
                  </a>
                </Tooltip>
              ) : null}

              {item?.umkm_detail?.tokped_url !== "" ? (
                <Tooltip placement="top" title={"tokopedia"}>
                  <a
                    href={item?.umkm_detail?.tokped_url}
                    className="peb-link-social mr-1"
                  >
                    <img alt="" src={IcTokped} />
                  </a>
                </Tooltip>
              ) : null}

              {item?.umkm_detail?.lazada_url !== "" ? (
                <Tooltip placement="top" title={"lazada"}>
                  <a
                    href={item?.umkm_detail?.lazada_url}
                    className="peb-link-social mr-1"
                  >
                    <img alt="" src={IcLazada} />
                  </a>
                </Tooltip>
              ) : null}

              {item?.umkm_detail?.bukalapak_url !== "" ? (
                <Tooltip placement="top" title={"bukalapak"}>
                  <a
                    href={item?.umkm_detail?.bukalapak_url}
                    className="peb-link-social mr-1"
                  >
                    <img alt="" src={IcBukalapak} />
                  </a>
                </Tooltip>
              ) : null}
            </div>
          ) : (
            "-"
          )}
        </>
      ),
      closable: true,
      okText: "Tutup",
      closeIcon: true,
    });
  };
  return (
    <Container title="Daftar UMKM" authedData={authedData}>
      <div className="container mt-2 mb-2">
        <Card
          title="Daftar UMKM"
          extra={
            <>
              <Select
                onSelect={filterPerPage}
                size="small"
                value={perPage}
                style={{ width: 100 }}
              >
                <Option value={10}> 10/page </Option>
                <Option value={20}> 20/page </Option>
              </Select>
            </>
          }
        >
          <div className="site-card-wrapper">
            <Spin spinning={isLoading ?? false} tip="Memuat...">
              <List itemLayout="horizontal">
                {datas?.data?.data.map((item: any) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <>
                          <Button onClick={() => onClickUmkm(item)} type="link">
                            {item?.nama_umkm ?? ""}
                          </Button>
                        </>
                      }
                      description={
                        <>
                          <Button onClick={() => onClickUmkm(item)} type="text">
                            {item?.umkm_detail?.alamat_umkm}{" "}
                          </Button>
                        </>
                      }
                    />
                    {authedData != null && authedData.user_id !== item?.id ? (
                      <Button
                        onClick={() => goTo(item)}
                        type="link"
                        icon={<WechatOutlined />}
                        size="middle"
                      >
                        Chat
                      </Button>
                    ) : null}
                  </List.Item>
                ))}
              </List>
            </Spin>
          </div>

          <Pagination
            className="mt-3"
            onChange={onChangePage}
            total={datas?.data.total_data ?? 0}
            showSizeChanger={false}
            current={datas?.data.current_page ?? 1}
            defaultPageSize={perPage ?? 2}
            showTotal={(total) => `Total ${total} UMKM`}
          />
        </Card>
      </div>
    </Container>
  );
};
export default Umkm;
