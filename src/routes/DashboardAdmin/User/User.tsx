import { Card, Layout, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserRequest } from "../../../actions/user";
import { AuthUser } from "../../../models/AuthUser";
import { RootState } from "../../../models/RootState";
import EditUser from "./EditUser";

type Props = {
  authedData?: AuthUser;
};
const User: React.FC<Props> = ({ authedData }) => {
  const { datas, isLoading } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUserRequest(10, "any", 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = datas?.data.data?.map((v: any, i: any) => ({ ...v, key: i }));
  const columns: ColumnsType<any> = [
    {
      key: "operation",
      fixed: true,
      width: 50,
      render: (text, obj) => (
        <>
          <EditUser obj={obj} />
        </>
      ),
    },
    {
      title: "ID ",
      dataIndex: "id",
      width: 50,
    },
    {
      title: "NIK",
      dataIndex: "nik",
      width: 300,
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
      width: 100,
      dataIndex: "no_hp",
    },
    {
      title: "Jenis Kelamin",
      width: 400,
      dataIndex: "jenis_kelamin",
    },
    {
      title: "Role",
      width: 400,
      dataIndex: "role",
    },
  ];
  const onChangeProduct = (paginations: any, filters?: any, sorter?: any) => {
    dispatch(getAllUserRequest(paginations.perPage, "any", paginations.page));
  };
  return (
    <Layout title="Users">
      <h3>Data Pengguna</h3>
      <Card>
        <Table
          onChange={onChangeProduct}
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={data}
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

export default User;
