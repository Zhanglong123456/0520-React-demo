import React, { Component } from 'react';
import { Form, Input } from 'antd';

@Form.create()//得到form属性
class AddCategoryForm extends Component {
  render() {

    const { getFieldDecorator } = this.props.form;

    return <Form>
      <Form.Item label="分类名称">
        {
          getFieldDecorator(
            'categoryName', {//这个名称要参与发送请求
              rules: [
                { required: true, message: '请输入分类名称~' }
              ]
            }
          )(
            <Input placeholder="请输入分类名称"/>
          )
        }
      </Form.Item>
    </Form>;
  }
}

export default AddCategoryForm;