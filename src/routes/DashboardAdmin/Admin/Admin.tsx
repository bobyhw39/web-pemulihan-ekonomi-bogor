import { Card, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  getAdminRequest } from "../../../actions/admin";
import { Layout } from "../../../components";
import { AuthUser } from "../../../models/AuthUser";
import { RootState } from "../../../models/RootState";
import { convertDate } from "../../../utils/utils";
import AddAdmin from "./AddAdmin";
import EditAdmin from "./EditAdmin";

type Props = {
  authedData?: AuthUser;
};
const Admin: React.FC<Props> = () => {
  const { data, isLoading } = useSelector((state: RootState) => state.admin);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAdminRequest({ pageSize: 10, current: 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const datas = data?.data?.data?.map((v: any, i: any) => ({ ...v, key: i }));
  const columns: ColumnsType<any> = [
    {
      key: "operation",
      fixed: true,
      width: 70,
      render: (text, obj) => (
        <>
          <EditAdmin obj={obj} />
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
      width: 150,
      render: (text) => {
        return convertDate(text).full;
      },
    },
    {
      title: "Tanggal Ubah",
      dataIndex: "updated_at",
      width: 150,
      render: (text) => {
        return convertDate(text).full;
      },
    },
    {
      title: "Nama Lengkap",
      dataIndex: "nama_lengkap",
      width: 200,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 200,
    },
    {
      title: "No HP",
      width: 150,
      dataIndex: "no_hp",
    },
    {
      title: "Jenis Kelamin",
      width: 100,
      dataIndex: "jenis_kelamin",
    },

    {
      title: "Alamat",
      width: 400,
      dataIndex: "alamat",
      render: (text) => {
        // const newText = JSON.parse(text || "{}");
        // const str = newText.alamat_user;
        return text;
      },
    },
    {
      title: "Role",
      width: 100,
      dataIndex: "role",
    },
  ];
  const onChangeProduct = (paginations: any, filters?: any, sorter?: any) => {
    const { pageSize, current } = paginations;
    dispatch(getAdminRequest({ pageSize, current }));
  };
  return (
    <Layout title="Admin">
      <h3>Data Admin</h3>
      <AddAdmin />
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

export default Admin;
