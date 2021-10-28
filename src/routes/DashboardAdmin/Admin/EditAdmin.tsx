import React, { useEffect, useState } from "react";
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
import { EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import {
  kecamatanBogor,
  kelurahanBogor,
  messageValidate,
  regexTest,
} from "../../../utils/constants";
import { notificationLoadingMessage } from "../../../utils/notifications";
import { getAdminRequest, updateAdminRequest } from "../../../actions/admin";

const { confirm } = Modal;
type Props = {
  obj: any;
};
const EditAdmin: React.FC<Props> = ({ obj }) => {
  const [form] = useForm();
  const { validateFields, getFieldsValue } = form;
  const [visible, setVisible] = useState(false);
  const [myLoc, setmyLoc] = useState<any>({ kecamatan: null, kelurahan: null });
  const address = JSON.parse(obj?.alamat || "{}");
  const dispatch = useDispatch();
  useEffect(() => {
    if (address) {
      setmyLoc({
        kecamatan: { value: address.kecamatan },
        kelurahan: { value: address.kelurahan },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obj?.id]);
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
            updateAdminRequest(getFieldsValue(), obj.id, () => {
              setVisible(false);
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
      <Button onClick={showDrawer} icon={<EditOutlined />} />
      <Drawer
        title={"Ubah Admin | " + obj.id}
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
            { name: "nama_lengkap", value: obj?.nama_lengkap },
            { name: "email", value: obj?.email },
            { name: "no_hp", value: obj?.no_hp },
            { name: "role", value: obj?.role },
            { name: "jenis_kelamin", value: obj?.jenis_kelamin },
            { name: "alamat_user", value: address?.alamat_user },
            { name: "rt", value: address?.rt },
            { name: "rw", value: address?.rw },
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
export default EditAdmin;
