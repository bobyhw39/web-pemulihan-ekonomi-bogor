import React, { useState } from "react";
import { Drawer, Form, Button, Col, Row, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useDispatch } from "react-redux";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { messageValidate } from "../../../utils/constants";
import { xssValidBool } from "../../../utils/utils";
import { notificationLoadingMessage } from "../../../utils/notifications";
import {
  getCategoriesRequest,
  insertCategoryRequest,
} from "../../../actions/categories";

const { confirm } = Modal;
type Props = {};
const AddCategory: React.FC<Props> = () => {
  const [form] = useForm();
  const { validateFields, getFieldsValue, resetFields } = form;
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
            insertCategoryRequest(getFieldsValue(), () => {
              setVisible(false);
              resetFields();
              dispatch(getCategoriesRequest({ perPage: 10, page: 1 }));
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
        Tambah Klasifikasi
      </Button>
      <Drawer
        title="Tambah Klasifikasi"
        placement="right"
        onClose={onClose}
        visible={visible}
        width="90%"
      >
        <Form layout="vertical" form={form} onFinish={onSubmit}>
          <Row gutter={16}>
            <Col xl={8} lg={8} md={12} sm={12} xs={24}>
              <Form.Item
                name="nama_klasifikasi"
                label="Nama Klasifikasi"
                rules={[
                  {
                    required: true,
                    message: messageValidate("required", "Nama Klasifikasi"),
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
                <Input placeholder="Ketik nama klasifikasi" 
                  onKeyPress={(e) => {
                    // eslint-disable-next-line no-useless-escape
                    /[^A-Za-z ]/g.test(e.key) && e.preventDefault();
                  }}/>
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
export default AddCategory;
