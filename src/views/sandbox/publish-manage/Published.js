import NewsPublish from '../../../components/publish-manage/NewsPublish'
import usePublish from './usePublish'
import {Button} from 'antd'

export default function Published() {
    // 2=== 已发布的
    const {dataSource,handleSunset} = usePublish(2)
    console.log('datasource',dataSource);
    return (
        <div>
            <NewsPublish dataSource={dataSource} button={(id)=><Button danger onClick={()=>handleSunset(id)}>
                下线
            </Button>}>

            </NewsPublish>
        </div>
    )
}
