import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Popconfirm, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFaqRequest, getFaqRequest } from "../../../../actions/faq";
import { Layout } from "../../../../components";
import { AuthUser } from "../../../../models/AuthUser";
import { RootState } from "../../../../models/RootState";
import { notificationLoadingMessage } from "../../../../utils/notifications";
import { convertDate } from "../../../../utils/utils";
import AddFaq from "./AddFaq";
import EditFaq from "./EditFaq";

type Props = {
  authedData?: AuthUser;
};
const List: React.FC<Props> = () => {
  const { data, isLoading } = useSelector((state: RootState) => state.faq);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFaqRequest({ perPage: 10, page: 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const deleteHandler = (obj: any) => {
    notificationLoadingMessage("Tunggu sebentar");
    dispatch(
      deleteFaqRequest(obj.id, () => {
        dispatch(getFaqRequest({ perPage: 10, page: 1 }));
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
          <EditFaq obj={obj} />
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
      title: "Pertanyaan ",
      dataIndex: "question",
      width: 400,
    },
    {
      title: "Jawaban ",
      dataIndex: "answer",
      width: 400,
    },
  ];
  const onChangeProduct = (paginations: any, filters?: any, sorter?: any) => {
    dispatch(
      getFaqRequest({ perPage: paginations.perPage, page: paginations.page })
    );
  };
  return (
    <Layout title="FAQ">
      <h3>Data FAQ</h3>
      <AddFaq />
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

export default List;
