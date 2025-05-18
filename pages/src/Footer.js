import Link from 'next/link'
import {useState,useEffect} from  'react'
export default function Footer(){
	const [ismobile, setMobile] = useState(false)
	useEffect(async() =>{
		const screenWidth = window.innerWidth;
		screenWidth < 768 ? setMobile(true) : setMobile(false)
	},[]);


    return(
        <div>

<footer className="footer footer-black footer-big" >
				<div className="container">
					<div className="copyright pull-left" style={{ fontSize: ismobile ? 11 : null }} > 
	    				<a> We are on 
					<Link href="https://www.facebook.com/Jesus-Loves-you-Ministries-JLUM-235036396947583/">
							<a> <i className="_mi _before dashicons dashicons-facebook" aria-hidden="true" style={{color: 'lightblue'}}> </i></a>
						</Link> and 
						<Link href="https://www.youtube.com/channel/UC26_CXwwmhackoB_H8hjtPQ">
							<a> <i className="_mi _before dashicons dashicons-youtube" aria-hidden="true" style={{color: 'red', fontSize:24}}> </i> </a>
						</Link> 
						&nbsp; please like us, follow us
			                </a>
					</div>
				
					<div className="copyright pull-right" style={{ fontSize: ismobile ? 10 : null }} > <Link href="/"><a>2011 - {new Date().getFullYear()} © <b>Jesus Loves You Ministries</b></a></Link> | <span data-toggle="tooltip" title='Hello I am Sudheer, Fullstack Web App Developmement expert. Follow us to get your awesome projects like this - Best Regards'><a href="https://sudheerneo.com/" > Made with <i className="_mi _before dashicons dashicons-heart"  style={{color: 'green'}}></i></a> </span></div>
				</div>
			</footer>
<script type="text/javascript" src="/srcData_files/windowdom.js"></script>
<script type="text/javascript" src="/srcData_files/jquery.waypoints.min.js.download"></script>
<script type="text/javascript" src="/srcData_files/bootstrap.min.js.download"></script>
<script type="text/javascript" src="/srcData_files/material.js.download"></script>
<script type="text/javascript" src="/srcData_files/jquery.matchHeight.js.download"></script>
<script type="text/javascript" src="/srcData_files/scripts.js.download"></script>
       
       
        </div>

    )
}

