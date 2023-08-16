import React, { useEffect,useState } from 'react'
import { Layout,Typography,Input,InputNumber,Select,message,Row,Col} from 'antd';
import { object, string,number} from "yup";
import * as Yup from 'yup';
import { Field, useFormik } from 'formik';
import { countryCodes } from '../../app-data/app.data';
import { bookTour, getMyTourDetails, getTourDetails, getTours, selectMyTourDetails, updateTour } from '../../app-redux/modules/tours/tourSlice';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { useLocation,useParams } from 'react-router-dom';
const { Content } = Layout;
const { Title,Text} = Typography;
const { Option } = Select;

export default function BookTour() {
  
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { slug } =  useParams();
  const pathname = location.pathname;
  const pageTitle = pathname === '/book-tour' ? 'Confirm Your Booking' : 'Update Your Booking';
  let data=[];
  
  const fetchTourDetails = async (slug) => {
    await dispatch(getMyTourDetails(slug));
  };
  useEffect(() => {
      console.log(slug,'here')
      if (slug !== "" && slug !== null && slug !== undefined) fetchTourDetails(slug)
  }, []);
  data = useSelector(selectMyTourDetails)
  // const [data, setdata] = useState(useSelector(selectMyTourDetails))
  
  
  //Formik
  const validationSchema = object({
    name: string().required("This field is required"),
    email: string().required("This field is required").email("It should be a proper email"),
    phone: number().typeError('Phone must be an integer').required("This field is required"),
    adults: number().typeError('Adults must be an integer').required("This field is required"),
    childrens: number().typeError('Childrens must be an integer').required("This field is required"),
    payment: string().required("This field is required"),
  });
  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      name: data?.name || "",
      email: data?.email || "",
      phone: data?.phone || "",
      adults: data?.adults || "",
      childrens: data?.childrens || "",
      payment: data?.payment || ""
    }, 
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      let result;
      if (slug !== "" && slug !== null && slug !== undefined){
        result = dispatch(updateTour([values,data?.tour,slug]));
        message.success('Booking form updated successfully!');
      }else{
        result = dispatch(bookTour(values));
        message.success('Booking form submitted successfully!');
      }
      if (!result.response) {
        history.push("/my-tours");
      }
    },
  });

  const selectBefore = (
    <Select defaultValue={countryCodes[0]}>
      {countryCodes.map((item) => (
        <Option key={item} value={item}>
          {item}
        </Option>
      ))}
    </Select>
  );
  
  return (
    <>
    <Content class="confimBook">
      <Content class="container">
        {/* <Content class="row"> */}
        <Row>
          <Col span={12}>
          {/* <Content class="col-lg-6"> */}
            <Title level={2}>{pageTitle}</Title>
            <Content class="confimBookForm">
              <form onSubmit={formik.handleSubmit}>  
              <Row>
                <Col span={24}>
                  <Content class="mb-3">
                    <Text for="" class="ant-label">Name</Text>
                    <Input name='name' className='form-control ant-input' 
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      status={(formik.touched.name && formik.errors.name) ? 'error' : undefined}
                      placeholder={(formik.touched.name && formik.errors.name) ? 'Please enter name' : 'Name'}
                    />
                    <Typography.Text type="secondary">{formik.touched.name && formik.errors.name}</Typography.Text>

                   </Content>
                </Col>
                <Col span={24}>
                  <Content class="mb-3">
                    <Text for="" class="ant-label">  Email</Text>
                    <Input name='email' className='form-control' 
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      status={(formik.touched.email && formik.errors.email) ? 'error' : undefined}
                      placeholder={(formik.touched.email && formik.errors.email) ? 'Please enter email' : 'Email'}
                    />
                    <Typography.Text type="secondary">{formik.touched.email && formik.errors.email}</Typography.Text>
                  </Content>
                </Col>
                <Col span={24}>
                  <Content class="mb-3 ">
                    <Text for="" class="ant-label">Phone</Text>
                    <Input addonBefore={selectBefore} className='ant-phone-sec'  
                    value={formik.values.phone}
                    onChange={(event)=>{formik.setFieldValue('phone',event.target.value)}}
                    status={(formik.touched.phone && formik.errors.phone) ? 'error' : undefined}
                    placeholder={(formik.touched.phone && formik.errors.phone) ? 'Please enter phone' : 'Phone'}
                    />
                    <Typography.Text type="secondary">{formik.touched.phone && formik.errors.phone}</Typography.Text>
                  </Content>
                </Col>
  
                <Col span={12} className='ant-col'>
                  <Content class="mb-3">
                    <Text for="" class="ant-label">Numbers of Adults</Text>
                    <Input min={1} max={10}  className='form-control' 
                      value={formik.values.adults}
                      onChange={(event)=>{formik.setFieldValue('adults',event.target.value)}}
                      status={(formik.touched.adults && formik.errors.adults) ? 'error' : undefined}
                      placeholder={(formik.touched.adults && formik.errors.adults) ? 'Please enter adults' : 'Adults'}
                  
                    />
                    <Typography.Text type="secondary">{formik.touched.adults && formik.errors.adults}</Typography.Text>
                  </Content>
                </Col>
  
                <Col span={12}>
                  <Content class="mb-3">
                    <Text for="" class="ant-label">Numbers of Childrens</Text>
                    <Input min={1} max={10}  className='form-control' 
                      value={formik.values.childrens}
                      onChange={(event)=>{formik.setFieldValue('childrens',event.target.value)}}
                      status={(formik.touched.childrens && formik.errors.childrens) ? 'error' : undefined}
                      placeholder={(formik.touched.childrens && formik.errors.childrens) ? 'Please enter childrens' : 'Childrens'}
                    
                    />
                    <Typography.Text type="secondary">{formik.touched.childrens && formik.errors.childrens}</Typography.Text>
                  </Content>
                </Col>
  
                <Col span={24}>
                  <Content class="mb-3 ant-select-top">
                  <Text for="" class="ant-label">Payment Type</Text>
                  <Select
                  className="ant-select"
                  options={[
                    { value: 'paypa', label: 'Paypal' },
                    { value: 'stripe', label: 'Stripe' },
                  ]}
                  onChange={(event)=>{formik.setFieldValue('payment',event)}}
                  value={formik.values.payment}
                  status={(formik.touched.payment && formik.errors.payment) ? 'error' : undefined}
                  placeholder={'Payment Method'}
                  
                  />
                    <Typography.Text type="secondary">{formik.touched.payment && formik.errors.payment}</Typography.Text>
                </Content> 
                </Col>
                <Col span={24}>
                  <button type="submit" class="btn btn-primary">Submit</button>            
                </Col>
              </Row>
              </form> 
            </Content>
             
          {/* </Content> */}
          </Col>
          <Col span={12}>
          {/* <Content class="col-lg-6"> */}
             <Content class="confimBookImg">
              <img src={`${process.env.REACT_APP_BASE_URL}assets/images/formm.png`} class="img-fluid" alt="" />
             </Content>
          {/* </Content> */}
          </Col>
        </Row>
        {/* </Content> */}
      </Content>
    </Content>
    </>
  )
}
