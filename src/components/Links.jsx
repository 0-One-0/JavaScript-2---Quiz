function Links() {
  return (
    <>
      <svg
        className="Ham-Menu"
        width="22"
        height="16"
        viewBox="0 0 22 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="22" height="4" rx="2" fill="#D9D9D9" />
        <rect y="12" width="22" height="4" rx="2" fill="#D9D9D9" />
        <rect y="6" width="22" height="4" rx="2" fill="#D9D9D9" />
      </svg>

      <svg className="Close-svg"
        width="9"
        height="12"
        viewBox="0 0 9 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="7.04639"
          y="10.9229"
          width="12"
          height="2.06"
          rx="1.03"
          transform="rotate(-125.959 7.04639 10.9229)"
          fill="white"
        />
        <rect
          y="10.0566"
          width="12"
          height="2.06135"
          rx="1.03067"
          transform="rotate(-56.9337 0 10.0566)"
          fill="white"
        />
      </svg>

      <ul className="link-list">
        <li>
          <a href="#">DashBoard</a>
        </li>
        <li>
          <a href="#">Quiz</a>
        </li>
        <li>
          <a href="#">How to play</a>
        </li>
      </ul>
    </>
  );
}

export default Links;
