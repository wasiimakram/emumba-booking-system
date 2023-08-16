import React from 'react'
import { Layout, Row, Col, Typography } from 'antd';
import {Link} from "react-router-dom";

const { Content } = Layout;

const Home = () => {
    return (
        <>
            <Layout className="banner_wrap">
                <Content className="banner_inner_content">
                        <Row>
                        <Col span={12}>
                            <Content class="title">
                            <Typography.Title level={2}>Explore The New World <span>With Tourbay</span></Typography.Title>
                            </Content>
                            <p>No matter where in the world you want to go, we
                            can help get you there and make your tour a 
                            stupendous memory.
                            </p>
                            <Content class="explore_btn">
                                <Link to="/search" size='large'>Explore Now</Link>
                            </Content>
                        </Col>
                        <Col span={5} className='right_col'>
                            <Content class="bannerImg">
                                <img src="assets/images/banner01.png" alt="" /> 
                            </Content>
                        </Col>
                        <Col span={5} className='right_col'>
                            <Content class="bannerImg">  
                                <img src="assets/images/banner02.png" alt="" />
                                <img class="mt-3" src="assets/images/banner03.png" alt="" />
                            </Content>
                        </Col>
                        </Row>
                </Content>
            </Layout>
        </>
            
    )
}
export default Home
