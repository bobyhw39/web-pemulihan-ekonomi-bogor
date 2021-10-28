import { Input, Form, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";
// import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Layout } from "../../../components";
import { AuthUser } from "../../../models/AuthUser";
import { notificationLoadingMessage } from "../../../utils/notifications";
import ComfirmPassword from "./ComfirmPassword";

type Props = {
  authedData?: AuthUser;
};
const ResetPassword: React.FC<Props> = ({ authedData }) => {
  const [form] = useForm();
  // const dispatch = useDispatch();
  const loc = useLocation();
  const onResetpassword = () => {
    // const data = {
    //   email: form.getFieldValue("email"),
    // };
    notificationLoadingMessage("Tunggu sebentar");
    // dispatch(forgotPasswordRequest(data));
  };
  return (
    <Layout title="Reset Password">
      <div>
        {loc.state ? (
          <ComfirmPassword authedData={authedData} />
        ) : (
          <Form
            layout="vertical"
            hideRequiredMark
            form={form}
            onFinish={onResetpassword}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Alamat email tidak valid",
                },
                {
                  required: true,
                  message: "Mohon masukkan email yang terdaftar",
                },
              ]}
              label="Email"
            >
              <Input
                style={{ maxWidth: "350px" }}
                name="email"
                placeholder="Ketik Email"
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Kirim
              </Button>
            </Form.Item>
            <Link to={{ pathname: "reset-password", state: true }}>
              Sudah punya otp?
            </Link>
          </Form>
        )}
      </div>
    </Layout>
  );
};
export default ResetPassword;
