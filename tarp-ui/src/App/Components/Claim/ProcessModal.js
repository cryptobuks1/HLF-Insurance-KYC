import React, { Component } from "react";
import { Modal, Button, Table, message, Tag, Row, Col } from "antd";
import { getClaimDetails, updateClaimStatus } from "../../Models/ClaimRecords";
import { getCurrentUser } from "../../Models/Auth";
export default class AcceptModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      info: null,
      records: null,
      acceptButton: false,
      rejectButton: false
    };
  }

  handleAcceptOrReject = status_update => {
    this.setState({ acceptButton: true });
    updateClaimStatus({
      data: {
        claim_id: this.props.record.id,
        status_update
      },
      onSuccess: data => {
        this.setState({
          acceptButton: false,
          visible: false
        });
        this.props.list();
        message.success("Successfully Updated Claim!");
      },
      onError: data => {
        console.log(data);
        this.setState({ acceptButton: false, visible: false });
        message.error("Unable to Update Claim");
      }
    });
  };

  fetchInfo = () => {
    this.setState({ info: this.props.record });
  };

  showModal = () => {
    this.fetchInfo();
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
      info: null
    });
  };

  renderInfo = () => {
    return (
      <div>
        <Row type="flex" justify="start">
          <Col span={12}>
            {/* <h2>User Info</h2> */}
            <p>
              <strong>Claim ID: </strong>
              {this.state.info.id}
            </p>
            <p>
              <strong>Cost Reimbursement: </strong>
              {this.state.info.cost}
            </p>
            <p>
              <strong>Description: </strong>
              {this.state.info.description}
            </p>
          </Col>
        </Row>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {!this.state.Accepted ? (
            <Button
              type="primary"
              loading={this.state.acceptButton}
              onClick={() => this.handleAcceptOrReject("Accepted")}
            >
              Accept
            </Button>
          ) : (
            <b>Accepted!</b>
          )}
          {!this.state.Accepted ? (
            <Button
              type="primary"
              loading={this.state.rejectButton}
              onClick={() => this.handleAcceptOrReject("Rejected")}
            >
              Reject
            </Button>
          ) : (
            <b>Rejected!</b>
          )}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Update Status
        </Button>
        <Modal
          title="Claim Info"
          visible={this.state.visible}
          okText="Accept"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={800}
          footer={false}
        >
          {this.state.info ? this.renderInfo() : null}
        </Modal>
      </div>
    );
  }
}
