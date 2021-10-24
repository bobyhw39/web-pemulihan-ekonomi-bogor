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
import { messageValidate } from "../../../utils/constants";
import ImgCrop from "antd-img-crop";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../models/RootState";
import { endPoint } from "../../../utils/env";
import { xssValidBool } from "../../../utils/utils";
import { notificationLoadingMessage } from "../../../utils/notifications";
import { getProducRequest, postProductRequest } from "../../../actions/product";
import { AuthUser } from "../../../models/AuthUser";

const { Option } = Select;
const { confirm } = Modal;

type Props = {
  authedData?: AuthUser;
};

const AddProduct: React.FC<Props> = ({ authedData }) => {
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
  const { getFieldValue, validateFields } = form;
  const showDrawer = () => {
    setvisible(true);
  };
  const onClose = () => {
    setvisible(false);
  };
  const [fileLists, setFileLists] = useState<any>([]);

  const onChange = ({ file, fileList: newFileList }: any) => {
    if (file.status === "removed") {
      console.log("removed");
      for (const key in file.response) {
        setimageUploads((v: any) => ({ ...v, [key]: "" }));
      }
    }
    setFileLists(newFileList);
  };
  const onPreview = async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow: any = window.open(src);
    imgWindow.document.write(image.outerHTML);
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
        id_user: authedData?.user_id.toString(),
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
              dispatch(
                getProducRequest({
                  category_id: "",
                  perPage: "10",
                  sort: "terbaru",
                  name: "",
                  umkm_id: authedData?.user_id,
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

  return (
    <>
      <Button
        type="primary"
        className="mb-2"
        onClick={showDrawer}
        icon={<PlusOutlined />}
      >
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
                <Input placeholder="Ketik Nama Produk" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
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
            <Col span={12}>
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
                <ImgCrop rotate>
                  <Upload
                    customRequest={uploadMedia}
                    listType="picture-card"
                    fileList={fileLists}
                    onChange={onChange}
                    onPreview={onPreview}
                  >
                    {fileLists.length < 15 && "+ Unduh"}
                  </Upload>
                </ImgCrop>
              </Form.Item>
            </Col>

            <Col span={12}>
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
            <Col span={12}>
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
            <Col span={12}>
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
            <Col span={12}>
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
            <Col span={12}>
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
            <Col span={12}>
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