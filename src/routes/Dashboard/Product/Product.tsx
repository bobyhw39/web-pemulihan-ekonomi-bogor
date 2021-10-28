import { Button, Popconfirm, Select, Table, Tag } from "antd";
import Search from "antd/lib/input/Search";
import { ColumnsType } from "antd/lib/table";
import "../../../styles/base.scss";
import Page from "../../../components/Page/Page";
import AddProduct from "./AddProduct";
import { useEffect, useState } from "react";
import {
  deleteProductRequest,
  getProducRequest,
} from "../../../actions/product";
import { useDispatch, useSelector } from "react-redux";
import { AuthUser } from "../../../models/AuthUser";
import { RootState } from "../../../models/RootState";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { convertDate, formatMoney } from "../../../utils/utils";
import { getCategoriesRequest } from "../../../actions/categories";
import EditProduct from "./EditProduct";
const { Option } = Select;

type Props = {
  authedData?: AuthUser;
};
const Product: React.FC<Props> = ({ authedData }) => {
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.product);
  const categories = useSelector((state: RootState) => state.categories);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [editVisible, setEditVisible] = useState(false);
  const [selectedObj, setselectedObj] = useState({});
  const [queryData, setQueryData] = useState({
    category_id: "",
    perPage: "10",
    sort: "terbaru",
    name: "",
    umkm_id: authedData?.user_id,
    page: "1",
  });
  const deleteProduct = (obj: any) => {
    dispatch(
      deleteProductRequest(obj.id, () => {
        dispatch(getProducRequest(queryData));
      })
    );
  };
  const editProduct = (obj: any) => {
    setEditVisible(true);
    setselectedObj(obj);
  };
  const columns: ColumnsType<any> = [
    {
      key: "operation",
      fixed: true,
      width: 50,
      render: (text, obj) => (
        <>
          <Popconfirm
            placement="bottomLeft"
            title="Yakin ingin menghapus?"
            onConfirm={() => deleteProduct(obj)}
            okText="Ya, Hapus"
            cancelText="Tidak"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
          <Button onClick={() => editProduct(obj)} icon={<EditOutlined />} />
        </>
      ),
      // render: () => <Button icon={<EditOutlined />} type="link" />,
    },
    {
      title: "ID ",
      dataIndex: "id",
      width: 50,
    },
    {
      title: "Nama Produk",
      dataIndex: "nama_produk",
      width: 300,
      key: "nama_produk",
    },
    {
      title: "Tanggal Buat",
      dataIndex: "created_at",
      width: 200,
      render: (text) => {
        return convertDate(text).full;
      },
    },
    {
      title: "Harga",
      dataIndex: "harga_produk",
      width: 200,
      className: "column-money",
      render: (text) => {
        return formatMoney(text);
      },
    },
    {
      title: "ID Klasifikasi",
      width: 100,
      dataIndex: "id_klasifikasi",
      key: "id_klasifikasi",
    },
    {
      title: "Deskripsi",
      width: 400,
      dataIndex: "deskripsi",
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 100,
      render: (text, row, index) => {
        if (text === "active") {
          return <Tag color="green">Aktif</Tag>;
        } else {
          return <Tag color="red">Tidak Aktif</Tag>;
        }
      },
    },
  ];

  const data = product.data?.data?.map((v: any, i: any) => ({ ...v, key: i }));

  useEffect(() => {
    dispatch(getProducRequest(queryData));
    dispatch(getCategoriesRequest({ perPage: 99, page: 1 }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onChangeProduct = (paginations: any, filters?: any, sorter?: any) => {
    setPagination((v) => ({ ...v, ...paginations }));
    dispatch(
      getProducRequest({
        ...queryData,
        page: paginations.current,
        perPage: paginations.pageSize,
      })
    );
  };

  const onChangeProductSort = (sort: any) => {
    setQueryData((v) => ({ ...v, sort }));
    dispatch(
      getProducRequest({
        ...queryData,
        sort,
        page: pagination.current,
        perPage: pagination.pageSize,
      })
    );
  };

  const onChangeProductCategory = (category_id: any) => {
    setQueryData((v) => ({ ...v, category_id }));
    dispatch(
      getProducRequest({
        ...queryData,
        category_id,
        page: pagination.current,
        perPage: pagination.pageSize,
      })
    );
  };
  const onChangeSearch = (name: any) => {
    setQueryData((v) => ({ ...v, name }));
    dispatch(
      getProducRequest({
        ...queryData,
        name,
        page: pagination.current,
        perPage: pagination.pageSize,
      })
    );
  };
  return (
    <Page title="">
      <>
        <AddProduct authedData={authedData} />
        <EditProduct
          authedData={authedData}
          setEditVisible={setEditVisible}
          editVisible={editVisible}
          selectedObj={selectedObj}
        />
        <div className="mb-2">
          <Search
            className="search-header mr-2"
            placeholder="Cari produk"
            // value={queryData.name}
            style={{ maxWidth: 250 }}
            onSearch={onChangeSearch}
          />
          <Select
            showSearch
            className="mr-2"
            placeholder="Pilih Kategori"
            style={{ width: 150 }}
            // value={queryData.category_id}
            onSelect={onChangeProductCategory}
          >
            <Option value="">- Pilih Kategori -</Option>

            {categories?.data?.data?.data?.map((v: any, i: any) => (
              <Option value={v.id}>{v.nama_klasifikasi}</Option>
            ))}
          </Select>
          <Select
            onSelect={onChangeProductSort}
            placeholder="Urutkan"
            // value={queryData.sort}
            className="mr-2"
          >
            <Option value="terbaru"> Terbaru </Option>
            <Option value="termurah"> Termurah </Option>
            <Option value="termahal"> Termahal </Option>
          </Select>
        </div>
        <div>
          <Table
            onChange={onChangeProduct}
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={data}
            loading={product.isLoading ?? false}
            pagination={{ ...pagination, total: product.data?.total_data }}
            scroll={{ x: 2000, y: 500 }}
            bordered
          />
        </div>
      </>
    </Page>
  );
};
export default Product;
