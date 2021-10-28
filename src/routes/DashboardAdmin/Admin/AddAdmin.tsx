import React, { useState } from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Modal,
  Radio,
  Select,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { useDispatch } from "react-redux";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  kecamatanBogor,
  kelurahanBogor,
  messageValidate,
  regexTest,
} from "../../../utils/constants";
import { xssValidBool } from "../../../utils/utils";
import { notificationLoadingMessage } from "../../../utils/notifications";
import { getAdminRequest, insertAdminRequest } from "../../../actions/admin";

const { confirm } = Modal;
type Props = {};
const AddAdmin: React.FC<Props> = () => {
  const [form] = useForm();
  const { validateFields, resetFields, getFieldValue } = form;
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const [myLoc, setmyLoc] = useState<any>({ kecamatan: null, kelurahan: null });
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
          const data = {
            nama_lengkap: getFieldValue("nama_lengkap"),
            email: getFieldValue("email"),
            alamat: {
              alamat_user: getFieldValue("alamat_user"),
              kecamatan: myLoc.kecamatan.label,
              kelurahan: myLoc.kelurahan.label,
              rt: getFieldValue("rt"),
              rw: getFieldValue("rw"),
            },
            no_hp: getFieldValue("no_hp"),
            jenis_kelamin: getFieldValue("jenis_kelamin"),
            role: getFieldValue("role"),
            password: getFieldValue("password"),
            password_confirmation: getFieldValue("password_confirmation"),
          };
          notificationLoadingMessage("Tunggu sebentar");
          dispatch(
            insertAdminRequest(data, () => {
              setVisible(false);
              resetFields();
              setmyLoc({ kecamatan: null, kelurahan: null });
              dispatch(getAdminRequest({ pageSize: 10, current: 1 }));
            })
          );
        },
        onCancel() {},
      });
    });
  };
  const handleChange = (data: any) => {
    const item = data.target;
    if (item.name === "kecamatan") {
      setmyLoc((v: any) => ({ ...v, kelurahan: "" }));
    }
    setmyLoc((v: any) => ({ ...v, [item.name]: item.value }));
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        Tambah Admin
      </Button>
      <Drawer
        title="Tambah Admin"
        placement="right"
        onClose={onClose}
        visible={visible}
        width="90%"
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onSubmit}
          fields={[
            { name: "kecamatan", value: myLoc.kecamatan?.value },
            { name: "kelurahan", value: myLoc.kelurahan?.value },
          ]}
        >
          <Row gutter={16}>
            <Col xl={8} lg={8} md={12} sm={12} xs={24}>
              <Form.Item
                name="nama_lengkap"
                label="Nama Lengkap"
                rules={[
                  {
                    required: true,
                    message: messageValidate("required", "Nama Lengkap"),
                  },
                ]}
              >
                <Input
                  placeholder="Ketik Nama Lengkap"
                  onKeyPress={(e) => {
                    // eslint-disable-next-line no-useless-escape
                    /[^A-Za-z ]/g.test(e.key) && e.preventDefault();
                  }}
                />
              </Form.Item>
            </Col>
            <Col xl={8} lg={8} md={12} sm={12} xs={24}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: messageValidate("required", "Email"),
                  },
                ]}
              >
                <Input type="email" placeholder="Ketik Email" />
              </Form.Item>
            </Col>
            <Col xl={8} lg={8} md={12} sm={12} xs={24}>
              <Form.Item
                name="no_hp"
                label="Nomor HP"
                rules={[
                  {
                    required: true,
                    message: messageValidate("required", "Nomor HP"),
                  },
                ]}
              >
                <Input
                  placeholder="Ketik Nomor Hp"
                  type="number"
                  onKeyPress={(e) => {
                    // eslint-disable-next-line no-useless-escape
                    !regexTest.numeric.test(e.key) && e.preventDefault();
                  }}
                />
              </Form.Item>
            </Col>

            <Col xl={8} lg={8} md={12} sm={12} xs={24}>
              <Form.Item
                name="jenis_kelamin"
                label="Jenis Kelamin"
                rules={[
                  {
                    required: true,
                    message: messageValidate("required", "Jenis Kelamin"),
                  },
                ]}
              >
                <Radio.Group name="jenis_kelamin">
                  <Radio value="laki-laki">Laki-Laki</Radio>
                  <Radio value="perempuan">Perempuan</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col xl={8} lg={8} md={12} sm={12} xs={24}>
              <Form.Item
                name="role"
                label="Role"
                rules={[
                  {
                    required: true,
                    message: messageValidate("required", "Role"),
                  },
                ]}
              >
                <Input placeholder="Ketik Role" />
              </Form.Item>
            </Col>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                name="alamat_user"
                label="Alamat"
                rules={[
                  {
                    required: true,
                    message: messageValidate("required", "Alamat "),
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col xl={6} lg={6} md={12} sm={12} xs={12}>
              <Form.Item
                name="rt"
                label="RT"
                rules={[
                  {
                    required: true,
                    message: messageValidate("required", "RT "),
                  },
                  {
                    max: 3,
                    min: 3,
                    message: messageValidate("minmax", "RT ", 3),
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder="000"
                  onKeyPress={(e) => {
                    // eslint-disable-next-line no-useless-escape
                    !regexTest.numeric.test(e.key) && e.preventDefault();
                  }}
                />
              </Form.Item>
            </Col>
            <Col xl={6} lg={6} md={12} sm={12} xs={12}>
              <Form.Item
                name="rw"
                label="RW"
                rules={[
                  {
                    required: true,
                    message: messageValidate("required", "RW "),
                  },
                  {
                    max: 3,
                    min: 3,
                    message: messageValidate("minmax", "RW ", 3),
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder="000"
                  onKeyPress={(e) => {
                    // eslint-disable-next-line no-useless-escape
                    !regexTest.numeric.test(e.key) && e.preventDefault();
                  }}
                />
              </Form.Item>
            </Col>

            <Col xl={6} lg={6} md={12} sm={12} xs={24}>
              <Form.Item
                name="kecamatan"
                label="Kecamatan"
                rules={[
                  {
                    required: true,
                    message: messageValidate("required", "Kecamatan "),
                  },
                ]}
              >
                <Select
                  placeholder="Ketik Kecamatan Anda"
                  options={kecamatanBogor.map((el: any) => ({
                    label: el.nama,
                    value: el.id,
                    id: el.id,
                  }))}
                  onSelect={(e, option) => {
                    handleChange({
                      target: { name: "kecamatan", value: option },
                    });
                  }}
                  showSearch
                />
              </Form.Item>
            </Col>
            <Col xl={6} lg={6} md={12} sm={12} xs={24}>
              <Form.Item
                name="kelurahan"
                label="Kelurahan"
                rules={[
                  {
                    required: true,
                    message: messageValidate("required", "Kelurahan "),
                  },
                ]}
              >
                <Select
                  placeholder="Ketik Kelurahan Anda"
                  options={kelurahanBogor
                    // eslint-disable-next-line eqeqeq
                    .filter((v) => v.id_kecamatan == myLoc.kecamatan?.id)
                    .map((el: any) => ({
                      label: el.nama,
                      value: el.id,
                      id: el.id,
                    }))}
                  disabled={myLoc.kecamatan === undefined}
                  onSelect={(e, option) => {
                    handleChange({
                      target: { name: "kelurahan", value: option },
                    });
                  }}
                  showSearch
                />
              </Form.Item>
            </Col>
            <Col xl={6} lg={6} md={12} sm={12} xs={12}>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Tolong masukan Kata Sandi!" },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (value != null) {
                        if (getFieldValue("password").length >= 6) {
                          if (!xssValidBool(value)) {
                            return Promise.reject("Masukan tidak valid");
                          }
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          "Kata Sandi harus minimal 6 karakter"
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
                label="Kata Sandi"
              >
                <Input.Password
                  style={{ maxWidth: "350px" }}
                  name="password"
                  placeholder="Ketik Kata Sandi"
                />
              </Form.Item>
            </Col>
            <Col xl={6} lg={6} md={12} sm={12} xs={12}>
              <Form.Item
                name="password_confirmation"
                rules={[
                  { required: true, message: "Tolong masukan Kata Sandi!" },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject("Kata Sandi tidak sama");
                    },
                  }),
                ]}
                label="Konfirmasi Kata Sandi"
              >
                <Input.Password
                  style={{ maxWidth: "350px" }}
                  name="password_confirmation"
                  placeholder="Ketik Ulang Kata Sandi"
                />
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
export default AddAdmin;
