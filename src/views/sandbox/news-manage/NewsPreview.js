import React, { useEffect, useState } from 'react'
import {Descriptions, PageHeader } from 'antd';
import axios from 'axios';
import moment from 'moment';

export default function NewsPreview(props) {
    const [newsInfo, setnewsInfo] = useState(null)
    useEffect(() => {
        axios.get(`/news/${props.match.params.id}?_expand=category&_expand=role`).then(
            res => {
                setnewsInfo(res.data)
            }
        )
    }, [props.match.params.id])


    const auditList=["未审核","审核中","已通过","未通过"]
    const publishList=["未发布","待发布","已上线","已下线"]
    return (
        <div>{
            newsInfo && <div>
                <PageHeader
                    onBack={() => window.history.back()}
                    title={newsInfo.title}
                    subTitle={newsInfo.category.title}
                >
                    <Descriptions size="small" column={3}>
                        <Descriptions.Item label="创建者">{newsInfo.author}</Descriptions.Item>
                        <Descriptions.Item label="创建时间">{moment(newsInfo.createTime).format("YYYY/MM/DD HH:mm:ss")}</Descriptions.Item>
                        <Descriptions.Item label="发布时间">{newsInfo.publishTime?moment(newsInfo.createTime).format("YYYY/MM/DD HH:mm:ss"):
                        "-"
                        }
                            
                        </Descriptions.Item>
                        <Descriptions.Item label="区域">{newsInfo.region}</Descriptions.Item>
                        <Descriptions.Item label="审核状态">{auditList[newsInfo.auditState]}</Descriptions.Item>
                        <Descriptions.Item label="发布状态">{publishList[newsInfo.publishState]}</Descriptions.Item>
                        <Descriptions.Item label="访问数量">{newsInfo.view}</Descriptions.Item>
                        <Descriptions.Item label="点赞数量">{newsInfo.star}</Descriptions.Item>
                        <Descriptions.Item label="评论数量">0</Descriptions.Item>

                    </Descriptions>

                </PageHeader>
                <div dangerouslySetInnerHTML={
                    {__html:newsInfo.content}
                } style={{border:"1px solid gray",padding:"0px 24px",margin:"0px 24px"}}>
                </div>
            </div>
        }

        </div>
    )
}
