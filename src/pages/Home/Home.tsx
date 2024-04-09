import { Typography, Image, Card } from "antd";
import { selectAuth } from "../../redux/auth/auth.slice";
import { useAppSelector } from "../../hooks/hooks";

export const Home = (): JSX.Element => {
  const { userInfo } = useAppSelector(selectAuth);
  const userData = userInfo?.user;
  return (
    <Card>
      <div className="row">
        <div className="col-sm-12 col-md-8 ">
          <Typography.Title level={4} ellipsis={true}>
            Bienvenido {userData?.firstName} {userData?.lastName}
          </Typography.Title>
          <Typography.Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor.
          </Typography.Paragraph>
        </div>
        <div className="col-sm-12 col-md-4 ">
          <Image src="https://dummyimage.com/800x600" />
        </div>
      </div>
    </Card>
  );
};
