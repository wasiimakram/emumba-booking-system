import { Layout,Typography,List } from 'antd';
import {CheckCircleOutlined}  from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectTourDetails,getTourDetails } from '../../app-redux/modules/tours/tourSlice';
import { useParams } from 'react-router-dom';
import { dayList, listData } from '../../app-data/app.data';
import { Link } from 'react-router-dom';

const { Content } = Layout;
const { Title } = Typography;
export default function TourDetails() {
    const [baseUrl] = useState(process.env.REACT_APP_BASE_URL)
    const { slug } = useParams();
    const data = useSelector(selectTourDetails)
    const dispatch = useDispatch()
    useEffect(() => {
        console.log(slug,'here')
        const fetchTourDetails = async () => {
            await dispatch(getTourDetails(slug));
          };
        fetchTourDetails();
    }, [dispatch,slug]);
    
    return (
        <>
            {data.images ? (
                <Layout class="museum-wrap">
                    <Content class="container">
                        <Content class="title">
                            <Title level={2}>{data.title}</Title>
                            <Content class="d-flex">
                                <Content class="pricebx"><i class="fas fa-map-marker-alt"></i> {data.location}</Content>
                                <Content class="pricebx"><i class="fas fa-dollar-sign"></i> {`${data.minPrice} - ${data.maxPrice}`}</Content>
                                <Content class="pricebx"><i class="far fa-clock"></i> {data.duration}</Content>
                            </Content>
                        </Content>
                        <Content class="row mt40">
                            
                            <Content class="col-lg-6">
                                <Content class="museum"><img src={`${baseUrl}assets/images/${data.images[0]}`} alt="" /></Content>
                            </Content>
                            
                            
                            <Content class="col-lg-3 col-md-6">
                                <Content class="museum md-40"><img src={`${baseUrl}assets/images/${data.images[1]}`} alt="" /></Content>
                                <Content class="museum mt40"><img src={`${baseUrl}assets/images/${data.images[2]}`} alt="" /></Content>
                            </Content>
                            
                            
                            <Content class="col-lg-3 col-md-6">
                                <Content class="museum md-40"><img src={`${baseUrl}assets/images/${data.images[3]}`} alt="" /></Content>
                                <Content class="museum mt40"><img src={`${baseUrl}assets/images/${data.images[4]}`} alt="" /></Content>
                            </Content>
                            
                        </Content>
                        <Typography class="text-center mt-4 para">The Pérez Art Museum Miami —officially known as the Jorge M. Pérez Art Museum of Miami-Dade County—is a contemporary art museum that relocated in 2013 to the Museum Park in Downtown Miami, Florida. </Typography>
                        <Typography class="text-center para">Founded in 1984 as the Center for the Fine Arts, it became known as the Miami Art Museum from 1996 until it was renamed in 2013 upon the opening its new building designed by Herzog & de Meuron at 1103 Biscayne Boulevard.</Typography>
                        <Typography class="text-center para"> PAMM, along with the $275 million Phillip and Patricia Frost Museum of Science and a city park which are being built in the area with completion in 2017, is part of the 20-acre Museum Park.</Typography>
                        <Content class="title">
                            <Title level={2}>What’s included</Title>
                        </Content>
                        <Content class="table-responsive">
                            <table class="table">
                                <tbody>
                                <tr>
                                    <th width="30%" scope="row" class="table_heading">Destination</th>
                                    <td width="70%" class="table_para">Miami</td>
                                </tr>
                                <tr>
                                    <th width="30%" scope="row">Departure Location</th>
                                    <td width="70%" class="table_para">2000 Brush St, Detroit, MI 48226, United States</td>
                                </tr>
                                <tr>
                                    <th width="30%" scope="row">Return</th>
                                    <td width="70%" class="table_para">7:00 PM on Day 3</td>
                                </tr>
                                <tr>
                                    <th width="30%" scope="row">Return</th>
                                    <td width="70%" >
                                        <List
                                            className="returnList2"
                                            dataSource={listData}
                                            renderItem={(item) => (
                                            <List.Item>
                                                <Typography.Text ><CheckCircleOutlined /></Typography.Text> {item}
                                            </List.Item>
                                        )}
                                        />
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </Content>
                        <Content class="title">
                            <Title level={2}>Itinerary Schedule</Title>
                        </Content>
                        <Content class="row">
                            
                            <Content class="col-lg-4">
                                <Content class="schdule">
                                <Content class="title d-flex justify-content-between align-items-center">
                                    <Title>Day 1</Title>
                                    <Content class="temp"><img src="assets/images/sun.png" alt="" /> 18 C</Content>
                                </Content>
                                <List
                                    className="dayList"
                                    dataSource={dayList}
                                    renderItem={(item) => (
                                    <List.Item>
                                         {item}
                                    </List.Item>
                                    )}
                                />
                                </Content>
                            </Content>
                            
                            
                            <Content class="col-lg-4">
                                <Content class="schdule">
                                <Content class="title d-flex justify-content-between align-items-center">
                                    <Title>Day 2</Title>
                                    <Content class="temp"><img src="assets/images/cloud.png" alt="" /> 14 C</Content>
                                </Content>
                                <List
                                    className="dayList"
                                    dataSource={dayList}
                                    renderItem={(item) => (
                                    <List.Item>
                                         {item}
                                    </List.Item>
                                    )}
                                />
                                </Content>
                            </Content>
                            
                            
                            <Content class="col-lg-4">
                                <Content class="schdule">
                                <Content class="title d-flex justify-content-between align-items-center">
                                    <Title>Day 3</Title>
                                    <Content class="temp"><img src="assets/images/sun.png" alt="" /> 18 C</Content>
                                </Content>
                                <List
                                    className="dayList"
                                    dataSource={dayList}
                                    renderItem={(item) => (
                                    <List.Item>
                                         {item}
                                    </List.Item>
                                    )}
                                />
                                </Content>
                            </Content>
                            
                        </Content>
                        <Content class="bookbtn explore_btn mt-5 text-center">
                            <Link to="/book-tour">Book Now</Link>
                        </Content>
                    </Content>
                </Layout>
            ) : <></>}
        </>
  )
}
