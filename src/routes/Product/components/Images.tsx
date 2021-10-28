import "@egjs/flicking-plugins/dist/arrow.css";
import "../styles/reactFlicking.css";
import Flicking from "@egjs/react-flicking";
import { Col, Row, Modal } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../models/RootState";

export default function Images() {
  const [openImage, setopenImage] = useState(false);
  const [content, setcontent] = useState("");
  const { dataId } = useSelector((state: RootState) => state.product);
  let imageUrl = [];
  for (const key in dataId?.data?.url_gambar) {
    if (Object.prototype.hasOwnProperty.call(dataId?.data?.url_gambar, key)) {
      const element = dataId?.data?.url_gambar[key];
      if (element !== "") {
        imageUrl.push(element)
        break;
      }
    }
  }
  const onClickLinkImage = (l: any) => {
    setopenImage(true);
    setcontent(l);
  };
  const onClose = () => {
    setopenImage(false);
    setcontent("");
  };

  return (
    <>
      <Modal
        title="Modal"
        visible={openImage}
        onOk={onClose}
        onCancel={onClose}
        centered
        footer={null}
      >
        <img className="panel-image" alt="" src={content} />
      </Modal>
      <Row gutter={[15, 15]}>
        <Col lg={24} md={24} xs={24}>
          <Flicking bounce={30} resizeOnContentsReady={true}>
            {imageUrl?.map((v: any, k: any) => (
              <div
                key={k}
                onClick={() => onClickLinkImage(v)}
                className="flicking-panel full has-background-primary"
              >
                <img className="panel-image" alt="" src={v} />
              </div>
            ))}
          </Flicking>
        </Col>
        <Col lg={24} md={24} xs={0}>
          <Flicking
            circular={true}
            resizeOnContentsReady={true}
            adaptive={true}
            bounce={30}
          >
            {imageUrl?.map((v: any, k: any) => (
              <div
                key={k}
                onClick={() => onClickLinkImage(v)}
                className="flicking-panel thumb has-background-primary"
              >
                <img className="panel-image" alt="" src={v} />
              </div>
            ))}
          </Flicking>
        </Col>
      </Row>
    </>
  );
}
