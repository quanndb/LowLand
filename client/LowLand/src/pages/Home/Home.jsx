import React from "react";
import "./Home.css";
import { useState, useEffect } from "react";
import {
  FacebookOutlined,
  SendOutlined,
  YoutubeOutlined,
  InstagramOutlined,
  MailOutlined,
} from "@ant-design/icons";
const Home = () => {
  const imageUrls = [
    "/static/images/imgslider1.jpg",
    "/static/images/imgslider2.png",
    "/static/images/imgslider3.png",
  ];

  const newsData = [
    {
      imageUrl: "/static/images/newsrightcontent1.jpg",
      title: "Tết mà! TẶNG QUÀ VẠN THẺ VÀNG, RƯỚC XE BẠC TỶ",
      date: "05/01/2024",
    },
    {
      imageUrl: "/static/images/newsrightcontent2.png",
      title: "ĐIỀU KHOẢN SỬ DỤNG ĐỐI VỚI THẺ HIGHLANDS COFFEE",
      date: "15/11/2023",
    },
    {
      imageUrl: "/static/images/newsrightcontent3.png",
      title: "APP NÀY LÀ CỦA CHÚNG MÌNH",
      date: "10/01/2023",
    },
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImageIndex, imageUrls.length]);

  return (
    <>
      <div className="home-container">
        <header className="header">
          <nav className="nav header-container">
            <a href="/" className="nav__logo">
              <img
                src="https://www.highlandscoffee.com.vn/vnt_upload/weblink/White_logo800.png"
                alt=""
                style={{ height: "86px" }}
              />
            </a>

            <div className="header--right">
              <div className="search-container">
                <div className="search">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Từ khóa"
                    className="search-input"
                  />
                </div>
                <div className="flag">
                  <img src="static/images/flag-vn.jpg" alt="" />
                  <img src="static/images/flag-en.jpg" alt="" />
                </div>
              </div>

              <div className="nav__menu">
                <ul className="nav__list">
                  <li className="nav__item">
                    <a href="">Khám phá bưu điện</a>
                    <ul className="nav__submenu">
                      <li>Bưu điện 1</li>
                      <li>Bưu điện 2</li>
                      <li>Bưu điện 3</li>
                    </ul>
                  </li>
                  <li className="nav__item">
                    <a href=""> Thực đơn </a>
                    <ul className="nav__submenu">
                      <li>Bưu điện 1</li>
                      <li>Bưu điện 2</li>
                      <li>Bưu điện 3</li>
                    </ul>
                  </li>
                  <li className="nav__item">
                    <a href=""> Tin tức </a>
                    <ul className="nav__submenu">
                      <li>Bưu điện 1</li>
                      <li>Bưu điện 2</li>
                      <li>Bưu điện 3</li>
                    </ul>
                  </li>
                  <li className="nav__item">
                    <a href=""> Về chúng tôi </a>
                  </li>
                  <li className="nav__item">
                    <a href=""> Nghề nghiệp </a>
                  </li>
                  <li className="nav__item">
                    <a href=""> Thẻ </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        {/* content */}
        <div className="main-home">
          <div className="img-content">
            <img
              src={imageUrls[currentImageIndex]}
              alt=""
              className="imgcontain"
            />
          </div>
          <div className="img-content">
            <img
              src="static/images/imgcontent1.png"
              alt=""
              className="imgcontain lazy"
            />
          </div>
          <div className="img-content">
            <img
              src="static/images/imgcontent2.png"
              className="imgcontain lazy"
              alt=""
            />
          </div>
          {/* news-home */}
          <div className="news-home-container">
            <div className="news-left">
              <div className="wrapper-news">
                <h2 className="news-left-hd">QUÁN MỚI</h2>
                <div className="news-left-content">
                  <h4 className="news-left-hd">721 HUỲNH TẤN PHÁT</h4>
                  <div className="news-text">
                    721 HUỲNH TẤN PHÁT, PHƯỜNG PHÚ THUẬN, QUẬN 7, TP. HỒ CHÍ
                    MINH
                  </div>
                  <div>TÌM ĐƯỜNG </div>
                </div>
              </div>
            </div>

            <div className="news-right">
              <div className="news-right-wrapper">
                <div className="news-right-hd">
                  <h2>TIN MỚI NHẤT</h2>
                  <div className="hd-right-text">Xem toàn bộ </div>
                </div>
                <div className="news-right-container">
                  {newsData.map((item) => (
                    <div key={item.imageUrl} className="news-right-item">
                      <div className="news-img-container">
                        <img
                          src={item.imageUrl}
                          alt=""
                          className="news-right-img"
                        />
                      </div>
                      <div className="news-right-content">
                        <h3 className="r-text-content">{item.title}</h3>
                        <div className="news-r-time">{item.date}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="news-right-search-container">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder=" Nhập email của bạn để nhận thông tin.."
                    className="news-search"
                  />
                  <div className="btnGui">
                    <SendOutlined /> GỬI
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* footter */}
          <div className="footer-home">
            <div className="wrapper">
              <div className="socialFT">
                <div className="box">
                  <FacebookOutlined />
                </div>
                <div className="box">
                  <YoutubeOutlined />
                </div>
                <div className="box">
                  <InstagramOutlined />
                </div>
              </div>
              <div className="copyrightFT">
                © 2024 Lowlands Coffee. All rights reserved
              </div>
              <div className="linkFooter">
                <SendOutlined /> Đăng ký để nhận bản tin
              </div>
              <div className="linkFooter">
                <MailOutlined /> customerservice@lowlandscofffee.vn.com
              </div>
            </div>
          </div>
        </div>

        {showScrollButton && (
          <div className="scroll-to-top" onClick={scrollToTop}>
            <span>↑</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
