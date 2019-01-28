import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { Upload, message, Icon, Row, Col, Spin, Form, Input, Button, Checkbox, InputNumber, DatePicker } from 'antd';
import { addKYC } from '../../Models/KYCRecords'
import { getCurrentUser } from '../../Models/Auth';
const FormItem = Form.Item;


class AddKYC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : false,
      newLink : null
    }
  }
  
  handleSubmit = (e) => {
    console.log("came")
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        this.addKYC(values)
      }
    });
  }

  addKYC = (values) => {
    this.setState({loading : true})
    addKYC({
      data : values,
      onSuccess: (data) => {
        message.success('KYC Record added successfully!')
        this.setState({
          loading: false,
          newLink: this.newLink()
        })
      },
      onError: (data) => {
        this.setState({
          loading: false,
        })
        message.error('Unable to get KYC records!')
      }
    })
  }

  newLink = () => {
    if ((getCurrentUser().role === "Admin" || getCurrentUser().role === "Manager") && getCurrentUser().organizationType === "CentralBank") {
      return "/list-kycs"
    } else if ((getCurrentUser().role === "Admin" || getCurrentUser().role === "Manager") && getCurrentUser().organizationType === "Bank") {
      return "/kyc"
    } else {
      return "/client/kyc"
    }
  }
  
  render() {
    if (this.state.newLink) {
      return (
        <Redirect to={this.state.newLink} />
      )
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="center-form">
        <Form onSubmit={this.handleSubmit} className="login-form add-kyc-form">
          <h2>Submit KYC Record</h2>
          <h4>Personal Info</h4>
          <Row type="flex" justify="start">
            <Col span={8}>
          <FormItem>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input your name!' }],
            })(
              <Input placeholder="Name" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('aadhar_number', {
              rules: [{ required: true, message: 'Please input your Aadhar Number!' }],
            })(
              <Input placeholder="Aadhar Number" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('phone_numbers', {
              rules: [{ required: true, message: 'Please input mobile number!' }],
            })(
              <Input placeholder="Mobile Number" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('dateOfBirth', {
              rules: [{ required: true, message: 'Please input Date of Birth!' }],
            })(
                  <DatePicker defaultValue={moment('01/01/1995', 'DD/MM/YYYY')} format={'DD/MM/YYYY'} placeholder="Date of Birth" showToday={false}/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('birthMarks', {
              rules: [{ required: true, message: 'Please input your Birth mark!' }],
            })(
              <Input placeholder="Birth Mark" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('mothersMaidenName', {
              rules: [{ required: true, message: 'Please input your Mother\'s maiden name!' }],
            })(
              <Input placeholder="Mother's maiden name" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('driversLicense', {
              rules: [{ required: true, message: 'Please input your Driver License!' }],
            })(
              <Input placeholder="Driver License" />
            )}
          </FormItem>
          </Col>
            <Col style={{marginLeft : "15px"}} span={8}>
          <FormItem>
            {getFieldDecorator('passport', {
              rules: [{ required: true, message: 'Please input your Passport!' }],
            })(
              <Input placeholder="Passport" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('cardInformation', {
              rules: [{ required: true, message: 'Please input your Card Information!' }],
            })(
              <Input placeholder="Card Information" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('nationality', {
              rules: [{ required: true, message: 'Please input your Nationality!' }],
            })(
              <Input placeholder="Nationality" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('emailAddress', {
              rules: [{ required: true, message: 'Please input your Email!' }],
            })(
              <Input type="email" placeholder="Email" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('loyaltyCards', {
              rules: [{ required: true, message: 'Please input your Loyalty card!' }],
            })(
              <Input placeholder="Loyalty Card" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('preferences', {
              rules: [{ required: true, message: 'Please input your Preferences!' }],
            })(
              <Input placeholder="preferences" />
            )}
          </FormItem>
          </Col>
          </Row>
          <h4>Address Info</h4>
          <Row type="flex" justify="start">
            <Col span={8}>
          {/* <FormItem>
            {getFieldDecorator('type', {
              rules: [{ required: true, message: 'Please input Address Type!' }],
            })(
              <Input type="text" placeholder="Address Type" />
            )}
          </FormItem> */}
          <FormItem>
            {getFieldDecorator('line1', {
              rules: [{ required: true, message: 'Please input address line1!' }],
            })(
              <Input type="text" placeholder="Address Line 1" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('line2', {
              rules: [{ required: true, message: 'Please input address line2!' }],
            })(
              <Input type="text" placeholder="Address Line 2" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('line3', {
              rules: [{ required: true, message: 'Please input address line3!' }],
            })(
              <Input type="text" placeholder="Address Line 3" />
            )}
          </FormItem>
          </Col>
            <Col style={{ marginLeft: "15px" }} span={8}>
          <FormItem>
            {getFieldDecorator('city_town_village', {
              rules: [{ required: true, message: 'Please input City!' }],
            })(
              <Input type="text" placeholder="City" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('postal_code', {
              rules: [{ required: true, message: 'Please input postal code!' }],
            })(
              <Input placeholder="Postal Code" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('state_ut', {
              rules: [{ required: true, message: 'Please input State!' }],
            })(
              <Input type="text" placeholder="State" />
            )}
          </FormItem>
          </Col>
          </Row>
          <Button loading={this.state.loading} type="primary" htmlType="submit" className="login-form-button">
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}


export default Form.create()(AddKYC);