import React, { useEffect, useState } from "react";
import { Drawer, Form, Button, Col, Row, Input, Modal, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../models/RootState";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { messageValidate } from "../../../../utils/constants";
import { xssValidBool } from "../../../../utils/utils";
import { notificationLoadingMessage } from "../../../../utils/notifications";
import { getCategoryFaqRequest } from "../../../../actions/categoryFaq";
import { getFaqRequest, insertFaqRequest } from "../../../../actions/faq";

const { Option } = Select;
const { confirm } = Modal;
type Props = {};
const AddFaq: React.FC<Props> = () => {
  const [form] = useForm();
  const { validateFields, getFieldsValue, resetFields } = form;
  const { data } = useSelector((state: RootState) => state.categoryFaq);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  useEffect(() => {
    dispatch(getCategoryFaqRequest({ perPage: 100, page: 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
            insertFaqRequest(getFieldsValue(), () => {
              setVisible(false);
              resetFields();
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
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        Tambah FAQ
      </Button>
      <Drawer
        title="Tambah FAQ"
        placement="right"
        onClose={onClose}
        visible={visible}
        width="90%"
      >
        <Form layout="vertical" form={form} onFinish={onSubmit}>
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
export default AddFaq;
