import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Upload,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { messageValidate, regexTest } from "../../../utils/constants";
import ImgCrop from "antd-img-crop";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../models/RootState";
import { endPoint } from "../../../utils/env";
import { beforeUpload, getBase64, xssValidBool } from "../../../utils/utils";
import { notificationLoadingMessage } from "../../../utils/notifications";
import { getProducRequest, postProductRequest } from "../../../actions/product";

const { Option } = Select;
const { confirm } = Modal;

type Props = {};

const AddProduct: React.FC<Props> = () => {
  const [imageUploads, setimageUploads] = useState<any>({
    imageOne: "",
    imageTwo: "",
    imageThree: "",
    imageFour: "",
    imageFive: "",
    imageSix: "",
    imageSeven: "",
    imageEight: "",
    imageNine: "",
    imageTen: "",
    imageEleven: "",
    imageTwelve: "",
    imageThirteen: "",
    imageFourteen: "",
    imageFifteen: "",
  });
  const [visible, setvisible] = useState(false);
  const [form] = useForm();
  const dispatch = useDispatch();
  const { getFieldValue, validateFields, resetFields } = form;
  const showDrawer = () => {
    setvisible(true);
  };
  const onClose = () => {
    setvisible(false);
  };
  const [fileLists, setFileLists] = useState<any>([]);

  const onChange = ({ file, fileList: newFileList }: any) => {
    if (file.status === "removed") {
      for (const key in file.response) {
        setimageUploads((v: any) => ({ ...v, [key]: "" }));
      }
    }
    if (file.status != null) {
      setFileLists(newFileList);
    }
  };
  const uploadMedia = (componentsData: any) => {
    let formData = new FormData();
    formData.append("imageOne", componentsData.file);
    fetch(endPoint.uploadFile.v1 + "uploadFile", {
      method: "POST",
      headers: {
        contentType: "multipart/form-data",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        for (const key in imageUploads) {
          if (imageUploads[key] === "") {
            setimageUploads((v: any) => ({
              ...v,
              [key]: data.Response_Data.image_one,
            }));
            componentsData.onSuccess({ [key]: data.Response_Data.image_one });
            break;
          }
        }
      })
      .catch((error) => {
        console.log("Error fetching profile " + error);
        componentsData.onError("Error uploading image");
      });
  };
  const categories = useSelector((state: RootState) => state.categories);
  const onSaveProduct = () => {
    validateFields().then(() => {
      const dataForm = {
        id_user: getFieldValue("id_user") || "",
        nama_produk: getFieldValue("nama_produk") || "",
        id_klasifikasi: getFieldValue("id_klasifikasi").toString() || "",
        harga_produk: getFieldValue("harga_produk").toString() || "",
        url_gambar: imageUploads,
        url_ecommerce: {
          shopee_url: getFieldValue("shopee") || "",
          tokped_url: getFieldValue("tokopedia") || "",
          bukalapak_url: getFieldValue("bukalapak") || "",
          lazada_url: getFieldValue("lazada") || "",
          instagram: getFieldValue("instagram") || "",
          facebook: getFieldValue("facebook") || "",
        },
        deskripsi: getFieldValue("deskripsi") || "",
      };
      confirm({
        title: "Anda yakin?",
        icon: <ExclamationCircleOutlined />,
        okText: "Ya",
        cancelText: "Batal",
        onOk() {
          notificationLoadingMessage("Tunggu sebentar");
          dispatch(
            postProductRequest(dataForm, () => {
              setvisible(false);
              resetFields();
              dispatch(
                getProducRequest({
                  category_id: "",
                  perPage: "10",
                  sort: "terbaru",
                  name: "",
                  umkm_id: "",
                  page: "1",
                })
              );
            })
          );
        },
        onCancel() {},
      });
    });
  };
  useEffect(() => {
    if (fileLists.length !== 0) {
      validateFields(["url_gambar"]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileLists]);
  const [previewImages, setpreviewImages] = useState<any>({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
  });
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setpreviewImages({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };
  const handleCancel = () => setpreviewImages({ previewVisible: false });

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        Tambah Produk
      </Button>
      <Drawer
        title="Tambahakan Produk Baru"
        width="90%"
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          layout="vertical"
          hideRequiredMark
          form={form}
          onFinish={onSaveProduct}
        >
          <Row gutter={16}>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                name="id_user"
                label="Id Pengguna"
                rules={[
                  {
                    required: true,
                    message: messageValidate("required", "Harga Produk "),
                  },
                ]}
              >
                <Input
                  placeholder="Ketik Id Pengguna"
                  style={{ display: "inline-block", width: "100%" }}
                  onKeyPress={(e) => {
                    // eslint-disable-next-line no-useless-escape
                    !regexTest.numeric.test(e.key) && e.preventDefault();
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="nama_produk"
                label="Nama Produk"
                rules={[
                  {
                    required: true,
                    message: messageValidate("required", "Nama Produk "),
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
                  placeholder="Ketik Nama Produk"
                  onKeyPress={(e) => {
                    // eslint-disable-next-line no-useless-escape
                    /[^A-Za-z ]/g.test(e.key) && e.preventDefault();
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                name="id_klasifikasi"
                label="Kategori"
                rules={[
                  {
                    required: true,
                    message: messageValidate("required", "Kategori "),
                  },
                ]}
              >
                <Select placeholder="Pilih Kategori">
                  <Option value="">- Pilih Kategori -</Option>

                  {categories?.data?.data?.data?.map((v: any, i: any) => (
                    <Option value={v.id}>{v.nama_klasifikasi}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                name="harga_produk"
                label="Harga Produk"
                rules={[
                  {
                    required: true,
                    message: messageValidate("required", "Harga Produk "),
                  },
                ]}
              >
                <InputNumber
                  style={{ display: "inline-block", width: "100%" }}
                  formatter={(value) =>
                    `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  // eslint-disable-next-line no-useless-escape
                  parser={(value: any) => value.replace(/\Rp\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="url_gambar"
                label="Gambar"
                rules={[
                  (value) => ({
                    validator(rule, value) {
                      if (fileLists.length === 0) {
                        return Promise.reject("Gambar harus di isi");
                      } else {
                        for (let index = 0; index < fileLists.length; index++) {
                          const element = fileLists[index];
                          if (element.status === "error") {
                            return Promise.reject(
                              "Terdapat gambar tidak valid"
                            );
                          }
                        }
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <ImgCrop rotate beforeCrop={beforeUpload}>
                  <Upload
                    beforeUpload={beforeUpload}
                    customRequest={uploadMedia}
                    listType="picture-card"
                    fileList={fileLists}
                    onChange={onChange}
                    onPreview={handlePreview}
                  >
                    {fileLists.length < 15 && "+ Unduh"}
                  </Upload>
                </ImgCrop>

                <Modal
                  visible={previewImages.previewVisible}
                  title={previewImages.previewTitle}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImages.previewImage}
                  />
                </Modal>
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item
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
                name="instagram"
                label="Instagram"
              >
                <Input placeholder="Ketik url Instagtram" />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item
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
                name="facebook"
                label="Facebook"
              >
                <Input placeholder="Ketik url Facebook" />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item
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
                name="shopee"
                label="Shopee"
              >
                <Input placeholder="Ketik url Shopee" />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item
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
                name="tokopedia"
                label="Tokopedia"
              >
                <Input placeholder="Ketik url Tokopedia" />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item
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
                name="bukalapak"
                label="Bukalapak"
              >
                <Input placeholder="Ketik url Bukalapak" />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item
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
                name="lazada"
                label="Lazada"
              >
                <Input placeholder="Ketik url Lazada" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
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
                name="deskripsi"
                label="Deskripsi"
              >
                <Input.TextArea rows={4} placeholder="Ketik Deskripsi" />
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

export default AddProduct;
