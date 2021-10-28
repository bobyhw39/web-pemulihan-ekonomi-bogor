import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Popconfirm, Select, Table, Tag } from "antd";
import Search from "antd/lib/input/Search";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesRequest } from "../../../actions/categories";
import {
  deleteProductRequest,
  getProducRequest,
} from "../../../actions/product";
import { Layout } from "../../../components";
import { AuthUser } from "../../../models/AuthUser";
import { RootState } from "../../../models/RootState";
import { convertDate, formatMoney } from "../../../utils/utils";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
const { Option } = Select;

type Props = {
  authedData?: AuthUser;
};
const Product: React.FC<Props> = () => {
  const { data, isLoading } = useSelector((state: RootState) => state.product);
  const categories = useSelector((state: RootState) => state.categories);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [queryData, setQueryData] = useState({
    category_id: "",
    perPage: "10",
    sort: "terbaru",
    name: "",
    umkm_id: "",
    page: "1",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducRequest(queryData));
    dispatch(getCategoriesRequest({ perPage: 99, page: 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteProduct = (obj: any) => {
    dispatch(
      deleteProductRequest(obj.id, () => {
        dispatch(getProducRequest(queryData));
      })
    );
  };
  const datas = data?.data?.map((v: any, i: any) => ({ ...v, key: i }));
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
          <EditProduct obj={obj} />
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
      title: "ID Kategori",
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
    <Layout title="Produk">
      <h3>Data Produk</h3>
      <AddProduct />
      <div className="mb-2 mt-2">
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
      <Card>
        <Table
          onChange={onChangeProduct}
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={datas}
          loading={isLoading ?? false}
          pagination={{
            pageSize: data?.per_page || 10,
            current: data?.current_page || 1,
            total: data?.total_data,
          }}
          scroll={{ x: 2000, y: 500 }}
          bordered
        />
      </Card>
    </Layout>
  );
};

export default Product;
