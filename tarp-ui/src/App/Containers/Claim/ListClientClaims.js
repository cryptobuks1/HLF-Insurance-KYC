import React, { Component } from "react";
import { Card, Table, Button, message, Tag } from "antd";
import { getUserClaims } from "../../Models/ClaimRecords";
import { Link } from "react-router-dom";

export default class ListClaim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      Claim: []
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
      }
    ];
  }

  componentDidMount() {
    this.getUserClaims();
  }

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
        </Card>
      </div>
    );
  }
}
