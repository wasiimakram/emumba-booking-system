
import React,{useState} from 'react'
import { Input,Select,Tag, Button,Layout } from 'antd';
import { Typography } from 'antd';
import { CalendarOutlined, DollarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { DatePicker} from 'antd';
import { useHistory } from 'react-router-dom';
import { tagsData } from '../../app-data/app.data';
const { RangePicker } = DatePicker;
const { Title } = Typography;
const { Content } = Layout;
const SearchTour = () => {
    const history = useHistory();
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const handleSubmit = ()=>{
        history.push(`/tours?query=${title}&price=${price}&start=${startDate}&end=${endDate}`);
    }
    const handleDateChange = (dates) => {
        if(dates){
            const [startDate, endDate] = dates;
            if (startDate && endDate) {
                setStartDate(startDate.toISOString().split('T')[0]);
                setEndDate(endDate.toISOString().split('T')[0]);
            }
        }
     };
     const handleTagClick = (item)=>{
        history.push(`/tours?query=${item}`);
     }
    return (
        <>
            <Content className="banner_wrap_main"></Content>

            <Layout className="datePortint">
                <Content className="ant_container">
                    <Content className="datePortintBox">
                        <Content className="dateBoxWid">
                            <Content className="inputTextIcon">
                                <EnvironmentOutlined className='ant-icon'/>
                            <Title level={4}>Location</Title>
                            </Content>
                            <Input className='text-input' placeholder="Where you want to go?" 
                                onChange={(e)=>{setTitle(e.target.value)}}
                            />
                        </Content>
                        <Content className="dateBoxWid">
                            <Content className="inputTextIcon">
                                <CalendarOutlined className='ant-icon'/>
                            <Title level={4}>Choose Date</Title>
                            </Content>
                            <RangePicker 
                                format="DD MMM"
                                onChange={handleDateChange}
                            />
                            </Content>
                        <Content className="dateBoxWid no-border">
                            <Content className="inputTextIcon">
                                <DollarOutlined className='ant-icon'/>
                            <Title level={4}>Price Range</Title>
                            </Content>
                            <Content>
                                <Select
                                    className='range-select'
                                    placeholder="Choose Here"
                                    onChange={(event)=>{
                                        setPrice(event)
                                    }}
                                    options={[
                                    { value: '20-60', label: '$20 - $60' },
                                    { value: '50-80', label: '$50 - $80' },
                                    { value: '90-120', label: '$90 - $120' },
                                    { value: '100-130', label: '$100 - $130' },
                                    { value: '40-150', label: '$40 - $150' },
                                    { value: '50-120', label: '$50 - $120' },
                                    ]}
                                />
                            </Content>
                            
                            
                        </Content>
                        <Content className="dateBoxWidBtn">
                            <Button onClick={()=>{handleSubmit()}}  className='btn-primary search-btn'> <img src='assets/images/search-icon.png' alt="Icon" /> </Button>
                        </Content>
                    </Content>
                    <Title className='page-heading'>Popular Search</Title>
                    <Content className='ant_container'>
                        {tagsData.map((item)=>(
                            <Tag onClick={()=>{handleTagClick(item)}}>{item}</Tag>
                        ))}
                    </Content>
                </Content>
            </Layout>
        </>
    )
}

export default SearchTour;