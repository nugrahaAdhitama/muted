import Avatar from "../components/Avatar/Avatar";
import Navbar from "../components/Navbar/Navbar";
function reportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  
    <div className="">
      {/* <Navbar /> */}
        {children}
    
    </div>
  );}

export default reportLayout;
