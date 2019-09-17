import React,{Component} from "react"
import "./index.less"
import {reqGetProducts} from "../../api"
import { Card, Select, Input, Button, Icon, Table } from 'antd';
const { Option } = Select;




class Product extends Component{

    state={
        total:0,
        products:[]
    }

    columns = [
        {
            title: '商品名称',
            dataIndex: 'name'
        },
        {
            title: '商品描述',
            dataIndex: 'desc'
        },
        {
            title: '价格',
            dataIndex: 'price'
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: () => {
                return <div>
                    <Button type="primary">下架</Button>
                    <span>已上架</span>
                </div>
            }
        },
        {
            title: '操作',
            // dataIndex: 'status',
            render: (product) => {
                return <div>
                    <Button type="link">详情</Button>
                    <Button type="link" onClick={this.goSaveUpdate(product)}>修改</Button>
                </div>
            }
        }
    ];

    getProducts=async (pageName,pageSize)=>{
        const result =await reqGetProducts(pageName,pageSize)
      this.setState({
          total:result.total,
          products:result.list
      })
    }

    componentDidMount() {
this.getProducts(1,3)
    }

    //跳转到添加数据页面
    goSaveUpdate=(product)=>{
        return ()=>{
            this.props.history.push("/product/saveupdate",product)
        }
    };


    render() {

        const {products,total}=this.state
        return <Card
            title={<div>
                <Select defaultValue="1">
                    <Option key="1" value="1">根据商品名称</Option>
                    <Option key="2" value="2">根据商品描述</Option>
                </Select>
                <Input placeholder="关键字" className="product-input"/>
                <Button type="primary">搜索</Button>
                </div>}
            extra={<Button type="primary" onClick={this.goSaveUpdate()}><Icon type="plus"/>添加商品</Button>}
        >

            <Table
             columns={this.columns}
             dataSource={products}
             bordered
             pagination={{
                 showQuickJumper: true,
                 showSizeChanger: true,
                 pageSizeOptions: ['3', '6', '9', '12'],
                 defaultPageSize: 3,
                 total,
                 onShowSizeChange: this.getProducts,
                 onChange:this.getProducts
             }}
             rowKey="_id"

           />
            </Card>
    }
}


export default Product