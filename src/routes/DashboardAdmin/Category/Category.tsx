import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Popconfirm, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoryRequest,
  getCategoriesRequest,
} from "../../../actions/categories";
import { Layout } from "../../../components";
import { AuthUser } from "../../../models/AuthUser";
import { RootState } from "../../../models/RootState";
import { notificationLoadingMessage } from "../../../utils/notifications";
import { convertDate } from "../../../utils/utils";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";

type Props = {
  authedData?: AuthUser;
};
const Category: React.FC<Props> = () => {
  const { data, isLoading } = useSelector(
    (state: RootState) => state.categories
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategoriesRequest({ perPage: 10, page: 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteHandler = (obj: any) => {
    notificationLoadingMessage("Tunggu sebentar");
    dispatch(
      deleteCategoryRequest(obj.id, () => {
        dispatch(getCategoriesRequest({ perPage: 10, page: 1 }));
      })
    );
  };
  const datas = data?.data?.data?.map((v: any, i: any) => ({ ...v, key: i }));
  const columns: ColumnsType<any> = [
    {
      key: "operation",
      fixed: true,
      width: 70,
      render: (text, obj) => (
        <>
          <Popconfirm
            placement="bottomLeft"
            title="Yakin ingin menghapus?"
            onConfirm={() => deleteHandler(obj)}
            okText="Ya, Hapus"
            cancelText="Tidak"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
          <EditCategory obj={obj} />
        </>
      ),
    },
    {
      title: "ID ",
      dataIndex: "id",
      width: 50,
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
      title: "Tanggal Ubah",
      dataIndex: "updated_at",
      width: 200,
      render: (text) => {
        return convertDate(text).full;
      },
    },
    {
      title: "Nama Klasifikasi ",
      dataIndex: "nama_klasifikasi",
      // width: 400,
    },
  ];
  const onChangeProduct = (paginations: any, filters?: any, sorter?: any) => {
    dispatch(
      getCategoriesRequest({
        perPage: paginations.perPage,
        page: paginations.page,
      })
    );
  };
  return (
    <Layout title="Klasifikasi">
      <h3>Data Klasifikasi</h3>
      <AddCategory />
      <Card>
        <Table
          onChange={onChangeProduct}
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={datas}
          loading={isLoading ?? false}
          pagination={{
            pageSize: data?.data?.per_page || 10,
            current: data?.data?.current_page || 1,
            total: data?.data?.total_data,
          }}
          scroll={{ x: 2000, y: 500 }}
          bordered
        />
      </Card>
    </Layout>
  );
};

export default Category;
