import React from 'react'
import NewsPublish from '../../../components/publish-manage/NewsPublish'
import usePublish from './usePublish'
import { Button } from 'antd'
export default function Unpublished() {

  const {dataSource,handlePublish} =usePublish(1)


  return (
    <div>
      <NewsPublish dataSource={dataSource} button={(id)=><Button type='primary' onClick={()=>handlePublish(id)}>
        发布
      </Button>} ></NewsPublish>
    </div>
  )
}

