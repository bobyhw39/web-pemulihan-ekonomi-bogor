import { ExclamationCircleOutlined } from "@ant-design/icons";
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
import { xssValidBool, beforeUpload } from "../../../utils/utils";
import { notificationLoadingMessage } from "../../../utils/notifications";
import { editProductRequest, getProducRequest } from "../../../actions/product";
import { AuthUser } from "../../../models/AuthUser";

const { Option } = Select;
const { confirm } = Modal;

type Props = {
  authedData?: AuthUser;
  editVisible: any;
  setEditVisible: any;
  selectedObj: any;
};

const EditProduct: React.FC<Props> = ({
  authedData,
  editVisible,
  setEditVisible,
  selectedObj,
}) => {
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
  const [form] = useForm();
  const dispatch = useDispatch();
  const { getFieldValue, validateFields } = form;

  const onClose = () => {
    setEditVisible(false);
  };
  const [fileLists, setFileLists] = useState<any>([]);
  useEffect(() => {
    const temp = {
      uid: "1",
      name: "xxx.png",
      status: "done",
      response: "Server Error 500", // custom error message to show
      url: "http://www.baidu.com/xxx.png",
    };
    let arrTemp = [];
    if (selectedObj.url_gambar) {
      const arr = [];
      for (const key in selectedObj?.url_gambar) {
        const element = selectedObj?.url_gambar[key];
        if (element !== "") {
          arr.push(element);
        }
      }
      if (arr.length === 0) {
      } else {
        let imgTemp: any = {
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
        };
        for (let index = 0; index < arr.length; index++) {
          const element = arr[index];
          for (const key in imgTemp) {
            if (imgTemp[key] === "") {
              imgTemp = { ...imgTemp, [key]: element };
              arrTemp.push({
                ...temp,
                uid: index,
                name: element,
                response: { [key]: element },
                url: element,
              });
              break;
            }
          }
        }
        setimageUploads(imgTemp);
        setFileLists(arrTemp);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedObj.id]);
  const onChange = ({ file, fileList: newFileList }: any) => {
    if (file.status === "removed") {
      console.log("removed");
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
            editProductRequest(dataForm, selectedObj.id, () => {
              setEditVisible(false);
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
      <Drawer
        title={"Ubah Produk | " + selectedObj.id}
        width="90%"
        onClose={onClose}
        visible={editVisible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          layout="vertical"
          hideRequiredMark
          form={form}
          fields={[
            {
              name: "nama_produk",
              value: selectedObj.nama_produk,
            },
            {
              name: "id_klasifikasi",
              value: selectedObj.id_klasifikasi,
            },
            {
              name: "harga_produk",
              value: selectedObj.harga_produk,
            },
            {
              name: "deskripsi",
              value: selectedObj.deskripsi,
            },
            {
              name: "instagram",
              value: selectedObj.url_ecommerce?.instagram,
            },
            {
              name: "facebook",
              value: selectedObj.url_ecommerce?.facebook,
            },
            {
              name: "shopee",
              value: selectedObj.url_ecommerce?.shopee_url,
            },
            {
              name: "tokopedia",
              value: selectedObj.url_ecommerce?.tokped_url,
            },
            {
              name: "bukalapak",
              value: selectedObj.url_ecommerce?.bukalapak_url,
            },
            {
              name: "lazada",
              value: selectedObj.url_ecommerce?.lazada_url,
            },
          ]}
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

export default EditProduct;
function getBase64(originFileObj: any): any {
  throw new Error("Function not implemented.");
}
