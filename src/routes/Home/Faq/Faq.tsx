import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, Pagination } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFaqRequest } from "../../../actions/faq";
import { RootState } from "../../../models/RootState";
import Container from "../components/Container";
const { Panel } = Collapse;
type Props = {
  authedData?: any;
};
const Faq: React.FC<Props> = ({ authedData }) => {
  const faq = useSelector((state: RootState) => state.faq);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFaqRequest({ perPage: 20 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onFilter = (page: any, perPage: any) => {
    dispatch(
      getFaqRequest({
        perPage,
        page,
      })
    );
  };
  return (
    <Container title="Info Wisata" authedData={authedData}>
      <div className="container mt-2 mb-2">
        <h3>FAQ</h3>
        <Collapse
          bordered={false}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          className="site-collapse-custom-collapse"
        >
          {faq.data?.data?.data.map((v: any, i: any) => (
            <Panel
              header={v.question}
              key={i}
              className="site-collapse-custom-panel"
            >
              <p>{v.answer}</p>
            </Panel>
          ))}
        </Collapse>
        <Pagination
          total={faq.data?.data.total_data ?? 0}
          showSizeChanger
          className="mt-3"
          showTotal={(total) => `Total ${total} data`}
          onChange={onFilter}
          current={faq.data?.data.current_page ?? 1}
          defaultPageSize={faq.data?.data?.per_page ?? 20}
        />
      </div>
    </Container>
  );
};
export default Faq;
