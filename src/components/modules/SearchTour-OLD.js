import { Content } from 'antd/es/layout/layout'
import React,{useState} from 'react'
import { Col, Row,Input,Select,Tag, Button  } from 'antd';
import { Typography } from 'antd';
import { CalendarOutlined, DollarOutlined, SearchOutlined } from '@ant-design/icons';
import { DatePicker} from 'antd';
const { RangePicker } = DatePicker;
const { Title } = Typography;

const SearchTour = () => {
    const customDateFormat = (date, dateString) => {
        const [startDate, endDate] = dateString;
        const formattedStartDate = startDate.format('DD MMM');
        const formattedEndDate = endDate.format('DD MMM');
        return `${formattedStartDate} - ${formattedEndDate}`;
    };
    const [selectedDateRange, setSelectedDateRange] = useState([]);
    const handleDateChange = (dates, dateStrings) => {
        console.log('Selected Date Range:', dateStrings);
        setSelectedDateRange(dateStrings);
    };
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    return (
        <Content className='landing-page'>
            <div className="page-banner"></div>
            
            <Col className="input-selection" span={16} 
            offset={4}
            >
                <Row>
                    <Col className='location-box' span={7}>
                        <div className="location-input">
                            <CalendarOutlined />
                            <Title level={4}>Location</Title>
                        </div>
                        <Input className='text-input' placeholder="Where you want to go?" />
                    </Col>
                    <Col className='date-picker' span={7}>
                        <div className="location-input">
                            <CalendarOutlined />
                            <Title level={4}>Choose Date</Title>
                        </div>
                        <RangePicker 
                            format="DD MMM"
                            renderExtraFooter={() => customDateFormat}
                            onChange={handleDateChange}
                        />
                    </Col>
                    <Col className='range-picker' span={7}>
                        <div className="location-input">
                            <DollarOutlined />
                            <Title level={4}>Choose Date</Title>
                        </div>
                        <Select
                            className='range-select'
                            placeholder="Choose Here"
                            // defaultValue="lucy"
                            style={{ width: 120 }}
                            onChange={handleChange}
                            options={[
                                { value: '50-200', label: '$50 - $200' },
                                { value: '200-400', label: '$200 - $400' },
                            ]}
                        />
                    </Col>
                    <Col className='search-button' span={1}>
                        <Button icon={<SearchOutlined />} />
                    </Col>
                </Row>
            </Col>
            <Title className='page-heading'>Popular Search</Title>
            <Col span={12} offset={6}>
                <Tag>Istabul</Tag>
                <Tag>Dubai</Tag>
                <Tag>Miami</Tag>
                <Tag>Chicago</Tag>
                <Tag>Dallas</Tag>
                <Tag>Havana</Tag>
                <Tag>Berlin</Tag>
                <Tag>Istabul</Tag>
                <Tag>Dubai</Tag>
                <Tag>Miami</Tag>
                <Tag>Chicago</Tag>
                <Tag>Dallas</Tag>
                <Tag>Havana</Tag>
                <Tag>Berlin</Tag>
                <Tag>Istabul</Tag>
                <Tag>Dubai</Tag>
                <Tag>Miami</Tag>
                <Tag>Chicago</Tag>
                <Tag>Dallas</Tag>
                <Tag>Havana</Tag>
            </Col>
        </Content>
    )
}

export default SearchTour;