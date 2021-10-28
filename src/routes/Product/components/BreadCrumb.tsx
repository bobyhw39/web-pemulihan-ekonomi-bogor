import { ArrowLeftOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Menu } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../models/RootState";
import history from "../../../utils/history";

export default function BreadCrumb() {
  const { dataId } = useSelector((state: RootState) => state.product);
  const categories = useSelector((state: RootState) => state.categories);
  const menu = (
    <Menu>
      {categories?.data?.data?.data?.map((v: any, i: any) => (
        <Menu.Item key={i}>
          <Link
            to={{
              search: `category=${
                v.id
              }&per_page=10&sort=&product_name=&umkm=&page=${1}`,
              pathname: "/search",
            }}
          >
            {v.nama_klasifikasi}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );
  const category = categories?.data?.data?.data?.find(
    (v: any, i: any) => v.id === dataId?.data?.id_klasifikasi
  );
  const goBack = () => {
    history.goBack();
  };
  return (
    <div className="mb-2">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Button
            onClick={goBack}
            size="small"
            type="text"
            icon={<ArrowLeftOutlined />}
          />
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item overlay={menu}>
          {category?.nama_klasifikasi}
        </Breadcrumb.Item>
        <Breadcrumb.Item>{dataId?.data?.nama_produk}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}
