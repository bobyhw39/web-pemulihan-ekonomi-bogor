import React, { useEffect, useState } from "react";
import { Drawer, Form, Button, Col, Row, Input, Modal, Upload } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useDispatch } from "react-redux";
import { EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { messageValidate, regexTest } from "../../../utils/constants";
import { beforeUpload, getBase64, xssValidBool } from "../../../utils/utils";
import { notificationLoadingMessage } from "../../../utils/notifications";
import ImgCrop from "antd-img-crop";
import { endPoint } from "../../../utils/env";
import {
  getInfoWisataRequest,
  updateInfoWisataRequest,
} from "../../../actions/infoWisata";

const { confirm } = Modal;
type Props = {
  obj: any;
};
const EditWisata: React.FC<Props> = ({ obj }) => {
  const [previewImages, setpreviewImages] = useState<any>({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
  });

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
  const { validateFields, getFieldValue, resetFields } = form;
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const [fileLists, setFileLists] = useState<any>([]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  useEffect(() => {
    const temp = {
      uid: "1",
      name: "xxx.png",
      status: "done",
      response: "Server Error 500", // custom error message to show
      url: "http://www.baidu.com/xxx.png",
    };
    let arrTemp = [];
    if (obj?.url_gambar) {
      const arr = [];
      for (const key in obj?.url_gambar) {
        const element = obj?.url_gambar[key];
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
  }, [obj?.id]);
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
  const onSubmit = () => {
    validateFields().then(() => {
      const dataForm = {
        nama_wisata: getFieldValue("nama_wisata"),
        lokasi_wisata: getFieldValue("lokasi_wisata"),
        deskripsi_wisata: getFieldValue("deskripsi_wisata"),
        url_gambar: imageUploads,
        url_socmed: {
          website: getFieldValue("website"),
          instagram: getFieldValue("instagram"),
          facebook: getFieldValue("facebook"),
          youtube: getFieldValue("youtube"),
        },
        no_hp: getFieldValue("no_hp"),
      };
      confirm({
        title: "Anda yakin?",
        icon: <ExclamationCircleOutlined />,
        okText: "Ya",
        cancelText: "Batal",
        onOk() {
          notificationLoadingMessage("Tunggu sebentar");
          dispatch(
            updateInfoWisataRequest(dataForm, obj.id, () => {
              setVisible(false);
              resetFields();
              dispatch(
                getInfoWisataRequest({
                  name: "",
                  perPage: "10",
                  location: "",
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
      <Button onClick={showDrawer} icon={<EditOutlined />} />
      <Drawer
        title={"Ubah Wisata | " + obj.id}
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
            {
              name: "nama_wisata",
              value: obj?.nama_wisata,
            },
            {
              name: "lokasi_wisata",
              value: obj?.lokasi_wisata,
            },
            {
              name: "deskripsi_wisata",
              value: obj?.deskripsi_wisata,
            },
            {
              name: "website",
              value: obj?.website,
            },
            {
              name: "instagram",
              value: obj?.instagram,
            },
            {
              name: "facebook",
              value: obj?.facebook,
            },
            {
              name: "youtube",
              value: obj?.youtube,
            },
            {
              name: "no_hp",
              value: obj?.no_hp,
            },
          ]}
        >
          <Row gutter={16}>
            <Col xl={8} lg={8} md={12} sm={12} xs={24}>
              <Form.Item
                name="nama_wisata"
                label="Nama Wisata"
                rules={[
                  {
                    required: true,
                    message: messageValidate("required", "Nama Wisata"),
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
                <Input placeholder="Ketik Nama Wisata" />
              </Form.Item>
            </Col>{" "}
            <Col xl={8} lg={8} md={12} sm={12} xs={24}>
              <Form.Item
                name="lokasi_wisata"
                label="Lokasi"
                rules={[
                  {
                    required: true,
                    message: messageValidate("required", "Lokasi"),
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
                <Input placeholder="Ketik Lokasi" />
              </Form.Item>
            </Col>
            <Col xl={8} lg={8} md={12} sm={12} xs={24}>
              <Form.Item
                name="no_hp"
                label="No Hp"
                rules={[
                  {
                    required: true,
                    message: messageValidate("required", "No Hp"),
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
                  placeholder="Ketik No Hp"
                  onKeyPress={(e) => {
                    // eslint-disable-next-line no-useless-escape
                    !regexTest.numeric.test(e.key) && e.preventDefault();
                  }}
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
                name="website"
                label="Website"
              >
                <Input placeholder="Ketik url website" />
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
                <Input placeholder="Ketik url instagram" />
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
                <Input placeholder="Ketik url facebook" />
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
                name="youtube"
                label="Youtube"
              >
                <Input placeholder="Ketik url youtube" />
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
                name="deskripsi_wisata"
                label="Deskripsi Wisata"
              >
                <Input.TextArea rows={4} placeholder="Ketik Deskripsi Wisata" />
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
export default EditWisata;
