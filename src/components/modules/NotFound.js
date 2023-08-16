import React,{useState,useEffect} from 'react'
import { Typography,Layout, Modal,message } from 'antd';
import { Link } from 'react-router-dom';
import { listingData } from '../../app-data/app.data';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTour, getTours, selectMyTours, selectTours } from '../../app-redux/modules/tours/tourSlice';
import { useLocation } from 'react-router-dom';
const { Title,Text } = Typography;
const { Content } = Layout;

const NotFound = () => {

    
    return (
        // <!-- Top Destinations start here --> 
        <Layout className="destinations-wrap">
            <Content className="ant_container">
                <Content className="not-found">
                    <img src="assets/images/404.svg" alt="Not Found" />
                    <Typography.Title level={5} className='title'>Sorry, We didn't find any tour right now.</Typography.Title>
                </Content>
            </Content>
        </Layout>
        
    )
}
export default NotFound