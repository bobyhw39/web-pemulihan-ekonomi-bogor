import React, { useState } from "react";
import { Drawer, Form, Button, Col, Row, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useDispatch } from "react-redux";
import { EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { messageValidate } from "../../../../utils/constants";
import { xssValidBool } from "../../../../utils/utils";
import { notificationLoadingMessage } from "../../../../utils/notifications";
import {
  getCategoryFaqRequest,
  updateCategoryFaqRequest,
} from "../../../../actions/categoryFaq";

const { confirm } = Modal;
type Props = {
  obj: any;
};
const EditCategory: React.FC<Props> = ({ obj }) => {
  const [form] = useForm();
  const { validateFields, getFieldValue } = form;
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
      const dataForm = {
        nama_klasifikasi: getFieldValue("nama_klasifikasi"),
      };
      confirm({
        title: "Anda yakin?",
        icon: <ExclamationCircleOutlined />,
        okText: "Ya",
        cancelText: "Batal",
        onOk() {
          notificationLoadingMessage("Tunggu sebentar");
          dispatch(
            updateCategoryFaqRequest(dataForm, obj.id, () => {
              setVisible(false);
              dispatch(getCategoryFaqRequest({ perPage: 10, page: 1 }));
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
        title={"Ubah Kategori FAQ | " + obj.id}
        placement="right"
        onClose={onClose}
        visible={visible}
        width="90%"
      >
        <Form
          layout="vertical"
          form={form}
          fields={[{ name: "faq_category", value: obj?.faq_category }]}
          onFinish={onSubmit}
        >
          <Row gutter={16}>
            <Col xl={8} lg={8} md={12} sm={12} xs={24}>
              <Form.Item
                name="faq_category"
                label="Nama Kategori FAQ"
                rules={[
                  {
                    required: true,
                    message: messageValidate("required", "Nama Kategori FAQ"),
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
                <Input placeholder="Ketik Nama Kategori FAQ"
                  onKeyPress={(e) => {
                    // eslint-disable-next-line no-useless-escape
                    /[^A-Za-z ]/g.test(e.key) && e.preventDefault();
                  }} />
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
export default EditCategory;
