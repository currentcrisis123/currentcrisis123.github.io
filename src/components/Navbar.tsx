import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation} from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import './Navbar.css';
import logo from '../assets/logo_light.svg';

function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 100;
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links = [
    { name: "About", link: "/about", subname: "Overview", sublink: "/overview", subname2: "Mission", sublink2: "/mission" },
    { name: "News", link: "/news", subname: "Patch Notes", sublink: "/patch_notes", subname2: "Events", sublink2: "/events"},
    { name: "Contribute", link: "/contribute"}
  ];
  return (
    <div className="relative">
      {/* Main Navbar */}
      <div
        className={`fixed z-50 font-mulish flex px-5 py-2 md:w-[calc(100%-24px)] w-full md:m-3 rounded-lg h-[--navbar-height] items-center justify-between border-0 transition-all duration-500 ${
          isScrolled ? "bg-opacity-50 backdrop-blur-md" : "bg-transparent md:bg-gray-default/80"
        }`}
      >
        <div className="font-mohave text-2xl tracking-wide">
          <Link to="/overview" className="flex items-center">
            <img src={logo} className='size-8' />
          </Link>
        </div>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6">
          <NavLink
            to={`/play`}
            className={`underline-offset-4 duration-500 bg-cc-orange/80 hover:bg-cc-orange flex items-center px-2 py-1 rounded-lg font-semibold`}
          >
            Play Now
          </NavLink>
          {links.map((link, index) => (
            <li
              key={link.name}
              style={{ transitionDelay: `${index * 100}ms` }}
              className="text-md flex items-center text-white"
            >
                <div className='dropdown'>                
                  {link.sublink ? (   
                      <>             
                        <button className="dropbtn duration-500 hover:text-cc-orange flex items-center">                        
                          {link.name}
                          <span className="ml-1"><ChevronDown size={16} /></span>
                        </button>
                        <div className='dropdown-content bg-gray-default/60 rounded-lg w-32'>
                          <NavLink
                            to={link.sublink}
                            className={`${
                              location.pathname === link.sublink
                                ? "text-cc-orange underline"
                                : "text-white"
                            } underline-offset-4 duration-500 hover:text-cc-orange hover:bg-white/20 flex items-center rounded-lg`}
                          >
                            {link.subname}
                          </NavLink>
                          {link.sublink2 && (
                            <NavLink
                              to={link.sublink2}
                              className={`${
                                location.pathname === link.sublink2
                                  ? "text-cc-orange underline"
                                  : "text-white"
                              } underline-offset-4 duration-500 hover:text-cc-orange hover:bg-white/20 flex items-center rounded-lg`}
                            >
                              {link.subname2}
                            </NavLink>
                          )}
                        </div>
                      </>
                    ) : (
                      <NavLink
                        to={link.link}
                        className={`${
                          location.pathname === link.link
                            ? "text-cc-orange underline"
                            : "text-white"
                        } underline-offset-4 duration-500 hover:text-cc-orange flex items-center`}
                      >
                        {link.name}
                      </NavLink>
                    )
                  }
                </div>
            </li>
          ))}
        </ul>
        
        <div
          onClick={() => setOpen(!open)}
          className="z-50 cursor-pointer text-3xl text-cc-orange hover:rotate-180 md:hidden"
        >
          {!open ? <Menu /> : <X />}
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      ></div>
      
      <ul
        ref={menuRef}
        className={`fixed font-mulish right-0 top-0 z-40 h-screen w-3/7 pt-12 backdrop-blur-md transition-all duration-300 ease-in md:hidden ${
          open ? "translate-x-0 px-4" : "translate-x-full opacity-0"
        }`}
      >
        {links.map((link, index) => (
          <li
            key={link.name}
            style={{ transitionDelay: `${index * 100}ms` }}
            className="text-md flex items-center text-white px-2"
          >
                {link.sublink ? (   
                    <>             
                      <div className='rounded-lg w-full flex flex-col items-end'>
                        <NavLink
                          to={link.sublink}
                          className={`${
                            location.pathname === link.sublink
                              ? "text-cc-orange underline"
                              : "text-white"
                          } underline-offset-4 duration-500 hover:text-cc-orange flex items-center justify-end rounded-lg py-2 w-full`}
                          onClick={() => setOpen(false)}
                        >
                          {link.subname}
                        </NavLink>
                        {link.sublink2 && (
                          <NavLink
                            to={link.sublink2}
                            className={`${
                              location.pathname === link.sublink2
                                ? "text-cc-orange underline"
                                : "text-white"
                            } underline-offset-4 duration-500 hover:text-cc-orange flex items-center justify-end rounded-lg py-2 w-full`}
                            onClick={() => setOpen(false)}
                          >
                            {link.subname2}
                          </NavLink>
                        )}
                      </div>
                    </>
                  ) : (
                    <NavLink
                      to={link.link}
                      className={`${
                        location.pathname === link.link
                          ? "text-cc-orange underline"
                          : "text-white"
                      } underline-offset-4 duration-500 hover:text-cc-orange flex items-center py-2 justify-end w-full`}
                      onClick={() => setOpen(false)}
                    >
                      {link.name}
                    </NavLink>
                  )
                }
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;
