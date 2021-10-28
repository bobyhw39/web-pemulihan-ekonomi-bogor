import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  Modal,
  Radio,
} from "antd";
import { EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { messageValidate, regexTest } from "../../../utils/constants";
import { useForm } from "antd/lib/form/Form";
import {  useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../models/RootState";
import { xssValidBool } from "../../../utils/utils";
import {
  editProfileRequest,
  getAllUserRequest,
} from "../../../actions/user";
import { notificationLoadingMessage } from "../../../utils/notifications";

const { Option } = Select;
const { confirm } = Modal;
type Props = {
  obj: any;
};
const EditUser: React.FC<Props> = ({ obj }) => {
  const [form] = useForm();
  const { validateFields, getFieldValue } = form;
  const categories = useSelector((state: RootState) => state.categories);
  const alamatUser = obj?.alamat;
  const detailUmkm = obj?.umkm_detail;
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
        nama_lengkap: getFieldValue("nama_lengkap"),
        nik: getFieldValue("nik"),
        email: getFieldValue("email"),
        alamat: {
          alamat_user: getFieldValue("alamat_user"),
          kecamatan: getFieldValue("kecamatan"),
          kelurahan: getFieldValue("kelurahan"),
          rt: getFieldValue("rt"),
          rw: getFieldValue("rw"),
        },
        no_hp: getFieldValue("no_hp"),
        jenis_kelamin: getFieldValue("jenis_kelamin"),
        nama_umkm: getFieldValue("nama_umkm"),
        logo_umkm: "",
        umkm_detail: {
          alamat_umkm: getFieldValue("alamat_umkm"),
          klasifikasi_umkm: getFieldValue("klasifikasi_umkm"),
          shopee_url: getFieldValue("shopee_url"),
          tokped_url: getFieldValue("tokped_url"),
          bukalapak_url: getFieldValue("bukalapak_url"),
          lazada_url: getFieldValue("lazada_url"),
          instagram: getFieldValue("instagram"),
          facebook: getFieldValue("facebook"),
          no_regis_umkm: "",
        },
        legalitas: getFieldValue("legalitas"),
      };
      confirm({
        title: "Anda yakin?",
        icon: <ExclamationCircleOutlined />,
        okText: "Ya",
        cancelText: "Batal",
        onOk() {
          notificationLoadingMessage("Tunggu sebentar");
          dispatch(
            editProfileRequest(obj?.id, dataForm, () => {
              setVisible(false);
              dispatch(getAllUserRequest(10, "any", 1));
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
        title={"Ubah data profil | " + obj.id}
        placement="right"
        onClose={onClose}
        visible={visible}
        width="90%"
      >
        <Form
          layout="vertical"
          form={form}
          fields={[
            { name: "nik", value: obj?.nik },
            { name: "email", value: obj?.email },
            { name: "nama_lengkap", value: obj?.nama_lengkap },
            { name: "jenis_kelamin", value: obj?.jenis_kelamin },
            { name: "no_hp", value: obj?.no_hp },
            { name: "nama_umkm", value: obj?.nama_umkm },
            { name: "legalitas", value: obj?.legalitas },
            { name: "alamat_user", value: alamatUser?.alamat_user },
            { name: "rt", value: alamatUser?.rt },
            { name: "rw", value: alamatUser?.rw },
            { name: "kelurahan", value: alamatUser?.kelurahan },
            { name: "kecamatan", value: alamatUser?.kecamatan },
            { name: "alamat_umkm", value: detailUmkm?.alamat_umkm },
            { name: "klasifikasi_umkm", value: detailUmkm?.klasifikasi_umkm },
            { name: "shopee_url", value: detailUmkm?.shopee_url },
            { name: "tokped_url", value: detailUmkm?.tokped_url },
            { name: "bukalapak_url", value: detailUmkm?.bukalapak_url },
            { name: "lazada_url", value: detailUmkm?.lazada_url },
            { name: "instagram", value: detailUmkm?.instagram },
            { name: "facebook", value: detailUmkm?.facebook },
          ]}
        >
          <Row gutter={16}>
            <Col xl={8} lg={8} md={12} sm={12} xs={24}>
              <Form.Item
                name="nik"
                label="NIK"
                rules={[
                  {
                    required: true,
                    message: messageValidate("required", "NIK"),
                  },
                ]}
              >
                <Input readOnly />
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
                <Input readOnly />
              </Form.Item>
            </Col>
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
                  onKeyPress={(e) => {
                    // eslint-disable-next-line no-useless-escape
                    /[^A-Za-z ]/g.test(e.key) && e.preventDefault();
                  }}
                />
              </Form.Item>
            </Col>
            <Col xl={8} lg={8} md={12} sm={12} xs={24}>
              <Form.Item
                name="no_hp"
                label="No HP"
                rules={[
                  {
                    required: true,
                    message: messageValidate("required", "No HP"),
                  },
                ]}
              >
                <Input
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
                name="nama_umkm"
                label="Nama UMKM"
                rules={[
                  {
                    required: true,
                    message: messageValidate("required", "Nama UMKM "),
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
                <Input
                  onKeyPress={(e) => {
                    // eslint-disable-next-line no-useless-escape
                    /[^A-Za-z ]/g.test(e.key) && e.preventDefault();
                  }}
                />
              </Form.Item>
            </Col>
            <Col xl={8} lg={8} md={12} sm={12} xs={24}>
              <Form.Item
                name="legalitas"
                label="Legalitas"
                rules={[
                  {
                    required: true,
                    message: messageValidate("required", "Legalitas "),
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
                <Input
                  onKeyPress={(e) => {
                    // eslint-disable-next-line no-useless-escape
                    /[^A-Za-z ]/g.test(e.key) && e.preventDefault();
                  }}
                />
              </Form.Item>
            </Col>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item name="alamat" label="Info Alamat">
                <Row gutter={16}>
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
                      <Input />
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
                      <Input
                        onKeyPress={(e) => {
                          // eslint-disable-next-line no-useless-escape
                          /[^A-Za-z ]/g.test(e.key) && e.preventDefault();
                        }}
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
                      <Input
                        onKeyPress={(e) => {
                          // eslint-disable-next-line no-useless-escape
                          /[^A-Za-z ]/g.test(e.key) && e.preventDefault();
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
            </Col>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item name="umkm_detail" label="Info UMKM">
                <Row gutter={16}>
                  <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                    <Form.Item
                      name="alamat_umkm"
                      label="Alamat UMKM"
                      rules={[
                        {
                          required: true,
                          message: messageValidate("required", "Alamat UMKM "),
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
                      <Input
                        onKeyPress={(e) => {
                          // eslint-disable-next-line no-useless-escape
                          /[^A-Za-z0-9 ,-\./]/g.test(e.key) &&
                            e.preventDefault();
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                    <Form.Item
                      name="klasifikasi_umkm"
                      label="Klasifikasi UMKM"
                      rules={[
                        {
                          required: true,
                          message: messageValidate(
                            "required",
                            "Klasifikasi UMKM "
                          ),
                        },
                      ]}
                    >
                      <Select showSearch>
                        {categories?.data?.data?.data?.map((v: any, i: any) => (
                          <Option key={i} value={v.nama_klasifikasi}>
                            {v.nama_klasifikasi}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                    <Form.Item
                      name="shopee_url"
                      label="Shopee URL"
                      rules={[
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
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                    <Form.Item
                      name="tokped_url"
                      label="Tokopedia URL"
                      rules={[
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
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                    <Form.Item
                      name="bukalapak_url"
                      label="Bukalapak URL"
                      rules={[
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
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                    <Form.Item
                      name="lazada_url"
                      label="Lazada URL"
                      rules={[
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
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                    <Form.Item
                      name="instagram"
                      label="Instagram URL"
                      rules={[
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
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                    <Form.Item
                      name="facebook"
                      label="Facebook URL"
                      rules={[
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
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" onClick={onSubmit}>
              Simpan
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
export default EditUser;
