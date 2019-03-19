import React, { Component } from "react";
import { Card, Table, Button, message, Tag } from "antd";
import { getAllClaims } from "../../Models/ClaimRecords";
import ProcessModal from "../../Components/KYC/ProcessModal";
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
        title: "Insuree Name",
        dataIndex: "insureeDetails.name",
        key: "insureeDetails.name"
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
      // {
      //   title: "Actions",
      //   dataIndex: "actions",
      //   render: (text, record, index) => {
      //     return (
      //       <div style={{ display: "flex" }}>
      //         <ProcessModal record={record} list={this.listClaims} />
      //       </div>
      //     );
      //   }
      // }
    ];
  }

  componentDidMount() {
    this.getAllClaims();
  }

  getAllClaims = () => {
    message.loading("Fetching claims from Blockchain Ledger...", 0);
    this.setState({ loading: true });
    getAllClaims({
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
              <Link to="/client/claim/add-claim" />
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
