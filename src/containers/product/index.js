import React,{Component} from "react"
import "./index.less"
import {reqGetProducts,reqSearchProducts} from "../../api"
import { Card, Select, Input, Button, Icon, Table } from 'antd';
const { Option } = Select;




class Product extends Component{

    state={
        total:0,
        products:[],
        searchKey:"productName",
        searchValue:"",
        isSearch:false,
        pageNum:1,
        pageSize:3

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

    getProducts=async (pageNum,pageSize)=>{
        const {isSearch}=this.state
        let result;
        if(isSearch){
            const {searchKey,prevValue}=this.state
          //搜索过  发送搜索请求
            result=await reqSearchProducts({searchKey,searchValue:prevValue,pageNum,pageSize})
       this.setState({
           searchValue:prevValue
       })
        } else {
          //没有搜素过
            result=await reqGetProducts(pageNum,pageSize)
        }
      this.setState({
          total:result.total,
          products:result.list,
          pageSize,
          pageNum
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

    select=(value)=>{
         this.setState({
             searchKey:value
         })
    }

    change=(e)=>{
        this.setState({
            searchValue:e.target.value
        })
    }

    search=async ()=>{
        const {searchKey,searchValue,pageNum,pageSize}=this.state
        const result=await reqSearchProducts({searchKey,searchValue,pageNum,pageSize})
        this.setState({
            total:result.total,
            products:result.list,
            isSearch:true,
            prevValue:searchValue
        })
    }


    render() {

        const {products,total,searchKey,searchValue}=this.state
        return <Card
            title={<div>
                <Select value={searchKey} onChange={this.select}>
                    <Option key="1" value="productName">根据商品名称</Option>
                    <Option key="2" value="productDesc">根据商品描述</Option>
                </Select>
                <Input placeholder="关键字" value={searchValue} className="product-input" onChange={this.change}/>
                <Button type="primary" onClick={this.search}>搜索</Button>
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