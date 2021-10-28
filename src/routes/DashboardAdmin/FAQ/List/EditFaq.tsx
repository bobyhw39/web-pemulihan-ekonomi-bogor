import React, { useState } from "react";
import { Drawer, Form, Button, Col, Row, Input, Modal, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../models/RootState";
import { EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { messageValidate } from "../../../../utils/constants";
import { xssValidBool } from "../../../../utils/utils";
import { notificationLoadingMessage } from "../../../../utils/notifications";
import { getFaqRequest, updateFaqRequest } from "../../../../actions/faq";

const { Option } = Select;
const { confirm } = Modal;
type Props = {
  obj: any;
};
const EditFaq: React.FC<Props> = ({ obj }) => {
  const [form] = useForm();
  const { validateFields, getFieldsValue } = form;
  const { data } = useSelector((state: RootState) => state.categoryFaq);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const onSubmit = () => {
    validateFields().then(() => {
      confirm({
        title: "Anda yakin?",
        icon: <ExclamationCircleOutlined />,
        okText: "Ya",
        cancelText: "Batal",
        onOk() {
          notificationLoadingMessage("Tunggu sebentar");
          dispatch(
            updateFaqRequest(getFieldsValue(), obj.id, () => {
              setVisible(false);
              dispatch(getFaqRequest({ perPage: 10, page: 1 }));
            })
          );
        },
        onCancel() {},
      });
    });
  };
  return (
    <>
      <Button onClick={showDrawer} icon={<EditOutlined />} />
      <Drawer
        title={"Ubah FAQ | " + obj.id}
        placement="right"
        onClose={onClose}
        visible={visible}
        width="90%"
      >
        <Form
          layout="vertical"
          form={form}
          fields={[
            { name: "id_faq_category", value: obj?.id_faq_category },
            { name: "answer", value: obj?.answer },
            { name: "question", value: obj?.question },
          ]}
          onFinish={onSubmit}
        >
          <Row gutter={16}>
            <Col xl={8} lg={8} md={12} sm={12} xs={24}>
              <Form.Item
                name="id_faq_category"
                label="Kategori FAQ"
                rules={[
                  {
                    required: true,
                    message: messageValidate("required", "Kategori FAQ"),
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Pilih Kategori FAQ"
                  optionFilterProp="children"
                  filterOption={(input, option: any) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                >
                  {data?.data?.data?.map((v: any, i: any) => (
                    <Option key={i} value={v.id}>
                      {v.faq_category}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xl={14} lg={14} md={12} sm={12} xs={24}>
              <Form.Item
                name="question"
                label="Pertanyaan"
                rules={[
                  {
                    required: true,
                    message: messageValidate("required", "Pertanyaan"),
                  },
                  (value) => ({
                    validator(rule, value) {
                      if (value != null) {
                        if (!xssValidBool(value)) {
                          return Promise.reject("Masukan tidak valid");
                        }
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input placeholder="Ketik Pertanyaan" />
              </Form.Item>
            </Col>

            <Col xl={14} lg={14} md={12} sm={12} xs={24}>
              <Form.Item
                name="answer"
                label="Jawaban"
                rules={[
                  {
                    required: true,
                    message: messageValidate("required", "Jawaban"),
                  },
                  (value) => ({
                    validator(rule, value) {
                      if (value != null) {
                        if (!xssValidBool(value)) {
                          return Promise.reject("Masukan tidak valid");
                        }
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input.TextArea rows={4} placeholder="Ketik Jawaban" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Simpan
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
export default EditFaq;
