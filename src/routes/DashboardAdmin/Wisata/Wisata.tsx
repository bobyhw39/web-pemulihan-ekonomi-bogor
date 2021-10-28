import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Popconfirm, Table, Tag } from "antd";
import Search from "antd/lib/input/Search";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteInfoWisataRequest,
  getInfoWisataRequest,
} from "../../../actions/infoWisata";
import { Layout } from "../../../components";
import { AuthUser } from "../../../models/AuthUser";
import { RootState } from "../../../models/RootState";
import { convertDate } from "../../../utils/utils";
import AddWisata from "./AddWisata";
import EditWisata from "./EditWisata";

type Props = {
  authedData?: AuthUser;
};
const Wisata: React.FC<Props> = () => {
  const { data, isLoading } = useSelector(
    (state: RootState) => state.infoWisata
  );
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [queryData, setQueryData] = useState({
    name: "",
    perPage: "10",
    location: "",
    page: "1",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInfoWisataRequest(queryData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const deleteHandler = (obj: any) => {
    dispatch(
      deleteInfoWisataRequest(obj.id, () => {
        dispatch(getInfoWisataRequest(queryData));
      })
    );
  };
  const datas = data?.data?.data?.map((v: any, i: any) => ({ ...v, key: i }));
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
            onConfirm={() => deleteHandler(obj)}
            okText="Ya, Hapus"
            cancelText="Tidak"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
          <EditWisata obj={obj} />
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
      title: "Nama Wisata",
      dataIndex: "nama_wisata",
      width: 400,
    },
    {
      title: "Lokasi",
      dataIndex: "lokasi_wisata",
      width: 300,
    },
    {
      title: "No HP",
      dataIndex: "no_hp",
      width: 200,
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

  const onChangeName = (name: any) => {
    setQueryData((v) => ({ ...v, name }));

    dispatch(
      getInfoWisataRequest({
        ...queryData,
        name,
        page: pagination.current,
        perPage: pagination.pageSize,
      })
    );
    // dispatch(getAllUserRequest(paginations.perPage, "any", paginations.page));
  };
  const onChangeLocation = (location?: any) => {
    setQueryData((v) => ({ ...v, location }));

    dispatch(
      getInfoWisataRequest({
        ...queryData,
        location,
        page: pagination.current,
        perPage: pagination.pageSize,
      })
    );
    // dispatch(getAllUserRequest(paginations.perPage, "any", paginations.page));
  };
  const onChange = (paginations: any, filters?: any, sorter?: any) => {
    setPagination((v) => ({ ...v, ...paginations }));
    dispatch(
      getInfoWisataRequest({
        ...queryData,
        page: paginations.current,
        perPage: paginations.pageSize,
      })
    );
    // dispatch(getAllUserRequest(paginations.perPage, "any", paginations.page));
  };
  return (
    <Layout title="Info Wisata">
      <h3>Data Wisata</h3>
      <AddWisata />
      <div className="mb-2 mt-2">
        <Search
          className="search-header mr-2"
          placeholder="Cari Wisata"
          style={{ maxWidth: 250 }}
          onSearch={onChangeName}
        />
        <Search
          className="search-header mr-2"
          placeholder="Cari Lokasi"
          style={{ maxWidth: 250 }}
          onSearch={onChangeLocation}
        />
      </div>
      <Card>
        <Table
          onChange={onChange}
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

export default Wisata;
