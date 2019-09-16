import React, { Component } from 'react';
import { Form, Input } from 'antd';

@Form.create()//得到form属性
class UpdateCategoryForm extends Component {

  validator = (rule, value, callback) => {
    if (!value) {
      callback('请输入要修改的分类名称~');
    } else if (value === this.props.categoryName) {
      callback('请输入要修改的有效分类名称~');
    } else {
      callback();
    }
  };

  render() {
    const {categoryName}=this.props
    const { getFieldDecorator } = this.props.form;

    return <Form>
      <Form.Item label="分类名称">
        {
          getFieldDecorator(
            'categoryName', {//这个名称要参与发送请求
              rules: [
                { validator:this.validator }
              ],
                initialValue:categoryName   //没有值时候生效
            }
          )(
            <Input placeholder="请输入分类名称"/>
          )
        }
      </Form.Item>
    </Form>;
  }
}

export default UpdateCategoryForm;