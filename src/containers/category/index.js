import React,{Component} from "react"
import {connect} from "react-redux"

import {reqGetCategories} from "../../api"

import {getCategories,addCategory,updateCategory} from "../../redux/action-creators";

import AddCategoryForm from "./add-category-form"
import UpdateCategoryForm from "./update-category-form"

import {Card,Button,Icon,Table,Modal} from "antd"

@connect(
    (state)=>({categories:state.categories}),
    {getCategories,addCategory,updateCategory}
)
 class Category extends Component{

    state={
        isShowAddCategoryModal:false,
        isShowUpdateCategoryModal:false,
        category:{}
    }

    addCategoryForm=React.createRef()
    updateCategoryForm=React.createRef()

    componentDidMount() {
        if (this.props.categories.length) return
        //发送请求 请求分类数据 更新redux状态
        this.props.getCategories()
    }
    changeModal=(key,value)=>{
        return()=>{
            this.setState({
                [key]:value
            })
        }
    }
    //表单验证
    addCategory=()=>{

        console.log(this.addCategoryForm.current)
        this.addCategoryForm.current.validateFields((err,values)=>{
         if(!err){
           //表单验证成功
             this.props.addCategory(values.categoryName)
             //隐藏对话框
             this.setState({
                 isShowAddCategoryModal:false
             })

             //清空表单项
             this.addCategoryForm.current.resetFields()
         }

        })
    }

    updateCategory=()=>{
        this.updateCategoryForm.current.validateFields((err,values)=>{
            if(!err){
                //表单验证成功
                this.props.updateCategory(this.state.category._id,values.categoryName)
                //隐藏对话框
                this.setState({
                    isShowUpdateCategoryModal:false
                })

                //清空表单项
                this.updateCategoryForm.current.resetFields()
            }

        })
    }

    showUpdateCategoryModal=(category)=>{
       return()=>{
           this.setState({
               isShowUpdateCategoryModal:true,
               category
           })
       }

    }

    hiddenModal=()=>{  //隐藏修改的对话框
        this.setState({
            isShowUpdateCategoryModal:false,
        })
        //清空表单数据
        this.updateCategoryForm.current.resetFields()
    }


    render() {

        const {isShowAddCategoryModal,isShowUpdateCategoryModal,category}=this.state
        const columns = [
            {
                title: '品类名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                //dataIndex: 'operation',//写了dataIndex render方法的参数是对应的值，不写得到的就是整个对象
                render:(Category)=>{
                    console.log(Category.name)//111,222,333
                    return <div>
                         <Button type="link" onClick={this.showUpdateCategoryModal(Category)}>修改分类</Button>
                        <Button type="link">删除分类</Button>
                    </div>
                }
            },
        ];
        /*const data = [
            {
                key: '1',
                name: 'John Brown',
            },
            {
                key: '2',
                name: 'Jim Green',
            },
            {
                key: '3',
                name: 'Joe Blank',
            },
            {
                key: '4',
                name: 'Joe Black',
            },

        ];*/

        const {categories}=this.props
        return <div>

            <Card title="分类列表" extra={<Button type="primary" onClick={this.changeModal("isShowAddCategoryModal",true)}><Icon type="plus"/>分类列表</Button>}>
                <Table
                    columns={columns}
                    dataSource={categories}
                    bordered
                    pagination={{
                        showQuickJumper: true,
                        showSizeChanger: true,
                        pageSizeOptions: ['3', '6', '9', '12'],
                        defaultPageSize: 3
                    }}
                    rowKey="_id"
                />
                <Modal title="添加分类"
                       visible={isShowAddCategoryModal}//是否显示添加分类对话框
                       okText="确定"
                       cancelText="取消"
                       width={300}
                        onOk={this.addCategory} //点击确定的时候  首先要进行表单的验证
                       onCancel={this.changeModal("isShowAddCategoryModal",false)}
                >
                <AddCategoryForm ref={this.addCategoryForm}/>
                </Modal>

                <Modal title="修改分类"
                       visible={isShowUpdateCategoryModal}//是否显示修改分类对话框
                       okText="确定"
                       cancelText="取消"
                       width={300}
                       onOk={this.updateCategory} //点击确定的时候  首先要进行表单的验证
                       onCancel={this.hiddenModal}
                >
                    <UpdateCategoryForm ref={this.updateCategoryForm} categoryName={category.name}/>
                </Modal>
            </Card>
        </div>
    }
}
export default Category