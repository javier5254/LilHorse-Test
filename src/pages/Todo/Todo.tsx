import { Card } from "antd";
import { Formularium } from "./components/Formularium";
import { TableCustom } from "./components/Table";

export const Todo = (): JSX.Element => {
  return (
    <div className="row" style={{ padding: 24 }}>
      <div className="col-sm-12 col-md-4">
        <Card style={{ marginBottom: "10px" }}>
          <Formularium></Formularium>
        </Card>
      </div>
      <div className="col-sm-12 col-md-8">
        <Card style={{ marginBottom: "10px" }}>
          <TableCustom />
        </Card>
      </div>
    </div>
  );
};
