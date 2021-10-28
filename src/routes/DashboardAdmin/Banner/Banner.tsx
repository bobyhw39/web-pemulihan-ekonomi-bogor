import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Popconfirm, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBannerRequest, getBannerRequest } from "../../../actions/banner";
import { Layout } from "../../../components";
import { AuthUser } from "../../../models/AuthUser";
import { RootState } from "../../../models/RootState";
import { convertDate } from "../../../utils/utils";
import AddBanner from "./AddBanner";
import EditBanner from "./EditBanner";

type Props = {
  authedData?: AuthUser;
};
const Banner: React.FC<Props> = () => {
  const { data, isLoading } = useSelector((state: RootState) => state.banner);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBannerRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const datas = data?.data?.map((v: any, i: any) => ({ ...v, key: i }));

  const deleteHandler = (obj: any) => {
    dispatch(
      deleteBannerRequest(obj.id, () => {
        dispatch(getBannerRequest());
      })
    );
  };
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
          <EditBanner obj={obj} />
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
      title: "Nama Iklan ",
      dataIndex: "nama_iklan",
    },
  ];
  // const onChangeProduct = (paginations: any, filters?: any, sorter?: any) => {
  // dispatch(getAllUserRequest(paginations.perPage, "any", paginations.page));
  // };
  return (
    <Layout title="Banner Iklan">
      <h3>Data Banner Iklan</h3>
      <AddBanner />
      <Card>
        <Table
          //   onChange={onChangeProduct}
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={datas}
          loading={isLoading ?? false}
          //   pagination={true}
          scroll={{ x: 2000, y: 500 }}
          bordered
        />
      </Card>
    </Layout>
  );
};

export default Banner;
