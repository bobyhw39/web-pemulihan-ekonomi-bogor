import { useEffect } from "react";
import "../../styles/base.scss";

import { Layout } from "../../components";
import Header from "../../components/Header";
import Footer from "../../components/footer/Footer";
import BreadCrumb from "./components/BreadCrumb";
import Content from "./components/Content";
import "./styles/styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { getProductByIDRequest } from "../../actions/product";
import { useParams } from "react-router";
import { AuthUser } from "../../models/AuthUser";
import { getUserByIdRequest } from "../../actions/user";
import { RootState } from "../../models/RootState";
import { Result, Spin } from "antd";

type Props = {
  authedData?: AuthUser;
};

const Product: React.FC<Props> = ({ authedData }) => {
  const dispatch = useDispatch();
  const { id }: any = useParams();
  const { dataId, isLoading } = useSelector(
    (state: RootState) => state.product
  );
  useEffect(() => {
    if (dataId?.data != null) {
      dispatch(getUserByIdRequest(dataId.data?.id_user));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataId]);
  useEffect(() => {
    dispatch(getProductByIDRequest(id));
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return (
    <Layout title="Detail Product">
      <Header authedData={authedData} />
      <div className="container mt-2 mb-2">
        <Spin spinning={isLoading} tip="Memuat...">
          {isLoading ? (
            <> </>
          ) : dataId ? (
            <>
              <BreadCrumb />
              <Content authedData={authedData} />
            </>
          ) : (
            <Result
              status="404"
              title="404"
              subTitle="Maaf, Produk tidak ditemukan."
            />
          )}
        </Spin>
      </div>
      <Footer authedData={authedData} />
    </Layout>
  );
};
export default Product;
