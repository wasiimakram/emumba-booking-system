import React from 'react';
import { Layout, Menu, Row, Col, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';

const { Header,Content } = Layout;

const Navbar = () => {
  const items = [
    {
      label: (
        <Link class="nav-link" to="/">Home </Link>
      ),
      key: 'alipay',
    },
    {
      label: (
        <Link class="nav-link" to="/search">Search</Link>
      ),
      key: 'alipay',
    },
    {
      label: (
        <Link class="nav-link" to="/tours">Tours</Link>
      ),
      key: 'alipay',
    },
    {
      label: (
        <Link class="nav-link" to="/book-tour">Book Tour</Link>
      ),
      key: 'alipay',
    },
    {
      label: (
        <Link class="nav-link" to="/my-tours">My Tours</Link>
      ),
      key: 'alipay',
    },
  ]
  const [current, setCurrent] = React.useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <>
      <Header
      className='header'
      >
        <Row>
          <Col span={6}>
          <Content class="logo">
            <a href="index.html">
            <img class="img-fluid" src="assets/images/logo.png" alt="" /> 
            </a>
          </Content>
          {/* <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
          </button> */}
          </Col>
          <Col span={12} className='menus'>
            <Content class="navigation-wrap">
              {/* <nav class="navbar navbar-expand-lg navbar-light"> */}
                <Content class="navbar-collapse" id="navbarSupportedContent">
                  <button class="close-toggler" type="button" data-toggle="offcanvas"> <span><i class="fas fa-times-circle" aria-hidden="true"></i></span> </button>
                  
                  <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
                  
                  {/* <ul class="navbar-nav">
                    <li class="nav-item"><Link class="nav-link" to="/">Home </Link></li>
                    <li class="nav-item"><Link class="nav-link" to="/search">Search</Link></li>
                    <li class="nav-item"><Link class="nav-link" to="/tours">Tours</Link></li>
                    <li class="nav-item"><Link class="nav-link" to="/book-tour">Book Tour</Link></li>
                    <li class="nav-item"><Link class="nav-link" to="/my-tours">My Tours</Link></li> 
                  </ul> */}
                </Content>                              
              {/* </nav> */}
            </Content>
          </Col>
          <Col span={5}>
            <Content class="explore_btn">
              <Link to="/search">
                  Explore Now
              </Link>
            </Content>
          </Col>
        </Row>
        {/* <Layout className="container">
          <Row className="ant-row ant-align-items-center">
            <Col lg={2} md={24}>
              <div className="logo">
                <a href="index.html">
                  <img className="img-fluid" src="images/logo.png" alt="" />
                </a>
              </div>
              <Button className="navbar-toggler" type="primary" icon={<span className="navbar-toggler-icon"></span>} />
            </Col>
            <Col lg={7} md={24}>
              <div className="navigation-wrap">
                <Menu mode="horizontal" className="custom-menu">
                </Menu>
                <Button className="close-toggler" type="text"  />
              </div>
            </Col>
            <Col lg={3} md={24}>
              <Button className="explore_btn" type="primary"><a href="index.html">Explore Now</a></Button>
            </Col>
          </Row>
        </Layout> */}
      </Header>
      {/* <header>
          <div class="container">
              <div class="row align-items-center">
                <div class="col-lg-2 col-md-12 navbar-light">
                    <div class="logo">
                      <a href="index.html">
                      <img class="img-fluid" src="assets/images/logo.png" alt="" /> 
                      </a>
                    </div>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div class="col-lg-7 col-md-12">
                    <div class="navigation-wrap">
                      <nav class="navbar navbar-expand-lg navbar-light">
                          <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <button class="close-toggler" type="button" data-toggle="offcanvas"> <span><i class="fas fa-times-circle" aria-hidden="true"></i></span> </button>
                            <ul class="navbar-nav">
                                <li class="nav-item"><a class="nav-link" href="#homemain">Add Tour</a></li>
                                <li class="nav-item"><a class="nav-link" href="#mission">Book Tour</a></li>
                                <li class="nav-item"><a class="nav-link" href="#ideals">My Tours</a></li>
                            </ul>
                          </div>
                      </nav>
                    </div>
                </div>
                <div class="col-lg-3 col-md-12">
                    <div class="explore_btn"><a href="index.html">Explore Now</a></div>
                </div>
              </div>
          </div>
      </header> */}
    </>
    // <Header className="page-header" style={{ display: 'flex', alignItems: 'center',
    //     flexDirection: 'column-reverse',flexWrap:'wrap' }} >
    //     <div className="demo-logo" />
    //     <img src="assets/images/logo.png" alt="Logo"/>
    //     <Menu style={{background:'none'}} mode="horizontal" defaultSelectedKeys={['1']}>
    //       <Menu.Item key="1">My Tours</Menu.Item>
    //       <Menu.Item key="2">Tours</Menu.Item>
    //       <Menu.Item key="3">Contact</Menu.Item>
    //     </Menu>
    //     <div>
          
    //     </div>
    //     <div></div>
    //     {/* <Button size={'large'} style={{backgroundColor:"#F16B51",color:"white"}}>Explore Now</Button> */}
    // </Header>
  );
};

export default Navbar;
