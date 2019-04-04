import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { message, Row, Col, Form, Input, Button } from "antd";
import { addClaim } from "../../Models/ClaimRecords";
import { getCurrentUser } from "../../Models/Auth";
const FormItem = Form.Item;

class AddClaim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      newLink: null
    };
  }

  handleSubmit = e => {
    console.log("came");
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        this.addClaim(values);
      }
    });
  };

  addClaim = values => {
    this.setState({ loading: true });
    addClaim({
      data: values,
      onSuccess: data => {
        message.success("Claim Record added successfully!");
        this.setState({
          loading: false,
          newLink: this.newLink()
        });
      },
      onError: data => {
        this.setState({
          loading: false
        });
        message.error("Organization not found!");
      }
    });
  };

  newLink = () => {
    if (
      (getCurrentUser().role === "Admin" ||
        getCurrentUser().role === "Manager") &&
      getCurrentUser().organizationType === "CentralBank"
    ) {
      return "/list-claims";
    } else if (
      (getCurrentUser().role === "Admin" ||
        getCurrentUser().role === "Manager") &&
      getCurrentUser().organizationType === "Bank"
    ) {
      return "/claim";
    } else {
      return "/list-client-claims";
    }
  };

  render() {
    if (this.state.newLink) {
      return <Redirect to={this.state.newLink} />;
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="center-form">
        <Form
          onSubmit={this.handleSubmit}
          className="login-form add-claim-form"
        >
          <h2>Submit Claim Record</h2>
          <h4>Claim Info</h4>
          <Row type="flex" justify="start">
            <Col span={8}>
              <FormItem>
                {getFieldDecorator("description", {
                  rules: [
                    { required: true, message: "Please input the Description!" }
                  ]
                })(<Input placeholder="Description" />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator("cost", {
                  rules: [
                    {
                      type: "string",
                      pattern: /^[1-9]{1}[0-9]{0,}$/g,
                      message: "The input is not valid numerics!"
                    },
                    {
                      required: true,
                      message: "Please input the cost!"
                    }
                  ]
                })(<Input placeholder="Cost" />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator("organization_name", {
                  rules: [
                    {
                      required: true,
                      message: "Please input the organization name!"
                    }
                  ]
                })(<Input placeholder="Organization name" />)}
              </FormItem>
            </Col>
          </Row>
          <Button
            loading={this.state.loading}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default Form.create()(AddClaim);
