/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Col, Row, Skeleton } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesRequest } from "../../../actions/categories";
import { getUserByIdRequest } from "../../../actions/user";
import Page from "../../../components/Page/Page";
import { AuthUser } from "../../../models/AuthUser";
import { RootState } from "../../../models/RootState";
import EditProfile from "./EditProfile";

type Props = {
  authedData: AuthUser;
};

const Profile: React.FC<Props> = ({ authedData }) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state: RootState) => state.user);
  const alamatUser = data?.data?.alamat;
  const detailUmkm = data?.data?.umkm_detail;
  useEffect(() => {
    dispatch(getUserByIdRequest(authedData?.user_id));
    dispatch(getCategoriesRequest({ perPage: 99, page: 1 }));
  }, []);
  return (
    <Page title="">
      <div>
        <EditProfile authedData={authedData} />
        <Row gutter={[16, 16]}>
          <Col xl={8} lg={8} md={12} sm={24} xs={24}>
            <Card title="NIK" bordered={false}>
              <Skeleton active loading={isLoading} paragraph={{ rows: 0 }} />{" "}
              {!isLoading ? <strong>{data?.data?.nik}</strong> : null}
            </Card>
          </Col>
          <Col xl={8} lg={8} md={12} sm={24} xs={24}>
            <Card title="Nama Lengkap" bordered={false}>
              <Skeleton active loading={isLoading} paragraph={{ rows: 0 }} />{" "}
              {!isLoading ? <strong>{data?.data?.nama_lengkap}</strong> : null}
            </Card>
          </Col>
          <Col xl={8} lg={8} md={12} sm={24} xs={24}>
            <Card title="Email" bordered={false}>
              <Skeleton active loading={isLoading} paragraph={{ rows: 0 }} />{" "}
              {!isLoading ? <strong>{data?.data?.email}</strong> : null}
            </Card>
          </Col>
          <Col xl={8} lg={8} md={12} sm={24} xs={24}>
            <Card title="No HP" bordered={false}>
              <Skeleton active loading={isLoading} paragraph={{ rows: 0 }} />{" "}
              {!isLoading ? <strong>{data?.data?.no_hp}</strong> : null}
            </Card>
          </Col>
          <Col xl={8} lg={8} md={12} sm={24} xs={24}>
            <Card title="Jenis Kelamin" bordered={false}>
              <Skeleton active loading={isLoading} paragraph={{ rows: 0 }} />{" "}
              {!isLoading ? <strong>{data?.data?.jenis_kelamin}</strong> : null}
            </Card>
          </Col>
          <Col xl={8} lg={8} md={12} sm={24} xs={24}>
            <Card title="Legalitas" bordered={false}>
              <Skeleton active loading={isLoading} paragraph={{ rows: 0 }} />{" "}
              {!isLoading ? <strong>{data?.data?.legalitas}</strong> : null}
            </Card>
          </Col>
          <Col xl={24}>
            <Card title="Info Pengguna" bordered={false}>
              <Row gutter={[16, 16]}>
                <Col xl={6} lg={6} md={8} sm={12} xs={24}>
                  Alamat Lengkap :
                </Col>
                <Col xl={18} lg={18} md={16} sm={12} xs={24}>
                  <Skeleton
                    active
                    loading={isLoading}
                    paragraph={{ rows: 0 }}
                  />{" "}
                  {!isLoading ? (
                    <strong>{alamatUser?.alamat_user}</strong>
                  ) : null}
                </Col>
                <Col xl={6} lg={6} md={8} sm={12} xs={12}>
                  RT :
                </Col>
                <Col xl={18} lg={18} md={16} sm={12} xs={12}>
                  <Skeleton
                    active
                    loading={isLoading}
                    paragraph={{ rows: 0 }}
                  />{" "}
                  {!isLoading ? <strong>{alamatUser?.rt}</strong> : null}
                </Col>
                <Col xl={6} lg={6} md={8} sm={12} xs={12}>
                  RW :
                </Col>
                <Col xl={18} lg={18} md={16} sm={12} xs={12}>
                  <Skeleton
                    active
                    loading={isLoading}
                    paragraph={{ rows: 0 }}
                  />{" "}
                  {!isLoading ? <strong>{alamatUser?.rw}</strong> : null}
                </Col>
                <Col xl={6} lg={6} md={8} sm={12} xs={24}>
                  Kelurahan :
                </Col>
                <Col xl={18} lg={18} md={16} sm={12} xs={24}>
                  <Skeleton
                    active
                    loading={isLoading}
                    paragraph={{ rows: 0 }}
                  />{" "}
                  {!isLoading ? <strong>{alamatUser?.kelurahan}</strong> : null}
                </Col>
                <Col xl={6} lg={6} md={8} sm={12} xs={24}>
                  Kecamatan :
                </Col>
                <Col xl={18} lg={18} md={16} sm={12} xs={24}>
                  <Skeleton
                    active
                    loading={isLoading}
                    paragraph={{ rows: 0 }}
                  />{" "}
                  {!isLoading ? <strong>{alamatUser?.kecamatan}</strong> : null}
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xl={24}>
            <Card title="Info UMKM" bordered={false}>
              <Row gutter={[16, 16]}>
                <Col xl={6} lg={6} md={8} sm={12} xs={24}>
                  ID :
                </Col>
                <Col xl={18} lg={18} md={16} sm={12} xs={24}>
                  <Skeleton
                    active
                    loading={isLoading}
                    paragraph={{ rows: 0 }}
                  />{" "}
                  {!isLoading ? (
                    <strong>{detailUmkm?.no_regis_umkm}</strong>
                  ) : null}
                </Col>
                <Col xl={6} lg={6} md={8} sm={12} xs={24}>
                  Nama UMKM :
                </Col>
                <Col xl={18} lg={18} md={16} sm={12} xs={24}>
                  <Skeleton
                    active
                    loading={isLoading}
                    paragraph={{ rows: 0 }}
                  />{" "}
                  {!isLoading ? <strong>{data?.data?.nama_umkm}</strong> : null}
                </Col>
                <Col xl={6} lg={6} md={8} sm={12} xs={24}>
                  Alamat UMKM :
                </Col>
                <Col xl={18} lg={18} md={16} sm={12} xs={24}>
                  <Skeleton
                    active
                    loading={isLoading}
                    paragraph={{ rows: 0 }}
                  />{" "}
                  {!isLoading ? (
                    <strong>{detailUmkm?.alamat_umkm}</strong>
                  ) : null}
                </Col>
                <Col xl={6} lg={6} md={8} sm={12} xs={24}>
                  Klasifikasi UMKM :
                </Col>
                <Col xl={18} lg={18} md={16} sm={12} xs={24}>
                  <Skeleton
                    active
                    loading={isLoading}
                    paragraph={{ rows: 0 }}
                  />{" "}
                  {!isLoading ? (
                    <strong>{detailUmkm?.klasifikasi_umkm}</strong>
                  ) : null}
                </Col>
                <Col xl={6} lg={6} md={8} sm={12} xs={24}>
                  shopee_url :
                </Col>
                <Col xl={18} lg={18} md={16} sm={12} xs={24}>
                  <Skeleton
                    active
                    loading={isLoading}
                    paragraph={{ rows: 0 }}
                  />{" "}
                  {!isLoading ? (
                    <strong>{detailUmkm?.shopee_url}</strong>
                  ) : null}
                </Col>
                <Col xl={6} lg={6} md={8} sm={12} xs={24}>
                  tokped_url :
                </Col>
                <Col xl={18} lg={18} md={16} sm={12} xs={24}>
                  <Skeleton
                    active
                    loading={isLoading}
                    paragraph={{ rows: 0 }}
                  />{" "}
                  {!isLoading ? (
                    <strong>{detailUmkm?.tokped_url}</strong>
                  ) : null}
                </Col>
                <Col xl={6} lg={6} md={8} sm={12} xs={24}>
                  bukalapak_url :
                </Col>
                <Col xl={18} lg={18} md={16} sm={12} xs={24}>
                  <Skeleton
                    active
                    loading={isLoading}
                    paragraph={{ rows: 0 }}
                  />{" "}
                  {!isLoading ? (
                    <strong>{detailUmkm?.bukalapak_url}</strong>
                  ) : null}
                </Col>
                <Col xl={6} lg={6} md={8} sm={12} xs={24}>
                  lazada_url :
                </Col>
                <Col xl={18} lg={18} md={16} sm={12} xs={24}>
                  <Skeleton
                    active
                    loading={isLoading}
                    paragraph={{ rows: 0 }}
                  />{" "}
                  {!isLoading ? (
                    <strong>{detailUmkm?.lazada_url}</strong>
                  ) : null}
                </Col>
                <Col xl={6} lg={6} md={8} sm={12} xs={24}>
                  instagram :
                </Col>
                <Col xl={18} lg={18} md={16} sm={12} xs={24}>
                  <Skeleton
                    active
                    loading={isLoading}
                    paragraph={{ rows: 0 }}
                  />{" "}
                  {!isLoading ? <strong>{detailUmkm?.instagram}</strong> : null}
                </Col>
                <Col xl={6} lg={6} md={8} sm={12} xs={24}>
                  facebook :
                </Col>
                <Col xl={18} lg={18} md={16} sm={12} xs={24}>
                  <Skeleton
                    active
                    loading={isLoading}
                    paragraph={{ rows: 0 }}
                  />{" "}
                  {!isLoading ? <strong>{detailUmkm?.facebook}</strong> : null}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </Page>
  );
};
export default Profile;
