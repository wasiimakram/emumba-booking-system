import React,{useState,useEffect} from 'react'
import { Typography,Layout, Modal,message } from 'antd';
import { Link } from 'react-router-dom';
import { listingData } from '../../app-data/app.data';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTour, getTours, selectMyTours, selectTours } from '../../app-redux/modules/tours/tourSlice';
import { useLocation } from 'react-router-dom';
import NotFound from './NotFound';
const { Title,Text } = Typography;
const { Content } = Layout;

const AllTours = () => {

    const location = useLocation();
    const pathname = location.pathname;

    const toursData = useSelector(selectMyTours)
    const pageTitle = 'My Tours';

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTours());
    }, [dispatch]);
    
    // Modal Logics
    const [selectedId, setSelectedId] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState('');
    const [isTourDisabled, setIsTourDisabled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    
    const showModal = (index) => {
        setIsTourDisabled(false);
        // const tour = toursData.find((item)=>item.tour.index === index);
        const record = toursData[index];
        const currentDate = new Date();
        const startDate = new Date(record?.tour?.start_date);
        // currentDate = 14 , startDate = 17 - no cancel
        // currentDate = 14 , startDate = 18 - can cancel
        const daysRemaining = Math.ceil((startDate - currentDate) / (1000 * 60 * 60 * 24));
        console.log("Dates==>",currentDate,startDate,daysRemaining,(daysRemaining <= 3))
        if (daysRemaining <= 3) {
            setIsTourDisabled(true);
        }
        setSelectedTitle(record?.tour?.title)
        setSelectedId(index)
        setIsModalOpen(true);
    };
    
      const handleOk = () => {
        setConfirmLoading(true);
        const result = dispatch(deleteTour(selectedId));
        if(!result.response){
            setTimeout(() => {
                setIsModalOpen(false);
                setConfirmLoading(false);
                message.success('Booking deleted successfully!');
            }, 2000);
        }
    };
    
      const handleCancel = () => {
        setIsTourDisabled(false);
        setSelectedId(null)
        setIsModalOpen(false);
    };
    
    return (
        // <!-- Top Destinations start here --> 
        <Layout className="destinations-wrap">
            <Content className="ant_container">
                <Content class="title d-flex align-items-center justify-content-between">
                    <Title level={2}>{pageTitle}</Title>
                    <Content class="filter">
                        <Link to="/my-tours"><img src="assets/images/bars.png" alt="" />Filter</Link>
                    </Content>
                </Content>
                <Content class="row">
                    {/* <!--col-4--> */}
                    {toursData.length !== 0  ? toursData.map((item,index) => {
                        return(
                            <Content class="col-lg-4">
                                <Content class="destinationbx">
                                <Content class="desti-image"><img src={`assets/images/${item.tour.bannerImage}`} alt="" /></Content>
                                <Content class="desti-info">
                                    <Title level={3}>{item.tour.title}</Title>
                                    <Typography>
                                        {item.tour.description}
                                    </Typography>
                                    <Content class="row mt-3 price_sec">
                                        <Content class="col-lg-6">
                                            <Content class="pricebx"><i class="fas fa-dollar-sign"></i> {item.tour.priceRange}</Content>
                                        </Content>
                                        <Content class="col-lg-6">
                                            <Content class="pricebx"><i class="far fa-clock"></i> {item.tour.duration}</Content>
                                        </Content>
                                    </Content>
                                        <Content class="view-details view-details-open">
                                            <i class="fas fa-trash" onClick={()=>{showModal(index)}}></i>
                                            <Link className='link' to={{pathname: `tours/${item.tour.slug}`, query: { slug: item.slug }}}>Details</Link>
                                            <Link  className='link' to={{pathname: `update-tour/${item.tour.slug}`, query: { slug: item.slug }}}>Update</Link>
                                        </Content>
                                    
                                    
                                     <Modal
                                        className='delete-modal' 
                                        centered 
                                        title="Delete Tour" 
                                        open={isModalOpen} 
                                        onOk={handleOk} 
                                        onCancel={handleCancel}
                                        okText="Delete"
                                        cancelText="Cancel"
                                        confirmLoading={confirmLoading}
                                        okButtonProps={isTourDisabled && { style: { display: 'none' } }}
                                        >
                                            {isTourDisabled ? (
                                                <>
                                                    You can't delete <Text className='delete-text'>{`"${selectedTitle}"`}</Text> because there are only <Text className='delete-text'>3 days remaining</Text> until the beginning of this tour.
                                                </>
                                            ):(
                                                <>
                                                    Are you sure you want to delete <Text className='delete-text'>{`"${selectedTitle}"`}</Text> ?
                                                </>
                                            )}
                                    </Modal>
                                </Content>
                                </Content>
                            </Content>
                        )
                    }) : (
                        <>
                        <NotFound />
                        </>
                    )}
                    {/* <!--col-4--> */}
                    
                </Content>
            </Content>
        </Layout>
        
    )
}
export default AllTours