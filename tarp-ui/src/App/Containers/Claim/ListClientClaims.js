import React, { Component } from "react";
import {
  Card,
  Table,
  Button,
  message,
  Modal,
  Upload,
  Icon,
  Input,
  Form
} from "antd";
import { getUserClaims } from "../../Models/ClaimRecords";
import { getCurrentUser } from "../../Models/Auth";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../Config/Routes";

export default class ListClaim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      Claim: [],
      selectedRecord: null,
      visible: false
    };
    this.columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description"
      },
      {
        title: "Cost",
        dataIndex: "cost",
        key: "cost"
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt"
      },
      {
        title: "Insurer Name",
        dataIndex: "insurerDetails.name",
        key: "insurerDetails.name"
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status"
      },
      {
        title: "Action",
        dataIndex: "actions",
        render: (text, record, index) => {
          return (
            <div style={{ display: "flex" }}>
              <Button type="primary" onClick={() => this.openModal(record)}>
                Add Proof
              </Button>
            </div>
          );
        }
      }
    ];
  }

  renderContent = () => {
    const props = {
      name: "proofimg",
      action: BASE_URL + "/add-proof",
      headers: {
        token: getCurrentUser().token,
        claim_id: this.state.selectedRecord
          ? this.state.selectedRecord.id
          : null
      },
      onChange(info) {
        if (info.file.status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === "done") {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    };
    return (
      <div>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Click to Upload
          </Button>
        </Upload>
        ,
      </div>
    );
  };

  componentDidMount() {
    this.getUserClaims();
  }

  openModal = record => {
    this.setState({
      visible: true,
      selectedRecord: record
    });
  };
  handleApprove = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.approveRequest(
          this.state.selectedRecord,
          "Approved",
          values.timeLimit
        );
      }
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      selectedRecord: null
    });
  };
  getUserClaims = () => {
    message.loading("Fetching claims from Blockchain Ledger...", 0);
    this.setState({ loading: true });
    getUserClaims({
      onSuccess: data => {
        this.setState({
          loading: false,
          Claim: data.response
        });
        message.destroy();
        message.success("Synced with Ledger!");
      },
      onError: data => {
        this.setState({
          loading: false
        });
        message.destroy();
        // message.error('Unable to Claim')
      }
    });
  };
  render() {
    return (
      <div>
        <Card
          title="List Of Claims"
          extra={
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Link to="/client/claim/add-claim">
                <Button style={{ marginRight: "15px" }} type="primary">
                  Add Claim
                </Button>
              </Link>
            </div>
          }
        >
          <Table
            dataSource={this.state.Claim}
            columns={this.columns}
            loading={this.state.loading}
            rowKey="id"
          />
          <Modal
            title="Add Proof"
            visible={this.state.visible}
            onCancel={this.handleCancel}
            okText={"Approve"}
            onOk={this.handleApprove}
            width={800}
          >
            {this.renderContent()}
          </Modal>
        </Card>
      </div>
    );
  }
}
