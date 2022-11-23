import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Layout, Row } from "antd";
import { useRouter } from "next/router";

import { httpClient } from "../../src/api/api";
import { AuthServiceImp } from "../../src/api/AuthService";
import { TokenRepositoryImp } from "../../src/api/TokenRepository";
import { UserData } from "../../src/types";

const tokenRepository = new TokenRepositoryImp();
const authService = new AuthServiceImp(httpClient, tokenRepository);

const { Content } = Layout;

export default function Login() {
  const router = useRouter();
  const goHome = () => router.push("/");

  const onFinish = async (data: UserData) => {
    // TODO: (useAuth : custom hook으로 리팩토링)
    // const { signIn, signUp, logout } = useAuth();
    const res = await authService.signIn(data);
    if (res.result === "success") {
      goHome();
    } else {
      // TODO: 에러 메시지 UI 표기 로직 추가
      console.log(res.reason);
    }
  };

  return (
    <Layout>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col
          span={6}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "32px",
          }}
        >
          <h1>로그인</h1>
          <Content
            style={{
              background: "white",
              minWidth: "360px",
              padding: "18px",
              borderRadius: "4px",
            }}
          >
            <Form
              onFinish={onFinish}
              // TODO: UI validation 로직 추가
              // onValuesChange={(cV, v) => {
              //   console.log(cV);
              //   console.log(v);
              // }}
            >
              <Form.Item
                name="email"
                rules={[{ required: true, message: "아이디를 입력하세요" }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="아이디를 입력하세요"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "비밀번호를 입력하세요" }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="비밀번호를 입력하세요"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  로그인
                </Button>
              </Form.Item>
            </Form>
          </Content>
        </Col>
      </Row>
    </Layout>
  );
}
