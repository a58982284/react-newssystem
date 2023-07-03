import { Table, Button, Modal, Tree } from 'antd'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
const { confirm } = Modal

export default function RoleList() {
    const [dataSource, setdataSource] = useState([])
    const [isModalVisable, setisModalVisable] = useState(false)
    const [rightList,setrightList]=useState([])
    const [currentRights,setcurrentRights] =useState([])
    const [currentId,setcurrentId] =useState([0])
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: '角色名称',
            dataIndex: 'roleName',

        },
        {
            title: '操作',
            render: (item) => {
                return <div>
                    <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(item)}></Button>

                    <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => {
                        setisModalVisable(true)
                        setcurrentRights(item.rights)
                        setcurrentId(item.id)
                    }}></Button>

                </div>
            },
        }
    ]
    const confirmMethod = (item) => {
        confirm({
            title: '你确定要删除?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            onOk() {
                deleteMethod(item);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const deleteMethod = (item) => {
        setdataSource(dataSource.filter(data => data.id !== item.id))   //前端状态
        axios.delete(`http://localhost:8000/roles/${item.id}`)


    }

    useEffect(() => {
        axios.get("http://localhost:8000/roles").then(res => {
            // console.log(res.data);
            setdataSource(res.data)
        })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:8000/rights?_embed=children").then(res => {
            // console.log(res.data);
            setrightList(res.data)
        })
    }, [])

    const handleOk = () => {
        setisModalVisable(false);
        setdataSource(dataSource.map(item=>{
            if (item.id===currentId) {
                return {
                    ...item,
                    rights:currentRights
                }
            }
            return item
        }))
        axios.patch(`http://localhost:8000/roles/${currentId}`,{rights:currentRights})
    }

    const handleCancel = () => {
        setisModalVisable(false);
    }

    const onCheck =(checkKeys)=>{
        console.log(checkKeys);
        setcurrentRights(checkKeys.checked)
    }

    return (
        <div>
            <Table dataSource={dataSource} columns={columns} rowKey={(item) => item.id}></Table>

            <Modal title="权限分配" open={isModalVisable} onOk={handleOk} onCancel={handleCancel}>
                <Tree
                    checkable
                    // defaultExpandedKeys={['0-0-0', '0-0-1']}
                    // defaultSelectedKeys={['0-0-0', '0-0-1']}
                    checkedKeys={currentRights}
                    // onSelect={onSelect}
                    onCheck={onCheck}
                    treeData={rightList}
                    checkStrictly = {true}
                />
            </Modal>
        </div>
    )
}
