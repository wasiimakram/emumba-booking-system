import React,{useState,useEffect} from 'react'
import { Typography,Layout, Modal,message } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTour, getTours, selectTours } from '../../app-redux/modules/tours/tourSlice';
import { useLocation } from 'react-router-dom';
import NotFound from './NotFound';
const { Title,Text } = Typography;
const { Content } = Layout;

const AllTours = () => {

    const location = useLocation();
    const dispatch = useDispatch()
    const pathname = location.pathname;
    const queryParams = new URLSearchParams(location.search);

    const title = queryParams.get('query') || '';
    const priceRange= queryParams.get('price') || '';
    const startDate = queryParams.get('start') || '';
    const endDate = queryParams.get('end') || '';

    const pageTitle = (title !== '' && title !== null) ? `Top Destinations At "${title}"` : 'Top Destinations';
    const toursData = useSelector(selectTours);
    const [pageData, setPageData] = useState([])
   
    const filterTours = (data) => {
        return data.filter(tour => {
            // Filter by title (case-insensitive)
            if (title && !tour.location.toLowerCase().includes(title.toLowerCase())) {
                return false;
            }
      
            // Filter by start date
            console.log("filtersss",startDate,tour.start_date)
            if (startDate && tour.start_date < startDate) {
                return false;
            }

            // Filter by end date
            if (endDate && tour.start_date > endDate) {
                return false;
            }
      
            // Filter by price range
            if (priceRange !=='') {
                
                const [minPrice, maxPrice] = priceRange.split('-').map(range => range.trim());
                const tourMinPrice = Number(tour.minPrice && tour.minPrice.replace(/\$/g, '').trim());
                const tourMaxPrice = Number(tour.minPrice && tour.maxPrice.replace(/\$/g, '').trim());
                if (minPrice && tourMinPrice > Number(minPrice)) {
                    return false;
                }
                if (maxPrice && tourMaxPrice < Number(maxPrice)) {
                    return false;
                }
                
            }

            return true;
        });
      };
      
    useEffect(() => {
        dispatch(getTours());
    }, [dispatch]);
    useEffect(() => {
        if(title!=='' || priceRange!=='' || startDate !=='' || endDate!==''){
            console.log("search")
            const filteredTours = filterTours(toursData);
            setPageData(filteredTours);
           
        }else{
            console.log("tours")
            setPageData(toursData);
        }
    }, [toursData]);
    

    // Modal Logics
    const [selectedId, setSelectedId] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState('');
    const [isTourDisabled, setIsTourDisabled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = (slug) => {
        setIsTourDisabled(false);
        const tour = toursData.find((item)=>item.slug === slug);
        const currentDate = new Date();
        const startDate = new Date(tour.start_date);
        // currentDate = 14 , startDate = 17 - no cancel
        // currentDate = 14 , startDate = 18 - can cancel
        const daysRemaining = Math.ceil((startDate - currentDate) / (1000 * 60 * 60 * 24));
        if (daysRemaining <= 3) {
            setIsTourDisabled(true);
        }
        setSelectedTitle(tour.title)
        setSelectedId(slug)
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
                    <Link to="/tours"><img src="assets/images/bars.png" alt="" />Filter</Link>
                    </Content>
                </Content>
                <Content class="row">
                    {/* <!--col-4--> */}
                    {pageData.length !== 0 ? pageData.map((item) => {
                        return(
                            <Content class="col-lg-4">
                                <Content class="destinationbx">
                                <Content class="desti-image"><img src={`assets/images/${item.bannerImage}`} alt="" /></Content>
                                <Content class="desti-info">
                                    <Title level={3}>{item.title}</Title>
                                    <Typography>
                                        {item.description}
                                    </Typography>
                                    <Content class="row mt-3 price_sec">
                                        <Content class="col-lg-6">
                                            <Content class="pricebx"><i class="fas fa-dollar-sign"></i> {`${item.minPrice} - ${item.maxPrice}`}</Content>
                                        </Content>
                                        <Content class="col-lg-6">
                                            <Content class="pricebx"><i class="far fa-clock"></i> {item.duration}</Content>
                                        </Content>
                                    </Content>
                                    {pathname === '/my-tours'  ? (
                                        <Content class="view-details view-details-open">
                                            <i class="fas fa-trash" onClick={()=>{showModal(item.slug)}}></i>
                                            <Link className='link' to={{pathname: `tours/${item.slug}`, query: { slug: item.slug }}}>Details</Link>
                                            <Link  className='link' to={{pathname: `update-tour/${item.slug}`, query: { slug: item.slug }}}>Update</Link>
                                        </Content>
                                    
                                    ) : 
                                        <Content class="view-details">
                                            <Link to={{pathname: `tours/${item.slug}`, query: { slug: item.slug }}}>View Details</Link>
                                        </Content>
                                    }
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